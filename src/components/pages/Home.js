import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
    const [employee, setEmployee] = useState([]);
    const [search, setSearch] = useState({search: ""});
    axios.defaults.baseURL = 'http://localhost:8080/';
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

    useEffect(()=>{
        loadEmployee();
    },[])


    const loadEmployee = async ()=>{
        const result = await axios.get("test/employee/get-all");
        setEmployee(result.data);
        
    }

    const onInputChange = e =>{
        setSearch({[e.target.name]: e.target.value})
        console.log(e.target.name + e.target.value)
    }
    const onSubmit = async e => {
        e.preventDefault();
        console.log(search.search)
        const result = await axios.get("test/employee/?search=" + search.search);
        if(result != null){
            setEmployee(result.data.data);
            return "ket qua tim kiem cho: " + search.search
        }else {
            return <div>Not found !!!</div>
        }
    }
    const deleteEmployee = async (em_id) =>{
        if(window.confirm("Are u sure ??")){
            await axios.delete('test/employee/delete/' + em_id)
            loadEmployee()
        }   
    }

    return(
        <div className="container">
            <form onSubmit={e=> onSubmit(e)}>
            <div class="input-group mb-3 mt-5 border shadow">
                <input type="text" name="search" class="form-control" placeholder="Search" 
                    value={search.search}
                    onChange={e => onInputChange(e)}
                />
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="submit">Search</button>
                </div>
            </div>
            </form>
            <Link type="button" class="btn btn-secondary mt-2" to="/employee/add">Add Employee</Link>
           
            <div className="py-4">
                <h1>Employee</h1>
                
                <table class="table border shadow">
                <thead className="thead-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Regency</th>
                    <th scope="col">Shift</th>
                    </tr>
                </thead>
                <tbody>
                    { employee.map((em, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{em.id}</td>
                                <td>{em.name} </td>
                                <td>{em.address} </td>
                                <td>{em.gender == true ? "Nam" : "Nu"}</td>
                                <td>{em.email} </td>
                                <td>{em.phone} </td>
                                <td>{em.name_regency}</td>
                                <td>{em.name_shift} </td>
                                <td>
                                    <Link class="btn btn-primary mr-2" to={`/employee/${em.id}`}>View</Link>
                                    <Link class="btn btn-outline-primary mr-2" to={`/employee/edit/${em.id}`}>Edit</Link>
                                    <button class="btn btn-outline-danger" onClick={()=> deleteEmployee(em.id)} >Delete</button>
                                    <Link class="btn btn-outline-success" to={`/worked/${em.id}`}>Worked</Link>
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

export default Home;