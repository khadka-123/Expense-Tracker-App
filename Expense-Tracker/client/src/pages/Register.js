import React,{useState,useEffect} from 'react';
import { message,Form, Input } from "antd";
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios";
import Spinner from '../components/Spinner';

const Register = () => {
    const navigate=useNavigate()
 
    const [loading,setLoading]=useState(false)

    const submitHandler=async(values)=>{
        try{
            setLoading(true)
            await axios.post('/api/users/register',values)
            message.success("Registration Successfully")
            setLoading(false)
            navigate("/login");
        }catch(error){
            setLoading(false)
            message.error("Email already taken")
        }
    }

    //when a user tries to render to register page it first check if a user exists
    //in local storage if it exits then it directs to homepage no need to register

    useEffect(()=>{
        if(localStorage.getItem("user")){
            navigate("/");
        }
    },[navigate]);

    return (
        <>
            <div className="register-page">
                {loading && <Spinner/>}
                <Form className="form-change" layout="vertical" onFinish={submitHandler}>
                <h1>Register Form</h1>
                    <Form.Item label="Name" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input type="email"/>
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type="password"/>
                    </Form.Item>

                    <div className="d-flex align-items-center justify-content-between gap-10"> 
                    <Link to="/login" className="text-decoration-none">Already registered? Click to Login</Link>
                    <button className="btn btn-primary edit-btn">Register</button>
                    </div>
                </Form>
            </div>
        </>
    );
}

export default Register;
