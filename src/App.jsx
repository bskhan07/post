import React from 'react'
import AddPost from './AddPost'
import Post from './Post'
import UpdatePost from './UpdatePost'
import { BrowserRouter, Routes, Route } from "react-router-dom"
const App = () => {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AddPost />} />
        <Route path='/post' element={<Post/>} />
        <Route path='/updatepost' element={<UpdatePost/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App