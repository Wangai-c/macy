import React, { useState, useRef, useEffect } from 'react';
import happyBirthday from './assets/videos/happy_birthday.mp4';
import myMom from './assets/videos/my_mom.mp4';

const videos = [
    { id: 'happy_birthday', src: happyBirthday, title: 'Happy Birthday Love' },
    { id: 'my_mom', src: myMom, title: 'Outside with Mom' }
];

export default function Videos({ isActive, globalAudioRef, setIsGlobalPlaying }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const videoRef = useRef(null);

    const currentVideo = videos[currentIndex];

    // Reset video or pause it when user navigates away
    useEffect(() => {
        if (!isActive) {
            if (videoRef.current) {
                videoRef.current.pause();
            }
        }
    }, [isActive]);

    // Handle automatically moving to the next video
    const handleVideoEnded = () => {
        if (currentIndex < videos.length - 1) {
            setCurrentIndex(prev => prev + 1);
            // Wait for React to render the new source before playing
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.play().catch(e => console.log('Auto-play blocked', e));
                }
            }, 50);
        }
    };

    // Pause the global background music if the video starts playing
    const handleVideoPlay = () => {
        if (globalAudioRef?.current) {
            globalAudioRef.current.pause();
            if (setIsGlobalPlaying) {
                setIsGlobalPlaying(false);
            }
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-6 pt-20 pb-32">
            
            {/* Custom Header Section */}
            <div className="mb-8 text-center animate-fade-in-down">
                <h2 className="text-3xl md:text-5xl font-serif text-pink-200 tracking-wider mb-3 drop-shadow-md">
                    {currentVideo.title}
                </h2>
                
                {/* Progress Indicators */}
                <div className="flex justify-center gap-3 mt-4">
                    {videos.map((vid, idx) => (
                        <button 
                            key={vid.id}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                                idx === currentIndex ? 'w-8 bg-pink-400' : 'w-2 bg-slate-600 hover:bg-slate-400'
                            }`}
                            aria-label={`Go to video ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Video Player Container */}
            <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(244,114,182,0.15)] border border-slate-700/50 bg-black animate-fade-in-up transition-all duration-700">
                <video
                    ref={videoRef}
                    key={currentVideo.src} // forces reload of video element when src changes
                    className="w-full aspect-video object-contain"
                    controls
                    playsInline
                    onEnded={handleVideoEnded}
                    onPlay={handleVideoPlay}
                >
                    <source src={currentVideo.src} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            
        </div>
    );
}
