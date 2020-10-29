import React,{useState,useEffect,useContext} from 'react';
import jQuery from 'jquery'

import {UserContext} from '../../App'
const Home= ()=>{
    
    const {state,dispatch} = useContext(UserContext)
    const [data,setData]=useState([])
    useEffect(()=>{
        ;(function($){
  
            function clickHandler() {
              $(this).parents('.buton-cover').toggleClass('is_active');
            }
          
            $('.btn').on('click', clickHandler);
          
          }(jQuery));


          
        fetch('/allpost',{
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
           
        setData(result.posts)
        
            })
    },[])


    const likesPost=(id)=>{
        fetch("/like",{
      method:"put",
      headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
  
          
          postId:id
         
      })  
  
  }).then(res=>res.json())
  .then(result=>{
    //   console.log(result)
    const newData=data.map(item=>{
        if(item._id==result._id){
            return result
        }
        else{
            return item
        }
    })
    setData(newData )
      
  })
  .catch(err=>{
    console.log(err)
  })

    }

    const unlikesPost=(id)=>{
        fetch("/unlike",{
      method:"put",
      headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
  
          
          postId:id
         
      })  
  
  }).then(res=>res.json())
  .then(result=>{
    //   console.log(result)
      const newData=data.map(item=>{
          if(item._id==result._id){
              return result
          }
          else{
              return item
          }
      })
      setData(newData)
  })
  .catch(err=>{
    console.log(err)
  })

    }


    
    const makeComment=(text,postId)=>{
        fetch("/comment",{
      method:"put",
      headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
  
          
          postId,
          text,
         
      })  
  
  }).then(res=>res.json())
  .then(result=>{
    //   console.log(result)
      const newData=data.map(item=>{
          if(item._id==result._id){
              return result
          }
          else{
              return item
          }
      })
      setData(newData)
  })
  .catch(err=>{
    console.log(err)
  })

    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }


    
        
const del=()=>{
    return(

        
        <div className="buton-cover button-3d">
          <button className="btn btn--primary">
            <div className="btn__txt--inactive">Delete</div>
            <div className="btn__txt--active">Are you sure?</div>
          </button>
          <div className="button-3d__dropdown">
            <div className="button-set">
              <button className="btn btn--primary" routerlink="/login">Delete</button>
              <button className="btn btn--gray">Cancel</button>
            </div>
          </div>
        </div>
      
       
    );
  }
    




return(
    
    
    
    <div className="home">

        {

            data.map(item=>{
                
                return(

                    
             <div className="card home-card" key={item._id}>
      
<h5>{item.postedBy.name}
{item.postedBy._id== state._id   &&    

<i className="material-icons" style={{float:"right"}} 
onClick={()=>deletePost(item._id)}
>delete</i>

}

</h5>

<div className="card-image">
    <img src={item.photo}/>
</div>
<div className="card-content">
<i className="material-icons" style={{color:"red"}}>favorite</i>
{item.likes.includes(state._id)
?<i className="material-icons"
onClick={()=>{unlikesPost(item._id)}}
>thumb_down</i>
:
<i className="material-icons" 
onClick={()=>{likesPost(item._id)}}
>thumb_up</i>
}


                <h6>{item.likes.length} likes</h6>
                <h6>{item.title}</h6>
                <p>{item.body}</p>


                {
                    item.comments.map(record=>{
                        return (
                        <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span>{record.text }</h6>
                        )
                    })
                }
    <form onSubmit={(e)=>{
        e.preventDefault()
        makeComment(e.target[0].value,item._id)
    }}>

    <input type="text" placeholder="add a comment"/>
    </form>
 
</div>
</div>
                ) 
            })
        }


    </div>
)
}
export default Home