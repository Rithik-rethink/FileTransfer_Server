import React,{useState} from 'react';
import './Login.css';
import {TextField , Button} from '@material-ui/core';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import Axios from 'axios';
import api from '../../client_info.js';


function Login(){
    const [User , setUser] = useState('');
    const [Pass, setPass] = useState('');
    const [UserErr, setUserErr] = useState(false);
    const [UserErrMsg,setUserErrMsg] = useState('');
    const [PassErr, setPassErr] = useState(false);
    const [PassErrMsg,setPassErrMsg] = useState('');

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
        console.log(User);
        console.log(Pass);
        let api_url = `${api.node_url}/api/usr/login`;
        Axios.get(api_url,{"headers":{
            "Accept" : "application/json",
            "content-type":"application/json"
        }}).then((res)=>{
            console.log(res.data.message);
        }).catch((err)=>{
            console.log(err.message);
        });
        const params = {
            "id" : User,
            "pass" : Pass 
        }
        Axios.post(api_url,params,
        {"headers":{
            "Accept":"application/json",
            "content-type": "application/json"
        }}).then((res)=>{
            console.log(res.data.message);
        }).catch((e)=>{
            console.log(e.message);
        })

    }
    return(
        <div className='login'>
            <div style = {{textAlign:"center" , backgroundColor:"whitesmoke",paddingLeft:"2%", paddingRight:"2%",paddingTop:"4%",paddingBottom:"4%",borderRadius:"10px"}}>
                <AccessibilityNewIcon color = 'primary' fontSize = 'large'/>
                <h2 className = 'mt-3 mb-5'><b>Sign In to continue</b></h2>
                {UserErr?<TextField error id="outlined-basic" label="User ID" variant="outlined" onChange={(event) => handleChange(event, "id")} style = {{width : '50%'}} helperText = {UserErrMsg}/>:<TextField id="outlined-basic" label="User ID" variant="outlined" onChange={(event) => handleChange(event, "id")} style = {{width : '100%'}}/>}
                {PassErr?<TextField error id="outlined-basic" type = 'password' label="Password" variant="outlined" onChange={(event) => handleChange(event, "password")} style = {{width : '50%'}} helperText = {PassErrMsg} className = 'mt-4'/>:<TextField id="outlined-basic" type = 'password' label="Password" variant="outlined" onChange={(event) => handleChange(event, "password")} style = {{width : '100%'}} className = 'mt-4'/>}
                <Button className = 'mt-3' variant="contained" color="primary" onClick = {handleLogin.bind(this)}>Sign In</Button>
            </div>
        </div>
    );
}

export default Login;