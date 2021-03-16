import React,{useState,useEffect} from 'react';
import './Login.css';
import {TextField , Button, setRef} from '@material-ui/core';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
import api from '../../client_info.js';
const crypto = require('crypto');


function Login(){
    const [User , setUser] = useState('');
    const [Pass, setPass] = useState('');
    const [UserErr, setUserErr] = useState(false);
    const [UserErrMsg,setUserErrMsg] = useState('');
    const [PassErr, setPassErr] = useState(false);
    const [PassErrMsg,setPassErrMsg] = useState('');
    const [Redirec, setRedirec] = useState(false);

    useEffect(()=>{
        let api_url = `${api.node_url}/api/usr/dashboard`;
        Axios.get(api_url,{"headers":{
            "Accept" : "application/json",
            "content-type":"application/json"
        },withCredentials : true}).then((res)=>{
            console.log('received');
            setRedirec(true);
        }).catch((err)=>{
            console.log('error');
            setRedirec(false);
        });
      },[]);

    const handleChange = (event,param) => {
        let value = event.target.value;
        if(param === 'id'){
            setUser(value);
        }
        else if(param === 'password'){
            setPass(value);
        }
    }
    const handleLogin = () => {
        
        let api_url = `${api.node_url}/api/usr/login`;
        const params = {
            "id" : User,
            "pass" :Pass 
        }
        Axios.post(api_url,params,
        {"headers":{
            "Accept":"application/json",
            "content-type": "application/json"
        }, withCredentials : true}).then((res)=>{
            // console.log(res.data.message);
            setRedirec(true);
        }).catch((e)=>{
            if(e.response.data.code === 0){
                setPassErr(true);
                setPassErrMsg(e.response.data.message);
            }
            else{
                setUserErr(true);
                setUserErrMsg(e.response.data.message);
            }
        })

    }
    return(
        <div className='login'>
            {console.log(Redirec)}
            {Redirec?<Redirect to ="/dashboard"></Redirect>:null}
            <div style = {{textAlign:"center" , backgroundColor:"whitesmoke",paddingLeft:"2%", paddingRight:"2%",paddingTop:"4%",paddingBottom:"4%",borderRadius:"10px"}}>
                <AccessibilityNewIcon color = 'primary' fontSize = 'large'/>
                <h2 className = 'mt-3 mb-5'><b>Sign In to continue</b></h2>
                {UserErr?<TextField error id="outlined-basic" label="User ID" variant="outlined" onChange={(event) => handleChange(event, "id")} style = {{width : '100%'}} helperText = {UserErrMsg}/>:<TextField id="outlined-basic" label="User ID" variant="outlined" onChange={(event) => handleChange(event, "id")} style = {{width : '100%'}}/>}
                {PassErr?<TextField error id="outlined-basic" type = 'password' label="Password" variant="outlined" onChange={(event) => handleChange(event, "password")} style = {{width : '100%'}} helperText = {PassErrMsg} className = 'mt-4'/>:<TextField id="outlined-basic" type = 'password' label="Password" variant="outlined" onChange={(event) => handleChange(event, "password")} style = {{width : '100%'}} className = 'mt-4'/>}
                <Button className = 'mt-3' variant="contained" color="primary" onClick = {handleLogin.bind(this)}>Sign In</Button>
            </div>
        </div>
    );
}

export default Login;