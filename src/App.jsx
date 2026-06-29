import { useEffect } from 'react'
import FlipDown from './flipdown'
import './index.css'

function App() {
  useEffect(() => {
    // Clear any previous FlipDown DOM (handles React StrictMode double-mount)
    const container = document.getElementById('flipdown')
    if (container) container.innerHTML = ''

    // Target time: July 3rd at 00:00:00 (midnight) in local device time
    const now = new Date()
    let targetYear = now.getFullYear()
    let targetDate = new Date(targetYear, 6, 3) // Month index 6 is July

    // If July 3rd has already passed this year, count down to next year
    if (now.getTime() > targetDate.getTime()) {
      targetDate = new Date(targetYear + 1, 6, 3)
    }

    const targetTime = Math.floor(targetDate.getTime() / 1000)

    const flipdown = new FlipDown(targetTime, 'flipdown', { theme: 'custom' })
    flipdown.start()

    return () => {
      if (flipdown.countdown) {
        clearInterval(flipdown.countdown)
      }
      // Clean up DOM on unmount
      const el = document.getElementById('flipdown')
      if (el) el.innerHTML = ''
    }
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#C41F5E] from-0%  to-bubblegum-pink-1000 to-30%">
      {/* Radial glow overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,5,98,0.25)_0%,_transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-4">

        {/* FlipDown widget */}
        <div className="flex justify-center w-full">
          <div id="flipdown" className="flipdown"></div>
        </div>

      </div>
    </div>
  )
}

export default App
