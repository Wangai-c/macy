const bars = [0, 0.2, 0.4];

export default function NowPlaying({ title, artist, album, artUrl, isPlaying = false }) {

    return (
        <div style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: 16,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            width: 320,
            overflow: "hidden",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
            color: "white",
        }}>
            {/* Album art */}
            <div style={{
                width: 44, height: 44, borderRadius: 8,
                background: "rgba(255, 255, 255, 0.2)", flexShrink: 0,
                overflow: "hidden", display: "flex",
                alignItems: "center", justifyContent: "center",
            }}>
                {artUrl
                    ? <img src={artUrl} alt="Album art" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <span style={{ fontSize: 20 }}>🎵</span>
                }
            </div>

            {/* Track info */}
            <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
                <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
                  <span style={{
                      fontSize: 15, fontWeight: 600,
                      display: "inline-block",
                      animation: "marquee 8s linear infinite",
                      animationPlayState: isPlaying ? 'running' : 'paused',
                      textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}>
                    {title}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: "rgba(255, 255, 255, 0.85)", margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {artist} · {album}
                </p>
            </div>

            {/* Play/Pause Icon */}
            <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: "rgba(255, 255, 255, 0.2)", transition: "background 0.3s ease" }}>
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
            <div style={{ display: "flex", gap: 2, alignItems: "center", height: 20, flexShrink: 0 }}>
                {bars.map((delay, i) => (
                    <div key={i} style={{
                        width: 3, height: 14,
                        background: isPlaying ? "#ffffff" : "rgba(255, 255, 255, 0.4)",
                        borderRadius: 2,
                        transformOrigin: "bottom",
                        animation: `pulseBar 0.9s ease-in-out ${delay}s infinite`,
                        animationPlayState: isPlaying ? 'running' : 'paused',
                        transition: "background-color 0.3s ease",
                    }} />
                ))}
            </div>
        </div>
    );
}