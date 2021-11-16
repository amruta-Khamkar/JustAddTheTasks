import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { Container, Form,FormControl,FormLabel } from 'react-bootstrap';
import { Redirect } from 'react-router';
import Button from '@mui/material/Button';
import axios from 'axios';
import CryptoJS  from 'crypto-js';
import Recaptcha from 'react-google-recaptcha';
import TextField from '@mui/material/TextField';

export default function Register() {
    const fNameInput = useRef(null);
    const lNameInput = useRef(null);
    const uNameInput = useRef(null);
    const emailInput = useRef(null);
    const passInput = useRef(null);
    const cPassInput = useRef(null);

    const regForEmail = RegExp(/^[^\s@]+@[^\s@]+.[^\s@]+$/);
    const regexname = RegExp(/^[A-Za-z]{3,30}$/);
    const regForPass = RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/);
    const [data, setData] = useState({
        credData: [],
        isLoggedIn: 0
    })
    const [form, setForm] = useState({
        isVerified:0
    });
    const register = () => {

        if (document.getElementById("fName").value == '' || document.getElementById("lName").value == '' || document.getElementById("uName").value == '' || document.getElementById("email").value == '' || document.getElementById("pass").value == '' || document.getElementById("cPass").value == '') {
            alert("Please fill all fields")
        }
        else if(!regexname.test(document.getElementById("fName").value)){
            alert("Enter proper name")
        }
        else if(!regForEmail.test(document.getElementById("email").value)){
            alert("Enter proper name")
        }
        else if(!regForPass.test(document.getElementById("pass").value)){
            alert(" a password must be eight characters including one uppercase letter, one special character and alphanumeric characters")
        }
        else if(document.getElementById("pass").value!=document.getElementById("cPass").value){
            alert("Password and confirm should match");
        }
        else if(form.isVerified==0){
            alert("Please verify the captcha")
        }
        else {
            let ciphertext = CryptoJS.AES.encrypt((passInput.current.value), 'secret key 123').toString();
            let formData = { fName: fNameInput.current.value, lName: lNameInput.current.value, uName: uNameInput.current.value, email: emailInput.current.value, pass: ciphertext, cPass: ciphertext,tasks:[] };
            setData(data => ({
                // ...data,
                credData: [...data.credData, formData],
            }));
            axios.post(`http://localhost:3001/Cred`, formData);
            document.getElementById("fName").value='';
            document.getElementById("lName").value='';
            document.getElementById("uName").value='';
            document.getElementById("email").value='';
            document.getElementById("pass").value='';
            document.getElementById("cPass").value='';
            alert("registered successfully")


        }
    }
    const verify=()=>{
        setForm({
            isVerified:1
         })
     console.log(form.isVerified)
 }
    const login = () => {
        setData({ isLoggedIn: 1 })
    }
    return (
        <>
{console.log("Register")}
           <Container fluid style={{width:"600px",margin:"70px auto"}}>
               <h1>Hey New user! Register here</h1>
    
                 <TextField  sx={{width:"500px"}} id="fName" label="Enter first name" inputRef={fNameInput} variant="outlined" /><br/>
                 <TextField   sx={{width:"500px"}}  id="lName" label="Enter Last name" inputRef={lNameInput} variant="outlined" />
                 <TextField  sx={{width:"500px"}}   id="uName" label="Enter User name" inputRef={uNameInput} variant="outlined" />
                 <TextField   sx={{width:"500px"}}  id="email" label="Enter Email" inputRef={emailInput} variant="outlined" />
                 <TextField   sx={{width:"500px"}}  type="password" id="pass" label="Enter Password" inputRef={passInput} variant="outlined" />
                 <TextField   sx={{width:"500px"}}  type="password" id="cPass" label="Confirm Password" inputRef={cPassInput} variant="outlined" />

                <Recaptcha sitekey="6LeXBCUdAAAAAMYhY4GnP_gPGpC3v1z_vMTeBK4A" 
                onChange={verify}/>
                <Button className="mx-1" variant="contained" onClick={register} >Register</Button>
            <Button className="mx-1" variant="contained" onClick={login}>Login</Button>
                

           
            </Container>

  
            {data.isLoggedIn == 1 && <Redirect to="/" />}




        </>
    )
}