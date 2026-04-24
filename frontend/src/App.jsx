import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ChatPage from './components/ChatPage'
import Architecture from './components/Architecture'
import Documents from './components/Documents'
import Footer from './components/Footer'

function Home() {
  return (
    <>
      <Hero />
      <Architecture showFull={false} />
      <Documents showFull={false} />
    </>
  )
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/architecture" element={<Architecture showFull={true} />} />
          <Route path="/documents" element={<Documents showFull={true} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
