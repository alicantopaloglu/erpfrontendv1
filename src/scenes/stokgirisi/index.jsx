import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import MaterialTable from "material-table";
import Guncelle from '../../assets/icons';
import Add from '../../assets/add';
import Apply from '../../assets/apply'
import axios from "axios";
import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { ModalBody, ModalTitle } from "react-bootstrap";
import Button from 'react-bootstrap/Button';


const Stokgirisi = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [isShow, setShow] = useState(false);
    const [isShow2, setShow2] = useState(false);

    let [errMessage, setErr] = useState();
    const [siparisler, setSiparisler] = useState([]);
    const [modalData, setData] = useState();

    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    const decoded = parseJwt(sessionStorage.getItem("Auth"));

    const columns =
        [

            { title: "Sipariş ID", field: "siparisID", maxWidth: 60 },
            { title: "Stok Kodu", field: "stokkodu", maxWidth: 60 },
            { title: "Proje Kodu", field: "projekodu", maxWidth: 60 },
            { title: "Firma ID", field: "firmaID", maxWidth: 60 },
            { title: "Talep Tarihi", field: "taleptarihi", type: "date", maxWidth: 70 },
            { title: "Termin Tarihi", field: "termintarihi", type: "date", maxWidth: 70 },
            { title: "Oluşturulma Tarihi", field: "tarih", type: "date", maxWidth: 70 },
            { title: "Açıklama", field: "aciklama", },
            { title: "Satınalma Açıklama", field: "saciklama" },
            { title: "Miktar", field: "miktar", maxWidth: 70 },
            { title: "Alınan Miktar", field: "alinanmiktar", maxWidth: 70 },
            { title: "Kalan Miktar", field: "kalanmiktar", maxWidth: 70 },
            { title: "Stok Eklenen Miktar", field: "stokeklenenmiktar", maxWidth: 70, },
            { title: "Durumu", field: "durumu", maxWidth: 70, },


        ]

    useEffect(() => {
        axios({
            method: "GET",
            url: process.env.REACT_APP_API + 'Siparis/GetStockOrder',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((result) => {
            setSiparisler(result.data)

        })
    }, []);

    const refreshList = () => {
        axios({
            method: "GET",
            url: process.env.REACT_APP_API + 'Siparis/GetStockOrder',

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((result) => {
            setSiparisler(result.data)


        })
    };

    const initModal = (data) => {

        setData(data);
        return setShow(!isShow);
    }

    const initModal2 = () => {
        refreshList();
        return setShow2(!isShow2);

    }

    const handleCase = (event) => {
        event.preventDefault();
        const name = event.target.getAttribute("name");
        const value = event.target.value
        const caseCopy = { ...modalData }
        caseCopy[name] = value;
        setData(caseCopy);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
       
        fetch(process.env.REACT_APP_API + 'StokGirisi', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                siparisID: modalData.siparisID,
                stokkodu: modalData.stokkodu,
                kdv: modalData.kdv,
                birimfiyati: modalData.birimfiyati,
                miktar: modalData.girisMiktar,
                irsaliyeno: modalData.irsaliyeno,
                irsaliyetarihi: modalData.irsaliyetarihi,
                faturano: modalData.faturano,
                faturatarihi: modalData.faturatarihi,
                kullaniciID: decoded["kullaniciID"],




            })
        })
            .then(res => res.text()).then(d => setErr(d.replace(/[" "]/g, " ")))

            .catch(err => setErr(err.message))
        setShow2(true)
        setShow(false)
    }

    return (


        <Box m="20px">
            <Box
                m="2px 0 0 0"
                height="75vh"
            >
                <MaterialTable className="table1" id="table1" columns={columns} data={siparisler} title="Siparişler"
                    enableRowSelection
                    enablePinning
                    style={{ backgroundColor: colors.blueAccent[700] }}
                    options={{
                        search: false, cellStyle: { padding: '10px', width: "0.1rem" },
                        filtering: true, pageSize: 25, pageSizeOptions: [5, 10, 25, 50, 100, { value: siparisler.length, label: 'Hepsi' }], exportButton: true, exportAllData: true,
                        rowStyle: { overflowWrap: "break-word", backgroundColor: colors.primary[400] },
                        maxBodyHeight: "750px", tableLayout: "fixed",
                        headerStyle: { backgroundColor: colors.primary[400], },
                        cellStyle: { backgroundColor: colors.primary[400] },
                        filterRowStyle: { backgroundColor: colors.primary[400] },
                        columnsButton: true,


                    }

                    }
                    localization={{
                        body: {
                            emptyDataSourceMessage: 'Gösterilecek kayıt yok'
                        },
                        toolbar: {
                            searchTooltip: 'Arama'
                        },
                        pagination: {
                            labelRowsSelect: 'satır',
                            labelDisplayedRows: '{count} satırdan {from}-{to} arası',
                            firstTooltip: 'İlk Sayfa',
                            previousTooltip: 'Önceki Sayfa',
                            nextTooltip: 'Sonraki Sayfa',
                            lastTooltip: 'Son Sayfa',
                            labelRowsPerPage: "Sayfa başına satır sayısı"

                        }
                    }}
                    actions={[
                        {

                            icon: () => <button type="submit" name="stokgiris" style={{ background: "none", borderStyle: "none" }}>
                                <Apply size={30} fill={colors.primary[200]} /></button>,
                            tooltip: "Stok Girişi",
                            onClick: (e, data) => initModal(data),
                        },
                    ]}


                />



                <Modal className="stokGirisi" show={isShow}
                    size="xl"
                >
                    <Modal.Header style={{ backgroundColor: colors.blueAccent[700] }}>
                        <ModalTitle style={{ backgroundColor: colors.blueAccent[700] }}>STOK GİRİŞİ</ModalTitle>
                    </Modal.Header>
                    <ModalBody style={{ backgroundColor: colors.primary[400] }}>

                        <div className="card mb-5" style={{ backgroundColor: colors.primary[400], color: `${colors.grey[100]} !important`, }}>
                            <div className="card-body" style={{ backgroundColor: colors.primary[400], color: `${colors.grey[100]} !important` }}>
                                <div className="form-group col-lg-12 col-md-4 col-xs-12">
                                    <div className="row">
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">

                                            <label style={{ color: colors.blueAccent[700] }}>FATURA NO</label>
                                            <input name="faturano" type="text" className="form-control" onChange={handleCase}></input>

                                        </div>

                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">

                                            <label style={{ color: colors.blueAccent[700] }}>FATURA TARİHİ</label>
                                            <input name="faturatarihi" type="date" className="form-control" onChange={handleCase}></input>

                                        </div>
                                        

                                        


                                    </div>
                                    <br></br>
                                    <div className="row">
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">

                                            <label style={{ color: colors.blueAccent[700] }}>İRSALİYE NO</label>
                                            <input name="irsaliyeno" type="text" className="form-control" onChange={handleCase}></input>

                                        </div>

                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">

                                            <label style={{ color: colors.blueAccent[700] }}>İRSALİYE TARİHİ</label>
                                            <input name="irsaliyetarihi" type="date" className="form-control" onChange={handleCase}></input>

                                        </div>
                                        

                                        


                                    </div>

                                    <div className="row">
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>BİRİM FİYATI</label>
                                            <input name="birimfiyati" type="number" min={0} step={'.01'} className="form-control" onChange={handleCase}
                                            >
                                            </input>

                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>KDV</label>
                                            <input name="kdv" placeholder="ÖRNEK 18" type="number" min={0}  className="form-control" onChange={handleCase}
                                            >
                                            </input>

                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>MİKTAR</label>
                                            <input name="girisMiktar" type="number" min={0} step={'.01'} className="form-control" onChange={handleCase}
                                            >
                                            </input>

                                        </div>

                                        
                                    </div>



                                </div>
                            </div>
                        </div>

                    </ModalBody>
                    <Modal.Footer style={{ backgroundColor: colors.blueAccent[700] }}>
                        <Button onClick={initModal}>Kapat</Button>
                        <Button onClick={handleSubmit}>ONAYLA</Button>

                    </Modal.Footer>
                </Modal>

                <Modal className="siparisInfo" show={isShow2} animationDirection='bottom' tabIndex='-1' >



                    <Modal.Header style={{ backgroundColor: colors.blueAccent[700] }}>
                        <ModalTitle style={{ backgroundColor: colors.blueAccent[700] }}>BİLGİ</ModalTitle>

                    </Modal.Header>
                    <ModalBody style={{ backgroundColor: colors.primary[400] }}>
                        <h1> {errMessage}</h1>
                    </ModalBody>


                    <Modal.Footer style={{ backgroundColor: colors.blueAccent[700] }}>
                        <Button className="btn btn-danger" onClick={initModal2}>Kapat</Button>

                    </Modal.Footer>


                </Modal>
            </Box>
        </Box>
    )
}
export default Stokgirisi;