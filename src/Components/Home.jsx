import React, { useEffect, useRef, useState } from 'react';
import { Container, Form, FormControl, FormLabel } from 'react-bootstrap';
import Button from '@mui/material/Button';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ReactHtmlParser from 'react-html-parser';
import Navi from './Navi';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch, Link, NavLink, Redirect } from 'react-router-dom';

export default function Home() {
    const createHistory = require("history").createBrowserHistory;
    const history = useHistory()
    console.log(history)
    if(localStorage.getItem("credArr")==undefined){
        let history = createHistory();
            history.push("/");
            let pathUrl = window.location.href;
            window.location.href = pathUrl;   
       }
   
    const fNameInput = useRef(null);
    const lNameInput = useRef(null);

  
    let list=JSON.parse(localStorage.getItem("credArr"));
    const [data, setData] = useState(list.tasks)

    // const sortTasks=()=>{
    //       return  data.sort((a, b) => (b.priority - a.priority))
    // }
  
console.log(list.tasks)

    
    const add = () => {
        let formData = { title: fNameInput.current.value, priority: lNameInput.current.value, }
        if (document.getElementById("title").value == '' || document.getElementById("pri").value == ' ') {
            alert("Please fill out fields");
        }
        else {
           
            setData([ ...data,formData]);
            console.log(formData)
              list.tasks=[ ...data,formData];
               
            localStorage.setItem('credArr', JSON.stringify(list));
            axios.put(`http://localhost:3001/Cred/${list.id}`,list)
            document.getElementById("title").value = " ";
            document.getElementById("pri").value = " ";

        }
    }
    const deletes = (index) => {
        console.log("delete");
        var bool = window.confirm("Do You really want to delele this?")
        if (bool == true) {
            data.splice(index, 1)
            setData([ ...data]);
            list.tasks=[...data]
            localStorage.setItem('credArr', JSON.stringify(list));
            axios.put(`http://localhost:3001/Cred/${list.id}`,list)

        }
    }
    const strike = (index) => {
        data[index].title = `<strike>${data[index].title}</strike>`;
        setData([ ...data]);
        list.tasks=[...data]
        localStorage.setItem('credArr', JSON.stringify(list));
        axios.put(`http://localhost:3001/Cred/${list.id}`,list)
    }


    return (
        <div>
        {   console.log(localStorage.getItem("credArr")==undefined)}
              {/* {localStorage.getItem("credArr")==undefined && <Redirect push to="/"/>} */}
            <Navi />
            <h1 className="text-center">Welcome to Our To Do list</h1>
            <Container>
                <Form>
                    <h3>Add new ToDo</h3>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Add New ToDo" ref={fNameInput} id="title" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">

                        <Form.Control type="number" minlength="1" maxlength="5" placeholder="Enter Priority (1-5)" ref={lNameInput} id="pri" />
                    </Form.Group>

                    <Button className="mx-1" variant="contained" onClick={add}>Submit</Button>

                </Form>
            </Container>
            <Container className="my-2">
                {/* {sortTasks} */}
                <table className="table" border="3">
        <thead>
            <th  style={{ width: "80%" }} >Title</th>
            <th>Action</th>
            {/* <th>Priority</th> */}
            </thead>
                    <tbody>
                        {data.map((task, index) => {
                            return <tr key={index}>
                                <td id="line" style={{fontSize:21}} >{ReactHtmlParser(task.title)}</td>
                                <td style={{fontSize:21}}><CheckOutlinedIcon sx={{ fontSize: 38, cursor: "pointer" }} className="border p-1 mx-1" color="primary" onClick={() => strike(index)} /><CloseOutlinedIcon sx={{ fontSize: 38, cursor: "pointer" }}
                                    onClick={() => deletes(index)} className="border p-1 mx-1 text-danger" /></td>
                                {/* <td style={{ color: "blue" }}>{task.priority}</td> */}
                            </tr>

                        })}
                    </tbody>

                </table>
            </Container>


        </div>
    )
}
