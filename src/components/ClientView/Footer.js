import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {getData}  from '../FetchNodeServices'


const useStyles = makeStyles((theme) => ({
  
     footerpaper: {
      height:'400',
      background:'#e67e22',
          
    },
    footerpaper1: {
        height:'auto',
        background:'#7f8c8d',
            
      },
    nykaa:{

        marginBottom:1,
        paddingTop:5,
        fontSize:20,
        color:'#fff'
    },
    line1:{
    paddingBottom:5,
    fontSize:12,
   paddingTop:8,
    color:'#fff'
    },
    line2:{
        paddingTop:'0.5px',
        fontSize:12,
        color:'#fff'
        
        },
        container1:{
        background:'#fff',
        height:150,
        },
        container2:{
            background:'#f53b57',
            height:'auto',
            },
            container3:{
              background:'#353b48',
              height:150,
              },  
        container3box:{
        paddingTop:20,
        fontSize:14,
       
        color:'#fff',
        paddingLeft:500,
                },          
            termscondition1:{
              fontSize:14,
              fontStyle:'italic',
              alignItems:'center',
              alignSelf:'center',
              justifyContent:'center',
              paddingLeft:300,
              paddingTop:15,
              color:'#fff'
            },
            termscondition2:{
              fontSize:14,
              color:'#fff',
              paddingLeft:450,
              paddingBottom:20,
              paddingTop:10,
            },
            termscondition3:{
              fontSize:14,
              alignItems:'center',
              alignSelf:'center',
              justifyContent:'center',
              
            },
           logo:{
            color:'red',
            fontSize: 4,
            background: '#f53b57',
            height: 50,
            width: 50,
            borderRadius: 50,
            position: 'absolute',
            textalign: 'center',
          //  position: 'absolute',
          
           },
           brand:{
             fontSize:14,
             fontWeight:'bold',
             paddingLeft:50
           }
}));



export default function Footer() {
    const classes = useStyles();
    const [getList,setList]=useState([])
    const fetchData=async()=>{
        var result=await getData('category/fetchallcategory')
            setList(result)   
      }
    
    useEffect(function(){
    fetchData()

    },[])
    const displayAllCategoriesInFooter=()=>{
        return(        
              getList.map((item,key)=>{
            return(
              
               <div className={classes.mainmenuitems}><font size='2'><p>{item.categoryname}</p></font></div>
              
            ) })
         )   
      }
     
     
      const footer=()=>{
            
        return(
          <div>
          
        <Paper className={classes.footerpaper} >


        <div className={classes.container3}>
        <div className={ classes.container3box}>
           <img style={{paddingTop:10}}  src="apple1.jpg" width="30" height="30"/> &nbsp; EXPERIENCE THE NYKAA MOBILE APP
        <br/>
        <img style={{paddingTop:10}} src="googleplaystore.png" width="110" height="40"/> &nbsp; &nbsp;
        <img style={{paddingTop:10}} src="apple.png" width="110" height="40"/>
          </div>
          </div>



        <div className={classes.footerpaper1}>
         <Grid container cellspacing={1}>
       

            <Grid item xs={2} style={{paddingTop:'5px',paddingLeft:'70px',paddingBottom:5}}>
           
            <div className={classes.nykaa}>   <img src="nykaa.svg" width="70" height="70" /></div>
            <div className={classes.line2}>
          <p >  WHO ARE WE </p>
          <p> CAREERS</p>
          <p>  AUNTHENTICITY</p>
          <p>  PRESS</p>
          <p>  TESTIMONIALS</p>
          <p>  NYKAA CSR</p>
          <p>  RESPONSIBLE DESCLOUSRE </p>  
            </div>    
           
            </Grid>

             <Grid item xs={2} style={{paddingTop:'10px',paddingLeft:'20px'}}>
           
           <h5 style={{paddingTop:8}}>HELP</h5> 
           {/* <font size='2'> */}
           <div className={classes.line1}>
         <p>  CONTACT US </p>
         <p> FREQUENTLY ASKED QUESTIONS</p>
         <p>  STORE LOCATOR</p>
         <p>  CONCELLATION & RETURN</p>
         <p>  SHIPPING & DELIVERY</p>
          
           {/* </font>     */}
          </div>
           </Grid>

            <Grid item xs={2} style={{paddingTop:'10px',paddingLeft:'10px'}}>
            <h5 style={{paddingTop:8}}>INSPIRE ME</h5>    
            <div className={classes.line1}>
          <p>  BEAUTY BOOK</p>
          <p>  NYKAA TV</p>
          <p>  NYKAA NETWORK</p>
          <p>  ROUTINE FOUNDER</p>
          <p>  BUYING GUIDES </p>  
            </div>                 
            </Grid>

               <Grid item xs={2} style={{paddingTop:'10px',paddingLeft:'20px'}}>
            <h5 style={{paddingTop:8}}>QUICK LINKS</h5>    
            <div className={classes.line1}>
            <p>   OFFER ZONE</p>
            <p>  NEW LAUNCHES</p>
            <p>  NYKAA MAN</p>
            <p>  NYKAA FASHION</p>
            <p>  NYKAA PRO</p>   
            <p>  NYKAA FEMINA BEAUTY</p>
            <p>  SITEMAP</p>
            </div>                 
            </Grid>

             <Grid item xs={2} style={{paddingTop:'10px',paddingLeft:'20px'}}>
           
           <h5 style={{paddingTop:8}}>TOP CATEGORIES</h5> 
           <div className={classes.line1}>

          {displayAllCategoriesInFooter()}
                 
           </div>    
      
           </Grid>
        
         </Grid>


          <div className={classes.container1}>
        <div className={classes.logo}>
           <img  src="deliverysign.jpg" width="30" height="30"/>
       
          </div>
          <div className={classes.brand} >1500+BRANDS<br/>
          </div>
          Well Curated 3Lakh + Products
          </div>

    
    <div className={classes.container2}>

   
     <div className={classes.termscondition1}>
     {/* <a href="/terms-conditions" target="_blank">Terms &amp; Conditions</a> */}
     TERMS & CONDITIONS &nbsp; &nbsp; &nbsp;  SHIPPING POLICY &nbsp; &nbsp; &nbsp; CANCELLATION POLICY &nbsp; &nbsp; &nbsp; PRIVACY POLICY
     </div>
     <div className={classes.termscondition2}>
     © 2021 Nykaa E-Retail Pvt. Ltd. All Rights Reserved
     </div>
    
         {/* <Grid item xs={12} style={{paddingTop:'10px'}}>
       <div className={classes.termscondition1}> TERMS & CONDITIONS </div>
         </Grid>

         <Grid item xs={12} style={{paddingTop:'10px',paddingLeft:300}}>
       <div className={classes.termscondition2}>
         SHIPPING POLICY
         </div>
         </Grid>

             <Grid item xs={12} style={{paddingTop:'10px',paddingLeft:400}}>
       <div className={classes.termscondition3}>
     <h3>  CANCELLATION POLICY</h3>
         </div>
         </Grid> */}

           </div>







          </div>

            </Paper>

           </div>            
        )
        }
    

        return(
         <div>
             {footer()}
         </div>

        )

}
