import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../login/login.css'
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { CenterFocusWeakTwoTone } from "@mui/icons-material";

import Person from "../../assets/person";
import Password from "../../assets/password";









const Logins = () => {
    const [modalData, setData] = useState([]);
    const navigateToHome = useNavigate();
    const [modalData2, setData2] = useState();
    const theme = useTheme();
    const token = "";
  const colors = tokens(theme.palette.mode);

    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    useEffect(()=>{
      if(token!=""){
        return navigateToHome('/');
       }
    })
        

   
 
    let [errMessage, setErr] = useState();
    const handleCase = (e) => {
        e.preventDefault();
        const name = e.target.getAttribute("name");
        const value = e.target.value
        const caseCopy = { ...modalData }
        caseCopy[name] = value;
        setData(caseCopy);
    }
    

    const handleSubmit = (e) =>{
        e.preventDefault();
       console.log(modalData.kullaniciadi,modalData.sifre);
      
       axios({
        method:"GET",
        url:(process.env.REACT_APP_API + "Kullanicilar/GetKullanicilar/details"),
        params:{
            kullaniciadi:modalData.kullaniciadi,
            sifre:modalData.sifre
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
       
       
    }).then((result) => {
       
        const token = result.data 
        if(token == "KULLANICI BULUNAMADI"){
            console.log(token)
        }
        else{
            // const decoded = jwtDecode(token)
            // const decoded2 = parseJwt(token)
    
         
            // console.log(decoded)
            // console.log(decoded2["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"])
            // console.log(decoded["StokGirisi"])
            
            sessionStorage.setItem("Auth",token);
            navigateToHome('/');
        }
      

        
       
        //  console.log(decoded)
     
      
    })
        
    }

   
    
    return (
      
      
        <div id="login"  style={{ paddingLeft:800, paddingTop:350}}>
        <form className="login-form">
          <span className="fa fa-user"><Person size={30} fill={colors.primary[200]} /></span>
          <input
            autoFocus
           name="kullaniciadi"
            onChange={handleCase}
            placeholder="Kullanıcı Adı"
            type="text"
  
            required
          />
          <span className="fa fa-lock"><Password size={30} fill={colors.primary[200]} /></span>
          <input
            autoComplete="off"
            name="sifre"
            onChange={handleCase}
            placeholder="Şifre"
            type="password"
        
            required
          />
          <input type="submit" value="GİRİŞ" onClick={handleSubmit}/>
        </form>
      </div>
    )
}
export default Logins;

