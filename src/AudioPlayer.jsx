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