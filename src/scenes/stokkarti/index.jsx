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
import '../../designs/stokkarti.css'
import { nanoid } from 'nanoid';
import {useNavigate } from "react-router-dom";





const Stokkarti = () => {
  const navigateToLogin = useNavigate();
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
  const [veriEkle, setVeriEkle] = useState([]);
  const [ekleVeri, setEkleVeri] = useState(
    {
      id: nanoid(),
      urunadi: "",
      uretici: "",
      yuzey: "",
      boy: "",
      en: "",
      kalinlik: "",
      birim: "",
      tanim: "",
      minmiktar: "",
      maxmiktar: ""

    }

  )


  const addTable = (e) => {

    e.preventDefault();
    if (document.getElementById("urunadi2").value == "" || document.getElementById("birim2").value == ""  || document.getElementById("en2").value == ""  || document.getElementById("kalinlik2").value == ""  
      ||document.getElementById("yuzey2").value == ""  || document.getElementById("tanim2").value == ""  || document.getElementById("boy2").value == ""
     ) {
      setSubmitError2(true);
    }

    else {
      const newEkleVeri = {
        id: nanoid(),
        urunadi: ekleVeri.urunadi,
        uretici: ekleVeri.uretici,
        yuzey: ekleVeri.yuzey,
        boy: ekleVeri.boy,
        en: ekleVeri.en,
        kalinlik: ekleVeri.kalinlik,
        birim: ekleVeri.birim,
        tanim: ekleVeri.tanim,
        minmiktar: ekleVeri.minmiktar,
        maxmiktar: ekleVeri.maxmiktar

      };

      const newVeriEkle = [...veriEkle, newEkleVeri];
      setVeriEkle(newVeriEkle);

      document.getElementById("urunadi2").value = "";
      document.getElementById("birim2").value = "";
      document.getElementById("tanim2").value = "";
      document.getElementById("yuzey2").value = "";
      document.getElementById("boy2").value = "";
      document.getElementById("en2").value = "";
      document.getElementById("kalinlik2").value = "";
      document.getElementById("uretici2").value = "";
      document.getElementById("minmiktar2").value = "";
      document.getElementById("maxmiktar2").value = "";
      
      
      setSubmitError2(false);


    }

  }

  const deleteTable = (id) => {

    const newVeriler = [...veriEkle];
    const index = veriEkle.findIndex((item) => item.id === id)
    newVeriler.splice(index, 1)
    setVeriEkle(newVeriler);
  }
  

  function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}
const decoded = parseJwt(sessionStorage.getItem("Auth"));

  //type:'currency', currencySetting:{ locale: 'TR',currencyCode:'TRY', minimumFractionDigits:0, maximumFractionDigits:3}
  const columns2 = [

    { title: "Stok-Kodu", field: "stokkodu", maxWidth: 60 },
    { title: "Ürün Adı", field: "urunadi", },
    { title: "Üretici", field: "uretici", },
    { title: "Yüzey", field: "yuzey", },
    { title: "Boy", field: "boy", },
    { title: "En", field: "en", },
    { title: "Kalınlık", field: "kalinlik", },
    { title: "Birim", field: "birim", },
    { title: "Tanım", field: "tanim" },
    { title: "Tarih", field: "tarih", type: "date" },
    { title: "Minimum Miktar", field: "minmiktar", maxWidth: 70 ,},
    { title: "Maximum Miktar", field: "maxmiktar", maxWidth: 70 }

  ]

  const [stoklar, setstoklar] = useState([]);
  let [errMessage, setErr] = useState();
  const [modalData, setData] = useState(initialModalData2);
  const [modalData2, setData2] = useState(initialModalData2);
  const [isShow, setShow] = useState(false);
  const [isShow2, setShow2] = useState(false);
  const [isShow3, setShow3] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitError2, setSubmitError2] = useState(false);
  const [status,setStatus] = useState({})
  const [birimler,setBirimler] = useState([
    {id:nanoid, title:""}
  ]);
  useEffect(() => {
    const status = {}
    birimler.map(row=>status[row.id]=row.title)
    setStatus(status)

  },[])
 
 


  const initModal = (data) => {
    console.log(decoded["stokgirisduzenleme"] )
    
   
      setData(data);
      setSubmitError(false);
      console.log(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
      console.log(decoded);
      return setShow(!isShow);
  
    
  }
  const initModal2 = () => {
    if(decoded == null)
    {
    
      navigateToLogin("/login");
    }
    else
    {
      setSubmitError2(false);
    setEkleVeri([]);
    setVeriEkle([]);
    return setShow2(!isShow2);
    }
    
  }
  const initModal3 = () => {
    if(decoded == null)
    {
    
      navigateToLogin("/login");
    }
    else
    {
      refreshList();
      return setShow3(!isShow3);
    }
   
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
    if(decoded == null)
    {
    
      navigateToLogin("/login");
    }
    else
    {
      event.preventDefault();
    if (modalData.urunadi.length == 0 || modalData.boy.length == 0 || modalData.en.length == 0 || modalData.kalinlik.length == 0
      || modalData.yuzey.length == 0 || modalData.tanim.length == 0) {
      setSubmitError(true);
    }
    else {

      fetch(process.env.REACT_APP_API + 'StokKarti', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          stokkodu: modalData.stokkodu,
          urunadi: modalData.urunadi,
          uretici: modalData.uretici,
          yuzey: modalData.yuzey,
          boy: modalData.boy,
          en: modalData.en,
          kalinlik: modalData.kalinlik,
          birim: modalData.birim,
          tanim: modalData.tanim,
          minmiktar: modalData.minmiktar,
          maxmiktar: modalData.maxmiktar

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
    
    


  }

  const handleSubmit2 = (event) => {
    if(decoded == null)
    {
    
      navigateToLogin("/login");
    }
    else
    {

      if(veriEkle.length==0){
      
      }
      else{
        veriEkle.map((item) =>
        fetch(process.env.REACT_APP_API + 'StokKarti', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            urunadi: item.urunadi,
            uretici: item.uretici,
            yuzey: item.yuzey,
            boy: item.boy,
            en: item.en,
            kalinlik: item.kalinlik,
            birim: item.birim,
            tanim: item.tanim,
            minmiktar: item.minmiktar,
            maxmiktar: item.maxmiktar
          })
        })
  
        .then(res => res.json()).then(d => setErr(d.replace(/[" "]/g, " "))),
        setShow2(false),
        setShow3(true),
        
       
  
      )
      }
    }
    
  }

  const refreshList = () => {
    axios.get(process.env.REACT_APP_API + 'StokKarti')
    .then(res => {
        console.log(res)
        setstoklar(res.data)

    })
    .catch(err => {
        console.log(err)
    })
        ;
}

  useEffect(() => {
    axios.get(process.env.REACT_APP_API + 'StokKarti')
      .then(res => {
        console.log(res)
        setstoklar(res.data)

      })
      .catch(err => {
        console.log(err)
       
      })
  }, []);
  useEffect(() => {
    axios.get(process.env.REACT_APP_API + 'StokKarti/GetBirim')
      .then(res => {
        console.log(res)
        setBirimler(res.data)

      })
      .catch(err => {
        console.log(err)
       
      })
  }, []);
var auth = sessionStorage.getItem("Auth");
   return  (

    <Box m="20px">
      <Box
        m="40px 0 0 0"
        height="75vh"
      >
        <MaterialTable className="table1" id="table1" columns={columns2} data={stoklar} title="Stok Kartları"
          enableRowSelection
          enablePinning
          style={{ backgroundColor: colors.blueAccent[700] }}
          options={{
            search: false, cellStyle: { padding: '10px', width: "0.1rem" },
            filtering: true, pageSize: 25, pageSizeOptions: [5, 10, 25, 50, 100, { value: stoklar.length, label: 'Hepsi' }], exportButton: true, exportAllData: true,
            rowStyle: { overflowWrap: "break-word", backgroundColor: colors.primary[400] },
            maxBodyHeight: "700px", tableLayout: "fixed",
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

        <Modal className="updateModal" show={isShow}
          size="xl"
        >
          <Modal.Header style={{ backgroundColor: colors.blueAccent[700] }}>
            <ModalTitle style={{ backgroundColor: colors.blueAccent[700] }}>STOK KARTI GÜNCELLE</ModalTitle>
          </Modal.Header>
          <ModalBody style={{ backgroundColor: colors.primary[400] }}>

            <div className="card mb-5" style={{ backgroundColor: colors.primary[400], color: `${colors.grey[100]} !important` }}>
              <div className="card-body" style={{ backgroundColor: colors.primary[400], color: `${colors.grey[100]} !important` }}>
                <div className="form-group col-lg-12 col-md-4 col-xs-12">
                  <div className="row">
                    <div className="form-group col-lg-4 col-md-4 col-xs-12">
                      <label style={{ color: colors.blueAccent[700] }}>ÜRÜN ADI</label>
                      <input name="urunadi" type="text" className="form-control" value={modalData.urunadi} onChange={handleCase}
                        placeholder="ürün adı giriniz">
                      </input>
                      {submitError && modalData.urunadi.length <= 0 ?
                        <label style={{ color: colors.redAccent[500] }}>ÜRÜN ADI BOŞ GEÇİLEMEZ</label> : ""}
                    </div>
                    <div className="form-group col-lg-4 col-md-4 col-xs-12">

                      <label style={{ color: colors.blueAccent[700] }}>ÜRETİCİ</label>
                      <input name="uretici" type="text" className="form-control" placeholder="üretici giriniz" value={modalData.uretici} onChange={handleCase}></input>

                    </div>
                    <div className="form-group col-lg-4 col-md-4 col-xs-12">
                      <label style={{ color: colors.blueAccent[700] }}>YÜZEY</label>
                      <input name="yuzey" type="text" class="form-control" placeholder="yüzey giriniz" value={modalData.yuzey} onChange={handleCase}></input>
                      {submitError && modalData.yuzey.length <= 0 ?
                        <label style={{ color: colors.redAccent[500] }}>YÜZEY BOŞ GEÇİLEMEZ</label> : ""}
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-4 col-md-4 col-xs-12">
                      <label style={{ color: colors.blueAccent[700] }}>BOY</label>
                      <input name="boy" type={'number'} step={'.01'} min={0} className="form-control" value={modalData.boy} onChange={handleCase}
                        placeholder="boy giriniz">
                      </input>
                      {submitError && modalData.boy.length <= 0 ?
                        <label style={{ color: colors.redAccent[500] }}>BOY BOŞ GEÇİLEMEZ</label> : ""}
                    </div>
                    <div className="form-group col-lg-4 col-md-4 col-xs-12">
                      <label style={{ color: colors.blueAccent[700] }}>EN</label>
                      <input name="en" type={'number'} step={'.01'} min={0} className="form-control" placeholder="en giriniz" value={modalData.en} onChange={handleCase}></input>
                      {submitError && modalData.en.length <= 0 ?
                        <label style={{ color: colors.redAccent[500] }}>EN BOŞ GEÇİLEMEZ</label> : ""}
                    </div>
                    <div className="form-group col-lg-4 col-md-4 col-xs-12">
                      <label style={{ color: colors.blueAccent[700] }}>KALINLIK</label>
                      <input name="kalinlik" type={'number'} step={'.01'} min={0} class="form-control" placeholder="kalınlık giriniz" value={modalData.kalinlik} onChange={handleCase}></input>
                      {submitError && modalData.kalinlik.length <= 0 ?
                        <label style={{ color: colors.redAccent[500] }}>!KALINLIK BOŞ GEÇİLEMEZ</label> : ""}
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-4 col-md-4 col-xs-12">
                      <label style={{ color: colors.blueAccent[700] }}>BİRİM</label>
                      <input name="birim" type="text" className="form-control" value={modalData.birim} onChange={handleCase}
                        placeholder="birim giriniz">

                      </input>
                      {submitError && modalData.birim.length <= 0 ?
                        <label style={{ color: colors.redAccent[500] }}>BİRİM BOŞ GEÇİLEMEZ</label> : ""}
                    </div>
                    <div className="form-group col-lg-4 col-md-4 col-xs-12">
                      <label style={{ color: colors.blueAccent[700] }}>TANIM</label>
                      <textarea name="tanim" type="text" className="form-control" placeholder="tanım giriniz" value={modalData.tanim} onChange={handleCase}></textarea>
                      {submitError && modalData.tanim.length <= 0 ?
                        <label style={{ color: colors.redAccent[500] }}>TANIM BOŞ GEÇİLEMEZ</label> : ""}
                    </div>

                  </div>
                  <div className="row">
                    <div className="form-group col-lg-4 col-md-4 col-xs-12">
                      <label style={{ color: colors.blueAccent[700] }}>MİNİMUM MİKTAR</label>
                      <input name="minmiktar" id="minmiktar2" type={'number'} step={'.01'} min={0} className="form-control" value={modalData.minmiktar} onChange={handleCase}
                        placeholder="min miktar giriniz">
                      </input>
                    </div>
                    <div className="form-group col-lg-4 col-md-4 col-xs-12">
                      <label style={{ color: colors.blueAccent[700] }}>MAKSİMUM MİKTAR</label>
                      <input name="maxmiktar" id="maxmiktar2" type={'number'} step={'.01'} min={0} className="form-control" placeholder="max miktar giriniz" value={modalData.maxmiktar} onChange={handleCase}></input>
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
            <ModalTitle style={{ backgroundColor: colors.blueAccent[700] }}>STOK KARTI EKLE</ModalTitle>
          </Modal.Header>
          <ModalBody style={{ backgroundColor: colors.primary[400] }}>

            <div className="card mb-5" border-0 style={{ backgroundColor: colors.primary[400] }}>
              <div className="card-body" border-0 style={{ backgroundColor: colors.primary[400] }}>
                <div className="form-group col-lg-12 col-md-4 col-xs-12">
                  <div className="row">
                    <div className="form-group col-lg-4 col-md-4 col-xs-12">
                      <label style={{ color: colors.blueAccent[700] }}>ÜRÜN ADI</label>
                      <input name="urunadi" id="urunadi2" type="text" className="form-control" onChange={handleCase2}
                        placeholder="ürün adı giriniz">
                      </input>
                      {submitError2 && document.getElementById("urunadi2").value == "" ?
                        <label style={{ color: colors.redAccent[500] }}>ÜRÜN ADI BOŞ GEÇİLEMEZ</label> : ""}
                    </div>
                    <div className="form-group col-lg-4 col-md-4 col-xs-12">
                      <label style={{ color: colors.blueAccent[700] }}>ÜRETİCİ</label>
                      <input name="uretici" id="uretici2" type="text" className="form-control" placeholder="üretici giriniz" onChange={handleCase2}></input>
                    </div>
                    <div className="form-group col-lg-4 col-md-4 col-xs-12">
                      <label style={{ color: colors.blueAccent[700] }}>YÜZEY</label>
                      <input name="yuzey" id="yuzey2" type="text" class="form-control" placeholder="yüzey giriniz" onChange={handleCase2}></input>
                      {submitError2 && document.getElementById("yuzey2").value == "" ?
                        <label style={{ color: colors.redAccent[500] }}>YÜZEY BOŞ GEÇİLEMEZ</label> : ""}
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-4 col-md-4 col-xs-12">
                      <label style={{ color: colors.blueAccent[700] }}>BOY</label>
                      <input name="boy" id="boy2" type={'number'} step={'.01,01'} min={0} className="form-control" onChange={handleCase2}
                        placeholder="boy giriniz">
                      </input>
                      {submitError2 && document.getElementById("boy2").value == "" ?
                        <label style={{ color: colors.redAccent[500] }}>BOY BOŞ GEÇİLEMEZ</label> : ""}
                    </div>
                    <div className="form-group col-lg-4 col-md-4 col-xs-12">
                      <label style={{ color: colors.blueAccent[700] }}>EN</label>
                      <input name="en" id="en2" type={'number'} step={'.01'} min={0} className="form-control" placeholder="en giriniz" onChange={handleCase2}></input>
                      {submitError2 && document.getElementById("en2").value == "" ?
                        <label style={{ color: colors.redAccent[500] }}>EN BOŞ GEÇİLEMEZ</label> : ""}
                    </div>
                    <div className="form-group col-lg-4 col-md-4 col-xs-12">
                      <label style={{ color: colors.blueAccent[700] }}>KALINLIK</label>
                      <input name="kalinlik" id="kalinlik2" type={'number'} step={'.01'} min={0} class="form-control" placeholder="kalınlık giriniz" onChange={handleCase2}></input>
                      {submitError2 && document.getElementById("kalinlik2").value == "" ?
                        <label style={{ color: colors.redAccent[500] }}>!KALINLIK BOŞ GEÇİLEMEZ</label> : ""}
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-lg-4 col-md-4 col-xs-12">
                      <label style={{ color: colors.blueAccent[700] }}>BİRİM</label>
                      <input name="birim" type="text" id="birim2" className="form-control" onChange={handleCase2}
                        placeholder="birim giriniz">
                      </input>
                      {submitError2 && document.getElementById("birim2").value == "" ?
                        <label style={{ color: colors.redAccent[500] }}>BİRİM BOŞ GEÇİLEMEZ</label> : ""}
                    </div>
                    <div className="form-group col-lg-4 col-md-4 col-xs-12">
                      <label style={{ color: colors.blueAccent[700] }}>TANIM</label>
                      <textarea name="tanim" id="tanim2" type="text" className="form-control" placeholder="tanım giriniz" onChange={handleCase2}></textarea>
                      {submitError2 && document.getElementById("tanim2").value == "" ?
                        <label style={{ color: colors.redAccent[500] }}>TANIM BOŞ GEÇİLEMEZ</label> : ""}
                    </div>

                  </div>
                  <div className="row">
                    <div className="form-group col-lg-4 col-md-4 col-xs-12">
                      <label style={{ color: colors.blueAccent[700] }}>MİNİMUM MİKTAR</label>
                      <input name="minmiktar" id="minmiktar2" type={'number'} step={'.01'} min={0} className="form-control" onChange={handleCase2}
                        placeholder="min miktar giriniz">
                      </input>

                    </div>
                    <div className="form-group col-lg-4 col-md-4 col-xs-12">
                      <label style={{ color: colors.blueAccent[700] }}>MAKSİMUM MİKTAR</label>
                      <input name="maxmiktar" id="maxmiktar2" type={'number'} step={'.01'} min={0} className="form-control" placeholder="max miktar giriniz" onChange={handleCase2}></input>
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

                    <th>Ürün Adı</th>
                    <th>Üretici</th>
                    <th>Yüzey</th>
                    <th>Boy</th>
                    <th>En</th>
                    <th>Kalınlık</th>
                    <th>Birim</th>
                    <th>Tanım</th>
                    <th>Minimum Miktar</th>
                    <th>Maximum Miktar</th>


                  </tr>
                </thead>
                <tbody>
                  {veriEkle.map((item) => (
                    <tr style={{ color: colors.blueAccent[100] }}>

                      <td>{item.urunadi}</td>
                      <td>{item.uretici}</td>
                      <td>{item.yuzey}</td>
                      <td>{item.boy}</td>
                      <td>{item.en}</td>
                      <td>{item.kalinlik}</td>
                      <td>{item.birim}</td>
                      <td>{item.tanim}</td>
                      <td>{item.minmiktar}</td>
                      <td>{item.maxmiktar}</td>
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
     
      

        {/* <select className="form-control" id="select" onChange={(e)=>setVal(e.target.value)}>
          <option value="0">--Select--</option>
          {stoklar.map((item)=>(
            <option key = {item.stokkodu} value={item.stokkodu}>
              {item.urunadi}
            </option>
          ))}
        </select> */}

     
      </Box>
    </Box>
  ) 
};
export default Stokkarti;
