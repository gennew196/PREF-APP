import {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';
import Validation from "./SignupValidation";
import axios from 'axios';
import { BASE_URL } from "./constant";

function Signup() {

 const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const [errors, setErrors] = useState([])
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]:event.target.value}))
    }
    const handleSubmit =(event) =>{
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.name === "" && errors.email === "" && errors.password === "") {
            axios.post(`${BASE_URL}/signup`, values)
                .then(res => {
                       navigate('/');
                })                
                .catch(err => console.log(err));
        }
    }




    return (
        <div className='d-flex w-100 vh-100 bg-primary justify-content-center align-items-center'>
                <div className='bg-white p-3 rounded w-25'>
                    <h2>Sign-Up</h2>
                    <form action="" onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="name"><strong>Name</strong></label>
                            <input type="text" placeholder='Enter Name' name='name'
                            onChange={handleInput} className='form-control rounded-0'/>
                            { errors.name && <span className='text-danger'> {errors.name}</span>}
                        </div>
                         <div className='mb-3'>
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input type="email" placeholder='Enter Email' name='email'
                            onChange={handleInput} className='form-control rounded-0'/>
                            { errors.email && <span className='text-danger'> {errors.email}</span>}
                          </div>
                          <div className='mb-3'>
                            <label htmlFor="password"><strong>Password</strong></label>
                            <input type="password" placeholder='Enter Password' name='password'
                            onChange={handleInput} className='form-control rounded-0'/>
                            { errors.password && <span className='text-danger'> {errors.password}</span>}
                          </div>
                          <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>
                          <p>You agree to our Terms and Conditions</p>
                          <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-no'>Login</Link>
                    </form>
                </div>

         </div>
    )
}

export default Signup; 
