import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from "./pages/Register";
import Login from './pages/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<ProtectedRoutes><HomePage /></ProtectedRoutes>} />
      </Routes>
    </>
  );
}

export function ProtectedRoutes(props){
  if(localStorage.getItem('user')){
    return props.children; //props.children is <HomePage />.
  }else{
    return <Navigate to="/login"/>
  }
}

export default App;
