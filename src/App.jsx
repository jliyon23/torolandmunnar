import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Stay from './pages/Stay'
import Contact from './pages/Contact'
import Blogs from './pages/Blogs'
import Activities from './pages/Activities'
import EnquiryPage from './pages/EnquiryPage'
import ScrollToTop from './components/ScrollToTop'

function App() {

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/stay' element={<Stay />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/activities' element={<Activities />} />
        <Route path='/enquire' element={<EnquiryPage />} />
      </Routes>
    </>
  )
}

export default App
