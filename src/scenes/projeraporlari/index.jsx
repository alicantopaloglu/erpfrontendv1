import { Grid, TablePagination } from "@material-ui/core";
import { Box, useTheme } from "@mui/material";
import MaterialTable from "material-table";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { tokens } from "../../theme";

const ProjeRaporlari = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [projeData, setprojeData] = useState([]);
    const [durum, setDurum] = useState();
    const [secilenProje, setSecilenProje] = useState([]);
    const [selectedProje, setSelectedProje] = useState('');
    const [totalValue, setTotalValue] = useState();
    const [projeler, setProjeler] = useState([]);
    const [open, setOpen] = useState(true);
    const [open2, setOpen2] = useState(false);
    const columns = [
        { title: "STOKKODU", field: "stokkodu" },
        { title: "ÇIKIŞ YAPILAN MİKTAR", field: "stokcikismiktari", },
        { title: "BİRİM FİYATI", field: "birimfiyati", type: 'currency', filtering: false, currencySetting: { locale: 'TR', currencyCode: 'TRY', minimumFractionDigits: 0, maximumFractionDigits: 3 } },
        { title: "TOPLAM FİYAT", field: "stokcikistoplam", type: 'currency', filtering: false, currencySetting: { locale: 'TR', currencyCode: 'TRY', minimumFractionDigits: 0, maximumFractionDigits: 3 } },

    ]
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

       
        axios.get(process.env.REACT_APP_API + 'Projeler/getProjeRapor/' + selectedProje)
            .then(res => {
                console.log(res)
                setprojeData(res.data)
                setTotalValue(0)
                setDurum(0);
            })

            .catch(err => {
                console.log(err)

            })
            

           
      
    }
    const handleProjeGetir = (event) => {
        axios.get(process.env.REACT_APP_API + 'Projeler/getSelectedProje/' + selectedProje)
        .then(res => {
            console.log(res)
            setSecilenProje(res.data)
        })

        .catch(err => {
            console.log(err)

        })
    }
    const handleHesapla = () => {
        var total = 0;
        projeData.forEach(element => {
            total += element.stokcikistoplam
        });
     setTotalValue(total)
     return totalValue;
       
       
    }
    
    const handleDurum = (event) => {
       
        var total = 0;
        projeData.forEach(element => {
            total += element.stokcikistoplam
        });
     setTotalValue(total)
     
       

        var durum = secilenProje.anlasmatutari - total
        setDurum(durum);
    }

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
   
    const numberFormat = (value) =>
        new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY'
        }).format(value);
    return (
        <Box m="20px">
            <Box
                m="2px 0 0 0"
                height="75vh"
            >

                <>
                    <Button style={{
                        width: 300, backgroundColor: colors.greenAccent[500], color: colors.grey[100],
                        border: "none"
                    }}
                        onClick={(e) => handleCollapse(e)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >
                        TOPLAM PROJE RAPORLARI
                    </Button>

                    <Button style={{ width: 300, backgroundColor: colors.greenAccent[500], color: colors.grey[100], border: "none" }}
                        onClick={(e) => handleCollapse2(e)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open2}
                    >
                        KALEM BAZLI PROJE RAPORLARI
                    </Button>
                    <Collapse in={open}>

                        <div id="example-collapse-text">
                            <br></br>
                            <select className="form-control" id="selectProje" style={{ backgroundColor: colors.blueAccent[700], color: "white", textAlign: "center" }} onChange={(e) => setSelectedProje(e.target.value)}>
                                <option value="0">PROJE SEÇİNİZ</option>
                                {projeler.map((item) => (
                                    <option key={item.projekodu} value={item.projekodu}>
                                        {item.projeadi + " / " + item.projekodu}
                                    </option>
                                ))}
                            </select>
                            <div className="container">
                           
                            <Button style={{ backgroundColor: colors.greenAccent[600], color: "white", marginLeft:200, border: "none", width: 400,  textAlign: "center" }} onClick={ () => {handleSubmit();handleProjeGetir();}}>VERİLERİ GETİR</Button>
                                <Button style={{ backgroundColor: colors.greenAccent[600], color: "white", border: "none", width: 400,  textAlign: "center" }} onClick={(e) => handleDurum(e)}>HESAPLA</Button>
                           
                               
                            </div>

                            <MaterialTable className="table1" id="table1" columns={columns} data={projeData} title="PROJE RAPORLARI"
                                enableRowSelection
                                enablePinning
                                style={{ backgroundColor: colors.blueAccent[700], marginTop: 5 }}


                                options={{
                                    search: false, cellStyle: { padding: '10px', width: "0.1rem" },
                                    filtering: true, pageSize: 25, pageSizeOptions: [5, 10, 25, 50, 100, { value: projeData.length, label: 'Hepsi' }], exportButton: true, exportAllData: true,
                                    rowStyle: { overflowWrap: "break-word", backgroundColor: colors.primary[400] },
                                    maxBodyHeight: "450px", tableLayout: "fixed",
                                    headerStyle: { backgroundColor: colors.primary[400], alignItems: "right" },
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
                                components={{
                                    Pagination: (props) => <div>
                                        <Grid container style={{ backgroundColor: colors.redAccent[400] }}>
                                            <Grid sm={6} item></Grid>
                                        </Grid>
                                        <Grid container style={{ backgroundColor: colors.redAccent[600] }}>
                                            <Grid sm={6} item style={{ height: 25, paddingTop: 3 }}> ANLAŞMA TUTARI :</Grid>
                                            <Grid sm={6} style={{ paddingLeft: 670, height: 25, paddingTop: 3 }} item >  {numberFormat(secilenProje.anlasmatutari)} </Grid>
                                        </Grid>
                                        <Grid container style={{ backgroundColor: colors.redAccent[600] }}>
                                            <Grid sm={6} item style={{ height: 25, paddingTop: 3 }}> TOPLAM KULLANILAN STOK FİYATI :</Grid>
                                            <Grid sm={6} style={{ paddingLeft: 670, height: 25, paddingTop: 3 }} item >  {numberFormat(totalValue)} </Grid>
                                        </Grid>
                                        <Grid container style={{ backgroundColor: colors.redAccent[600] }}>
                                            <Grid sm={6} item style={{ height: 25, paddingTop: 3 }}> DURUM :</Grid>
                                            <Grid sm={6} style={{ paddingLeft: 670, height: 25, paddingTop: 3 }} item >  {numberFormat(durum)} </Grid>
                                        </Grid>
                                        <TablePagination {...props}></TablePagination>
                                    </div>
                                }}



                            />
                        </div>
                    </Collapse>
                    <Collapse in={open2}>
                        <div id="example-collapse-text2">
                            <MaterialTable className="table2" id="table2" columns={columns} data={projeData} title="Geçmiş"
                                enableRowSelection
                                enablePinning
                                style={{ backgroundColor: colors.blueAccent[700], marginTop: 5 }}
                                options={{
                                    search: false, cellStyle: { padding: '10px', width: "0.1rem" },
                                    filtering: true, pageSize: 25, pageSizeOptions: [5, 10, 25, 50, 100, { value: projeData.length, label: 'Hepsi' }], exportButton: true, exportAllData: true,
                                    rowStyle: { overflowWrap: "break-word", backgroundColor: colors.primary[400] },
                                    maxBodyHeight: "620px", tableLayout: "fixed",

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




                            />
                        </div>
                    </Collapse>
                </>

            </Box>
        </Box>
    )
}
export default ProjeRaporlari;