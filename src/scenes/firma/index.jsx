import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import MaterialTable from "material-table";
import Guncelle from '../../assets/icons';
import Add from '../../assets/add';
import axios from "axios";
import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ModalBody, ModalTitle } from "react-bootstrap";

import { nanoid } from 'nanoid';

const Firmalar = () => {
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const initialModalData2 = {
        urunadi: "",
        uretici: "",
        yuzey: "",
        boy: "",
        en: "",
        kalinlik: "",
        birim: "",
        tanim: "",
        tarih: "",
    }
    const [firmaData, setFirmaData] = useState([]);
    let [errMessage, setErr] = useState();
    const [modalData, setData] = useState(initialModalData2);
    const [modalData2, setData2] = useState(initialModalData2);
    const [isShow, setShow] = useState(false);
    const [isShow2, setShow2] = useState(false);
    const [isShow3, setShow3] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [submitError2, setSubmitError2] = useState(false);
    const [veriEkle, setVeriEkle] = useState([]);
    const [ekleVeri, setEkleVeri] = useState(
        {
            id: nanoid(),
            firmaadi: "",
            adresbilgisi: "",
            vergidairesi: "",
            vergino: "",
            telefon: "",
            

        }

    )
    const columns = [

        { title: "Firma ID", field: "firmaID", maxWidth: 60 },
        { title: "Firma Adı", field: "firmaadi", },
        { title: "Vergi Dairesi", field: "vergidairesi", },
        { title: "Vergi No", field: "vergino", },
        { title: "Adres Bilgisi", field: "adresbilgisi", },
        { title: "Telefon", field: "telefon", },


    ]
    const addTable = (e) => {

        e.preventDefault();
        if (document.getElementById("firmaadi2").value == "" || document.getElementById("adresbilgisi2").value == "" || document.getElementById("telefon2").value == ""

        ) {
            setSubmitError2(true);
        }

        else {
            const newEkleVeri = {
                id: nanoid(),
                firmaadi: ekleVeri.firmaadi,
                adresbilgisi: ekleVeri.adresbilgisi,
                vergidairesi: ekleVeri.vergidairesi,
                vergino: ekleVeri.vergino,
                telefon: ekleVeri.telefon,

            };

            const newVeriEkle = [...veriEkle, newEkleVeri];
            setVeriEkle(newVeriEkle);

            document.getElementById("firmaadi2").value = "";
            document.getElementById("vergidairesi2").value = "";
            document.getElementById("adresbilgisi2").value = "";
            document.getElementById("vergino2").value = "";
            document.getElementById("telefon2").value = "";
            setSubmitError2(false);


        }

    }

    const deleteTable = (id) => {

        const newVeriler = [...veriEkle];
        const index = veriEkle.findIndex((item) => item.id === id)
        newVeriler.splice(index, 1)
        setVeriEkle(newVeriler);
    }
    const initModal = (data) => {
        setData(data);
        setSubmitError(false);
        
        return setShow(!isShow);
    }
    const initModal2 = () => {
        setSubmitError2(false);
        setEkleVeri([]);
        setVeriEkle([]);
        return setShow2(!isShow2);
    }
    const initModal3 = () => {
        refreshList();
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
        const value = event.target.value;
        const caseCopy = { ...modalData2 }
        caseCopy[name] = value;
        setEkleVeri(caseCopy);
        setData2(caseCopy);

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (modalData.firmaadi.length == 0 || modalData.adresbilgisi.length == 0 || modalData.telefon.length == 0) {
            setSubmitError(true);
        }
        else {

            fetch(process.env.REACT_APP_API + 'Firmalar', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firmaID:modalData.firmaID,
                    firmaadi: modalData.firmaadi,
                    vergidairesi: modalData.vergidairesi,
                    vergino: modalData.vergino,
                    adresbilgisi: modalData.adresbilgisi,
                    telefon: modalData.telefon,


                })

            })
                .then(res => res.text()).then(d => setErr(d.replace(/[" "]/g, " ")))
                // setShow(false)
                // window.location.reload()
                .catch(err => setErr(err.message))
            setShow3(true)
            setShow(false)
        }


    }

    const handleSubmit2 = (event) => {
        event.preventDefault();
        if (veriEkle.length == 0) {

        }
        else {
            veriEkle.map((item) =>
                fetch(process.env.REACT_APP_API + 'Firmalar', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firmaadi: item.firmaadi,
                        vergidairesi: item.vergidairesi,
                        vergino: item.vergino,
                        adresbilgisi: item.adresbilgisi,
                        telefon: item.telefon,
                    })
                })

                    .then(res => res.json()).then(d => setErr(d.replace(/[" "]/g, " "))),
                setShow2(false),
                setShow3(true),
                refreshList(),


            )
        }
    }

    const refreshList = () => {
        axios.get(process.env.REACT_APP_API + 'Firmalar')
        .then(res => {
            console.log(res)
            setFirmaData(res.data)
    
        })
        .catch(err => {
            console.log(err)
        })
            ;
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_API + 'Firmalar')
            .then(res => {
                console.log(res)
                setFirmaData(res.data)

            })
            .catch(err => {
                console.log(err)
            })
    }, []);


    return (
        <Box m="20px">
            <Box
                m="40px 0 0 0"
                height="75vh"
            >
                <MaterialTable className="table1" id="table1" columns={columns} data={firmaData} title="Firmalar"
                    enableRowSelection
                    enablePinning
                    style={{ backgroundColor: colors.blueAccent[700] }}
                    options={{
                        search: false, cellStyle: { padding: '10px', width: "0.1rem" },
                        filtering: true, pageSize: 25, pageSizeOptions: [5, 10, 25, 50, 100, { value: firmaData.length, label: 'Hepsi' }], exportButton: true, exportAllData: true,
                        rowStyle: { overflowWrap: "break-word", backgroundColor: colors.primary[400] },
                        maxBodyHeight: "620px", tableLayout: "fixed",
                        headerStyle: { backgroundColor: colors.primary[400] },
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

                    onRowClick={(e, data) => initModal(data)}
                    actions={[
                        {
                            icon: () => <a href="#" type="submit" name="guncelle" >
                                <Guncelle size={30} fill={colors.primary[200]} /></a>,
                            tooltip: "Güncelle",
                            onClick: (e, data) => initModal(data),
                        },
                        {
                            icon: () => <a href="#" type="submit" name="Ekle">
                                <Add size={30} fill={colors.primary[200]}></Add>
                            </a>,
                            tooltip: "Ekle",
                            isFreeAction: true,
                            onClick: (e) => initModal2(),
                        },

                    ]}

                />
                <Modal className="updateModal" show={isShow} size="xl">
                    <Modal.Header style={{ backgroundColor: colors.blueAccent[700] }}>
                        <ModalTitle style={{ backgroundColor: colors.blueAccent[700] }}>FİRMA GÜNCELLE</ModalTitle>
                    </Modal.Header>
                    <ModalBody style={{ backgroundColor: colors.primary[400] }}>
                        
                        <div className="card mb-5" style={{ backgroundColor: colors.primary[400], color: `${colors.grey[100]} !important` }}>
                            <div className="card-body" style={{ backgroundColor: colors.primary[400], color: `${colors.grey[100]} !important` }}>
                                <div className="form-group col-lg-12 col-md-4 col-xs-12">
                                    <div className="row">
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>FİRMA ADI</label>
                                            <input name="firmaadi" type="text" className="form-control" value={modalData.firmaadi} onChange={handleCase}
                                                placeholder="firma adı giriniz">
                                            </input>
                                            {submitError && modalData.firmaadi.length <= 0 ?
                                                <label style={{ color: colors.redAccent[500] }}>FİRMA ADI BOŞ GEÇİLEMEZ</label> : ""}
                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>ADRES BİLGİSİ</label>
                                            <textarea name="adresbilgisi" type="text" className="form-control" placeholder="adres bilgisi giriniz" value={modalData.adresbilgisi} onChange={handleCase}></textarea>
                                            {submitError && modalData.adresbilgisi.length <= 0 ?
                                                <label style={{ color: colors.redAccent[500] }}>ADRES BİLGİSİ BOŞ GEÇİLEMEZ</label> : ""}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>VERGİ DAİRESİ</label>
                                            <input name="vergidairesi" type="text" className="form-control" value={modalData.vergidairesi} onChange={handleCase}
                                                placeholder="vergi dairesi giriniz">
                                            </input>

                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>VERGİ NO</label>
                                            <input name="vergino" type="text" className="form-control" placeholder="vergi numarası giriniz" value={modalData.vergino} onChange={handleCase}></input>

                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>TELEFON</label>
                                            <input name="telefon" type="text" className="form-control" placeholder="telefon bilgisi giriniz" value={modalData.telefon} onChange={handleCase}></input>
                                            {submitError && modalData.telefon.length <= 0 ?
                                                <label style={{ color: colors.redAccent[500] }}>TELEFON BOŞ GEÇİLEMEZ</label> : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <Modal.Footer style={{ backgroundColor: colors.blueAccent[700] }}>
                        <Button onClick={initModal}>Kapat</Button>
                        <a href="#" type="submit" name="Güncelle" className="btn btn-primary" onClick={handleSubmit}>
                            Güncelle
                        </a>
                    </Modal.Footer>
                </Modal>

                
                <Modal className="updateInfo" show={isShow3} animationDirection='bottom' tabIndex='-1' >



                    <Modal.Header style={{ backgroundColor: colors.blueAccent[700] }}>
                        <ModalTitle style={{ backgroundColor: colors.blueAccent[700] }}>BİLGİ</ModalTitle>

                    </Modal.Header>
                    <ModalBody style={{ backgroundColor: colors.primary[400] }}>
                        <h1> {errMessage}</h1>
                    </ModalBody>


                    <Modal.Footer style={{ backgroundColor: colors.blueAccent[700] }}>
                        <Button className="btn btn-danger" onClick={initModal3}>Kapat</Button>

                    </Modal.Footer>


                </Modal>
                <Modal className="addModal" show={isShow2}
                    size="xl"
                >
                    <Modal.Header style={{ backgroundColor: colors.blueAccent[700] }}>
                        <ModalTitle style={{ backgroundColor: colors.blueAccent[700] }}>FİRMA EKLE</ModalTitle>
                    </Modal.Header>
                    <ModalBody style={{ backgroundColor: colors.primary[400] }}>

                        <div className="card mb-5" border-0 style={{ backgroundColor: colors.primary[400] }}>
                            <div className="card-body" border-0 style={{ backgroundColor: colors.primary[400] }}>
                                <div className="form-group col-lg-12 col-md-4 col-xs-12">
                                    <div className="row">
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>FİRMA ADI</label>
                                            <input name="firmaadi" id="firmaadi2" type="text" className="form-control" onChange={handleCase2}
                                                placeholder="firma adı giriniz">
                                            </input>
                                            {submitError2 && document.getElementById("firmaadi2").value == "" ?
                                                <label style={{ color: colors.redAccent[500] }}>FİRMA ADI BOŞ GEÇİLEMEZ</label> : ""}
                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>ADRES BİLGİSİ</label>
                                            <textarea name="adresbilgisi" id="adresbilgisi2" type="text" className="form-control" placeholder="adres bilgisi giriniz" onChange={handleCase2}></textarea>
                                            {submitError2 && document.getElementById("adresbilgisi2").value == "" ?
                                                <label style={{ color: colors.redAccent[500] }}>ADRES BİLGİSİ BOŞ GEÇİLEMEZ</label> : ""}
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>VERGİ DAİRESİ</label>
                                            <input name="vergidairesi" id="vergidairesi2" type="text" className="form-control" onChange={handleCase2}
                                                placeholder="vergi dairesi giriniz">
                                            </input>
                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>VERGİ NO</label>
                                            <input name="vergino" id="vergino2" type="text" className="form-control" placeholder="vergi numarası giriniz" onChange={handleCase2}></input>
                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>TELEFON</label>
                                            <input name="telefon" id="telefon2" type="text" class="form-control" placeholder="telefon numarası giriniz" onChange={handleCase2}></input>
                                            {submitError2 && document.getElementById("telefon2").value == "" ?
                                                <label style={{ color: colors.redAccent[500] }}>TELEFON BOŞ GEÇİLEMEZ</label> : ""}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="form-group col-lg-3 col-md-3 col-xs-12">
                                <div className="row pt-8">
                                    <a href="#" type="submit" name="add" className="btn btn-warning m-4" onClick={addTable}>
                                        <i className="fas fa-plus"></i>
                                        Listeye Ekle
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 table-responsive">
                            <table className="table table-head-custom table-head-bg table-borderless table-vertical-center">
                                <thead style={{ color: colors.blueAccent[700] }}>
                                    <tr>

                                        <th>Firma Adı</th>
                                        <th>Adres Bilgisi</th>
                                        <th>Vergi Dairesi</th>
                                        <th>Vergi No</th>
                                        <th>Telefon</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {veriEkle.map((item) => (
                                        <tr style={{ color: colors.blueAccent[100] }}>

                                            <td>{item.firmaadi}</td>
                                            <td>{item.adresbilgisi}</td>
                                            <td>{item.vergidairesi}</td>
                                            <td>{item.vergino}</td>
                                            <td>{item.telefon}</td>
                                            <td><button type='submit' className='btn btn-danger' key={item.id} onClick={() => deleteTable(item.id)}>Sil</button></td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>


                    </ModalBody>
                    <Modal.Footer style={{ backgroundColor: colors.blueAccent[700] }}>
                        <Button onClick={initModal2}>Kapat</Button>
                        <Button onClick={handleSubmit2}>Ekle</Button>
                    </Modal.Footer>
                </Modal>
            </Box>
        </Box>
    )

}
export default Firmalar;