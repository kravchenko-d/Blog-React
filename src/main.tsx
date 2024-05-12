import React, { useId } from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.tsx'
import './index.css'
import {BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter} from 'react-router-dom'
import Main from './pages/Main.tsx'
import Settings from './pages/Settings.tsx'
import Profile from './pages/Profile.tsx'
import MainHeader from './components/MainHeader.tsx'
import MetaHeader from './components/main/MetaHeader.tsx'
import MainWrapper from './pages/MainWrapper.tsx'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import TopicPage from './pages/TopicPage.tsx'
import Articles from './pages/Articles.tsx'
import Article from './pages/Article.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <>
    <MainHeader/>
    <Main/>
    </>
  },
  {
    path: '/settings',
    element: <>
    <MainHeader/>
    <Settings/>
    </>
  },
  {
    path: 'profile',
    element: <>
    <MainHeader/>
    <Profile/>
    </>
  }
])

// const topicId = useId()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <Provider store={store}>
        <App>
          <MainHeader/>
          <Routes>
            <Route path='' element={<Main/>}/>          
            <Route path='profile' element={<Profile/>}/>
            <Route path='settings' element={<Settings/>}/>

            
            <Route path='/articles' element={<Articles/>}/>
            <Route path='/articles/:articleId' element={<Article/>}/>
          </Routes>
        </App>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)