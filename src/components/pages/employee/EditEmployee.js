import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
    const [shift, setShift] = useState([]);
    const [regency, setRegency] = useState([]);
    const [employee, setEmployee] = useState({
        name: "",
        address: "",
        gender: true,
        email: "",
        phone: "",
        regencyId: "",
        shiftId: ""
    });
    const {id} = useParams();
    const navigate = useNavigate()
    axios.defaults.baseURL = 'http://localhost:8080/';
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

    useEffect(()=>{
        loadEmployee();
        loadRegency();
        loadShift();
    },[])
    const loadRegency = async ()=>{
        const result = await axios.get("test/regency/get-all");
        setRegency(result.data.data);
        console.log(result.data.data)
        
    }
    const loadShift = async ()=>{
        const result = await axios.get("test/shift/get-all");
        setShift(result.data.data);
        
    }

    const loadEmployee = async ()=>{
        const result = await axios.get("test/employee/" + id);
        setEmployee(result.data.data);  
        console.log(employee)     
    }

    const onSubmit = async (e) =>{
        e.preventDefault()
        console.log(employee)
        await axios.put("test/employee/" +id, employee)
        navigate("/employee/"+id)
    }
    const onInputChange = e =>{
        setEmployee({...employee, [e.target.name]: e.target.value})
        console.log(employee)     
        
    }
    const onCheckBoxChange = e => {
        setEmployee({...employee,gender: e.target.value == 1?true : false})
        console.log(employee)     
    }
    return(
        <div className="container">
            <Link class="btn btn-success mt-2" to='/'>Back to Employee</Link>
            <h1 class="mt-5">Edit Employee</h1>
            <div className="py-4 d-flex justify-content-center">
                
                <form class="col-6" onSubmit={e=> onSubmit(e)}>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" class="form-control" name="name" aria-describedby="emailHelp" placeholder="Enter name"
                        value={employee.name} 
                        onChange={e => onInputChange(e) }
                        />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Address</label>
                        <input type="text" class="form-control" name="address" id="exampleInputPassword1" placeholder="Address"
                        value={employee.address} 
                        onChange={e => onInputChange(e) }
                        />
                    </div>
                    <p>Gender</p>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="gender" id="exampleRadios1" 
                        defaultChecked={employee.gender == true ? "checked" : ""}
                        value={1} 
                        onChange={e => onCheckBoxChange(e) }
                        />
                        <label class="form-check-label" for="exampleRadios1">
                            Male
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="gender" id="exampleRadios2" 
                        defaultChecked={employee.gender == true ? "" : "checked"}
                        value={0}  
                        onChange={e => onCheckBoxChange(e) }
                        />
                        <label class="form-check-label" for="exampleRadios2">
                            Female
                        </label>
                    </div>
                        
        
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Enter email"
                        value={employee.email} 
                        onChange={e => onInputChange(e) }
                        />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Phone</label>
                        <input type="text" class="form-control" id="exampleInputPassword1" name="phone" placeholder="Phone"
                        value={employee.phone} 
                        onChange={e => onInputChange(e) }
                        />
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Regnecy</label>
                        <select class="form-control" id="" name="regencyId"
                            value={employee.regencyId}
                             onChange={e => onInputChange(e) }
                        >
                        <option>Select</option>
                        {regency.map((reg, index)=>(
                                <option value={reg.id} de >{reg.name_regency}</option>
                            ))}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Shift</label>
                        <select class="form-control" id="" name="shiftId"
                        value={employee.shiftId}
                        onChange={e => onInputChange(e) }
                        >
                        <option>Select</option>
                        {shift.map((shi, index)=>(
                                <option value={shi.id}>{shi.name_shift}</option>
                            ))}
                        </select>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default EditEmployee;