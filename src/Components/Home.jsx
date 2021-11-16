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
import TextField from '@mui/material/TextField';

export default function Home() {
    const createHistory = require("history").createBrowserHistory;

    if (localStorage.getItem("credArr") == undefined) {
        let history = createHistory();
        history.push("/");
        let pathUrl = window.location.href;
        window.location.href = pathUrl;
    }

    let list = JSON.parse(localStorage.getItem("credArr"));
    const [data, setData] = useState(list.tasks);
    const [update,setUpdate]=useState({
        final:0,
        index:0
    })
    const fNameInput = useRef(null);
    const lNameInput = useRef(null);

    const sortTasks = () => {
        return data.sort((a, b) => (b.priority - a.priority));
        //   console.log(data.sort((a, b) => (b.priority - a.priority)))
    }
    sortTasks()
    console.log(list.tasks)


    const add = () => {
        let formData = { title: fNameInput.current.value, desc: lNameInput.current.value, }
        if (document.getElementById("title").value == '' || document.getElementById("desc").value == ' ') {
            alert("Please fill out fields");
        }
        else {

            setData([...data, formData]);
            console.log(formData)
            list.tasks = [...data, formData];

            localStorage.setItem('credArr', JSON.stringify(list));
            axios.put(`http://localhost:3001/Cred/${list.id}`, list)
            document.getElementById("title").value = " ";
            document.getElementById("desc").value = " ";

        }
    }
    const deletes = (index) => {
        console.log("delete");
        var bool = window.confirm("Do You really want to delele this?")
        if (bool == true) {
            data.splice(index, 1)
            setData([...data]);
            list.tasks = [...data]
            localStorage.setItem('credArr', JSON.stringify(list));
            axios.put(`http://localhost:3001/Cred/${list.id}`, list)

        }
    }
    const strike = (index) => {
        data[index].title = `<strike>${data[index].title}</strike>`;
        setData([...data]);
        list.tasks = [...data]
        localStorage.setItem('credArr', JSON.stringify(list));
        axios.put(`http://localhost:3001/Cred/${list.id}`, list);
    }

    const edit = (index) => {
        setUpdate({final:1,index:index})
        document.getElementById("title").value = list.tasks[index].title
        document.getElementById("desc").value = list.tasks[index].desc
    }

    const updateTask = (position) => {

    if (window.confirm("Are sure you want to update this?")) {
            console.log("final update")
           data[position].title = document.getElementById("title").value;
           data[position].desc = document.getElementById("desc").value;
            setData([...data]);
            list.tasks = [...data];
            localStorage.setItem('credArr', JSON.stringify(list));
            axios.put(`http://localhost:3001/Cred/${list.id}`, list);
            setUpdate({final:0});
            document.getElementById("title").value = " ";
            document.getElementById("desc").value = " ";
        }
    }
    return (
        <div>
        {console.log("home")}
            <Navi />
            <h1 className="text-center">Welcome to my Website</h1>
            <Container>
                <Form>
                    <h3>Add new Category</h3>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Add Title" ref={fNameInput} id="title" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">

                        <Form.Control type="text" placeholder="Category Description" ref={lNameInput} id="desc" />
                    </Form.Group>


{
    update.final==1?<Button className="mx-1" variant="contained" onClick={()=>updateTask(update.index)}>Update</Button>:
    <Button className="mx-1" variant="contained" onClick={add}>Submit</Button>
}
                   

                </Form>
            </Container>
    
            <Container className="my-2">
                <table className="table" border="3">
                    <thead>
                        <th style={{ width: "50%" }} >Title</th>
                        <th style={{ width: "40%" }}>Description</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {data.map((task, index) => {
                            return <tr key={index}>
                                <td  style={{ fontSize: 21 }} >{task.title}</td>
                                <td style={{ color: "blue" }}>{task.desc}</td>
                                <td style={{ fontSize: 21 }}><CheckOutlinedIcon sx={{ fontSize: 38, cursor: "pointer" }} className="border p-1 mx-1" color="primary" onClick={() => edit(index)}
                                /><CloseOutlinedIcon sx={{ fontSize: 38, cursor: "pointer" }}
                                    onClick={() => deletes(index)} className="border p-1 mx-1 text-danger" /></td>
                            </tr>

                        })}
                    </tbody>

                </table>
            </Container>


        </div>
    )
}
