import React,{ useContext } from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../App'


const Navbar = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const history=useHistory("")
const Logout=()=>{

    localStorage.removeItem("User")
    localStorage.removeItem("jwt")
    
}


const renderList=()=>{
   
    if(state){
return [
    <li><Link to="/profile">Profile</Link></li>,
    <li><Link to="/creatpost">Create Post</Link></li>,
    <button className="btn waves-effect waves-light #46b5f6 blue darken-1"  type="submit" name="action" onClick={()=>{

        localStorage.clear()
        dispatch({type:"CLEAR"})
        history.push("/signin")
    }}>
    Logout
    </button>
]
    }else{
return [
    <li><Link to="/signin">Signin</Link></li>,
        <li><Link to="/signup">Signup</Link></li>,
        
        
]
    }
}


    return(
        
          <nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right">
       {renderList()}
      </ul>
    </div>
  </nav>
    ) 
    
}
export default Navbar
