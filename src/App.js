
import './App.css';

import {Routes,Route } from 'react-router-dom';

import Auth from './Pages/Auth'

import Chat from './Pages/Chat'

import Login from './Pages/Login'

import Sign from './Pages/Sign'

import Chathistory from './Pages/Chathistory';

import Home from './Pages/Home';

// import PrivateRoute from './Pages/PrivateRoute';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';






function App() { 

  
   
  
  return (

    <div className="App">
     
        
                  
                  <Routes>

                     <Route path='/' element={<Home/>}></Route>

                      <Route path='/auth' element={<Auth/>}></Route>

                      <Route path='/Login' element={<Login/>}></Route>

                      <Route path='/Sign' element={<Sign />}></Route>

                      <Route path='/chat' element={<Chat/>}></Route>

                      <Route path='/chat_history' element={<Chathistory/>}></Route>
     
                      <Route path='*' element={<p><strong>This page does not exists</strong></p>}></Route>



                        {/* <Route path='/chat' element={

                             <PrivateRoute>
                                   <Chat/>
                             </PrivateRoute>}
                        ></Route> */}
                             
                     

                  </Routes>
                  
                  <ToastContainer/>

       
    </div>
  );
}

export default App;
