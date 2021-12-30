import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewEmployee = () => {

    const [employee, setEmployee] = useState({
        name: "",
        address: "",
        gender: true,
        email: "",
        phone: "",
        regencyName: "",
        shiftName: ""
    });
    const {id} = useParams();

    axios.defaults.baseURL = 'http://localhost:8080/';
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

    useEffect(()=>{
        loadEmployee();
    },[])

    const loadEmployee = async ()=>{
        const result = await axios.get("test/employee/" + id);
        setEmployee(result.data.data);       
    }
    return (
        <div className="container">
            <Link class="btn btn-success mt-2" to='/'>Back to Employee</Link>
            <div className="py-4">
                <h1>View Information</h1>
                <div class="alert alert-info font-weight-bold" role="alert">
                Name: {employee.name} <br/>
                </div>
                <div class="alert alert-info font-weight-bold" role="alert">
                Address: {employee.address} <br/>
                </div>
                <div class="alert alert-info font-weight-bold" role="alert">
                Gender: {employee.gender == true ? "Male" : "Female"} <br/>
                </div>
                <div class="alert alert-info font-weight-bold" role="alert">
                Email: {employee.email} <br/>
                </div>
                <div class="alert alert-info font-weight-bold" role="alert">
                Phone: {employee.phone} <br/>
                </div>
                <div class="alert alert-info font-weight-bold" role="alert">
                Regency: {employee.name_regency} <br/>
                </div>
                <div class="alert alert-info font-weight-bold" role="alert">
                shift: {employee.name_shift}<br/>
                </div>         
            </div>
        </div>
    )
}

export default ViewEmployee