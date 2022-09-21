import React, {useState, useContext, useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import TopBar from "./components/TopBar";
import { observer } from 'mobx-react-lite'
import {Context} from './index'
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";

const App = observer( () => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
      if(localStorage.getItem('token'))
      {
        user.checkAuth()
      }

      check().then(data=>{
        user.setUser(data)
        //user.setIsAuth(true) 
      }).finally(()=>setLoading(false)) 
  }, [])

  if(loading) {
    return <Spinner animation={"grow"}/>
  }

  return (
    <BrowserRouter>
      <TopBar />
      <AppRouter />
    </BrowserRouter>
    );
});

export default App;
