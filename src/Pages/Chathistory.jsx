import { Button, TextField,Box,Paper,Typography} from '@mui/material'
import React, { useState } from 'react'
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Chathistory = () => {

    const[room_idd,setr]=useState('')
    //state for storing array of message objects
    const[allchats,setch]=useState()

    const[isretrived,setre]=useState(false)

    // const navigate=useNavigate()

    


    function getting_chat_history()
    {
              fetch(`http://localhost:5000/api/v2/room2?ROOMNAME=${room_idd}`)
              .then(response => response.json())

              .then(data => {

                
                 
                  if(data.success==='True' && Object.keys(data.message).length>=1)
                  {

                    setch(data.message.items)
                    setre(prev=>!prev)
                  }
                else{
                  toast.error("Room Not Exist or No charts available", {
                    position:'top-center'
                       }); 
                }
                  
                  
              })
              .catch(error => {
                  console.error('There was a problem with the fetch operation:', error);
              });
                      
               
    }

    function deleteit()
    {

      const confirmed= window.confirm("Are you sure want to delete?")

      if(confirmed)
      {
                    fetch(`http://localhost:5000/api/v2/delete_chat?room_id=${room_idd}`, {
                      method: 'DELETE',
                    })
                    .then(response => response.json())
                    .then(data=>{
                        if(data.success==='true')
                        {
                              setch()
                              setre(prev=>!prev)
                              toast.error(`${data.message}`, {
                                position:'top-center'
                                  }); 
              
              
                        }
                    })
                    .catch(error => {
                        
                      console.error('There was a problem with the  operation:', error);
                        
                    });
        }
        else{
             
          toast.success("Deletion cancelled", {
            position:'top-center'
              }); 

        }
      }
     


      



    

  return (

    <div style={{backgroundImage:'url("https://img.freepik.com/premium-vector/black-background-with-abstract-pattern_573652-1358.jpg")',backgroundSize:'cover',backgroundPosition:'center',width:'100%',height:'100vh'}}>

                <Link to='/chat'>
                   <Button varient="outlined" sx={{color:'wheat',display:'flex',justifyContent:'flex-start',backdropfilter: 'blur(10px)', backgroundcolor: 'rgba(255, 255, 255, 0.5)'}} >
                       <ArrowBackIcon style={{ color: 'white', fontSize: '30px' }} />
                   </Button>
                </Link>

                <Box

                sx={{display:'flex',justifyContent:'center',
                alignItems:'center',
                position:'relative',
                top:"20px",
                width:'75%',
                marginLeft:'auto',
                marginRight:'auto'

               }}>


                <TextField
                    required
                    sx={{ 
                        marginRight: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                        borderRadius: '8px',
                        width:'75%'  
                    }}
                    InputLabelProps={{ style: { color:"whitesmoke", fontFamily: 'cursive' } }}
                    inputProps={{ style: { color: 'white', fontFamily: 'cursive' } }} 
                    type="text"
                    label="Room name"
                    onChange={(e) => setr(e.target.value)}
                    placeholder='Enter room id'
                    variant="outlined"
                    />

                   <Button variant='contained' sx={{padding:'10px',borderRadius:'25px'}} 
                   onClick={()=>{
                    if(room_idd.trim()!=='')
                    {
                      getting_chat_history()
                    }
                    else{
                      alert("No room provided")
                    }
                   }}>Search</Button>


                </Box>



               
                {isretrived &&
                
                   <>

                      {allchats.map((message,index) => (



                           <>
             
                                <Paper style={{width:'100%',background:'transparent',boxShadow:'none',marginTop:'50px'
                              }} key={index}>     
                                      

                                      <Box display="flex" alignItems="center"> 
                                        {
                                          message.Sex==="Male"? 
                                          <img src="https://img.freepik.com/premium-vector/cute-cartoon-boy-face-vector-design-with-white-background_911078-1734.jpg" alt="" style={{ marginRight: '10px', width: '40px', height: '40px', borderRadius: '50%' }} /> 
                                          :
                                          <img src="https://img.freepik.com/premium-vector/cute-girl-face-cartoon-style_1639-51505.jpg" alt="" style={{ marginRight: '10px', width: '40px', height: '40px', borderRadius: '50%' }} />
                                        }

                                          <Typography variant="h7" align='left' color='darkred' fontWeight='bold'>~{message.name}</Typography> 

                                      </Box>

                                      


                                        <Paper style={{ padding: '5px', margin: '5px',boxShadow:'none',borderRadius:'15px 30px',backgroundColor: 'rgba(211, 211, 211, 0.5)',textAlign:'left',fontWeight:'bold'}}>
                                              {message.mes}
                                        </Paper>

                                        <Typography varient="h7" align='right' color='whitesmoke' fontWeight={'bold'}>~{message.Time}</Typography>

                        
                                </Paper>

                               


                                
                                


                                
                          </>
                ))}

                 <Button sx={{backgroundColor:'red',color:'whitesmoke',width:'10%',position:'relative',top:'100px'}} onClick={deleteit} >

                      Delete
                                     
                </Button>
               
              </>
            } 





    </div>
  )
}

export default Chathistory