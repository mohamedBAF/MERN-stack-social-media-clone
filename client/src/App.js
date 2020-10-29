import React,{useEffect,createContext,useReducer} from 'react';
import './App.css';
import {BrowserRouter,Route,Link, Switch,useHistory,useParams} from 'react-router-dom'
import Navbar from './component/navbar';
import Home from './component/screens.js/Home'
import Signin from './component/screens.js/Signin'
import Signup from './component/screens.js/Signup'
import Profile from './component/screens.js/Profile'
import CreatePost from './component/screens.js/CreatePost'
import './patchReact'
import {reducer, initialState} from './reducers/userReducer'


export const UserContext = createContext()







const Routing=()=>{
  const props=useParams()
  const history=useHistory()
  
  const[state,dispatch]=useReducer(reducer,initialState)
useEffect(()=>{

const user=JSON.parse(localStorage.getItem("User"))

if(user){
  
  dispatch({type:"USER",payload:user})
  //  history.push('/')
   return <Route {...props}/> 
}else{
  history.push('/signin')
}

},[])

  
  return    (
  <Switch>
<Route exact path="/">
<Home/>
</Route>
<Route path="/signup">
<Signup/>
</Route>
<Route path="/profile">
<Profile/>
</Route>

<Route path="/signin">
<Signin/>
</Route>
<Route path="/creatpost">
<CreatePost/>
</Route>
</Switch>

  )
}


function App() {


  const[state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    
    <Navbar/>
    <Routing/>

    </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;



