import { Box } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import MaterialTable from "material-table";
import axios from "axios";
import React, { useState, useEffect } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../designs/stokkarti.css'


const StokDurumu = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns2 =
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
      { title: "Ortalama Birim Fiyatı", field: "ortalamabirimfiyati", maxWidth: 100, type: 'currency', currencySetting: { locale: 'TR', currencyCode: 'TRY', minimumFractionDigits: 0, maximumFractionDigits: 3 }},
      { title: "Toplam Tutar", field: "toplamtutar", maxWidth: 90,type: 'currency', currencySetting: { locale: 'TR', currencyCode: 'TRY', minimumFractionDigits: 0, maximumFractionDigits: 3 } },

    ]

  const [stoklar, setstoklar] = useState([]);

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

  return (

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


        />
      </Box>
    </Box>
  )

}
export default StokDurumu;