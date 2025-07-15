import { useDispatch } from 'react-redux'
import './App.css'
import Footer from './components/Foooter/Footer'
import Header from './components/Header/Header'
import { useEffect, useState } from 'react'
import auth from "./appwrite/auth"
import { login, logout } from './store/authSlice'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(()=>{
    auth.getUser()
    .then((userData)=> {
      if(userData){
        dispatch(login({userData}));
      }
      else{
        dispatch(logout());
      }
    })
    .finally(() => setLoading(false));
  }, [])

  

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
