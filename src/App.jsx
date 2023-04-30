import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import LatestWalls from './components/LatestWalls'
import TopWalls from './components/TopWalls'
import WallpaperPage from './components/WallpaperPage'
import Random from './components/Random'


function App() {
  return <Router>
    <Header />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/top' element={<TopWalls />}/>
      <Route path='/latest' element={<LatestWalls />}/>
      <Route path='/wall/:id' element={<WallpaperPage />}/>
      <Route path='/random' element={<Random />}/>

    </Routes>
    <Footer/>
  </Router>
}

export default App