import React, { useState } from 'react'
import  io  from "socket.io-client";
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useSelector} from 'react-redux';
import { Typography,Box,Grid,TextField,Paper,Button} from '@mui/material';
import moment from 'moment';
import { Link } from 'react-router-dom';




const socket = io('http://localhost:5000')

const Chat = () => {

  const[cha,setc]= useState('')
  const[mes,setm]= useState([''])
  const[bol,setb]= useState(false)
  const[rom,setro]= useState(true)
  const[rome,setr]= useState('')
  const content= useSelector((state)=>state.userinformation)
  const user= content[0].name
  const gender=content[0].Gender
  
  
  
  

  async function chatting(event)

  { 
     
     event.preventDefault()
     
     await socket.emit("chat message", {user,cha,rome,gender})
     var tim= moment().format("dddd, MMMM Do YYYY, h:mm a")
   

     fetch("http://localhost:5000/api/v2/room",{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                  roomname:rome,
                  username:user,
                  message:cha,
                  time:tim,
                  Gender:gender,
                })
            })

  }
    
  socket.on("chat message", (data) => {
                  setb(true)
                setm([
                  ...mes,
                  data
                ]);
               
   });



 


  function living_room(){

        socket.emit("leaveroom",rome)
        socket.off('leaveroom')
        toast.error(`${user} left room ${rome}`)
        setr('')
        setro(prev=>!prev)
        setm([''])

   }

   function go(event)
    {
        event.preventDefault()

        const minlength=6;

        const regex = new RegExp(`^.{${minlength},}$`);

        if (regex.test(rome)) 
        { 
               socket.emit('joinRoom', rome);

               socket.on('roomjoined',(data)=>{
                                  
                                  if(data==='true')
                                  {
                                                      fetch("http://localhost:5000/api/v2/room1",{
                                                        method:'POST',
                                                        headers:{
                                                            "Content-Type":"application/json"
                                                        },
                                            
                                                        body:JSON.stringify({
                                                          roomname:rome,
                                                        })
                                                      })     
                                            
                                                      setro(prev=>!prev)
                                                      toast.success(` ${user} join the metting`, {
                                                                  position:'top-center'
                                                      }); 
                                                      socket.off('roomjoined') 
                                  }     
                                  
                                  else{
                                    toast.error(` Maximum limit of 2`, {
                                      position:'top-center'
                                          });
                                    socket.off('roomjoined')      
                                  }
               })
             
        
      }

      else{

        toast.error(`Room id length should be atlest 6`, {
          position: toast.POSITION.TOP_CENTER
             }); 
      }
             
    }

    

  return (

    <> 

    { rom ? 

                <div style={{backgroundImage:'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEcTJ_-jvs8I0DRqZiQkRXrpiiN9Tdc1TTNlXAcY5ntw&s")',height:'100vh'}}>
                
                      <form onSubmit={go} >
                               
                      

                      
                      
                       
                      <Box sx={{width:'30%',marginLeft:'auto',marginRight:'auto',boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.7)',padding:'10px',borderRadius:'20px',backgroundColor: 'rgba(211, 211, 211, 0.6)',position:'relative',top:'200px','@media (max-width: 600px)': {
                      width: '75%'
                      // Adjust width for smaller screens
                    },
                    '@media (min-width: 601px) and (max-width: 1000px)': {
                      width: '50%', // Adjust width for screens between 601px and 1000px
                    },
                      }}>
                      

                      <Grid spacing={1}> 
                         <Grid item>
                              <Typography varient="h7" color="primary" align="center" fontWeight={'bold'}><strong>Create your Chat Room</strong></Typography>
                        </Grid> 
                        <Grid item xs={12} sm={6} >

                            <TextField
                              required
                              fullWidth
                              sx={{ marginBottom: '20px',marginTop:'20px' }}
                              InputLabelProps={{ style: { color: 'black',fontFamily:'cursive' } }}
                              type="text"
                              label="Room name"
                              value={rome}
                              onChange={(e)=>setr(e.target.value)}
                              placeholder='enter room id'
                              variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                             
                                <button className='rom_button'>Enter</button>

                        </Grid>

                        <br></br>

                        <Grid item xs={12} sm={6}>

                          <Link to='/chat_history' style={{color:'black'}}>Do you want to know chat of any Room?</Link>
                                
                        </Grid>

              
                      </Grid> 

                        
                     
                         
                          </Box>


                      </form>


                 </div>       

            : 
                                <div style={{backgroundImage:'url("https://w0.peakpx.com/wallpaper/106/982/HD-wallpaper-creative-background-green-pattern-whatsapp-thumbnail.jpg")',height:'100vh'}}>
                                      <h2>Welcome to the Chat Room</h2>
                                  
                                      <Button variant="contained" onClick={living_room} >Leave</Button>
                                      <form onSubmit={chatting}>
                                             
                                                      <label>    
                                                          <input
                                                            required
                                                            type="text"
                                                            onChange={(e) => setc(e.target.value)}
                                                            className="in"
                                                            placeholder="enter text"/>

                                                    </label>

                                                    <br></br>
                                                    <br></br>
                                                    <br></br>
                                                    <br></br>

                                                    <button className='bt'>Send</button> 
                                                   
                                      </form>
                                      
                                      {
                                        bol &&
                                            
                                              <div className='scrollable-container'>

                                              


                                                
                                                  {mes.map((message,index) => (

                                                        <>  
                                                        {message.user===user?
                                                                      //Yourself

                                                                     
                                                                      <Paper style={{width:'50%',background:'transparent',boxShadow:'none'}}>     
                                                                             

                                                                             <Box display="flex" alignItems="center"> 
                                                                              {
                                                                                message.gender==="Male"? 
                                                                                <img src="https://img.freepik.com/premium-vector/cute-cartoon-boy-face-vector-design-with-white-background_911078-1734.jpg" alt="" style={{ marginRight: '10px', width: '40px', height: '40px', borderRadius: '50%' }} /> 
                                                                                :
                                                                                <img src="https://img.freepik.com/premium-vector/cute-girl-face-cartoon-style_1639-51505.jpg" alt="" style={{ marginRight: '10px', width: '40px', height: '40px', borderRadius: '50%' }} />
                                                                              }

                                                                                <Typography variant="h7" align='left' color='darkred' fontWeight='bold'>~{message.user}</Typography> 

                                                                             </Box>

                                                                             
      

                                                                              <Paper style={{ padding: '5px', margin: '5px',boxShadow:'none',borderRadius:'15px 30px',backgroundColor: 'rgba(211, 211, 211, 0.5)',textAlign:'left',fontWeight:'bold'}}>
                                                                                    {message.cha}
                                                                              </Paper>

                                                                              <Typography varient="h7" align='right' color='black' fontWeight={'bold'}>~{message.time}</Typography>
                    
                                                              
                                                                      </Paper>:

                                                                    //other user right side
                                                                    
                                                                   
                                                                  
                                                                  <Paper style={{width:'50%',background:'transparent',boxShadow:'none',marginLeft:'auto'}}>
                                                                           
                                                                            

                                                                           

                                                                           <Box display="flex" alignItems="center"> 
                                                                              
                                                                           {
                                                                                message.gender==="Male"? 
                                                                                <img src="https://img.freepik.com/premium-vector/cute-cartoon-boy-face-vector-design-with-white-background_911078-1734.jpg" alt="" style={{ marginRight: '10px', width: '40px', height: '40px', borderRadius: '50%' }} /> 
                                                                                :
                                                                                <img src="https://img.freepik.com/premium-vector/cute-girl-face-cartoon-style_1639-51505.jpg" alt="" style={{ marginRight: '10px', width: '40px', height: '40px', borderRadius: '50%' }} />
                                                                              }
                                                                             

                                                                                <Typography variant="h7" align='left' color='darkred' fontWeight='bold'>~{message.user}</Typography> 

                                                                             </Box>
              
                                                                    
                                                                            <Paper style={{ padding: '5px', margin: '5px',backgroundColor: 'rgba(211, 211, 211, 0.5)',boxShadow:'none',borderRadius:'30px 15px',textAlign:'left',fontWeight:'bold'}}>
                                                                                    {message.cha}
                                                                            </Paper>

                                                                              <Typography varient="h7" align='right' color='black' fontWeight={'bold'}>~{message.time}</Typography>
                                                                             
                                                                  </Paper>}
                                                           
                                                            
                                                        </>
                                                      
                                                  ))}
                                                 
                                                
                                               </div>  
                                              
                                      
                                    }

           
                                </div> 
                                
                                
                                }                       
    </>
    
  )
}


export default Chat




