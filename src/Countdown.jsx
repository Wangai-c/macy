import { useEffect } from 'react'
import FlipDown from './flipdown'
import './countdown.css'

// Import assets for Vite bundling
import shapeOfYouCover from './assets/images/shape_of_you_cover.jpg';
import shapeOfYouTrack from './assets/audio/Shape_of_You.mp3';

export default function Countdown({ audioPlayer, setAudioTrack, isActive }) {
  useEffect(() => {
    if (isActive && setAudioTrack) {
      setAudioTrack({
        title: "Shape of You",
        artist: "Ed Sheeran",
        album: "Divide",
        artUrl: shapeOfYouCover,
        src: shapeOfYouTrack,
      });
    }
  }, [isActive, setAudioTrack]);

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
        <div className="flex justify-center w-full">
          <div id="flipdown" className="flipdown"></div>
        </div>
        
        {/* Audio Player Wrapper */}
        {audioPlayer && (
          <div className="w-[90%] max-w-[340px] fixed top-6 left-1/2 -translate-x-1/2 z-50 sm:static sm:translate-x-0 sm:mt-8 sm:w-full">
            {audioPlayer}
          </div>
        )}
      </div>
    </div>
  )
}
