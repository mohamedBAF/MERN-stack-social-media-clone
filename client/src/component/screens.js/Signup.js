import React,{useState, Component, useContext} from 'react';
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css'




const Signup = ()=>{
    const history=useHistory()  
const [name,setName]=useState('')
const [password,setPassowrd]=useState('')
const [email,setEmail]=useState('')
const PostData=()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
        return
    }
    fetch("http://localhost:5000/signup",{
    method:"post",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({

        name,
        password,
        email,
    })

}).then(res=>res.json())
.then(data=>{
    if(data.error){
        M.toast({html: data.error,classes:"#c62828 red darken-3"})

    }
    else{
        M.toast({html: data.message,classes:"#43a047 green darken-1"})
        history.push("/signin")
        
    }
})
}


return(

    <div className="my-card input-field">
    <div className=" card auth-card">
        <h2>Instagram</h2>


        <input
type="text"
placeholder="name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>
<input
type="text"
placeholder="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>
<input
type="password"
placeholder="passowrd"
value={password}
onChange={(e)=>setPassowrd(e.target.value)}
/>
<button className="btn purple-gradient" onClick={()=>PostData()} type="submit" name="action">
    Signup
    </button>

    <h5>
    <Link to="/Signin">Already have an account ?</Link>
</h5>
    </div> 
  </div>
)

}
export default Signup