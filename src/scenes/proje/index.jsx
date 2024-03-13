
import { Grid, TablePagination } from "@material-ui/core";
import { Box, useTheme } from "@mui/material";
import axios from "axios";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { ModalBody, ModalTitle } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Add from '../../assets/add';
import Guncelle from '../../assets/icons';
import '../../designs/proje.css';
import { tokens } from "../../theme";






const Projeler = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);



    //console.log(new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(data.anlasmatutari));


    const initialModalData2 = {
        projeID: "",
        projekodu: "",
        projeadi: "",
        proje: "",
        firma: "",
        anlasmatutari: "",

    }
    const [projeData, setprojeData] = useState([]);
    let [errMessage, setErr] = useState();
    const [modalData, setData] = useState(initialModalData2);
    const [modalData2, setData2] = useState(initialModalData2);
    const [modalData3, setData3] = useState([]);
    const [isShow, setShow] = useState(false);
    const [isShow2, setShow2] = useState(false);
    const [isShow3, setShow3] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [submitError2, setSubmitError2] = useState(false);
    const [value, setValue] = useState("");
    const [totalValue, setTotalValue] = useState("");

    const columns = [
        { title: "Proje ID", field: "projeID", maxWidth: 70, },
        { title: "Proje Kodu", field: "projekodu", maxWidth: 70, },
        { title: "Proje", field: "proje", maxWidth: 200, },
        { title: "Proje Adı", field: "projeadi", maxWidth: 200, },
        { title: "Firma", field: "firma", maxWidth: 200, },
        { title: "Anlaşma Tutarı", field: "anlasmatutari", maxWidth: 70, type: 'currency', currencySetting: { locale: 'TR', currencyCode: 'TRY', minimumFractionDigits: 0, maximumFractionDigits: 3 } },


    ]
    const columns2 = [
        { title: "STOKKODU", field: "stokkodu", maxWidth: 70, },
        { title: "Ürün Adı", field: "urunadi", maxWidth: 70, },
        { title: "Üretici", field: "uretici", maxWidth: 70, },
        { title: "Yüzey", field: "yuzey", maxWidth: 70, },
        { title: "Boy", field: "boy", maxWidth: 70, },
        { title: "En", field: "en", maxWidth: 70, },
        { title: "Kalınlık", field: "kalinlik", maxWidth: 200, },
        { title: "Tanım", field: "tanim", maxWidth: 200, },
        { title: "Stok Çıkış Miktarı", field: "stokcikismiktari", maxWidth: 200, },
        { title: "Stok Çıkış Toplam Tutar", field: "cikistoplamtutar", maxWidth: 70, type: 'currency', currencySetting: { locale: 'TR', currencyCode: 'TRY', minimumFractionDigits: 0, maximumFractionDigits: 3 } },
        { title: "Stok Giriş Miktarı", field: "stokgirismiktari", maxWidth: 70, },
        { title: "Stok Giriş Toplam Tutar", field: "giristoplamtutar", maxWidth: 70,type: 'currency', currencySetting: { locale: 'TR', currencyCode: 'TRY', minimumFractionDigits: 0, maximumFractionDigits: 3 }  },
        { title: "Anlaşma Tutarı", field: "anlasmatutari", maxWidth: 70, type: 'currency', currencySetting: { locale: 'TR', currencyCode: 'TRY', minimumFractionDigits: 0, maximumFractionDigits: 3 } },


    ]


    const initModal = (data) => {


        setData(data);
        setSubmitError(false);
        console.log(totalValue)
        return setShow(!isShow);
    }
    const initModal2 = () => {
        setSubmitError2(false);
        return setShow2(!isShow2);
    }
    const initModal3 = () => {
        setShow3(!isShow3);
        return refreshList();
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
        setData2(caseCopy);

    }
    const handleSubmit = (event) => {

        if (modalData.projekodu.length == 0 || modalData.proje.length == 0 || modalData.firma.length == 0) {
            setSubmitError(true);
        }
        else {

            fetch(process.env.REACT_APP_API + 'Projeler', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    projeID: modalData.projeID,
                    projekodu: modalData.projekodu,
                    proje: modalData.proje,
                    anlasmatutari: modalData.anlasmatutari,
                    firma: modalData.firma,



                })

            })
                .then(res => res.text()).then(d => setErr(d.replace(/[" "]/g, " ")))
                .catch(err => setErr(err.message))
            setShow3(true)
            setShow(false)

        }


    }

    const handleSubmit2 = (event) => {

        if (modalData2.projekodu.length == 0 || modalData2.proje.length == 0 || modalData2.projeadi.length == 0 || modalData2.firma.length == 0) {
            setSubmitError2(true);
        }
        else {
            fetch(process.env.REACT_APP_API + 'Projeler', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    projekodu: modalData2.projekodu,
                    proje: modalData2.proje,
                    projeadi: modalData2.projeadi,
                    anlasmatutari: modalData2.anlasmatutari,
                    firma: modalData2.firma,

                })

            })
                .then(res => res.text()).then(d => setErr(d.replace(/[" "]/g, " ")))
                .catch(err => setErr(err.message))
            setShow2(false)
            setShow3(true)
        }

    }
    const refreshList = () => {
        axios.get(process.env.REACT_APP_API + 'Projeler')
            .then(res => {
                console.log(res)
                setprojeData(res.data)

            })
            .catch(err => {
                console.log(err)
            })
            ;
    }
    useEffect(() => {
        axios.get(process.env.REACT_APP_API + 'Projeler')
            .then(res => {
                console.log(res)
                setprojeData(res.data)

            })
            .catch(err => {
                console.log(err)
            })
    }, []);
    useEffect(() => {
        var total=0;
        projeData.forEach(element => {
            total += element.anlasmatutari
        });
        setTotalValue(total)

    }, []);
    useEffect(() => {
        axios({
            method: "GET",
            url: process.env.REACT_APP_API + 'Projeler/getProjeler/2' ,

            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((result) => {
            setData3(result.data)
            console.log(result.data)

        })
    }, []);
    const numberFormat = (value) =>
  new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(value);

    return (
        <Box m="20px">
            <Box
                m="40px 0 0 0"
                height="75vh"
            >
                <MaterialTable className="table1" id="table1" columns={columns} data={projeData} title="Projeler"
                    enableRowSelection
                    enablePinning
                    style={{ backgroundColor: colors.blueAccent[700] }}
                    options={{
                        search: false, cellStyle: { padding: '10px', width: "0.1rem" },
                        filtering: true, pageSize: 25, pageSizeOptions: [5, 10, 25, 50, 100, { value: projeData.length, label: 'Hepsi' }], exportButton: true, exportAllData: true,
                        rowStyle: { overflowWrap: "break-word", backgroundColor: colors.primary[400] },
                        maxBodyHeight: "620px", tableLayout: "fixed",
                        headerStyle: { backgroundColor: colors.primary[400] },
                        cellStyle: { backgroundColor: colors.primary[400] },
                        filterRowStyle: { backgroundColor: colors.primary[400] },
                        columnsButton: true,
                        

                    }


                    }
                    components={{
                        Pagination:(props)=><div>
                            <Grid container style={{backgroundColor: colors.redAccent[400]}}>
                            <Grid sm={6} item></Grid>
                            </Grid>
                            <Grid container style={{backgroundColor: colors.redAccent[600] }}>
                                <Grid sm={6} item style={{height:40, paddingTop:10}}> TOPLAM ANLAŞMA TUTARI :</Grid>
                                <Grid sm={6}   style={{paddingLeft:670,height:40,paddingTop:10 }}item >  {numberFormat(totalValue)} </Grid>
                            </Grid>
                            <TablePagination {...props}></TablePagination>
                        </div>
                    }}
                    

                    renderSummaryRow={({ column, projeData }) =>
                        column.field === "anlasmatutari"
                            ? {
                                value: projeData.reduce((agg, row) => agg + row.anlasmatutari, 0),
                                style: { background: "red" },
                            }
                            : undefined
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
                <MaterialTable className="table2" id="table2" columns={columns2} data={modalData3} title="Projeler"
                    enableRowSelection
                    enablePinning
                    style={{ backgroundColor: colors.blueAccent[700] }}
                    options={{
                        search: false, cellStyle: { padding: '10px', width: "0.1rem" },
                        filtering: true, pageSize: 25, pageSizeOptions: [5, 10, 25, 50, 100, { value: modalData3.length, label: 'Hepsi' }], exportButton: true, exportAllData: true,
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

                    
                />
               
               
                <Modal className="updateModal" show={isShow} size="xl">
                    <Modal.Header style={{ backgroundColor: colors.blueAccent[700] }}>
                        <ModalTitle style={{ backgroundColor: colors.blueAccent[700] }}>PROJE GÜNCELLE</ModalTitle>
                    </Modal.Header>
                    <ModalBody style={{ backgroundColor: colors.primary[400] }}>

                        <div className="card mb-5" style={{ backgroundColor: colors.primary[400], color: `${colors.grey[100]} !important` }}>
                            <div className="card-body" style={{ backgroundColor: colors.primary[400], color: `${colors.grey[100]} !important` }}>
                                <div className="form-group col-lg-12 col-md-4 col-xs-12">
                                    <div className="row" style={{ marginLeft: '100px' }}>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>PROJE KODU</label>
                                            <input name="projekodu" type="text" className="form-control" value={modalData.projekodu} onChange={handleCase}
                                                placeholder="proje kodu giriniz">
                                            </input>
                                            {submitError && modalData.projekodu.length <= 0 ?
                                                <label style={{ color: colors.redAccent[500] }}>PROJE KODU BOŞ GEÇİLEMEZ</label> : ""}
                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>PROJE</label>
                                            <textarea name="proje" type="text" className="form-control" placeholder="proje bilgisi giriniz" value={modalData.proje} onChange={handleCase}></textarea>
                                            {submitError && modalData.proje.length <= 0 ?
                                                <label style={{ color: colors.redAccent[500] }}>PROJE BİLGİSİ BOŞ GEÇİLEMEZ</label> : ""}
                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>PROJE ADI</label>
                                            <textarea name="projeadi" type="text" className="form-control" placeholder="proje adı giriniz" value={modalData.projeadi} onChange={handleCase}></textarea>
                                            {submitError && modalData.projeadi.length <= 0 ?
                                                <label style={{ color: colors.redAccent[500] }}>PROJE ADI BOŞ GEÇİLEMEZ</label> : ""}
                                        </div>
                                    </div>
                                    <div className="row" style={{ marginLeft: '100px' }}>

                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>FİRMA</label>
                                            <input name="firma" type="text" className="form-control" value={modalData.firma} onChange={handleCase}
                                                placeholder="firma bilgisi giriniz">

                                            </input>
                                            {submitError && modalData.firma.length <= 0 ?
                                                <label style={{ color: colors.redAccent[500] }}>FİRMA BİLGİSİ BOŞ GEÇİLEMEZ</label> : ""}

                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>ANLAŞMA TUTARI</label>
                                            <input maxLength={100} name="anlasmatutari" id="anlasmatutari" type={'number'} step={'.01'} min={0}
                                                className="form-control" placeholder="anlaşma tutarı giriniz" value={modalData.anlasmatutari} onChange={handleCase}>
                                            </input>

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
                        <ModalTitle style={{ backgroundColor: colors.blueAccent[700] }}>PROJE EKLE</ModalTitle>
                    </Modal.Header>
                    <ModalBody style={{ backgroundColor: colors.primary[400] }}>

                        <div className="card mb-5" border-0 style={{ backgroundColor: colors.primary[400] }}>
                            <div className="card-body" border-0 style={{ backgroundColor: colors.primary[400] }}>
                                <div className="form-group col-lg-12 col-md-4 col-xs-12">
                                    <div className="row" style={{ marginLeft: '100px' }}>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>PROJE KODU</label>
                                            <input name="projekodu" id="projekodu2" type={'number'} min={0} className="form-control" onChange={handleCase2}
                                                placeholder="proje kodu giriniz">
                                            </input>
                                            {submitError2 && modalData2.projekodu.length <= 0 ?
                                                <label style={{ color: colors.redAccent[500] }}>PROJE KODU BOŞ GEÇİLEMEZ</label> : ""}
                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>PROJE</label>
                                            <textarea name="proje" id="proje2" type="text" className="form-control" placeholder="proje bilgisi giriniz" onChange={handleCase2}></textarea>
                                            {submitError2 && modalData2.proje.length <= 0 ?
                                                <label style={{ color: colors.redAccent[500] }}>PROJE BİLGİSİ BOŞ GEÇİLEMEZ</label> : ""}
                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>PROJE ADI</label>
                                            <textarea name="projeadi" id="projeadi2" type="text" className="form-control" placeholder="proje adı giriniz" onChange={handleCase2}></textarea>
                                            {submitError2 && modalData2.projeadi.length <= 0 ?
                                                <label style={{ color: colors.redAccent[500] }}>PROJE ADI BOŞ GEÇİLEMEZ</label> : ""}
                                        </div>

                                    </div>
                                    <div className="row" style={{ marginLeft: '100px' }}>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>FİRMA</label>
                                            <textarea name="firma" id="firma2" type="text" className="form-control" placeholder="firma bilgisi giriniz" onChange={handleCase2}></textarea>
                                            {submitError2 && modalData2.firma.length <= 0 ?
                                                <label style={{ color: colors.redAccent[500] }}>FİRMA BİLGİSİ BOŞ GEÇİLEMEZ</label> : ""}
                                        </div>
                                        <div className="form-group col-lg-4 col-md-4 col-xs-12">
                                            <label style={{ color: colors.blueAccent[700] }}>ANLAŞMA TUTARI</label>
                                            <input name="anlasmatutari" id="anlasmatutari2" type={'number'} step={'.01'} min={0}
                                                className="form-control" placeholder="anlaşma tutarı giriniz" onChange={handleCase2}></input>

                                        </div>

                                    </div>
                                </div>

                            </div>

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
export default Projeler;