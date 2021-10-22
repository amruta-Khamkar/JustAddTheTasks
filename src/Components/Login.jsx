import axios from 'axios';
import React, { useRef, useState ,useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Redirect } from 'react-router-dom';
import { Card,Checkbox } from '@mui/material';

export default function Login() {
    const emailInput=useRef(null);
    const passInput=useRef(null);

    const [data,setData]=useState({
        details:[],
        flag:0,
        register:0
    })
    useEffect(() => {
       axios.get("http://localhost:3001/Cred").then((res)=>{
           setData({
                details:res.data,
           })
       })
    }, [])

    const submit = () => {
        const details=data.details;
        let i = 0;
        while (i <= Object.keys(details).length) {
            if (document.getElementById("email").value == '' || document.getElementById("pass").value == '') {
                alert("Please fill the fields");
                break;
            }

            if ((document.getElementById("email").value == details[i].email) && (document.getElementById("pass").value == details[i].pass)) {
            

                let credArr = {
                    id:i+1,
                    email: document.getElementById("email").value,
                    pass: document.getElementById("pass").value,
                    fName: details[i].fName,
                    lName: details[i].lName,
                    uName: details[i].uName,
                    email: details[i].email,
                    tasks:details[i].tasks,
                    cPass:document.getElementById("pass").value
                   
                }
                localStorage.setItem('credArr', JSON.stringify(credArr))
                setData({flag:1})
                alert("Login Succcessfully");
                document.getElementById("email").value = ''
                document.getElementById("pass").value = '';
                break;
            }
            else {
                console.log("no")
                i++;
                if (i == Object.keys(details).length) {
                    alert("Your Credientials Does not match please enter correct details");
                    break;
                }
            }
        }
    }
    const Register=()=>{
        setData({register:1})
    }
    return (
        <>
           { console.log(data.details)}
                <Card sx={{width: "40%",border:"2px solid black" ,margin:"130px auto",padding:"12px"}}>
                <h1 className="my-4">Login here</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '100ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                   
                    <input  name="email"  style={{width:"90%",marginBottom:"12px"}} id="email" label="Enter Your Email"  ref={emailInput} variant="outlined" />
                    <input  name="pass" type="password" style={{width:"90%",marginBottom:"12px"}} id="pass" label="Enter Your Password" ref={passInput} variant="outlined" />


                </Box>
                    <Checkbox defaultChecked /><span>Remember me</span><br></br>
                {
                    data.flag==1 && <Redirect to="/home"/>
                }
                <Button className="mb-5" onClick={submit} variant="contained">Login</Button>
                <Button className="mb-5" onClick={Register} variant="contained">Register</Button>
                {data.register==1 && <Redirect to="/register"/>}
               
                </Card>
            </>
        
    )
}
