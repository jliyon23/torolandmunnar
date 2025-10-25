import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Stay from './pages/Stay'
import RoomDetails from './pages/RoomDetails'
import Contact from './pages/Contact'
import Blogs from './pages/Blogs'
import BlogPost from './pages/BlogPost'
import Activities from './pages/Activities'
import EnquiryPage from './pages/EnquiryPage'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import ImagesManager from './pages/admin/ImagesManager'
import GalleryManager from './pages/admin/GalleryManager'
import HeroSettings from './pages/admin/HeroSettings'
import BlogsManager from './pages/admin/BlogsManager'
import EnquiriesManager from './pages/admin/EnquiriesManager'
import RoomsManager from './pages/admin/RoomsManager'
import ActivitiesManager from './pages/admin/ActivitiesManager'
import TestimonialsManager from './pages/admin/TestimonialsManager'
import TeamManager from './pages/admin/TeamManager'
import DatabaseDebugger from './pages/admin/DatabaseDebugger'

function App() {

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/stay' element={<Stay />} />
        <Route path='/room/:id' element={<RoomDetails />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/blog/:id' element={<BlogPost />} />
        <Route path='/activities' element={<Activities />} />
        <Route path='/enquire' element={<EnquiryPage />} />
        
        {/* Admin Routes */}
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin' element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='images' element={<ImagesManager />} />
          <Route path='gallery' element={<GalleryManager />} />
          <Route path='hero' element={<HeroSettings />} />
          <Route path='blogs' element={<BlogsManager />} />
          <Route path='enquiries' element={<EnquiriesManager />} />
          <Route path='rooms' element={<RoomsManager />} />
          <Route path='activities' element={<ActivitiesManager />} />
          <Route path='testimonials' element={<TestimonialsManager />} />
          <Route path='team' element={<TeamManager />} />
          <Route path='debug' element={<DatabaseDebugger />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
