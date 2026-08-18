import React, { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './navbar/NavBar'
import ProtectedRoute from './login/ProtectedRoute'

// Code Splitting: lazy load all page components
const PostPage = lazy(() => import('./pages/PostPage'))
const MessagePage = lazy(() => import('./pages/MessagePage'))
const ReelsPage = lazy(() => import('./pages/ReelsPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const LoginPage = lazy(() => import('./login/LoginPage'))
const UserProfile = lazy(() => import('./pages/UserProfile'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const SearchResult = lazy(() => import('./pages/SearchResult'))
const MessageInput = lazy(() => import('./pages/MessageInput'))
const ShowFollow = lazy(() => import('./pages/ShowFollow'))
const PhotoUploadIcon = lazy(() => import('./pages/PhotoUploadIcon'))
const MyStory = lazy(() => import('./pages/MyStory'))
// Simple loading spinner
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
    </div>
  )
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'))

  return (
    <>
      <BrowserRouter>
        {isLoggedIn && <NavBar />}
        <Routes>
          <Route 
            path="/" 
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <LoginPage setIsLoggedIn={setIsLoggedIn} />
              </Suspense>
            } 
          />

          <Route 
            path="/PostPage" 
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <PostPage />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route 
            path="/SearchPage" 
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <SearchPage />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route 
            path="/ReelsPage" 
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <ReelsPage />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route 
            path="/ProfilePage" 
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <ProfilePage />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route 
            path="/ProfilePage/:id" 
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <ProfilePage />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route 
            path="/UserProfile" 
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <UserProfile />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route 
            path="/SearchResult" 
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <SearchResult />
                </Suspense>
              </ProtectedRoute>
            }
          />

          <Route 
            path="/messages" 
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <MessagePage />
                </Suspense>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/messages/:id" 
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <MessageInput />
                </Suspense>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/ShowFollow" 
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <ShowFollow />
                </Suspense>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/PhotoUploadIcon" 
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <PhotoUploadIcon />
                </Suspense>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/MyStory" 
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingSpinner />}>
                  <MyStory />
                </Suspense>
              </ProtectedRoute>
            } 
          />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App