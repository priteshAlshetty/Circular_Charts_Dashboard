import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RadarChart from './assets/Pages/RadarChart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RadarChart/>
    </>
  )
}

export default App
