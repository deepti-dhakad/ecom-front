import React,{useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {pink} from '@material-ui/core/colors'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  
  
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
     color: theme.palette.getContrastText("#fc2779"),
     backgroundColor:"#fc2779"
    },
}))
function QtyCtrl(props){
    const classes = useStyles();

    const [value,setValue]=useState(props.value)
    const handleDecreament=()=>{
      if(value>0){
      var qty=value-1     
       
     setValue(qty)
     props.onChange(value)
      }
    
      }
 const handleIncreament=()=>{
 var qty=value+1  
 setValue(qty)
 props.onChange(value)
 }
 const handleClick=()=>{
   setValue(1)
   props.onChange(1)
 }
    
    return(
      
        <div style={{display:'flex', flexDirection:'row',}}>
      {value==0?(
        <Button variant='contained' 
        onClick={()=>handleClick()}
        style={{display:'flex',justifyContent:'center',alignItems:'center',color:'#fff', width:180, backgroundColor:'#fc2779'}}>
          Add to Cart
        </Button>):(
          <>
         <Avatar  style={{margin:10, }}  onClick={handleIncreament} className={classes.small} > + </Avatar> 
        <div style={{fontWeight:'bold',marginLeft:10,marginRight:10,marginTop:5}}> {value}</div>
        
    <Avatar  style={{margin:10}}   className={classes.small} onClick={handleDecreament} > - </Avatar> 
       </> 
      )}
       </div>
                 
               
    )
}

export default QtyCtrl;
