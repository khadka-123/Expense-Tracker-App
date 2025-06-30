import React,{useState,useEffect} from "react";
import {message,Form,Input} from 'antd';
import {Link,useNavigate} from 'react-router-dom';
import Spinner from '../components/Spinner';
import axios from 'axios';

const Login=()=>{

    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()

    const submitHandler=async(values)=>{
       try {
        setLoading(true);
        const {data}=await axios.post("/api/users/login",values)
        setLoading(false)
        message.success('login success')
        //localstorage only stores string so the function json.stringfy()
        //converts javascript objects into json string
        //... is a spread operator it extract all properties of data.user and
        //copies in new object then overwrite password
        localStorage.setItem('user',JSON.stringify({...data.user,password:''}))
        navigate('/')
       } catch (error) {
        setLoading(false)
        message.error("Something went wrong")
       }
    }

    //when a user tries to render to login page it first check if a user exists
    //in local storage if it exits then it directs to homepage no need to register
    useEffect(()=>{
        if(localStorage.getItem("user")){
            navigate("/");
        }
    },[navigate]);

    return (
        <>
        <div className="login-page">
            {loading && <Spinner/>}
        <Form className="form-change"layout="vertical" onFinish={submitHandler}>
            <h2>Login Form</h2>
            <Form.Item label="Email" name="email">
                <Input type="email"/>
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type="password"/>
            </Form.Item>

            <div className="d-flex align-items-center justify-content-between gap-10">
                <Link to="/register" className="text-decoration-none">Not Registered? Click to register</Link>
                <button className="btn btn-primary edit-btn">Login</button>
            </div>
        </Form>
        </div>
        </>
    );
}

export default Login