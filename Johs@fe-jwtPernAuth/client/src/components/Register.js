
import {Fragment} from 'react';
import{ useState} from 'react';
import {Link} from 'react-router-dom'
import classes from "./Register.module.css";
import{ toast } from "react-toastify";


const Register = ({setAuth}) =>{
 //check and collects input values
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    });
    const{ name, email ,password} = inputs;

    const onChange = e =>
        setInputs({...inputs,[e.target.name]: e.target.value});
    

    //submit to restful api to get jwt token
    const onSubmitForm = async e => {
        e.preventDefault();

        try {
             const body = { name ,email ,password}
            const response = await fetch("http://localhost:5000/auth/register",
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
                toast.success("Register successfully!");
               }else{
                   setAuth(false);
                   toast.error(parseRes);
               }

        } catch (err) {
            console.log(err.message);
            
        }
    }

    return(
        <Fragment>
            <div className={classes.boxContainer}>

           
<form onSubmit={onSubmitForm}>
         <div>
             <h3 className={classes.txt}>Create <br/>Account</h3>
            <h5>Please Sign-up to continue </h5>
            <input type="text" name="name" 
            placeholder="name" className={classes.details}
             value={name} required
             onChange={e=> onChange(e)}/>

            <input type="email" name="email"
            placeholder="email" className={classes.details}
            value={email}  required
            onChange={e=> onChange(e)}/>

            <input type="password" name="password" 
            placeholder="password" className={classes.details}
            value={password} required
            onChange={e=> onChange(e)}/>

</div>

            <button className={classes.button2}>Register</button>
            <h5>Don't have an account? <Link className={classes.link} to='/login'>Log in</Link></h5>
            
            </form>
            </div>
  

  
        </Fragment>
    );
};

export default Register;