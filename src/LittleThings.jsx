import React, { useEffect } from 'react';

// SVG Assets
import artStar from './assets/svgs/art_star.svg';
import artLoveEyes from './assets/svgs/art_love_eyes.svg';
import artPencil from './assets/svgs/art_pencil.svg';
import lightning from './assets/svgs/lightning.svg';
import artStars from './assets/svgs/art_stars.svg';
import artPiercedHeart from './assets/svgs/art_pierced_heart.svg';
import artArrow from './assets/svgs/art_arrow.svg';
import artHeart from './assets/svgs/art_heart.svg';
import artGlobe from './assets/svgs/art_globe.svg';
import wavyLines from './assets/svgs/wavy_lines.svg';
import num22 from './assets/svgs/22.svg';
import smileWithStars from './assets/svgs/smile_with_stars.svg';
import artCrown from './assets/svgs/art_crown.svg';
import artRainbow from './assets/svgs/art_rainbow.svg';
import artLeaf from './assets/svgs/art_leaf.svg'

import { useViewTracking } from './hooks/useViewTracking';

const StickyNote = ({ color, textColor, title, children, className, rotation = "rotate-0", doodles = [] }) => {
    return (
        <div 
            className={`relative p-5 md:p-6 rounded-[10px] shadow-2xl shadow-black/25 flex flex-col gap-2 md:gap-3 transition-transform hover:scale-[1.02] duration-300 ${className} ${rotation}`}
            style={{ backgroundColor: color, color: textColor }}
        >
            <h2 className="font-gochi text-2xl md:text-3xl font-bold leading-tight z-10">{title}</h2>
            <div className="font-indie text-xl md:text-2xl leading-relaxed whitespace-pre-wrap z-10 flex-grow">
                {children}
            </div>
            {doodles.map((doodle, idx) => (
                <img 
                    key={idx} 
                    src={doodle.src} 
                    alt="" 
                    className={`absolute pointer-events-none z-20 ${doodle.className}`} 
                    style={doodle.style}
                />
            ))}
        </div>
    );
};

export default function LittleThings({ audioPlayer, setAudioTrack, isActive }) {
    useViewTracking('littlethings');

    useEffect(() => {
        if (isActive) {
            setAudioTrack({
                src: "/audio/track_little_things.mp3", // Assuming some path, they didn't specify so generic is fine
                title: "The Little Things",
                artist: "Macy",
                album: "Memories",
                artUrl: "/images/album_art.jpg"
            });
        }
    }, [isActive, setAudioTrack]);

    return (
        <div className="w-full min-h-screen bg-[#F6ECC9] p-4 md:p-12 lg:p-20 overflow-y-auto overflow-x-hidden pt-24">
            
            {/* Audio Player Container */}
            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
                {audioPlayer}
            </div>

            {/* Header */}
            <div className="relative w-full max-w-3xl mx-auto mb-12 mt-4 flex flex-col items-center justify-center">
                <h1 className="font-gochi text-5xl md:text-7xl text-black z-10 text-center relative inline-block">
                    The Little Things
                    <img src={wavyLines} alt="" className="absolute -bottom-6 md:-bottom-10 left-0 w-[110%] max-w-none h-12 md:h-16 object-fill z-0 pointer-events-none" />
                </h1>
                
                {/* Header Doodles */}
                <img src={num22} alt="22" className="absolute -top-10 md:-top-14 -right-2 md:right-12 w-16 md:w-24 rotate-12" />
                <img src={smileWithStars} alt="Smile" className="absolute top-6 md:top-10 right-0 md:-right-6 w-12 md:w-16" />
            </div>

            {/* Grid Container */}
            <div className="max-w-[1200px] mx-auto relative px-4 md:px-8">
                
                {/* Global/Gutter doodles */}
                <img src={artHeart} alt="Heart" className="hidden lg:block absolute right-[20%] top-[20%] w-12 rotate-[-20deg] pointer-events-none z-30" />
                <img src={artGlobe} alt="Globe" className="hidden lg:block absolute left-[15%] bottom-[20%] w-16 rotate-[10deg] pointer-events-none z-30" />

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6 md:gap-8 relative z-10">
                    
                    {/* 1. Orange Card - "She smiles differently" */}
                    <StickyNote 
                        color="#EB7A53" 
                        textColor="#000000"
                        title="She smiles differently"
                        className="xl:col-span-4 xl:col-start-1 xl:row-span-2 xl:row-start-1"
                        rotation="-rotate-2"
                        doodles={[
                            { src: artStar, className: "-top-8 -left-8 w-16", style: { transform: 'rotate(-15deg)' } },
                            { src: artLoveEyes, className: "-bottom-8 -right-8 w-24", style: { transform: 'rotate(10deg)' } }
                        ]}
                    >
                        I still can't explain it. It's one of those smiles you recognize instantly, even if you can't describe why.<br/><br/>
                        <span className="font-gochi text-3xl md:text-4xl font-bold block mt-2 text-black">Its Just ... Her’s</span>
                    </StickyNote>

                    {/* 2. Black Card - "Her Study Rituals" */}
                    <StickyNote 
                        color="#000000" 
                        textColor="#FFFFFF"
                        title="Her Study Rituals"
                        className="xl:col-span-5 xl:col-start-7 xl:row-span-2 xl:row-start-1 xl:mt-8"
                        rotation="rotate-2"
                        doodles={[
                            { src: artPencil, className: "-top-8 right-8 w-16", style: { filter: 'invert(1)', transform: 'rotate(35deg)' } }
                        ]}
                    >
                        During exams she somehow becomes a different person. She wakes up ridiculously early, stands in front of a mirror and recites her notes like she's giving a TED Talk.
                        <br/><br/>
                        It makes me laugh every time—but it's also exactly why she does so well.
                    </StickyNote>

                    {/* 3. Yellow Card - "BOSSING ME around" */}
                    <StickyNote 
                        color="#F7D44C" 
                        textColor="#000000"
                        title="She has this funny habit of BOSSING ME around."
                        className="xl:col-span-5 xl:col-start-2 xl:row-span-2 xl:row-start-3 mt-8 xl:mt-0"
                        rotation="-rotate-3"
                        doodles={[
                            { src: lightning, className: "-top-12 left-1/2 -translate-x-1/2 w-16", style: { transform: 'rotate(15deg)' } }
                        ]}
                    >
                        Somehow she has more authority over me than almost anyone else.<br/><br/>
                        She'll walk into my room, decide it isn't clean enough, and before I know it I'm cleaning because she said so. I complain... but not that much.
                    </StickyNote>

                    {/* 4. Green Card - "pretends she doesn't need attention" */}
                    <StickyNote 
                        color="#A8D672" 
                        textColor="#000000"
                        title="She pretends she doesn't need the attention."
                        className="xl:col-span-5 xl:col-start-8 xl:row-span-2 xl:row-start-3 mt-8 xl:mt-24"
                        rotation="rotate-1"
                    >
                        But if I disappear for too long, somehow I'll hear about it.<br/><br/>
                        And every now and then she'll ask for affection without actually asking for it.<br/><br/>
                        I always find that adorable
                    </StickyNote>

                    {/* 5. Blue Card - "One sentence told me everything." */}
                    <StickyNote 
                        color="#98B7DB" 
                        textColor="#000000"
                        title="One sentence told me everything."
                        className="xl:col-span-6 xl:col-start-1 xl:row-span-2 xl:row-start-5 mt-6 xl:mt-8"
                        rotation="-rotate-1"
                        doodles={[
                            { src: artStars, className: "-top-8 -left-8 w-16" },
                            { src: artPiercedHeart, className: "bottom-4 right-4 w-20 md:w-24", style: { transform: 'rotate(-10deg)' } }
                        ]}
                    >
                        I asked if she wanted to avoid kissing because people might see.<br/>
                        Her answer?<br/><br/>
                        <span className="font-gochi text-3xl md:text-4xl font-bold block my-3 text-black text-center w-full">"Let them. What are they gonna do about it?"</span><br/>
                        I don't think she realizes how attractive that confidence is.

                        {/* True Story Graphic Group */}
                        <div className="absolute -top-6 -right-12 md:-top-8 md:-right-20 flex items-center gap-2 pointer-events-none z-30">
                            <img src={artArrow} alt="Arrow" className="w-20 md:w-28" style={{ transform: 'scaleX(-1) rotate(-40deg)' }} />
                            <span className="font-gochi text-black text-2xl md:text-3xl font-bold -rotate-6 mt-4 whitespace-nowrap">
                                true story
                            </span>
                        </div>
                    </StickyNote>

                    {/* 6. Orange (Red/Pink) Card - "Kitchen Report" */}
                    <StickyNote 
                        color="#EB7A53" 
                        textColor="#000000"
                        title="Kitchen Report"
                        className="xl:col-span-4 xl:col-start-8 xl:row-span-2 xl:row-start-5 mt-6 xl:mt-2"
                        rotation="rotate-3"
                        doodles={[
                            { src: artRainbow, className: "-top-12 left-1/2 -translate-x-1/2 w-20" },
                            { src: artCrown, className: "-right-6 -bottom-6 w-16", style: { transform: 'rotate(20deg)' } }
                        ]}
                    >
                        <ul className="list-disc pl-6 mb-3 space-y-1">
                            <li>She's brilliant</li>
                            <li>She's caring</li>
                            <li>She's confident</li>
                            <li>Cooking...</li>
                        </ul>
                        <span className="font-gochi text-3xl md:text-4xl font-bold text-black block mt-4 text-center leading-tight">We don't talk about the cooking!!!</span>
                    </StickyNote>

                    {/* 7. Black Card - "This year hasn't been easy" */}
                    <StickyNote 
                        color="#000000" 
                        textColor="#FFFFFF"
                        title="This year hasn't been easy for her."
                        className="xl:col-span-5 xl:col-start-4 xl:row-span-2 xl:row-start-7 mt-6 xl:mt-12 xl:ml-8"
                        rotation="-rotate-2"
                        doodles={[
                            { src: artLeaf, className: "bottom-4 -right-4 w-12 md:w-16", style: { transform: 'rotate(15deg)' } }
                        ]}
                    >
                        I know losing your dad isn't something words can fix.<br/><br/>
                        I just hope, somewhere between all the difficult days, she remembers she doesn't have to carry everything by herself.
                    </StickyNote>

                </div>
            </div>
        </div>
    );
}
