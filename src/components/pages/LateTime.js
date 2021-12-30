import axios from "axios";
import React, { useEffect, useState } from "react";

const LateTime = () => {
    const [lateTime, setLateTime] = useState([]);

    axios.defaults.baseURL = 'http://localhost:8080/';
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

    useEffect(()=>{
        loadLatetime()
    },[])

    const loadLatetime = async () => {
        const result = await axios.get("test/late-time/get-all");
        setLateTime(result.data.data)
        console.log(result.data)
    }
    return (
        <div className="container">
            <div className="py-4">
                <h1>Late time</h1>
                <table class="table border shadow">
                <thead class="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Day</th>
                    <th scope="col">Time late</th>
                    </tr>
                </thead>
                <tbody>
                    { lateTime.map((late, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{late.name}</td>
                                <td>{late.day} </td>
                                <td>{late.work} </td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
            </div>
        </div>
    )
}
export default LateTime