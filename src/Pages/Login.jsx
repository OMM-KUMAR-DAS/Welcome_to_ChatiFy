import React from 'react'

import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { toast} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import {useDispatch} from 'react-redux';

import {add} from '../store/userSlice';

// import {gett} from '../store/protectedSlice'

import { Link } from 'react-router-dom';

import {Typography,Grid,TextField,Button,Box} from '@mui/material';



import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';









const Login = () => {

  
  
  const navigate = useNavigate();

  const[fort,setf]=useState({email:"",password:""})

  const dispatch= useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  
//   const hh= useSelector((state)=>state.protected)

//   console.log(hh.logged)
  

  function handleuser(event)
  {
    setf((prev)=>(
      {
          ...prev,[event.target.name]:event.target.value
      }))
  }

  function check(event)
  {
    event.preventDefault()

    fetch("http://localhost:5000/api/v1/log",{
    
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                  
                  email:fort.email,
                  password:fort.password
                  
                })
    })
    
        .then(respons=>respons.json())
        .then(data=>{
                  
                    if(data.success)
                    {
                     
                        dispatch(add(data.user))
                        console.log(data.user)
                        // dispatch(gett("true"))
                       
                        navigate('/chat')
                    }
                    
                    else{
                      toast.error(`${data.message}`, {
                        position:'top-center'
                      });
                    }
        });
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };





  return (
    
    <div style={{backgroundImage:'url("https://img.freepik.com/free-vector/halftone-background-with-circles_23-2148907689.jpg?w=996&t=st=1711672835~exp=1711673435~hmac=065eddffaa416fb21b7c3ed121ce3fcb96ac64691966b9ed3191d65255fb14ed")', height:'100vh'}}>
     
         <form onSubmit={check}>
             
            
             <Box sx={{display:'flex',justifyContent:'center',alignContent:'center',width:'25%'
             ,marginLeft:'auto',marginRight:'auto',boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.5)',padding:'5px',borderRadius:'10%', backgroundColor: 'rgba(211, 211, 211, 0.4)',position:'relative',top:'180px','@media (max-width: 600px)': {
              width: '80%',
              padding:'0px' // Adjust width for smaller screens
            },
            '@media (min-width: 601px) and (max-width: 1000px)': {
              width: '50%', // Adjust width for screens between 601px and 1000px
            },}}>
         
                <Grid spacing={1}>
                  <Typography varient="h7" color='black' align="center" gutterBottom ><strong>LOGIN</strong></Typography>

                  <Grid>
                     <img src='https://img.freepik.com/free-vector/boy-cartoon-head-wearing-glasses-isolated_1308-153521.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1709424000&semt=ais' alt='' style={{height:'10vh',borderRadius:'35px'}}/>
                  </Grid>

                  <Grid item xs={12} sm={6} >
                            <TextField
                              required
                              fullWidth
                              sx={{ marginBottom: '20px',marginTop:'20px'}}
                              InputLabelProps={{ style: { color: 'black',fontFamily:'cursive' } }}
                              type="email"
                              label="Email"
                              name="email"
                              value={fort.email}
                              onChange={handleuser}
                              placeholder='Enter your email'
                              variant="outlined"
                            />
                   </Grid>

                     



                  <Grid item xs={12} >
                  <TextField
                      id="outlined-password-input"
                      label="Password"
                      required
                      fullWidth
                      sx={{ marginBottom: '20px' }}
                      InputLabelProps={{ style: { color: 'black',
                     
                      fontFamily:'cursive' } }}
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={fort.password}
                      onChange={handleuser}
                      placeholder='Enter your password'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleTogglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                />
                </Grid>

                      

                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Grid>
                
                       
                      <br></br> 

                <Grid item xs={12}>
                    <Link to='/Sign'><p style={{color:'black'}}>New User</p></Link>
                </Grid> 
            </Grid>

         </Box>       
                     
                     
        </form>
      
   </div>
  )
}

export default Login