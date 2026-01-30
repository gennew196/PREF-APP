import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from "axios";
import { BASE_URL } from "./constant";

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState([])
    const handleemail = (event) => {
        setValues(prev => ({...prev, email:event.target.value}))
    }
    const handlepassword = (event) => {
        setValues(prev => ({...prev, password:event.target.value}))
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        console.log(errors)
        console.log(values)
        
            console.log("working")
           const res=await axios.post(`${BASE_URL}/login`, values)
           console.log(res)
                  
            if(res.data === "Success") {   
                    navigate('/home');
                   } else {
                      alert("No record exists");
                   } 
       /* if(errors.name === "" && errors.email === "" && errors.password === "") {
            console.log("working")
            axios.post('http://localhost:8081/login', values)
                .then(res => {
                   if(res.data === "Success") {   
                    navigate('/home');
                   } else {
                      alert("No record exists");
                   } 
                })                
                .catch(err => console.log(err));
        }    */    
        
    }
    return (
        <div className='d-flex justify-content-center align-items-center bg-primar vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-in</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email'
                        onChange={handleemail} className='form-control rounded-0'/>
                       { errors.email && <span className='text-danger'> {errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password'
                        onChange={handlepassword} className='form-control rounded-0'/>
                         { errors.password && <span className='text-danger'> {errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
                    <p>You agree to our terms and conditions</p>
                    <Link to='/signup' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
                </form>
            </div>

        </div>
    )
}

export default Login