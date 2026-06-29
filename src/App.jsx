import './index.css'
import './audio_player.css'
import Countdown from './Countdown'
import { useState, useRef } from "react";
import NowPlaying from "./AudioPlayer.jsx";

// Explicitly import assets so Vite can bundle them correctly
import coverArt from "./assets/images/Oh_No.jpg";
import audioTrack from "./assets/audio/Biig_Piig_Oh_No.mp3";

function App() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [current] = useState({
        title: "Oh No",
        artist: "Biig Piig",
        album: "The Sky Is Bleeding",
        artUrl: coverArt,
        src: audioTrack,
    });

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            <audio ref={audioRef} src={current.src} loop />
            <main className="w-full min-h-screen bg-transparent">
                <Countdown/>
            </main>
            
            {/* Position the audio player: top-center on mobile, bottom-right on desktop */}
            <div 
                className="fixed top-6 left-1/2 -translate-x-1/2 md:top-auto md:bottom-6 md:right-6 md:left-auto md:translate-x-0 z-50 cursor-pointer hover:scale-105 transition-transform shadow-xl rounded-xl"
                onClick={togglePlay}
                title="Click to play/pause audio"
            >
                <NowPlaying
                    title={current.title}
                    artist={current.artist}
                    album={current.album}
                    artUrl={current.artUrl}
                    isPlaying={isPlaying}
                />
            </div>
        </>
    )
}

export default App
