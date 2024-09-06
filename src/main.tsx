import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Main from './pages/Main.tsx'
import Settings from './pages/Settings.tsx'
import Profile from './pages/Profile.tsx'
import MainHeader from './components/MainHeader.tsx'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'
import Articles from './pages/Articles.tsx'
import Article from './pages/Article.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
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