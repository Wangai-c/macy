import { useEffect } from 'react'
import FlipDown from './flipdown'
import './countdown.css'

export default function Countdown() {
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
    <div className="flex justify-center w-full">
      <div id="flipdown" className="flipdown"></div>
    </div>
  )
}
