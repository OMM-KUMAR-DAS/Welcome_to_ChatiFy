import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Typography,Grid,TextField,Button,Box} from '@mui/material';


import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';






const Sign = () => {
  
  const navigate = useNavigate();
  const[fort,setf]=useState({name:"",email:"",password:"",phone:"",gender:""})
  
  const [showPassword, setShowPassword] = useState(false);
  
  
  
 
  
  function handleuser(event)
  {
    setf((prev)=>(
      {
          ...prev,[event.target.name]:event.target.value
      }))
   
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  function check(event)
  {
    event.preventDefault()

    const passwordlength=6;
    const phonelength=10;

    const regex = new RegExp(`^.{${passwordlength},}$`);
    const regex1=new RegExp(`^.{${phonelength},}$`);

    if(regex.test(fort.password) && regex1.test(fort.phone))
      {
            
              fetch("http://localhost:5000/api/v1/signupp",{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                  name:fort.name,
                  email:fort.email,
                  password:fort.password,
                  phone:fort.phone,
                  Gender:fort.gender
                })
            })
            .then(respons=>respons.json())
            .then(data=>{
              
                      if(data.success)
                      {
                          toast.success("user created", {
                          position:'top-center'
                        });
                          // sets(prev=>!prev);
                          navigate('/Login')
                      }
                      else{
                        toast.success(`{data.message}`, {
                          position: 'top-center'
                        });
                      }
            
            });
      
      }
      else if(!regex.test(fort.password))
      {
            toast.error("Password length is less than 6", {
              position: 'top-center'
            });
      }
      else{
            toast.error("Phone number is short", {
              position:'top-center'
            });
      }
     
      
  }

return(
    <div style={{backgroundImage:'url("https://img.freepik.com/free-vector/gradient-abstract-wireframe-background_23-2149003418.jpg")', height:'100vh'}} >
     
       
        <form onSubmit={check}>

        

        <Box sx={{display:'flex',justifyContent:'center',alignContent:'center',width:'25%'
             ,marginLeft:'auto',marginRight:'auto',boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.5)',padding:'20px',borderRadius:'10%',backgroundColor: 'rgba(211, 211, 211, 0.4)','@media (max-width: 600px)': {
              width: '80%',
              padding:'0px' // Adjust width for smaller screens
            },
            '@media (min-width: 601px) and (max-width: 1000px)': {
              width: '50%', // Adjust width for screens between 601px and 1000px
            },}}>
        


        <Grid spacing={2}>
              
              <Typography varient="h7" color='black' sx={{marginLeft:'auto',marginRight:'auto'}}><strong>Sign Up</strong></Typography>
              <br></br>

              <Grid>
                     <img src='https://static.vecteezy.com/system/resources/previews/022/216/805/non_2x/face-profile-images-illustration-in-flat-style-free-vector.jpg' alt='' style={{height:'10vh',borderRadius:'35px'}}/>
              </Grid>


              <br></br>
             

              <Grid item xs={12} >
                  <TextField
                    required
                    fullWidth
                    
                    InputLabelProps={{ style: { color: 'black',fontFamily:'cursive' } }}
                    type="String"
                    label="Username"
                    name="name"
                    value={fort.name}
                    onChange={handleuser}
                    placeholder='Enter your name'
                    variant="outlined"
                  />
                </Grid>
               
                <br></br>

              <Grid item xs={12} >
                  <TextField
                    required
                    fullWidth
                    InputLabelProps={{ style: { color: 'black',fontFamily:'cursive' } }}
                    type="email"
                    label="Email"
                    name="email"
                    value={fort.email}
                    onChange={handleuser}
                    placeholder='Enter email'
                    variant="outlined"
                  />
                </Grid>
                
                <br></br>

              <Grid item xs={12}  >




                  <TextField
                      id="outlined-password-input"
                      label="Password"
                      required
                      fullWidth
                      InputLabelProps={{ style: { color: 'black',fontFamily:'cursive' } }}
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={fort.password}
                      onChange={handleuser}
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

                <br></br>
                 
                </Grid>
                
                 <br></br>
                  

                 <Grid item xs={12} >
                  <TextField
                    required
                    fullWidth
                    InputLabelProps={{ style: { color: 'black',fontFamily:'cursive' } }}
                    type="number"
                    label="Phone"
                    name="phone"
                    value={fort.phone}
                    onChange={handleuser}
                    placeholder='Enter phone number'
                    variant="outlined"
                  />
                </Grid>


                <br></br>


                  <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    InputLabelProps={{ style: { color: 'black',fontFamily:'cursive' } }}
                    type="String"
                    label="Gender"
                    name="gender"
                    value={fort.gender}
                    onChange={handleuser}
                    placeholder='Enter gender'
                    variant="outlined"
                  />
                </Grid>



                <br></br>

                 


                
                  
                  <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit">
                          Submit
                        </Button>
                  </Grid>

                <br></br>    
                

                 
                  <Grid item xs={12}>
                       <Link to='/Login'><p style={{color:'black'}}>Already an user</p></Link>
                  </Grid> 

               
          </Grid>  
          </Box>       
        </form>

    </div>
  )
}


export default Sign;