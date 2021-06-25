import React,{useState,useEffect} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { getDefaultNormalizer } from '@testing-library/react';
import { ServerURL, getData, postData } from "../FetchNodeServices";

//import './index.css'
const useStyles = makeStyles((theme) => ({
    main_div: {
      width:'100%',
      height:'100vh',
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
  
      background: "#ebebeb",
    },
    center_div:{
 
      width:'22%',
      height:'100%',
      borderRadius:'15px',
       backgroundColor:'#fff',
      marginTop:'20px',
      marginRight: '-30px',
      marginLeft: '-30px',
      padding: '0 32px',
    },

    form_field_password:{
   position:'relative',
   padding: '15px 0 0',
   marginBottom: '10px',
   flex:1,
   marginTop:'10px',
   color: '#3f414d',
   boxSizing:'border-box',
   display:'block',
   font: '14px/1.42857 Source Sans Pro,sans-serif'
    },
    input_field_password:{
    paddingRight:'45px',  
    borderBottomColor:'red',
    fontFamily: 'text-security-disc,sans-serif', 
    touchAction:'manipulation',
    background: 'transparent',
    border: 0,
    borderBottom: '1px solid #e1e1e1',
    color: '#3f414d',
    fontWeight: 400,
    outline: 0,
    padding: '5px 0 5px 5px',
    width: '85%',
    transition: 'border-color .2s',
    fontSize:'inherit',
    lineHeight:'inherit', 
    },
    label_password:{
     cursor: 'text',
    fontSize: '14px',
    fontWeight: '400',
    top: '24px',
    left:'4px',
    color: '#8c8d94',
    pointerEvents: 'none',
    position:'absolute',
    textTransform:'capitalize',
    transition:'.2s',
    maxWidth:' 95%',
    marginBottom: '5px',
    boxSizing:'border-box',
},
 show_password:{
    display: 'inline-block',
    cursor: 'pointer',
    fontSize: '11px',
    fontWeight: 600,
    position: 'absolute',
    top: '22px',
    right: '5px',
    textTransform: 'uppercase',
    zIndex: 2,
    color:'#3f414d'
 },
 error_section:{
 display:'block', 
 color: '#3f414d',
 font: '14px/1.42857 Source Sans Pro,sans-serif',   
 },

 filed_error:{
    color: 'red',
    display: 'block',
    fontSize: '10px',
    fontWeight: 600,
    textTransform: 'uppercase',
    position: 'absolute',
    bottom: '-15px',
    right: '5px',
    font: '14px/1.42857 Source Sans Pro,sans-serif',
 },
    
    
   
  }));

function SignIn(props) {
    const classes = useStyles()
    const[getUserName,setUserName]=useState('')
    const[getPhoneNumber,setPhoneNumber]=useState('')
    const[getEmail,setEmail]=useState('')
    const[getPassword,setPassword]=useState('')
    const[getMessage,setMessage]=useState('')
    const handleSubmit=async()=>{
       var body={username:getUserName,phonenumber:getPhoneNumber,email:getEmail,password:getPassword}
       var result=await postData('userdetail/userRecord',body)
       if(result){
           setMessage('Record Submitted')
           props.history.replace({pathname:'/Home'})
       }
       else{
           setMessage('Record Not Submitted')
       }
    }
   
    useEffect(function(){
    // console.log(props.history.location.getPhoneNumber)
    },[])

    return (
        <>
        <div className={classes.main_div}>
          <div className={classes.center_div}>


          {/* <section class="screen-with-header"><header class="common-header"><button class="close-btn" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><title>back/close</title><path fill="currentColor" d="M1.319 0L0 1.319 6.681 8 0 14.681 1.319 16 8 9.319 14.681 16 16 14.681 9.319 8 16 1.319 14.681 0 8 6.681z"></path></svg></button><!-- react-text: 409 -->login / register<!-- /react-text --></header><div class="container"><form><div class="form-field-plain error"><input name="emailMobile" value="" placeholder="Enter Email ID or Phone Number" class="input text-center"><svg xmlns="http://www.w3.org/2000/svg" class="success-input-icon" width="16" height="13" viewBox="0 0 16 13"><title>success checkmark</title><path fill="#5cd285" d="M14.563.247l-9.51 9.51L1.437 6.14.247 7.332l4.806 4.806 10.7-10.7z"></path></svg><span class="help-msg">Required</span></div><inputfield name="customerId" value="" hidden="" label="Hidden Id for Masked Email"></inputfield><div class="button-separator"><button type="submit" class="button big fill full "><!-- react-text: 421 -->proceed<!-- /react-text --></button></div></form></div></section> */}

          
         <header style={{borderBottom:'1px solid #ebebeb',
    fontSize: '16px',
    fonWeight: 800,
    marginRight: '10px',
    marginBottom: '7px',
    marginLeft: '10px',
    padding: '25px 10px 15px',
    position: 'relative',
    textAlign: 'center',
    color: '#3f414d',
    textTransform: 'uppercase',}}>
      <button style={{background: 'none',
      border: 0,
      cursor: 'pointer',
      lineHeight: '.8',
      padding: '2px',
      position: 'absolute',
      bottom: '15px',
      left: '5px',}} type="button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><title>back/close</title><path fill="currentColor" d="M1.319 0L0 1.319 6.681 8 0 14.681 1.319 16 8 9.319 14.681 16 16 14.681 9.319 8 16 1.319 14.681 0 8 6.681z"></path></svg></button> Register</header>

<div style={{    textAlign: 'center',
    paddingBottom: '30px',
    marginTop: '20px',
    boxSizing: 'border-box',
    color: '#3f414d',
    font: '14px/1.42857 Source Sans Pro,sans-serif',}}>
    Register to Earn
    <span style={{color: '#fc2779',
    paddingLeft: '5px',
    textAlign:'center',
    font: '14px/1.42857 Source Sans Pro,sans-serif',
    boxSizing:'border-box'
    }}>
        2000&nbsp; Reward Points!
        </span>
        </div>

        <div style={{ position: 'relative',
    padding: '15px 0 0',
    marginBottom: '10px',
    flex:1,
    marginTop:'10px',
    color: '#3f414d',
    boxSizing:'border-box',
    display:'block',
    font: '14px/1.42857 Source Sans Pro,sans-serif',}}>
        <input type="text" name="userName"  
        style={{touchAction:'manipulation',
        background: 'transparent',
        border: 0,
        borderBottom: '1px solid #e1e1e1',
        color: '#3f414d',
        fontWeight: 400,
        outline: 0,
        padding: '5px 0 5px 5px',
        width: '100%',
        transition: 'border-color .2s',
        fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    boxSizing:'border-box',
    font:'inherit',
    margin:0,

        }}
         placeholder="Name" id="userName" 
         onChange={(event)=>setUserName(event.target.value)}
         autocomplete="new-text"/>
    </div>
   
    
 
        <div style={{     position: 'relative',
    padding: '15px 0 0',
    marginBottom: '10px',
    flex:1,
    marginTop:'10px',
    color: '#3f414d',
    display:'block',
    boxSizing:'border-box',
    font: '14px/1.42857 Source Sans Pro,sans-serif'}}>
        <input type="number"
         name="phoneNumber" 
         style={{
    cursor: 'default',
    touchAction: 'manipulation',
    boxShadow: 'none !important',
    background: 'transparent',
    border: 0,
    borderBottom: '1px solid #e1e1e1',
    color: '#3f414d',
    fontWeight: 400,
    outline: 0,
    padding: '5px 0 5px 5px',
    width: '100%',
    transition:'border-color .2s' ,
    fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    font: 'inherit',
    margin: 0,
    boxSizing:'border-box',
         }}
         placeholder="Phone Number " id="" disabled="" autocomplete="new-number"
         onChange={(event)=>setPhoneNumber(event.target.value)}
          value={props.history.location.getPhoneNumber}/>
         
         {/* <label for="" style={{color:'#8c8d94',display:'block',fontSize:'12px',fontWeight:400,top:'3px',left:'5px',position:'absolute',textTransform:'capitalize',transition:'.2s',touchAction:'manipulation',maxWidth:'100%',marginBottom:'5px',boxSizing:'border-box',font:'14px/1.42857 Source Sans Pro,sans-serif',}}>Phone Number </label>*/}
         </div> 
       
         <div style={{ position: 'relative',
    padding: '15px 0 0',
    marginBottom: '10px',
    flex:1,
    marginTop:'10px',
    color: '#3f414d',
    boxSizing:'border-box',
    display:'block',
    font: '14px/1.42857 Source Sans Pro,sans-serif',}}>
        <input type="text" name="customerEmail"  
        style={{touchAction:'manipulation',
        background: 'transparent',
        border: 0,
        borderBottom: '1px solid #e1e1e1',
        color: '#3f414d',
        fontWeight: 400,
        outline: 0,
        padding: '5px 0 5px 5px',
        width: '100%',
        transition: 'border-color .2s',
        fontFamily: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    boxSizing:'border-box',
    font:'inherit',
    margin:0,

        }}
         placeholder="Email Address (Optional)"
          id="customerEmail" 
          onChange={(event)=>setEmail(event.target.value)}
         autocomplete="new-text"/>
    </div>

    <div className={classes.form_field_password}>
        <input type="text" name="password"  onChange={(event)=>setPassword(event.target.value)} className={classes.input_field_password} id="secure-input" placeholder="Create Password" autoComplete='current-password'/>
            {/* <label for="password" className={classes.label_password}>Create Password</label> */}
            <span className={classes.show_password}>show</span>
            <div className={classes.error_section}>
                <span className={classes.filed_error}>Please Enter the passwod</span>
                </div>
                </div>



    <div style={{position: 'relative',
    padding: '15px 0 0',
    marginBottom: '10px',
    flex:1,
    marginTop:'10px',
    color: '#3f414d',
    boxSizing:'border-box',
    display:'block',
    font: '14px/1.42857 Source Sans Pro,sans-serif',}}>
        <button type="button" onClick={()=>handleSubmit()} style={{boxSizing:'border-box',backgroundColor:'#fc2779',color:'#fff',height:'50px',width:'100%',marginTop:'60px',borderRadius:'2px',border:'1px solid #fc2799',fontWeight:700,letterSpacing:'1.5',padding:'8px 20px', textAlign:'center',textTransform:'uppercase',touchAction:'manipulation',fontFamily:'inherit',fontSize:'inherit'}}>register</button></div>

                </div>
        </div>
        </>
    )
}

export default SignIn;



