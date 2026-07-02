import './index.css'
import './audio_player.css'
import Intro from './Intro'
import Countdown from './Countdown'
import Newspaper from './Newspaper'
import LittleThings from './LittleThings'
import { useState, useRef, useEffect } from "react";
import NowPlaying from "./AudioPlayer.jsx";
import { useViewTracking } from './hooks/useViewTracking';
import { initTrackingSender } from './utils/trackingSender';

// We will let the individual pages handle their own track imports

const pageThemes = {
    countdown: {
        themeColor: '#C41F5E',      // Matches top of the gradient
        backgroundColor: '#5E0F2D' // Matches bottom of the gradient
    },
    intro: {
        themeColor: '#003B73',      // Matches top-left of the gradient
        backgroundColor: '#88C9F9' // Matches bottom-right of the gradient
    },
    newspaper: {
        themeColor: '#FDFBF7',      // Matches header/page background
        backgroundColor: '#FDFBF7' // Matches page background
    },
    littlethings: {
        themeColor: '#F6ECC9',      // Matches board background
        backgroundColor: '#F6ECC9'
    }
};

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

    useEffect(() => {
        const theme = pageThemes[currentPage] || pageThemes.countdown;

        // 1. Update theme-color meta tag for mobile browsers (status/address bar)
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.setAttribute('name', 'theme-color');
            document.head.appendChild(metaThemeColor);
        }
        metaThemeColor.setAttribute('content', theme.themeColor);

        // 2. Update body/html background colors so translucent system bars match perfectly
        document.body.style.backgroundColor = theme.backgroundColor;
        document.documentElement.style.backgroundColor = theme.backgroundColor;
        
        // Ensure smooth transition on body/html backgrounds
        document.body.style.transition = 'background-color 1.0s ease-in-out';
        document.documentElement.style.transition = 'background-color 1.0s ease-in-out';
    }, [currentPage]);

    const autoPlayTriggered = useRef(false);

    const setAudioTrack = (trackInfo) => {
        setCurrent(prev => {
            if (!prev || prev.src !== trackInfo.src) {
                return trackInfo;
            }
            return prev;
        });
    };

    // When the audio source changes, resume playback if it was already playing
    useEffect(() => {
        if (current && audioRef.current && autoPlayTriggered.current) {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(() => {});
        }
    }, [current]);


    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
                markAudioPlayed();
                autoPlayTriggered.current = true;
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Build the audio player widget to pass into Intro and Countdown
    const audioPlayerWidget = current ? (
        <NowPlaying
            title={current.title}
            artist={current.artist}
            album={current.album}
            artUrl={current.artUrl}
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
        />
    ) : null;

    return (
        <>
            {current && <audio ref={audioRef} src={current.src} loop />}
            <main className="w-full min-h-screen relative overflow-hidden transition-colors duration-1000 ease-in-out" style={{ backgroundColor: pageThemes[currentPage]?.backgroundColor || '#5E0F2D' }}>
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
                <div className={`absolute inset-0 overflow-y-auto transition-opacity duration-1000 ease-in-out ${currentPage === 'littlethings' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
                    <LittleThings 
                        audioPlayer={audioPlayerWidget} 
                        setAudioTrack={setAudioTrack} 
                        isActive={currentPage === 'littlethings'} 
                    />
                </div>
                
                {/* Floating Nav Button */}
                <button 
                   onClick={() => {
                       // Auto-play audio on first nav interaction
                       if (!autoPlayTriggered.current && audioRef.current) {
                           audioRef.current.play().then(() => {
                               setIsPlaying(true);
                               markAudioPlayed();
                               autoPlayTriggered.current = true;
                           }).catch(() => {});
                       }

                       if (currentPage === 'countdown') setCurrentPage('intro');
                       else if (currentPage === 'intro') setCurrentPage('newspaper');
                       else if (currentPage === 'newspaper') setCurrentPage('littlethings');
                       else if (currentPage === 'littlethings') setCurrentPage('countdown');
                   }}
                   className={`fixed bottom-8 right-8 z-[50] flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-1000 hover:scale-110 active:scale-95 ${
                       currentPage === 'countdown' 
                       ? 'bg-bubblegum-pink-300 text-bubblegum-pink-1000 shadow-bubblegum-pink-900/50' 
                       : currentPage === 'littlethings'
                       ? 'bg-orange-200 text-orange-900 shadow-orange-900/50'
                       : 'bg-blue-100 text-blue-900 shadow-blue-900/50'
                   }`}
                   title="Next Page"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                   </svg>
                </button>


            </main>
        </>
    )
}

export default App
