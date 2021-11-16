import React, { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Alert } from '@mui/material';
import Navi from './Navi';
import axios from 'axios';
import CryptoJS  from 'crypto-js';

export class ChangePassword extends Component {
    
    constructor(props) {
        super(props);
        this.state = { credData: [] ,id:0,isChanged:0}
    }
    
   
    componentDidMount = async () => {
        axios.get("http://localhost:3001/Cred").then((res)=>{
            this.setState({
                 credData:res.data,
            })
        })
      
    }

    handler = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    submit = () => {
        let credData = this.state.credData;
        let i = 0;
        while (i <= Object.keys(credData).length) {
            var bytes  = CryptoJS.AES.decrypt( credData[i].pass, 'secret key 123');
            var originalText = bytes.toString(CryptoJS.enc.Utf8);
            credData[i].pass=originalText;
            credData[i].cPass=originalText;
            if (document.getElementById("email").value == '' || document.getElementById("pass").value == ''|| document.getElementById("Npass").value == ''|| document.getElementById("Cpass").value == '') {
                alert("Please fill the fields");
                break;
            }
            else if(document.getElementById("Npass").value!=document.getElementById("Cpass").value){
                alert("Your Password Does not match");
                break;
            }
            else if ((document.getElementById("email").value == credData[i].email) && (document.getElementById("pass").value == credData[i].pass)) {
                console.log("done");
                let nPass = document.getElementById("Npass").value;
               this.state.id=i+1;
               let ciphertext = CryptoJS.AES.encrypt(nPass , 'secret key 123').toString()
                let credArr = {

                    id:this.state.id,
                    email: document.getElementById("email").value,
                    pass: ciphertext,
                    fName: credData[i].fName,
                    lName: credData[i].lName,
                    uName: credData[i].uName,
                    email: credData[i].email,
                    tasks:credData[i].tasks,
                    cPass:ciphertext
                }
                axios.put(`http://localhost:3001/Cred/${this.state.id}`, credArr)

                console.log(this.state.credData)
                this.state.isChanged=1;
                localStorage.setItem('credArr', JSON.stringify(credArr));
                alert("change  Succcessfully");
                this.setState({ flag: 1 });
                document.getElementById("email").value = ''
                document.getElementById("pass").value = '';

                break;
            }
            
            else {
                console.log("no")
                i++;
                if (i == Object.keys(credData).length) {
                    alert("Your Credientials Does not match please enter correct details");
                    break;
                }
            }
        }
    }
    render() {
        throw new Error("ohh no !")
        const createHistory = require("history").createBrowserHistory;
        if(localStorage.getItem("credArr")==undefined){
            let history = createHistory();
                history.push("/");
                let pathUrl = window.location.href;
                window.location.href = pathUrl;   
           }
        return (
            <>
            {console.log("change")}
                <Navi />
                <h1 className="my-4">Change Your Password here</h1>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '100ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" name="email"  id="email" label="Enter Your Email" onChange={this.handler} variant="outlined" />
                    <TextField id="outlined-basic" name="email" type="password" id="pass" label="Enter Your Current Password" onChange={this.handler} variant="outlined" />
                    <TextField id="outlined-basic" name="pass" type="password" id="Npass"  label="Enter Your New Password" onChange={this.handler} variant="outlined" />
                    <TextField id="outlined-basic" name="pass" type="password" id="Cpass" label="Confirm Password" onChange={this.handler} variant="outlined" />

                </Box>
                <Button className="mb-5" onClick={this.submit} variant="contained">Submit</Button>
                {this.state.isChanged==1 &&  <Redirect to="/"/>}
            </>

        )
    }
}

export default ChangePassword
