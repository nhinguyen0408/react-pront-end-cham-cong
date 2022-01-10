import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Worked = () => {
    const [worked, setworked] = useState([]);
    const [checked, setChecked] = useState([]);
    const [overtime, setOvertime] = useState([]);
    const [latetime, setLatetime] = useState([]);
    const {id} = useParams();

    axios.defaults.baseURL = 'http://localhost:8080/';
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

    useEffect(()=>{
        loadWorked();
        loadChecked();
        loadOvetime();
        loadLatetime();
    },[])

    const loadWorked = async () => {
        const result = await axios.get("test/worked/" + id);
        setworked(result.data.data)
        console.log(result.data)
    }
    const loadChecked = async () => {
        const result = await axios.get("test/time-keeping/" + id);
        setChecked(result.data)
        console.log(result.data)
    }
    const loadOvetime = async () => {
        const result = await axios.get("test/over-time/" + id);
        setOvertime(result.data.data)
        console.log(result.data)
    }
    const loadLatetime = async () => {
        const result = await axios.get("test/late-time/" + id);
        setLatetime(result.data.data)
        console.log(result.data)
    }
    const total = ()=>{
        let total_work = 0;
        worked.forEach((work) =>{
            total_work += work.work
        } )
        return total_work
    }

    return (
        <div className="container">
            <div className="py-4">
                <h1>Worked</h1> 
            <table class="table border shadow">
            <thead class="thead-dark">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Day</th>
                <th scope="col">Work</th>
                </tr>
            </thead>
            <tbody>
                { worked.map((work, index) => (
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{work.name}</td>
                            <td>{work.day} </td>
                            <td>{work.work} h</td>
                            
                        </tr>
                    ))
                }
            </tbody>
            </table>
            Total work: <span class="font-weight-bold">{total()} h</span> 
            </div>
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
                            </tr>
                        ))
                    }
                </tbody>
                </table>

                <h1>Over-time</h1>
            <table class="table border shadow">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Day</th>
                    <th scope="col">Wout-out-time</th>
                    </tr>
                </thead>
                <tbody>
                    { overtime.map((over, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{over.name} </td>
                                <td>{over.day} </td>
                                <td>{over.work} h</td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>

                <h1>Late-time</h1>
            <table class="table border shadow">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Day</th>
                    <th scope="col">Time Late</th>
                    </tr>
                </thead>
                <tbody>
                    { latetime.map((late, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{late.name} </td>
                                <td>{late.day} </td>
                                <td>{late.work} h </td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
        </div>
    )
}
export default Worked