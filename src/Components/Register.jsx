import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { Container, Form,FormControl,FormLabel } from 'react-bootstrap';
import { Redirect } from 'react-router';
import Button from '@mui/material/Button';
import axios from 'axios'

export default function Register() {
    const fNameInput = useRef(null);
    const lNameInput = useRef(null);
    const uNameInput = useRef(null);
    const emailInput = useRef(null);
    const passInput = useRef(null);
    const cPassInput = useRef(null);
    const [data, setData] = useState({
        credData: [],
        isLoggedIn: 0
    })

    const register = () => {

        if (document.getElementById("fName").value == '' || document.getElementById("lName").value == '' || document.getElementById("uName").value == '' || document.getElementById("email").value == '' || document.getElementById("pass").value == '' || document.getElementById("cPass").value == '') {
            alert("Please fill all fields")
        }
        else if(document.getElementById("pass").value!=document.getElementById("cPass").value){
            alert("Password and confirm should match");
        }
        else {
            let formData = { fName: fNameInput.current.value, lName: lNameInput.current.value, uName: uNameInput.current.value, email: emailInput.current.value, pass: passInput.current.value, cPass: cPassInput.current.value,tasks:[] };
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
    const login = () => {
        setData({ isLoggedIn: 1 })
    }
    return (
        <>

           <Container fluid style={{width:"600px",margin:"70px auto"}}>
               <h1>Hey New user! Register here</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Enter first name" ref={fNameInput} id="fName" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                
                    <Form.Control type="text" placeholder="Enter Last name" ref={lNameInput} id="lName" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                
                    <Form.Control type="email" placeholder="Enter Username" ref={uNameInput} id="uName" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  
                    <Form.Control type="text" placeholder="Enter Email" ref={emailInput} id="email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  
                    <Form.Control type="password" placeholder="Enter Password" ref={passInput} id="pass" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                   
                    <Form.Control type="password" placeholder="Confirm Password" ref={cPassInput} id="cPass" />
                </Form.Group>
                <Button className="mx-1" variant="contained" onClick={register} >Register</Button>
            <Button className="mx-1" variant="contained" onClick={login}>Login</Button>
                
            </Form>
           
            </Container>

  
            {data.isLoggedIn == 1 && <Redirect to="/" />}




        </>
    )
}