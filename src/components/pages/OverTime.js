import axios from "axios";
import React, { useEffect, useState } from "react";

const OverTime = () => {
    const [overTime, setOverTime] = useState([]);

    axios.defaults.baseURL = 'http://localhost:8080/';
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

    useEffect(()=>{
        loadOvertime()
    },[])

    const loadOvertime = async () => {
        const result = await axios.get("test/over-time/get-all");
        setOverTime(result.data.data)
        console.log(result.data)
    }
    return (
        <div className="container">
            <div className="py-4">
                <h1>Over time</h1>
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
                    { overTime.map((over, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{over.name}</td>
                                <td>{over.day} </td>
                                <td>{over.work} </td>
                                
                            </tr>
                        ))
                    }
                </tbody>
                </table>
            </div>
        </div>
    )
}
export default OverTime