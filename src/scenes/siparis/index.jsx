import { Box, useTheme } from "@mui/material";
import axios from "axios";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { ModalBody, ModalTitle } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Modal from 'react-bootstrap/Modal';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Add from '../../assets/add';
import Guncelle from '../../assets/icons';
import { tokens } from "../../theme";


const Siparis = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(true);
    const [open2, setOpen2] = useState(false);
    const [isShow, setShow] = useState(false);
    const [isShow2, setShow2] = useState(false);
    const [isShow3, setShow3] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [submitError2, setSubmitError2] = useState(false);
    let [errMessage, setErr] = useState();
    const [stoklar, setstoklar] = useState([]);
    const [siparisler, setSiparisler] = useState([]);
    const [modalData, setData] = useState();
    const [modalData2, setData2] = useState([]);
    const [firmalar, setFirmalar] = useState([]);
    const [projeler, setProjeler] = useState([]);
    const [selectedFirma, setSelectedFirma] = useState('');
    const [selectedProje, setSelectedProje] = useState('');
    const [selectedFirma2, setSelectedFirma2] = useState('');
    const [selectedProje2, setSelectedProje2] = useState('');

    const initialModalData2 = {
        siparisID: "",
        projekodu: "",
        firmaID: "",

        aciklama: "",
        miktar: "",
        stokkodu: "",

        satinalmaaciklama: "",
        alinanmiktar: "",
        kalanmiktar: "",
        stokeklenenmiktar: "",
        durumu: "",


    }




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
            { title: "Ortalama Birim Fiyatı", field: "ortalamabirimfiyati", maxWidth: 70, },
            { title: "Toplam Tutar", field: "toplamtutar", maxWidth: 70, },

        ]
    const columns2 =
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
        axios.get(process.env.REACT_APP_API + 'StokDurumu')
            .then(res => {
                console.log(res)
                setstoklar(res.data)

            })
            .catch(err => {
                console.log(err)

            })
    }, []);
    useEffect(() => {
        axios.get(process.env.REACT_APP_API + 'Firmalar')
            .then(res => {
                console.log(res)
                setFirmalar(res.data)

            })
            .catch(err => {
                console.log(err)

            })
    }, []);
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
            url: process.env.REACT_APP_API + 'Siparis/GetUserOrder/details',
            params: {
                kullaniciID: decoded["kullaniciID"]
            },
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
            url: process.env.REACT_APP_API + 'Siparis/GetUserOrder/details',
            params: {
                kullaniciID: decoded["kullaniciID"]
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((result) => {
            setSiparisler(result.data)


        })
    };


    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }
    const decoded = parseJwt(sessionStorage.getItem("Auth"));

    const initModal = (data) => {

        setData(data);
        setSubmitError(false);
        return setShow(!isShow);
    }
    const initModal2 = () => {
        refreshList();
        return setShow2(!isShow2);

    }
    const initModal3 = (data) => {

        setData2(data);
        setSubmitError2(false);
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

    const handleSubmit = (event) => {


        event.preventDefault();

        if (selectedFirma == "0" || selectedProje == "0"
        ) {
            setSubmitError(true);
        }
        else {

            fetch(process.env.REACT_APP_API + 'Siparis', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    stokkodu: modalData.stokkodu,
                    projekodu: selectedProje,
                    taleptarihi: modalData.taleptarihi,
                    termintarihi: modalData.termintarihi,
                    firmaID: selectedFirma,
                    miktar: modalData.miktar,
                    aciklama: modalData.aciklama,
                    kullaniciID: decoded["kullaniciID"],


                })

            })
                .then(res => res.text()).then(d => setErr(d.replace(/[" "]/g, " ")))

                .catch(err => setErr(err.message))
            setShow2(true)
            setShow(false)
        }

    }
    const handleCollapse = (event) => {
        event.preventDefault();
        setOpen2(false)
        return setOpen(!open)

    }
    const handleCollapse2 = () => {
        setOpen(false);
        return setOpen2(!open2)


    }
    const handleSubmit2 = (event) => {
        event.preventDefault();

        console.log(selectedFirma2.length);

        if (document.getElementById("selectFirma2").value == "0" || document.getElementById("selectProje2").value == "0"
        ) {
            setSubmitError2(true);
        }

        else {
            if (document.getElementById("selectFirma2").value.length == 0) {
                if (document.getElementById("selectProje2").value.length == 0) {
                    fetch(process.env.REACT_APP_API + 'Siparis', {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({

                            siparisID: modalData2.siparisID,

                            taleptarihi: modalData2.taleptarihi,
                            termintarihi: modalData2.termintarihi,

                            miktar: modalData2.miktar,
                            aciklama: modalData2.aciklama,
                        })
                    })
                        .then(res => res.text()).then(d => setErr(d.replace(/[" "]/g, " ")))
                        .catch(err => setErr(err.message))
                    setShow2(true)
                    setShow3(false)
                }
                else {
                    fetch(process.env.REACT_APP_API + 'Siparis', {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({

                            siparisID: modalData2.siparisID,
                            projekodu: document.getElementById("selectProje2").value,
                            taleptarihi: modalData2.taleptarihi,
                            termintarihi: modalData2.termintarihi,

                            miktar: modalData2.miktar,
                            aciklama: modalData2.aciklama,
                        })
                    })
                        .then(res => res.text()).then(d => setErr(d.replace(/[" "]/g, " ")))
                        .catch(err => setErr(err.message))
                    setShow2(true)
                    setShow3(false)
                }

            }
            else {
                if (document.getElementById("selectProje2").value.length == 0) {
                    fetch(process.env.REACT_APP_API + 'Siparis', {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({

                            siparisID: modalData2.siparisID,
                            firmaID: document.getElementById("selectFirma2").value,
                            taleptarihi: modalData2.taleptarihi,
                            termintarihi: modalData2.termintarihi,

                            miktar: modalData2.miktar,
                            aciklama: modalData2.aciklama,
                        })
                    })
                        .then(res => res.text()).then(d => setErr(d.replace(/[" "]/g, " ")))
                        .catch(err => setErr(err.message))
                    setShow2(true)
                    setShow3(false)
                }
                else {
                    fetch(process.env.REACT_APP_API + 'Siparis', {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({

                            siparisID: modalData2.siparisID,
                            firmaID: document.getElementById("selectFirma2").value,
                            projekodu: document.getElementById("selectProje2").value,
                            taleptarihi: modalData2.taleptarihi,
                            termintarihi: modalData2.termintarihi,

                            miktar: modalData2.miktar,
                            aciklama: modalData2.aciklama,
                        })
                    })
                        .then(res => res.text()).then(d => setErr(d.replace(/[" "]/g, " ")))
                        .catch(err => setErr(err.message))
                    setShow2(true)
                    setShow3(false)
                }
            }



        }

    }
    return (


        <Box m="20px">
            <Box
                m="2px 0 0 0"
                height="75vh"
            >
                <Button style={{
                        width: 200, backgroundColor: colors.greenAccent[500], color: colors.grey[100],
                        border: "none"
                    }}
                        onClick={(e) => handleCollapse(e)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >
                        STOK DURUMLARI
                    </Button>

                    <Button style={{ width: 200, backgroundColor: colors.greenAccent[500], color: colors.grey[100], border: "none" }}
                        onClick={(e) => handleCollapse2(e)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open2}
                    >
                        KULLANICI SİPARİŞLERİ
                    </Button>
                    <Collapse in={open}>
                        <div id="example-collapse-text">
                        <MaterialTable className="table1" id="table1" columns={columns} data={stoklar} title="Stok Durumları"
                    enableRowSelection
                    enablePinning
                    style={{ backgroundColor: colors.blueAccent[700] }}
                    options={{
                        search: false, cellStyle: { padding: '10px', width: "0.1rem" },
                        filtering: true, pageSize: 25, pageSizeOptions: [5, 10, 25, 50, 100, { value: stoklar.length, label: 'Hepsi' }], exportButton: true, exportAllData: true,
                        rowStyle: { overflowWrap: "break-word", backgroundColor: colors.primary[400] },
                        maxBodyHeight: "620px", tableLayout: "fixed",
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
                            // icon: () => <a href="#" type="submit" name="siparis" >
                            //     <Add size={30} fill={colors.primary[200]} /></a>,
                            // tooltip: "Sipariş Kaydı Oluştur",
                            // onClick: (e) => initModal(),

                            icon: () => <button type="submit" name="siparis" style={{ background: "none", borderStyle: "none" }}>
                                <Add size={30} fill={colors.primary[200]} /></button>,
                            tooltip: "Sipariş Kaydı Oluştur",
                            onClick: (e,data) => initModal(data),
                        },
                    ]}


                />
                           </div>
                           </Collapse> 
                
                <br></br>
                <Collapse in={open2}>
                        <div id="example-collapse-text2">
                        <MaterialTable className="table2" id="table2" columns={columns2} data={siparisler} title="Kullanıcı Siparişleri"
                    enableRowSelection
                    enablePinning
                    style={{ backgroundColor: colors.blueAccent[700] }}
                    options={{
                        search: false, cellStyle: { padding: '10px', width: "0.1rem" },
                        filtering: true, pageSize: 25, pageSizeOptions: [5, 10, 25, 50, 100, { value: siparisler.length, label: 'Hepsi' }], exportButton: true, exportAllData: true,
                        rowStyle: { overflowWrap: "break-word", backgroundColor: colors.primary[400] },
                        maxBodyHeight: "620px", tableLayout: "fixed",
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
                            icon: () => <button type="submit" name="siparisGuncelle" style={{ background: "none", borderStyle: "none" }}>
                                <Guncelle size={30} fill={colors.primary[200]} /></button>,
                            tooltip: "Sipariş Kaydı Güncelle",
                            onClick: (e, data) => initModal3(data),

                        },
                    ]}



                />
                        </div>
                        </Collapse>

                
                <Modal className="siparisModal" show={isShow}
                    size="xl"
                >
                    <Modal.Header style={{ backgroundColor: colors.blueAccent[700] }}>
                        <ModalTitle style={{ backgroundColor: colors.blueAccent[700] }}>SİPARİŞ KAYDI OLUŞTUR</ModalTitle>
                    </Modal.Header>
                    <ModalBody style={{ backgroundColor: colors.primary[400] }}>

                        <div className="card mb-5" style={{ backgroundColor: colors.primary[400], color: `${colors.grey[100]} !important`, }}>
                            <div className="card-body" style={{ backgroundColor: colors.primary[400], color: `${colors.grey[100]} !important` }}>
                                <div className="form-group col-lg-12 col-md-4 col-xs-12">
                                    <div className="row">
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>TALEP TARİHİ</label>
                                            <input name="taleptarihi" type="date" className="form-control" onChange={handleCase}
                                            >
                                            </input>

                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">

                                            <label style={{ color: colors.blueAccent[700] }}>TERMİN TARİHİ</label>
                                            <input name="termintarihi" type="date" className="form-control" onChange={handleCase}></input>

                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="row">
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <select className="form-control" id="selectFirma" onChange={(e) => setSelectedFirma(e.target.value)}>
                                                <option value="0">FİRMA SEÇİNİZ</option>
                                                {firmalar.map((item) => (
                                                    <option key={item.firmaID} value={item.firmaID}>
                                                        {item.firmaadi}
                                                    </option>
                                                ))}
                                            </select>
                                            {submitError && document.getElementById("selectFirma").value == "0" ?
                                                <label style={{ color: colors.redAccent[500] }}>FİRMA BİLGİSİ BOŞ GEÇİLEMEZ</label> : ""}
                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <select className="form-control" id="selectProje" onChange={(e) => setSelectedProje(e.target.value)}>
                                                <option value="0">PROJE SEÇİNİZ</option>
                                                {projeler.map((item) => (
                                                    <option key={item.projekodu} value={item.projekodu}>
                                                        {item.projeadi + " / " + item.projekodu}
                                                    </option>
                                                ))}
                                            </select>
                                            {submitError && document.getElementById("selectProje").value == "0" ?
                                                <label style={{ color: colors.redAccent[500] }}>PROJE BİLGİSİ BOŞ GEÇİLEMEZ</label> : ""}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>MİKTAR</label>
                                            <input name="miktar" type="number" step={'.01'} min={0} className="form-control" onChange={handleCase}
                                            >
                                            </input>

                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">

                                            <label style={{ color: colors.blueAccent[700] }}>AÇIKLAMA</label>
                                            <textarea name="aciklama" type="text" className="form-control" onChange={handleCase}></textarea>

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

                <Modal className="siparisUpdate" show={isShow3}
                    size="xl"
                >
                    <Modal.Header style={{ backgroundColor: colors.blueAccent[700] }}>
                        <ModalTitle style={{ backgroundColor: colors.blueAccent[700] }}>SİPARİŞ KAYDI GÜNCELLE</ModalTitle>
                    </Modal.Header>
                    <ModalBody style={{ backgroundColor: colors.primary[400] }}>

                        <div className="card mb-5" style={{ backgroundColor: colors.primary[400], color: `${colors.grey[100]} !important`, }}>
                            <div className="card-body" style={{ backgroundColor: colors.primary[400], color: `${colors.grey[100]} !important` }}>
                                <div className="form-group col-lg-12 col-md-4 col-xs-12">
                                    <div className="row">
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>TALEP TARİHİ</label>
                                            <input name="taleptarihi" type="date" className="form-control" value={modalData2.taleptarihi} onChange={handleCase2}
                                            >
                                            </input>

                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">

                                            <label style={{ color: colors.blueAccent[700] }}>TERMİN TARİHİ</label>
                                            <input name="termintarihi" type="date" className="form-control" value={modalData2.termintarihi} onChange={handleCase2}></input>

                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="row">
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <select className="form-control" id="selectFirma2" defaultValue={modalData2.firmaID} onChange={(e) => setSelectedFirma2(e.target.value)}>
                                                <option value="0">FİRMA SEÇİNİZ</option>
                                                {firmalar.map((item) => (
                                                    <option key={item.firmaID} value={item.firmaID}>
                                                        {item.firmaadi}
                                                    </option>
                                                ))}
                                            </select>
                                            {submitError2 && document.getElementById("selectFirma2").value == "0" ?
                                                <label style={{ color: colors.redAccent[500] }}>FİRMA BİLGİSİ BOŞ GEÇİLEMEZ</label> : ""}
                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <select className="form-control" id="selectProje2" defaultValue={modalData2.projekodu} onChange={(e) => setSelectedProje2(e.target.value)}>
                                                <option value="0">PROJE SEÇİNİZ</option>
                                                {projeler.map((item) => (
                                                    <option key={item.projekodu} value={item.projekodu}>
                                                        {item.projeadi + " / " + item.projekodu}
                                                    </option>
                                                ))}
                                            </select>
                                            {submitError2 && document.getElementById("selectProje2").value == "0" ?
                                                <label style={{ color: colors.redAccent[500] }}>PROJE BİLGİSİ BOŞ GEÇİLEMEZ</label> : ""}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>MİKTAR</label>
                                            <input name="miktar" type="number" min={0} step={'.01'} value={modalData2.miktar} className="form-control" onChange={handleCase2}
                                            >
                                            </input>

                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">

                                            <label style={{ color: colors.blueAccent[700] }}>AÇIKLAMA</label>
                                            <textarea name="aciklama" type="text" className="form-control" onChange={handleCase2}></textarea>

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
export default Siparis;