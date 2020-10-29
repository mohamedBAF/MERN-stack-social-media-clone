import React,{useEffect,useState,useContext } from 'react';

import {UserContext} from '../../App'

const Profile= ()=>{

    const {state,dispatch} = useContext(UserContext)
const [mypics,setPics]=useState([])
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
           setPics(result.mypost)
       
        
            })
    },[])

return(
<div style={{maxWidth:"800px",margin:"0px auto"}}> 
<div style={{display:"flex",
justifyContent:"space-around",
margin:"18px 0px",
borderBottom:"1px solid grey"}}>
    <div>
        <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
         src="https://images.unsplash.com/photo-1550927407-50e2bd128b81?ixlib=rb-1.2.1ixid=eyJhcHBfaWQiOjEyMDd9auto=formatfit=cropw=500q=60"/>
    </div>
    <div>
<h4>{state?state.name :"loading"}</h4>
        <div style={{display:"flex" ,justifyContent:"space-around"}}>
            <h6>40 posts </h6>
            <h6>40 followers </h6>
            <h6>40 following </h6>
        </div>
    </div>
</div>
<div className="gallery">

    {
        mypics.map(item=>{
            return(
<img className="item" key={item._id} src={item.photo} alt={item.title} />
            )
        })
    }

</div>
</div>

    
)
}
export default Profile