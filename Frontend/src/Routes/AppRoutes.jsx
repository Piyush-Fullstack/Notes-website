import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import Home from '../pages/Home/Home'
import Notes from '../pages/Notes/Notes'
import CreateNote from '../pages/Notes/CreateNote'
import UpdateNote from '../pages/Notes/UpdateNote'

const AppRoutes = () => {   
  return (
    <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/register" element={<UserRegister />} />
                <Route path="/notes" element={<Notes />} />
                <Route path='/create-note' element = {<CreateNote />} />
                <Route path='/update-note/:id' element = {<UpdateNote />} ></Route>
            </Routes>
    </div>
  )
}

export default AppRoutes