import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './features/auth/Login'
//import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Basic Page</h1>
    <Login/>
    </>
  )
}

export default App
