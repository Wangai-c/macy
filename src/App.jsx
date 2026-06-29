import './index.css'
import Countdown from './Countdown'

function App() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#C41F5E] from-0%  to-bubblegum-pink-1000 to-30%">
      {/* Radial glow overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,5,98,0.25)_0%,_transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-4">

        {/* FlipDown widget */}
        <Countdown />

      </div>
    </div>
  )
}

export default App
