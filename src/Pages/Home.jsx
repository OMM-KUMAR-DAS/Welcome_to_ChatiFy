import { Typography,Button } from '@mui/material'
// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import React from 'react'

import { Link } from 'react-router-dom'


const Home = () => {
  return (
    <div style={{backgroundColor:'#04151F',width:'100%',height:'100vh'}}>


        <Typography
        sx={{backgroundColor:'red',backgroundImage:'linear-gradient(45deg, #f3ec78, #af4261)',
        backgroundRepeat:'repeat',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent', 
        MozBackgroundClip: 'text',
        MozTextFillColor: 'transparent',
        fontWeight:'bold',fontSize:'80px',position:'relative',top:'60px'}}>Welcome to ChatiFy</Typography>


        <Link to='/auth'><Button variant="contained" sx={{marginTop:'150px'}} >Get Started</Button></Link>

        
    </div>
  )
}

export default Home