
import {useState} from 'react';
import { Link } from 'react-router-dom'
import classes from './Login.module.css'
import{ toast } from "react-toastify"


const Login =({setAuth})=>{
        //check and collects input values
           const [inputs, setInputs] = useState({
            
               email: "",
               password: ""
           });
           const{ email ,password} = inputs;
       
           const onChange = e =>
               setInputs({...inputs,[e.target.name]: e.target.value});
           
       
           //submit to restful api to get jwt token
           const onSubmitForm = async e => {
               e.preventDefault();
       
               try {
                    const body = {email ,password}
                   const response = await fetch("http://localhost:5000/auth/login",
                   {
                       method: "POST",
                       headers:{"Content-type" :"application/json"
                       },
                       body: JSON.stringify(body)
                   });
                   //parse data for utilization
                   const parseRes = await response.json();
                   //store the token
                   if(parseRes.token){
                    localStorage.setItem("token", parseRes.token)
                    setAuth(true);
                    toast.success("login successfully!");
                   }else{
                       setAuth(false);
                       toast.error(parseRes);
                   }
       
               } catch (err) {
                   console.log(err.message);
                   
               }
           }
    return(

        
           <div className={classes.boxContainer}>
         <form onSubmit={onSubmitForm}>
         <h3 className={classes.txt}>Welcome <br/>Back</h3>
         <h5>Please Login to continue </h5>
         <div>
            <input type="email" name="email"
            placeholder="email" className={classes.details}
            value={email}
            onChange={e=> onChange(e)}
            required/>

            <input type="password" name="password" 
            placeholder="password" className={classes.details}
            value={password}
            onChange={e=> onChange(e)}
            required/>
            <br/>
            <Link className={classes.link} to='/forget'><h5>Forgot your password?</h5></Link> 
            </div>
            <button className={classes.button2}>Login</button>
            <h5>Don't have an account? <Link to='/signin' className={classes.link}>Sign in</Link> </h5>
            </form>
            </div>
        
    );


}

export default Login;