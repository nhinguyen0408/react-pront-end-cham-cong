import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CheckIn = () => {

    const [checked, setChecked] = useState([]);
    const [daySearch, setDaySearch] = useState({day: ""});
    axios.defaults.baseURL = 'http://localhost:8080/';
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

    const navigate = useNavigate();
    useEffect(()=>{
        loadChecked()
    },[])

    const calculation = async () =>{
        await axios.get("test/time-keeping/statistical");
        window.alert("Calculator complete !!! Back to Home => View Worked to see details !!!")
    }
    const loadChecked = async () => {
        const result = await axios.get("test/time-keeping/get-all");
        setChecked(result.data)
        console.log(result.data)
    }
    const onInputChange = e =>{
        setDaySearch({[e.target.name]: e.target.value})
        console.log(e.target.name + e.target.value)
    }
    const onSubmit = async e => {
        e.preventDefault();
        console.log(daySearch.day.length)
        const result = await axios.get("test/time-keeping/?day=" + daySearch.day);
        
        if(result.data.data != null){
            setChecked(result.data.data);
            return "ket qua tim kiem cho: " + daySearch.day
        }else {
            return <div>Not found !!!</div>
        }
    }

    const deleteChecked = async (checked_id) =>{
        if(window.confirm("Are u sure ??")){
            await axios.delete('test/time-keeping/delete/' + checked_id)
            loadChecked()
        }   
    }
    return(
        <div className="container">
            <form onSubmit={e=> onSubmit(e)}>
            <div class="input-group mb-3 mt-5 border shadow">
                <input type="text" name="day" class="form-control" placeholder="Enter a date 'eg: 2021-11-01'" 
                    value={daySearch.day}
                    onChange={e => onInputChange(e)}
                />
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="submit">Search</button>
                </div>
            </div>
            </form>
            <button class="btn btn-outline-success mt-2" onClick={calculation}>Calculation</button><span> </span>
            <Link class="btn btn-success mt-2 " to="/check-in/create" >Create Check-in</Link>
            <div className="py-4">
                <h1>Check-in</h1>
                <table class="table border shadow">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Check-in</th>
                    <th scope="col">Check-out</th>
                    </tr>
                </thead>
                <tbody>
                    { checked.map((check, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{check.id}</td>
                                <td>{check.name} </td>
                                <td>{check.check_in} </td>
                                <td>{check.check_out} </td>
                                <td>
                                    <button class="btn btn-danger" onClick={()=> deleteChecked(check.id)}>X</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
            </div>
        </div>
    );
}

export default CheckIn;