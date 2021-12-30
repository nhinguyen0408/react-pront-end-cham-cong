import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CreateCheckIn = () =>{
    const [employee, setEmployee] = useState([]);
    const [checkIn, setCheckIn] = useState({
        "employeeId": 0,
        "check_in_string": "",
        "check_out_string": ""
    })
    axios.defaults.baseURL = 'http://localhost:8080/';
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


    const {employeeId, check_in_string, check_out_string} = checkIn;

    useEffect(()=>{
        loadEmployee();
    },[])

    const loadEmployee = async ()=>{
        const result = await axios.get("test/employee/get-all");
        setEmployee(result.data);
        
    }
    const onInputChange = e =>{
        setCheckIn({...checkIn, [e.target.name]: e.target.value})
        console.log(e.target.name + e.target.value)
    }
    const onSubmit = async e =>{
        e.preventDefault();
        console.log(JSON.stringify(checkIn))
        await axios.put("/test/time-keeping/create", checkIn)
        // navigate("/");
    }
    return(
        <div className="container">
            <Link class="btn btn-success mt-2" to='/check-in'>Back to Check in</Link>
            <h1>Create Check-in</h1>
            <div className="py-4 d-flex justify-content-center">
                
                <form class="col-6" onSubmit={e=> onSubmit(e)}>
                    <div class="form-group" >
                        <label for="exampleFormControlSelect1">Chose Employee</label>
                        <select class="form-control" id="" name="employeeId"
                        onChange={e => onInputChange(e) }
                        >
                        <option>Select</option>
                        {employee.map((em, index)=>(
                                <option value={em.id}>{em.name}</option>
                            ))}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Check-in time</label>
                        <input type="text" class="form-control" name="check_in_string" placeholder="Enter check in time"
                        value={checkIn.check_in_string}
                        onChange={e => onInputChange(e) }
                        />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Check-out time</label>
                        <input type="text" class="form-control" name="check_out_string" placeholder="Enter check out time"
                        value={checkIn.check_out_string}
                        onChange={e => onInputChange(e) }
                        />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}
export default CreateCheckIn