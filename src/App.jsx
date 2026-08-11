import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PostPage from './pages/PostPage'
import MessagePage from './pages/MessagePage'
import NavBar from './navbar/NavBar'
import ReelsPage from './pages/ReelsPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './login/LoginPage'
import ProtectedRoute from './login/ProtectedRoute'
import UserProfile from './pages/UserProfile'
import SearchPage from './pages/SearchPage'
import SearchResult from './pages/SearchResult'
import MessageInput from './pages/MessageInput'
import ShowFollow from './pages/ShowFollow'
import PhotoUploadIcon from './pages/PhotoUploadIcon'
import MyStory from './pages/MyStory'


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'))

  return (
    <>
      <BrowserRouter>
        {isLoggedIn && <NavBar />}
        <Routes>
          <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />

          <Route path="/PostPage" element={
            <ProtectedRoute>
              <PostPage />
            </ProtectedRoute>}
          />

          <Route path="/SearchPage" element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>}
          />
          <Route path="/ReelsPage" element={
            <ProtectedRoute>
              <ReelsPage />
            </ProtectedRoute>}
          />
          <Route path="/ProfilePage" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>}
          />

          <Route path="/ProfilePage/:id" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>}
          />
          <Route path="/UserProfile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>}
          />
          <Route path="/SearchResult" element={
            <ProtectedRoute>
              <SearchResult />
            </ProtectedRoute>}
          />

          <Route path="/messages" element={
            <ProtectedRoute>
              <MessagePage />
            </ProtectedRoute>} />

          <Route path="/messages/:id" element={
            <ProtectedRoute>
              <MessageInput />
            </ProtectedRoute>} />


          {/* <Route path="/CommentPage" element={
            <ProtectedRoute>
              <CommentPage />
            </ProtectedRoute>} /> */}


          <Route path="/ShowFollow" element={
            <ProtectedRoute>
              <ShowFollow />
            </ProtectedRoute>} />

          <Route path="/PhotoUploadIcon" element={
            <ProtectedRoute>
              <PhotoUploadIcon />
            </ProtectedRoute>} />

            <Route path="/MyStory" element={
            <ProtectedRoute>
              <MyStory />
            </ProtectedRoute>} />


        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App