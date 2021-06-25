import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {postDataAndImage,ServerURL,getData} from '../FetchNodeServices'
import {isEmpty} from '../Checks'
const useStyles = makeStyles((theme) => ({
  root: {
    display:'flex',
    alignContent:'center',
     justifyContent:'center',
     
  },
  headingdiv:{
   display:'flex',
   flexDirection:'column',
   width:'auto',
   padding:3,
   border:'1 solid #000000',
   alignContent:'center',
   justifyContent:'center',
  },
  maindiv:{
     display:'flex',
     alignContent:'center',
     justifyContent:'center',
     flexDirection:'column',
 
     padding:20,
     marginTop:20,
     width:600,
     backgroundColor:'#ecf0f1'

  },
  input: {
    display: 'none',
  },
  large: {
    width:70 ,
    height:70,
    margin:5,
    padding:3,
    
    
  },
  
}));

export default function BrandInterface(props)
{
    const classes = useStyles();
    const [getCategoryId,setCategoryId]=useState('')
    const [getBrandName,setBrandName]=useState('')
    const [getBrandDescription,setBrandDescription]=useState('')
    const [getBrandIcon,setBrandIcon]=useState({fileBytes:'',fileUrl:'/noimage.png'})
    const [getBrandAd,setBrandAd]=useState({fileBytes:'',fileUrl:'/noimage.png'})
    const [getBrandStatus,setBrandStatus]=useState('')
    const [getTopBrand,setTopBrand]=useState('')
    const [getNewBrand,setNewBrand]=useState('')
    const [getList,setList]=useState([])
    const [getMessage,setMessage]=useState()
    const [geterrpic,seterrpic]=useState({ci:'tp.png',bn:'tp.png',de:'tp.png',pi:'tp.png',ad:'tp.png',as:'tp.png',tb:'tp.png',nb:'tp.png'})
    const handleIcon=(event)=>{
    setBrandIcon({fileBytes:event.target.files[0],fileUrl:URL.createObjectURL(event.target.files[0])})

    }
    const handleAd=(event)=>{
      setBrandAd({fileBytes:event.target.files[0],fileUrl:URL.createObjectURL(event.target.files[0])})
  
      }

const fetchcategory=async()=>{
  var result=await getData('category/fetchallcategory')
  setList(result)
}

 function showCategory(){
   return getList.map(item=>(
     <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
   ))

 }

useEffect(function(){
fetchcategory()
},[])

  const handleSubmit=async()=>{
    var error = false
    var ci = isEmpty(getCategoryId)
    var bn = isEmpty(getBrandName)
    var de = isEmpty(getBrandDescription)
    var pi = isEmpty(getBrandIcon.fileBytes)
    var ad = isEmpty(getBrandAd.fileBytes)
    var as = isEmpty(getBrandStatus)
    var tb = isEmpty(getTopBrand)
    var nb = isEmpty(getNewBrand)
    

    if(ci.err)
    {
      error= ci.err
    }
    if(bn.err)
    {
      error=bn.err
    }
    if(de.err)
    {
      error=de.err
    }
    if(pi.err)
    {
      error=pi.err
    }
    if(ad.err)
    {
      error=ad.err
    }
    if(as.err)
    {
      error=as.err
    }
    if(tb.err)
    {
      error=tb.err
    }
    if(nb.err)
    {
      error=nb.err
    }

   seterrpic({ci:ci.img,bn:bn.img,de:de.img,pi:pi.img,ad:ad.img,as:as.img,tb:tb.img,nb:nb.img})
  


  if(!error)
  {
  var formData=new FormData()
    formData.append('categoryId',getCategoryId)
    formData.append('brandName',getBrandName)
    formData.append('description',getBrandDescription)
    formData.append('picture',getBrandIcon.fileBytes) 
    formData.append('ad',getBrandAd.fileBytes) 
    formData.append('adStatus',getBrandStatus) 
    formData.append('topBrands',getTopBrand) 
    formData.append('newBrands',getNewBrand) 
    const config={headers:{'content-type':'multipart/form-data'}}
    var result=await postDataAndImage('brand/brandSubmit',formData,config)
    if(result){
      setMessage("Record Submtted....")
    } 
    else
     { setMessage("Fail to Record Submit")}
    
  }
  else
  {
    alert('fill the all entries')
  }
  }

return(

<div className={classes.root} >
   <div className={classes.maindiv}>
     <div className={classes.headingdiv}>
       <h3>Brand Interface</h3>

     </div>
    <Grid container spacing={2}>
    <Grid item  xs={12} sm={6}>
    <img src={`${geterrpic.ci}`} width='13' height='13'/>
     <FormControl variant="outlined" fullWidth >
        <InputLabel id="demo-simple-select-outlined-label">Category Id</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={getCategoryId}
          onChange={(event)=>setCategoryId(event.target.value)}
          label="Ad Status"
        >
         {showCategory()}
         </Select>
      </FormControl>
    
     </Grid>

         <Grid item xs={12} sm={6}>
         <img src={`${geterrpic.bn}`} width='13' height='13'/>
        <TextField id="outlined-basic" label="Brand Name" variant="outlined"  fullWidth onChange={(event)=>setBrandName(event.target.value)} />
        </Grid>

        <Grid item xs={12}>
        <img src={`${geterrpic.de}`} width='13' height='13'/>
        <TextField onChange={(event)=>setBrandDescription(event.target.value)} id="outlined-basic" label="Brand Description" variant="outlined" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
        <img src={`${geterrpic.pi}`} width='13' height='13'/>
        <input
        accept="image/*"
        className={classes.input}
        id="picture"
        multiple
        type="file"
        onChange={(event)=>handleIcon(event)}
      />
      <label htmlFor="picture">
        <Button variant="contained" color="primary" component="span" >
          Upload Icon
        </Button>
      </label>
 
        </Grid>
      <Grid  style={{display:'flex',justifyContent:'center'}} xs={12} sm={6}>
      <img  src={getBrandIcon.fileUrl}  variant="rounded" className={classes.large} />
       </Grid>
 
    <Grid item xs={12} sm={6}>
    <img src={geterrpic.ad} width='13' height='13'/>
        <input
        accept="image/*"
        className={classes.input}
        id='ad'
        multiple
        type="file"
        onChange={(event)=>handleAd(event)}
      />
      <label htmlFor="ad">
        <Button variant="contained" color="primary" component="span">
          Upload Ad
        </Button>
      </label>
 
        </Grid>
      <Grid  style={{display:'flex',justifyContent:'center'}} xs={12} sm={6}>
      <img  src={getBrandAd.fileUrl}  className={classes.large} />
       </Grid>


     <Grid item  xs={12}>
     <img src={geterrpic.as} width='13' height='13'/>
     <FormControl variant="outlined" fullWidth >
        <InputLabel id="demo-simple-select-outlined-label">Ad Status</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={getBrandStatus}
          onChange={(event)=>setBrandStatus(event.target.value)}
          label="Ad Status"
        >
          <MenuItem value={'No'}>No</MenuItem>
          <MenuItem value={'Yes'}>Yes</MenuItem>
         </Select>
      </FormControl>
    
     </Grid>

<Grid item  xs={12} sm={6}>
<img src={geterrpic.tb} width='13' height='13'/>
     <FormControl variant="outlined" fullWidth >
        <InputLabel id="demo-simple-select-outlined-label">Top Brands</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={getTopBrand}
          onChange={(event)=>setTopBrand(event.target.value)}
          label="Top Brands"
        >
          <MenuItem value={'No'}>No</MenuItem>
          <MenuItem value={'Yes'}>Yes</MenuItem>
         </Select>
      </FormControl>
    
     </Grid>
     
     <Grid item  xs={12} sm={6}>
     <img src={geterrpic.nb} width='13' height='13'/>
     <FormControl variant="outlined" fullWidth >
        <InputLabel id="demo-simple-select-outlined-label">New Brands</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={getNewBrand}
          onChange={(event)=>setNewBrand(event.target.value)}
          label="New Brands"
        >
          <MenuItem value={'No'}>No</MenuItem>
          <MenuItem value={'Yes'}>Yes</MenuItem>
         </Select>
      </FormControl>
    
     </Grid>
     


     <Grid item style={{display:'flex',justifyContent:'center'}} xs={12} sm={6}>
     <Button variant="contained" color="primary" onClick={()=>handleSubmit()}>
      Submit
     </Button>
     </Grid>
     <Grid item style={{display:'flex',justifyContent:'center'}} xs={12} sm={6}>
     <Button variant="contained" color="primary">
      Reset
     </Button>
     </Grid>
     <b>{getMessage}</b>
    </Grid>
    </div>
</div>

)


}
















