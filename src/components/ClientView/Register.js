import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

//import './index.css'
const useStyles = makeStyles((theme) => ({
    main_div: {
      width:'100%',
      height:'100vh',
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
  
      background: "#c8d6e5",
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
    
    button_hover:{
      backgroundColor:"#20bf6b"
    },

    ol:{
      marginTop:10
    },
    ol_li:{
    textAlign:'left',
    fontSize:'20px',
    fontWeight:500,
    minHeight:'20px',
    display:'flex',
    alignItems:'center',
    textTransform:'capitalize',
    color:'#8566aa'

    }


  }));

function Register(props) {
    const classes = useStyles()


    const handleChange=()=>{
     // alert('hello')
     props.history.push({pathname:'/Login'})
    }
   
    
    return (
        <>
        <div className={classes.main_div}>
          <div className={classes.center_div}>
          <button type="button" style={{ background: 'none', border: 0,
    color: '#fff',
    cursor: 'pointer',
    lineHeight: 'normal',
    padding: '2px',
    left: '20px',
    marginTop:'20px',
    width: '24px',
     height: '24px',}}>
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><title>back/close</title><path fill="#3F414D" d="M1.319 0L0 1.319 6.681 8 0 14.681 1.319 16 8 9.319 14.681 16 16 14.681 9.319 8 16 1.319 14.681 0 8 6.681z"></path></svg></button>

          <h2 style={{fontSize:'36px',fontWeight:700,marginop:'56px',marginBottom:'9px',texAtlign:'left',textTransform: 'none',  color: '#000f1d', opacity:.92}}>  Sign in</h2>  
          <p style={{fontSize:'17px',
    lineHeight:'20px',
    letterSpacing: '.28px',
    color: '#001325',
    opacity: .92,
    paddingBottom:'15px',
    borderBottom: "1px solid '#8566aa' ",
    marginBottom: '15px',}}>
        To quickly find your favourites items, saved addresses and payments.</p>
        <Divider/>
    
        <p style={{    fontSize:'17px',
    lineHeight: '20px',
    letterSpacing: '.28px',
    color: '#001325',
    opacity: .92,
    paddingBottom:'15px',
    marginBottom: '15px'}}>
        Register and earn 2000 reward points</p>

  <div class="login-giftBox"><svg xmlns="http://www.w3.org/2000/svg" width="296" height="160"><title>gift box</title><g fill="none" fill-rule="evenodd"><ellipse cx="148" cy="155.5" fill="#FFF6FA" fill-rule="nonzero" rx="148" ry="4"></ellipse><rect width="133" height="133" x="82" y="23" fill="#FFF6FA" fill-rule="nonzero" rx="66.5"></rect><path fill="#FF4A90" fill-rule="nonzero" d="M112 82h73v74h-73z"></path><path d="M112 82h73v74h-73z"></path><path stroke="#C50060" stroke-width="3.83" d="M148.2 155.5V82.57s-29.33-22.33-23.41-31.26c10.65-16 23.4 31.26 23.4 31.26s15.18-32.62 20.87-34.12c14.13-3.75 4.57 20.57-20.56 33.55"></path><path fill="#E80071" fill-rule="nonzero" d="M163 91h13v6h-13z"></path><path stroke="#C50060" stroke-linecap="square" stroke-width="3.5" d="M114.17 115.78h68.6"></path><circle cx="63" cy="31.71" r="7" fill="#E80071" fill-rule="nonzero"></circle><circle cx="232" cy="14.71" r="7" fill="#92E7E0" fill-rule="nonzero"></circle><path fill="#194476" fill-rule="nonzero" d="M149.92.71l7.79 7.81-7.79 7.81-7.78-7.8z"></path><g fill-rule="nonzero"><path fill="#E80071" d="M205 100v22h9v-17.34z"></path><path fill="#001325" d="M203 120h13v29.5a6.5 6.5 0 11-13 0 NaNvNaNz"></path></g><circle cx="218" cy="68.72" r="5" stroke="#001325"></circle><circle cx="12" cy="58.72" r="5" stroke="#001325"></circle><path fill="#3063A0" fill-rule="nonzero" d="M24 112h59v44H24z"></path><path stroke="#194476" stroke-width="3" d="M41.67 156v-44.03S19.9 97.32 29.4 97.32c9.5 0 12.27 10.21 12.27 10.21s6.67-15.56 12.44-13.3c5.78 2.25-18.56 24.14-18.56 24.14"></path><path stroke="#194476" stroke-linecap="square" stroke-width="3" d="M25.61 141.78H81.6"></path><path fill="#194476" fill-rule="nonzero" d="M55 120h13v6H55z"></path><g><path fill="#92E7E0" fill-rule="nonzero" d="M230 115h59v41h-59z"></path><path stroke="#59B7B7" stroke-linecap="square" stroke-width="3" d="M231.5 141.78h56.02"></path><path stroke="#59B7B7" stroke-width="3" d="M259.68 156v-43.3S237.9 98.28 247.4 98.28s12.28 10.04 12.28 10.04 6.66-15.32 12.43-13.1c5.78 2.22-18.55 23.74-18.55 23.74"></path><path fill="#59B7B7" fill-rule="nonzero" d="M268 120h13v6h-13z"></path></g></g></svg></div>

 <div style={{ position: 'relative',borderColor:'#fff'}}>
 <input type="email"
  style={{ borderRadius: '4px',
    background: '#fc2779',
    fontSize: '18px',
    lineHeight: '24px',
    letterSpacing: '.28px',
    padding: '8px 16px',
    textAlign: 'center',
    width:'94%',
    font:'inherit',
    fontWeight:'inherit',
    fontFamily: 'inherit',
    touchAction:'manipulation',
    boxSizing:'border-box',
    color:'#fff',
    border:'1px solid #fc2799',
    borderRadius:'2px',
}}
     onClick={()=>handleChange()}
     placeholder="Enter Phone Number or Email"/>
 </div>

 <div style={{    margin:'0 0 23px',
    marginTop:'15px',
    display: 'flex',
    boxSizing:'border-box',color: '#3f414d',}}><div style={{    marginRight: 0,
        width: '100%',
        margin: '0 16px 0 0',
        display: 'flex',
        justifyContent: 'center',
        border: "1px solid #ebebeb ",}}>
          <a href = 'http://www.accounts.google.com'> <span> <img style={{marginTop:5,fontWeight:'bold',marginLeft:-10}} src="/googleicon.jpg" width="40" height="40" /></span></a>
        <span style={{fontSize: '18px',
    letterSpacing:'.28px' ,
    color: '#8c8d94',
    textTransform: 'none',
    fontWeight: 700,
    marginRight:-20,
    padding: '8px 8px 8px 34px',
    background:'none',
    boxShadow: 'none',
    marginTop:5,
    cursor: 'pointer',
    textAlign: 'left'}}> Google</span></div> 
    </div>
     <p style={{marginTop: '23px',
    letterSpacing: '.50px',
    fontSize:'14px',
    color: '#001325',
    opacity: '.64',}}>By continuing, you agree that you have read and accept our&nbsp;<a href="./terms-conditions" target="_blank" title="Terms &amp; Conditions">T&amp;Cs</a>&nbsp;and&nbsp;<a href="./privacy-policy" target="_blank" title="Privacy Policy">Privacy Policy</a></p>

          </div>
        </div>
        </>
    )
}

export default Register 



