import React,{useState,useEffect} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {message} from 'antd';

const Header = () => {
  const navigate=useNavigate();

  const [loginUser,setLoginUser]=useState(null);
 useEffect(()=>{
   const user=JSON.parse(localStorage.getItem("user"));

   if(user){
    setLoginUser(user)
   }
 },[])

 const logoutHandler=()=>{
  localStorage.removeItem('user')
  setLoginUser(null);  //added
  message.success("logout successfully")
  navigate('/login')
 }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarTogglerDemo01" 
            aria-controls="navbarTogglerDemo01" 
            aria-expanded="false" 
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand " to="/" >Expense Tracker</Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center height-10">
              <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person me-2" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
</svg>
                <p className="nav-link mb-0" >{loginUser && loginUser.name.charAt(0).toUpperCase() + loginUser.name.slice(1)}</p>
              </li>
              <li className="nav-item">
                <button className=" btn btn-primary logout" onClick={logoutHandler}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
