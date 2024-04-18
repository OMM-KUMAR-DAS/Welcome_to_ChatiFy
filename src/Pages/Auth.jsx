import React from 'react'
import { Link } from 'react-router-dom'
import { Button,ButtonGroup } from '@mui/material'



const Auth = () => {

  return (
    <div style={{backgroundImage:'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRzb51iVDu2puAHPaQ-T4ZhH5guj0vWQJQIgro_JI9Dl_iwQSi0kbilYa-VbuC_UkJW_U&usqp=CAU")', height:'100vh'}}>

          <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group" style={{borderRadius:'25px',position:'relative',top:'250px',padding:'10px',backgroundColor: 'rgba(211, 211, 211, 0.4)'}}>

              <Link to="/Login"><Button variant="contained" style={{marginRight:'15px',borderRadius:'10px'}}>Login</Button></Link>

             

              <Link to="/Sign"><Button variant="contained" style={{marginLeft:'15px',borderRadius:'10px'}} >Signup</Button></Link>


          </ButtonGroup>

    </div>
  )
}

export default Auth