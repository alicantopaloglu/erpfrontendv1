import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import MaterialTable from "material-table";
import Guncelle from '../../assets/icons';
import Remove from '../../assets/remove';



import axios from "axios";
import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { ModalBody, ModalTitle } from "react-bootstrap";

import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';





const Stokcikisi = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(true);
    const [open2, setOpen2] = useState(false);
    const [stoklar, setstoklar] = useState([]);
    const [cikislar, setCikislar] = useState([]);
    const [isShow, setShow] = useState(false);
    const [isShow2, setShow2] = useState(false);
    const [isShow3, setShow3] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [submitError2, setSubmitError2] = useState(false);
    let [errMessage, setErr] = useState();
    const [modalData, setData] = useState();
    const [modalData2, setData2] = useState([]);
    const [projeler, setProjeler] = useState([]);
    const [selectedProje, setSelectedProje] = useState('');
    const [selectedProje2, setSelectedProje2] = useState('');
    const decoded = parseJwt(sessionStorage.getItem("Auth"));

    const columns =
        [

            { title: "Stok Kodu", field: "stokkodu", maxWidth: 60 },
            { title: "Ürün Adı", field: "urunadi", },
            { title: "Üretici", field: "uretici", },
            { title: "Yüzey", field: "yuzey", },
            { title: "Boy", field: "boy", },
            { title: "En", field: "en", },
            { title: "Kalınlık", field: "kalinlik", },
            { title: "Birim", field: "birim" },
            { title: "Tanım", field: "tanim" },
            { title: "Rezerve Alınmış Miktar", field: "rezervealinmismiktar", maxWidth: 70 },
            { title: "Kullanılabilir Miktar", field: "kullanilabilirmiktar", },
            { title: "Miktar", field: "miktar", maxWidth: 70, },
            { title: "Ortalama Birim Fiyatı", field: "ortalamabirimfiyati", maxWidth: 100, type: 'currency', currencySetting: { locale: 'TR', currencyCode: 'TRY', minimumFractionDigits: 0, maximumFractionDigits: 3 } },
            { title: "Toplam Tutar", field: "toplamtutar", maxWidth: 90, type: 'currency', currencySetting: { locale: 'TR', currencyCode: 'TRY', minimumFractionDigits: 0, maximumFractionDigits: 3 } },


        ]

    const columns2 =
        [

            { title: "ID", field: "stokcikisID", },
            { title: "Stok Kodu", field: "stokkodu", },
            { title: "Ürün Adı", field: "urunadi", },
            { title: "Tanım", field: "tanim", },
            { title: "Yüzey", field: "yuzey", },
            { title: "Boy", field: "boy", },
            { title: "En", field: "en", },
            { title: "Kalınlık", field: "kalinlik", },
            { title: "Proje Kodu", field: "projekodu", },
            { title: "Birim", field: "birim", },
            { title: "Kdv Dahil Birim Fiyatı", field: "birimfiyati", type: 'currency', currencySetting: { locale: 'TR', currencyCode: 'TRY', minimumFractionDigits: 0, maximumFractionDigits: 3 } },
            { title: "Miktar", field: "miktar", },

            { title: "Toplam Tutar", field: "toplamtutar", type: 'currency', currencySetting: { locale: 'TR', currencyCode: 'TRY', minimumFractionDigits: 0, maximumFractionDigits: 3 } },
            { title: "Tarih", field: "tarih", }

        ]
    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    const initModal = (data) => {

        setData(data);
       
        setSubmitError(false);
        return setShow(!isShow);
    }
    const initModal2 = () => {
        refreshList();
        refreshList2();
        return setShow2(!isShow2);

    }
    const initModal3 = (data) => {

        setData2(data);

        return setShow3(!isShow3);
    }
    const handleCase = (event) => {
        event.preventDefault();
        const name = event.target.getAttribute("name");
        const value = event.target.value
        const caseCopy = { ...modalData }
        caseCopy[name] = value;
        setData(caseCopy);
    }

    const handleCase2 = (event) => {
        event.preventDefault();
        const name = event.target.getAttribute("name");
        const value = event.target.value
        const caseCopy = { ...modalData2 }
        caseCopy[name] = value;
        setData2(caseCopy);
    }


    useEffect(() => {
        axios.get(process.env.REACT_APP_API + 'StokDurumu')
            .then(res => {
                console.log(res)
                setstoklar(res.data)

            })
            .catch(err => {
                console.log(err)

            })
    }, []);
    const refreshList2 = () => {
        axios.get(process.env.REACT_APP_API + 'StokDurumu')
        .then(res => {
            console.log(res)
            setstoklar(res.data)

        })
        .catch(err => {
            console.log(err)

        })
    };

    useEffect(() => {
        axios.get(process.env.REACT_APP_API + 'Projeler')
            .then(res => {
                console.log(res)
                setProjeler(res.data)

            })
            .catch(err => {
                console.log(err)

            })
    }, []);

    useEffect(() => {
        axios({
            method: "GET",
            url: process.env.REACT_APP_API + 'StokCikisi/GetUserOutputs/' + decoded["kullaniciID"],

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((result) => {
            setCikislar(result.data)

        })
    }, []);

    const refreshList = () => {
        axios({
            method: "GET",
            url: process.env.REACT_APP_API + 'StokCikisi/GetUserOutputs/' + decoded["kullaniciID"],

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((result) => {
            setCikislar(result.data)


        })
    };

    const handleCollapse = (event) => {
        event.preventDefault();
        setOpen2(false)
        return setOpen(!open)

    }
    const handleCollapse2 = () => {
        setOpen(false);
        return setOpen2(!open2)


    }

    const handleSubmit = (event) => {


        event.preventDefault();

  
     

            fetch(process.env.REACT_APP_API + 'StokCikisi', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    stokkodu: modalData.stokkodu,
                    projekodu: document.getElementById("selectProje").value,
                    miktar: modalData.miktar,
                    kullaniciID: decoded["kullaniciID"],


                })

            })
                .then(res => res.text()).then(d => setErr(d.replace(/[" "]/g, " ")))

                .catch(err => setErr(err.message))
            setShow2(true)
            setShow(false)
        

    }
    const handleSubmit2 = (event) => {


        event.preventDefault();

  
     

            fetch(process.env.REACT_APP_API + 'StokCikisi', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    stokkodu: modalData2.stokkodu,
                    stokcikisID : modalData2.stokcikisID,
                    projekodu: document.getElementById("selectProje2").value,
                    miktar: modalData2.miktar,
                 


                })

            })
                .then(res => res.text()).then(d => setErr(d.replace(/[" "]/g, " ")))

                .catch(err => setErr(err.message))
            setShow2(true)
            setShow3(false)
        

    }
    return (
        <Box m="20px">
            <Box
                m="2px 0 0 0"
                height="75vh"
            >

                <>


                    <Button style={{
                        width: 200, backgroundColor: colors.greenAccent[500], color: colors.grey[100],
                        border: "none"
                    }}
                        onClick={(e) => handleCollapse(e)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >
                        STOK ÇIKIŞI
                    </Button>

                    <Button style={{ width: 200, backgroundColor: colors.greenAccent[500], color: colors.grey[100], border: "none" }}
                        onClick={(e) => handleCollapse2(e)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open2}
                    >
                        STOK ÇIKIŞI DÜZENLEME
                    </Button>
                    <Collapse in={open}>
                        <div id="example-collapse-text">
                            <MaterialTable className="table1" id="table1" columns={columns} data={stoklar} title="Stoklar"
                                enableRowSelection
                                enablePinning
                                style={{ backgroundColor: colors.blueAccent[700], marginTop: 5 }}
                                options={{
                                    search: false, cellStyle: { padding: '10px', width: "0.1rem" },
                                    filtering: true, pageSize: 25, pageSizeOptions: [5, 10, 25, 50, 100, { value: stoklar.length, label: 'Hepsi' }], exportButton: true, exportAllData: true,
                                    rowStyle: { overflowWrap: "break-word", backgroundColor: colors.primary[400] },
                                    maxBodyHeight: "700px", tableLayout: "fixed",
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

                                        icon: () => <button type="submit" name="stokcikisi" style={{ background: "none", borderStyle: "none" }}>
                                            <Remove size={25} fill={colors.primary[200]} /></button>,
                                        tooltip: "Stok Çıkışı Yap",
                                        onClick: (e,data) => initModal(data),
                                    },
                                ]}



                            />
                        </div>
                    </Collapse>
                    <Collapse in={open2}>
                        <div id="example-collapse-text2">
                            <MaterialTable className="table2" id="table2" columns={columns2} data={cikislar} title="Geçmiş"
                                enableRowSelection
                                enablePinning
                                style={{ backgroundColor: colors.blueAccent[700], marginTop: 5 }}
                                options={{
                                    search: false, cellStyle: { padding: '10px', width: "0.1rem" },
                                    filtering: true, pageSize: 25, pageSizeOptions: [5, 10, 25, 50, 100, { value: cikislar.length, label: 'Hepsi' }], exportButton: true, exportAllData: true,
                                    rowStyle: { overflowWrap: "break-word", backgroundColor: colors.primary[400] },
                                    maxBodyHeight: "700px", tableLayout: "fixed",

                                    headerStyle: { backgroundColor: colors.primary[400], },
                                    cellStyle: { backgroundColor: colors.primary[400] },
                                    filterRowStyle: { backgroundColor: colors.primary[400] },
                                    // fixedColumns:{
                                    //     left:1,
                                    //     right:1
                                    // },
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

                                        icon: () => <button type="submit" name="stokcikisiguncelle" style={{ background: "none", borderStyle: "none" }}>
                                            <Guncelle size={30} fill={colors.primary[200]} /></button>,
                                        tooltip: "Stok Çıkışı Güncelle",
                                        onClick: (e,data) => initModal3(data),
                                    },
                                ]}



                            />
                        </div>
                    </Collapse>
                </>
                <Modal className="stokcikisiModal" show={isShow}
                    size="xl"
                >
                    <Modal.Header style={{ backgroundColor: colors.blueAccent[700] }}>
                        <ModalTitle style={{ backgroundColor: colors.blueAccent[700] }}>STOK ÇIKIŞI OLUŞTUR</ModalTitle>
                    </Modal.Header>
                    <ModalBody style={{ backgroundColor: colors.primary[400] }}>

                        <div className="card mb-5" style={{ backgroundColor: colors.primary[400], color: `${colors.grey[100]} !important`, }}>
                            <div className="card-body" style={{ backgroundColor: colors.primary[400], color: `${colors.grey[100]} !important` }}>
                                <div className="form-group col-lg-12 col-md-4 col-xs-12">
                                    
                                
                                    <div className="row">
                                        
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <select className="form-control" id="selectProje" onChange={(e) => setSelectedProje(e.target.value)}>
                                                <option value="0">PROJE SEÇİNİZ</option>
                                                {projeler.map((item) => (
                                                    <option key={item.projekodu} value={item.projekodu}>
                                                        {item.projeadi + " / " + item.projekodu}
                                                    </option>
                                                ))}
                                            </select>
                                           
                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>MİKTAR</label>
                                            <input name="miktar" type="number" step={'.01'} min={0} className="form-control" onChange={handleCase}
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
                        <a href="#" type="submit" name="Olustur" className="btn btn-primary" onClick={handleSubmit}>
                            Oluştur
                        </a>
                    </Modal.Footer>
                </Modal>

                <Modal className="stokcikisiUpdate" show={isShow3}
                    size="xl"
                >
                    <Modal.Header style={{ backgroundColor: colors.blueAccent[700] }}>
                        <ModalTitle style={{ backgroundColor: colors.blueAccent[700] }}>STOK ÇIKIŞI DÜZENLE</ModalTitle>
                    </Modal.Header>
                    <ModalBody style={{ backgroundColor: colors.primary[400] }}>

                        <div className="card mb-5" style={{ backgroundColor: colors.primary[400], color: `${colors.grey[100]} !important`, }}>
                            <div className="card-body" style={{ backgroundColor: colors.primary[400], color: `${colors.grey[100]} !important` }}>
                                <div className="form-group col-lg-12 col-md-4 col-xs-12">
                                    
                                <div className="row">
                                        
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <select className="form-control" id="selectProje2" onChange={(e) => setSelectedProje2(e.target.value)}>
                                                <option value="0">PROJE SEÇİNİZ</option>
                                                {projeler.map((item) => (
                                                    <option key={item.projekodu} value={item.projekodu}>
                                                        {item.projeadi + " / " + item.projekodu}
                                                    </option>
                                                ))}
                                            </select>
                                           
                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>MİKTAR</label>
                                            <input name="miktar" type="number" step={'.01'} min={0} className="form-control" onChange={handleCase2}
                                            >
                                            </input>
                                             

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </ModalBody>
                    <Modal.Footer style={{ backgroundColor: colors.blueAccent[700] }}>
                        <Button onClick={initModal3}>Kapat</Button>
                        <Button onClick={handleSubmit2}>Güncelle</Button>
                        {/* <a href="#" type="submit" name="Guncelle" className="btn btn-primary" onClick={handleSubmit2}>
                            Güncelle
                        </a> */}
                    </Modal.Footer>
                </Modal>

                <Modal className="stokcikisiInfo" show={isShow2} animationDirection='bottom' tabIndex='-1' >



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
export default Stokcikisi;