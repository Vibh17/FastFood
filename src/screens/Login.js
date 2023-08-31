import React,{ useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
export default function Login() {
  const[credentials,setcredentials]=useState({email:"",password:""})
  let navigate= useNavigate()

    const handlesubmit=async(e)=>{
     e.preventDefault();
   const response = await fetch("http://localhost:5000/api/loginuser",{
    method:'POST',
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({email:credentials.email,password:credentials.password})
   });
   const json =await response.json();
   console.log(json);
   
   if(json.success){
    localStorage.setItem("userEmail",json.credentials.email);
    localStorage.setItem("authtoken",json.authtoken);
    console.log(localStorage.getItem("authtoken"))
    navigate("/");
   }
   else{
    alert("Enter valid Credentials")
   }
   
    }
    const onchange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    } 
  return (
    <div>
      <div className='container'>
            <form onSubmit={handlesubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onchange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control"name='password' value={credentials.password} onChange={onchange}  id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/Signup" className='m-3 btn btn-danger'>New user?</Link>
            </form>
            </div>

    </div>
  )
}
