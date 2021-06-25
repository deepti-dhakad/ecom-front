import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { makeStyles,Typography } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import {ServerURL,getData,postData,postDataAndImage} from './FetchNodeServices'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';



const useStyles = makeStyles((theme) => ({
    root: {
      display:'flex',
      alignContent:'center',
       justifyContent:'center',
       
    },

    subdiv:{
        display:'flex',
        // alignContent:'center',
        //  justifyContent:'center',
         padding:20,  
         width:'100px', 
         marginLeft:'10px' ,
         marginRight:'10px',
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
}))  

export default function DisplayTracking(props)
{ 
    const [data, setData] = useState([])
    const [selectedDate1, setSelectedDate1] = React.useState(new Date('2014-08-18T21:11:54'));
    const [selectedDate2, setSelectedDate2] = React.useState(new Date('2014-08-18T21:11:54'));

    

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    
    const [columns, setColumns] = useState([


        { title: 'Transaction Id', field: 'transactionid' },
       
        // { title: 'TDate', field: 'tdate' },
        // { title: 'TTime', field: 'ttime' },
          
        { title: 'Employee Id', field: 'emplyeeid',render: rowData=><div><div>{rowData.employeeid}</div><div>{rowData.vendorid}</div></div>},
        { title: 'Latitude', field: 'latitude',render: rowData=><div><div>{rowData.latitude}</div><div>{rowData.longtitude}</div></div>},
        { title: 'TDate', field: 'tdate',render: rowData=><div><div>{rowData.tdate}</div><div>{rowData.ttime}</div></div>},
        { title: 'Task Id', field: 'taskid' },
        { title: 'Task Id', field: 'taskid' },
      ]);

      const fetchAllTracking=async()=>{
          var result=await getData('tracking/displayAll')
          setData(result)
      }
      useEffect(function(){
          fetchAllTracking()
       
      },[])

      const handleDateChange1 = async(date) => {
        setSelectedDate1(date);
      
      };
      const handleDateChange2 = async(date) => {
        setSelectedDate2(date);
      
      };

      // const handleDate=async(event)=>
      // {
      //  // setDate(event.target.value)
      //  // var transactionid=event.target.value
        
      
      //   var result=await postData('tracking/trackdate')
      //   if(result)
      //   {
      //     await setData({data:result})
      //   }
      // }
function Editable() {
  
 
    return (
        
      


  <Paper className={classes.root}>
   
  <React.Fragment>
  
      <Grid container xs={24} spacing={3}>
     
    
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid item xs={12} sm={6}>
      <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
           value={selectedDate1}
           onChange={handleDateChange1}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </Grid>

        <Grid item xs={12} sm={6}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate2}
          onChange={handleDateChange2}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </Grid>
        </MuiPickersUtilsProvider>

      <div className={classes.subdiv}>


        
      <MaterialTable
      
       title="Model List"
       
        columns={columns}
        data={data}

        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit',
            onClick: (event, rowData) => {
            
            }
          }
        ]}
        
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                
                resolve();
              }, 1000)
            }),

          
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
              
                resolve()
              }, 1000)
            }),
        }}
      /> 
       </div>

     
 


</Grid>  

    </React.Fragment>
  
    </Paper>
   )
  
  }

return(
<div className={classes.root}>
{Editable()}

</div>)


}