import './App.css'
import CloudFavicon from './assets/cloud-favicon.png'
import {Routes, Route} from 'react-router'
import { HomePage } from './pages/HomePage'
function App() {

  return (
    <>
      <link rel="shortcut icon" href={CloudFavicon} type="image/x-icon" />
      <title>Weather App</title>
      <Routes>
        <Route index element={<HomePage />}/>
      </Routes>
    </>
  )
}

export default App
