import './index.css'
import './audio_player.css'
import Intro from './Intro'
import Countdown from './Countdown'
import Newspaper from './Newspaper'
import { useState, useRef, useEffect } from "react";
import NowPlaying from "./AudioPlayer.jsx";
import { useViewTracking } from './hooks/useViewTracking';
import { initTrackingSender } from './utils/trackingSender';

// We will let the individual pages handle their own track imports


function App() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPage, setCurrentPage] = useState('countdown');
    const [current, setCurrent] = useState(null);

    // --- Interaction Tracking ---
    const { markAudioPlayed } = useViewTracking(currentPage);

    useEffect(() => {
        const cleanup = initTrackingSender();
        return cleanup;
    }, []);

    const setAudioTrack = (trackInfo) => {
        setCurrent(prev => {
            if (!prev || prev.src !== trackInfo.src) {
                setIsPlaying(false);
                return trackInfo;
            }
            return prev;
        });
    };


    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
                markAudioPlayed();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Build the audio player widget to pass into Intro and Countdown
    const audioPlayerWidget = current ? (
        <div
            className="cursor-pointer hover:scale-105 transition-transform shadow-xl rounded-xl"
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
    ) : null;

    return (
        <>
            {current && <audio ref={audioRef} src={current.src} loop />}
            <main className="w-full min-h-screen relative overflow-hidden bg-black">
                {/* Pages */}
                <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentPage === 'countdown' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                    <Countdown 
                        audioPlayer={audioPlayerWidget} 
                        setAudioTrack={setAudioTrack} 
                        isActive={currentPage === 'countdown'} 
                    />
                </div>
                <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentPage === 'intro' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                    <Intro 
                        audioPlayer={audioPlayerWidget} 
                        setAudioTrack={setAudioTrack} 
                        isActive={currentPage === 'intro'} 
                    />
                </div>
                <div className={`absolute inset-0 overflow-y-auto transition-opacity duration-1000 ease-in-out ${currentPage === 'newspaper' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                    <Newspaper 
                        audioPlayer={audioPlayerWidget} 
                        setAudioTrack={setAudioTrack} 
                        isActive={currentPage === 'newspaper'} 
                    />
                </div>
                
                {/* Floating Button */}
                <button 
                   onClick={() => {
                       // Auto-play audio on first nav interaction
                       if (!isPlaying && audioRef.current) {
                           audioRef.current.play().then(() => {
                               setIsPlaying(true);
                               markAudioPlayed();
                           }).catch(() => {});
                       }

                       if (currentPage === 'countdown') setCurrentPage('intro');
                       else if (currentPage === 'intro') setCurrentPage('newspaper');
                       else setCurrentPage('countdown');
                   }}
                   className={`fixed bottom-8 right-8 z-[9999] flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-1000 hover:scale-110 active:scale-95 ${
                       currentPage === 'countdown' 
                       ? 'bg-bubblegum-pink-300 text-bubblegum-pink-1000 shadow-bubblegum-pink-900/50' 
                       : currentPage === 'intro'
                       ? 'bg-blue-100 text-blue-900 shadow-blue-900/50'
                       : 'bg-[#1A1A1A] text-[#FDFBF7] shadow-black/50'
                   }`}
                   title={currentPage === 'countdown' ? 'Go to Intro' : currentPage === 'intro' ? 'Go to Newspaper' : 'Go to Countdown'}
                >
                   {currentPage === 'countdown' ? (
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                       </svg>
                   ) : currentPage === 'intro' ? (
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                       </svg>
                   ) : (
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                       </svg>
                   )}
                </button>


            </main>
        </>
    )
}

export default App
