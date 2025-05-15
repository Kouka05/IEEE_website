import './SignUp.css'
import React from 'react';
import { useState } from "react"
import axios from 'axios';

export default function SignUp(){


    const [formData,setformData]=useState({
      name:'',
      email:'',
      phoneNo:'',
      password:'',
      role:'',
      department:'',
    })

    function handleChange (event: React.ChangeEvent<HTMLInputElement>){
            const { name, value } = event.target;
            setformData({...formData,[name]: value, 
            });
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        console.log(formData);
        try {
         const response = await axios.post('http://localhost:8081/api/auth/signup', formData);
         console.log(response.data); 
         let token= response.data;
         localStorage.setItem('token',token["access-token"]);

        //  if (localStorage.getItem('token',token["access-token"]))
        //  {
        //    navigate('/home');
        //  }

          } catch (error) {
            console.error('Error submitting the form:', error);
          }
        };

    return(
    <div className="signup">
             
          <head>
            <title>Sign Up</title>
          </head>

         <div className="signup_img">
            <img src="./Image_1.png"></img>
         </div>
         
       <div className="signup_form">
         <div className="form_logo">
            <img src='./ieee-sscs-sm-ko-logo2x 1.png'></img>
         </div>

    <div className="form_container">
         <h2>Sign up to IEEE</h2>
         <form onSubmit={handleSubmit}>
         {/* Name */}
        <div>
          <input type="text" placeholder='Username' name="name" value={formData.name} onChange={handleChange} required/>
        </div>

        {/* Email */}
        <div>
          <input type="email" placeholder='Email Address' name="email" value={formData.email} onChange={handleChange} required/>
        </div>

        {/* PhoneNo*/}
        <div>
          <input type="tel" placeholder='WhatsApp Number' name="phoneNo" value={formData.phoneNo} onChange={handleChange} required/>
        </div>

        {/* Password */}
        <div>
          <input type="password" placeholder='Password'  name="password" value={formData.password} onChange={handleChange} required/>
        </div>

         {/* Role */}
         <div>
          <input type="text" placeholder='Role' name="role" value={formData.role} onChange={handleChange} required/>
        </div>

         {/*Department*/}
         <div>
          <input type="text" placeholder='Department' name="department" value={formData.department} onChange={handleChange} required/>
        </div>


        {/* Submit Button */}
        <div>
          <button type="submit" className='black_btn'>Continue</button>
        </div>

          <a>Already Have an Account?</a>

        </form>
        </div>
       </div>
    </div>   
    )
}