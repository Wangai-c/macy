import { useState } from 'react';

const bars = [0, 0.2, 0.4];

export default function NowPlaying({ title, artist, album, artUrl, isPlaying = false, onTogglePlay }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handlePlayerClick = (e) => {
        // On mobile viewports (<= 768px), if collapsed, expand first and do not play
        if (!isExpanded && window.innerWidth <= 768) {
            setIsExpanded(true);
            e.stopPropagation();
            return;
        }

        // Otherwise, trigger play/pause
        if (onTogglePlay) {
            onTogglePlay();
        }
    };

    return (
        <div 
            className={`audio-player-container ${isExpanded ? 'expanded' : 'collapsed'} ${isPlaying ? 'playing' : ''}`}
            onClick={handlePlayerClick}
            title={isExpanded || window.innerWidth > 768 ? "Click to play/pause audio" : "Click to expand player"}
        >
            {/* Album art */}
            <div className={`audio-player-art ${isPlaying ? 'playing' : ''}`}>
                {artUrl
                    ? <img src={artUrl} alt="Album art" />
                    : <span style={{ fontSize: 20 }}>🎵</span>
                }
            </div>

            {/* Track info */}
            <div className="audio-player-info">
                <div className="audio-player-title-wrapper">
                  <span className={`audio-player-title ${isPlaying ? 'playing' : ''}`}>
                    {title}
                  </span>
                </div>
                <p className="audio-player-subtitle">
                    {artist} · {album}
                </p>
            </div>

            {/* Play/Pause Icon */}
            <div className="audio-player-controls">
                {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{width: 16, height: 16, color: "white"}}>
                      <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{width: 16, height: 16, color: "white", marginLeft: 2}}>
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                    </svg>
                )}
            </div>

            {/* Animated bars */}
            <div className="audio-player-bars">
                {bars.map((delay, i) => (
                    <div key={i} className="audio-player-bar" style={{ animationDelay: `${delay}s` }} />
                ))}
            </div>

            {/* Collapse button for mobile */}
            <button 
                className="audio-player-collapse"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                }}
                title="Collapse player"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.78 14.78a.75.75 0 0 1-1.06 0L10 11.06 6.28 14.78a.75.75 0 0 1-1.06-1.06L8.94 10 5.22 6.28a.75.75 0 0 1 1.06-1.06L10 8.94l3.72-3.72a.75.75 0 1 1 1.06 1.06L11.06 10l3.72 3.72a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
}