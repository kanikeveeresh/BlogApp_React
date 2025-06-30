import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from './components/Home/Home'
import './App.css'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import CreatePost from './components/Post/CreatePost'
import ViewEdit from './components/ViewAndEdit/ViewEdit'
import Dashboard from './components/Dashboard/Dashboard'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to='/api/posts' />} />
          <Route path="/api/posts" element={<Home />} />
          <Route path="/api/signup" element={<Register />} />
          <Route path="/api/login" element={<Login />} />
          <Route path="/api/posts/create" element={<CreatePost />} />
          <Route path="/api/posts/:slug" element={<ViewEdit/>} />
          <Route path="api/posts/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
