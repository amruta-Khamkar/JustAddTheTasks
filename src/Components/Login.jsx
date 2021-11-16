import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Redirect } from 'react-router-dom';
import { Card, Checkbox } from '@mui/material';
import Recaptcha from 'react-google-recaptcha';
import CryptoJS  from 'crypto-js';

export default function Login() {
    const emailInput = useRef(null);
    const passInput = useRef(null);

    const [data, setData] = useState({
        details: [],
        flag: 0,
        register: 0
    })
    const [form, setForm] = useState({
        isVerified:0
    });
    useEffect(() => {
        axios.get("http://localhost:3001/Cred").then((res) => {
            setData({
                details: res.data,
            })
        })
    }, [])

    const submit = () => {
        const details = data.details;
        let i = 0;
        while (i <= Object.keys(details).length) {
            var bytes  = CryptoJS.AES.decrypt(details[i].pass, 'secret key 123');
            var originalText = bytes.toString(CryptoJS.enc.Utf8);
            details[i].pass=originalText;
            details[i].cPass=originalText;
            console.log(details[i].pass)
            if (document.getElementById("email").value == '' || document.getElementById("pass").value == '') {
                alert("Please fill the fields");
                break;
            }
          
            if ((document.getElementById("email").value == details[i].email) && (document.getElementById("pass").value == details[i].pass && form.isVerified==1)) {
                let ciphertext = CryptoJS.AES.encrypt((document.getElementById("pass").value), 'secret key 123').toString();
                let credArr = {
                    id: i + 1,
                    email: document.getElementById("email").value,
                    pass: ciphertext,
                    fName: details[i].fName,
                    lName: details[i].lName,
                    uName: details[i].uName,
                    email: details[i].email,
                    tasks: details[i].tasks,
                    cPass: ciphertext
                    
                }
                // console.log(ciphertext)
                localStorage.setItem('credArr', JSON.stringify(credArr))
                setData({ flag: 1 })
                // alert("Login Succcessfully");
                document.getElementById("email").value = ''
                document.getElementById("pass").value = '';
                break;
            }
            if(form.isVerified==0){
                alert("watch the captcha");
                break;
            }
            else {
                console.log("no");
                console.log(form.isVerified)
                i++;
                if (i == Object.keys(details).length) {
                    alert("Your Credientials Does not match please enter correct details");
                    break;
                }
            }
        }
    }
    const Register = () => {
        setData({ register: 1 })
    }

    const load=()=>{
        console.log("loaded")
    }
   const verify=()=>{
           setForm({
               isVerified:1
            })
        console.log(form.isVerified)
    }
   
    return (
        <>
        {console.log("Login")}
         {  console.log(form.isVerified)}
            <Card sx={{ width: "50%", border: "2px solid black", margin: "130px auto", padding: "12px" }}>
                <h1 className="mt-4 mx-5">Login here</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '100ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField  name="email" id="email" label="Enter Your Email" inputRef={emailInput} variant="outlined" />
                    <TextField  name="email" id="pass" label="Enter Your Password" inputRef={passInput} variant="outlined" type="password" />


                </Box>
                <Checkbox defaultChecked /><span>Remember me</span><br></br>
                {
                    data.flag == 1 && <Redirect to="/home" />
                }
                <Recaptcha sitekey="6LeXBCUdAAAAAMYhY4GnP_gPGpC3v1z_vMTeBK4A" 
                onChange={verify}/>
                <Button className="mb-5" onClick={submit} variant="contained">Login</Button>
                <Button className="mb-5" onClick={Register} variant="contained">Register</Button>
                {data.register==1 && <Redirect to="/register"/>}

            </Card>
        </>

    )
}
