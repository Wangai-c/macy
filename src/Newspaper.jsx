import React, { useEffect } from 'react';
import macyImage from './assets/svgs/macy_black_white.png';
import LookingAtMeCover from './assets/images/Looking_at_me_cover.jpg';
import LookingAtMe from './assets/audio/Looking at Me.mp3';

export default function Newspaper({ audioPlayer, setAudioTrack, isActive }) {
    useEffect(() => {
        if (isActive) {
            setAudioTrack({
                src: LookingAtMe,
                title: "Looking at Me",
                artist: "Sabrina Carpenter",
                album: "Singular Act II",
                artUrl: LookingAtMeCover
            });
        }
    }, [isActive, setAudioTrack]);

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#1E1E1E] font-bonny flex justify-center py-10 px-4 md:px-8">
            <div className="max-w-6xl w-full flex flex-col">
                
                {/* HEADER */}
                <header className="border-b-[3px] border-[#1A1A1A] pb-4 mb-4 flex flex-col items-center">
                    <div className="w-full flex justify-between items-end border-b border-[#1A1A1A] pb-2 mb-2 text-sm uppercase tracking-widest font-semibold">
                        <span>Vol. 1, No. 1</span>
                        <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span>Price: Priceless</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-playfair text-[#1A1A1A] font-black uppercase tracking-tighter text-center">
                        The Daily Macy
                    </h1>
                </header>

                {/* SECTIONS BAR */}
                <nav className="border-b-[3px] border-t border-[#1A1A1A] py-2 mb-8 mt-1">
                    <ul className="flex justify-center gap-6 md:gap-12 text-sm uppercase tracking-widest font-bold text-[#1A1A1A]">
                        <li className="cursor-pointer hover:underline underline-offset-4">Style</li>
                        <li className="cursor-pointer hover:underline underline-offset-4">Beauty</li>
                        <li className="cursor-pointer hover:underline underline-offset-4">Culture</li>
                        <li className="cursor-pointer hover:underline underline-offset-4">Opinion</li>
                        <li className="cursor-pointer hover:underline underline-offset-4">Features</li>
                    </ul>
                </nav>

                {/* MAIN CONTENT AREA */}
                <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    
                    {/* LEFT COLUMN: Large Image Card */}
                    <div className="lg:col-span-7 flex flex-col">
                        <div className="border border-[#1A1A1A] p-2 h-full flex flex-col relative">
                            <div className="relative flex-1 bg-gray-200 overflow-hidden min-h-[500px]">
                                <img 
                                    src={macyImage} 
                                    alt="Macy" 
                                    className="absolute inset-0 w-full h-full object-cover object-top grayscale"
                                />
                            </div>
                            <div className="mt-3 text-lg italic font-playfair border-t border-[#1A1A1A] pt-2 text-center">
                                "It's honestly inconsiderate to look that good."
                            </div>
                            
                            {/* Overlay Audio Player inside the image block */}
                            <div className="absolute bottom-12 left-4 z-10">
                                {audioPlayer}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Article Text */}
                    <div className="lg:col-span-5 flex flex-col">
                        <div className="mb-6 border-b-[2px] border-[#1A1A1A] pb-4">
                            <h2 className="text-5xl md:text-6xl font-playfair text-[#1A1A1A] font-bold leading-tight mb-3">
                                How is Macy so <br/> F**CKIN HOT?
                            </h2>
                            <p className="text-xl uppercase tracking-wider font-semibold border-t border-[#1A1A1A] pt-2 mt-2 flex items-center">
                                BY <span className="italic font-playfair normal-case text-2xl ml-2">Chris Wangai</span>
                            </p>
                        </div>
                        
                        <div className="text-xl leading-relaxed space-y-5 text-justify">
                            <p>
                                <span className="float-left text-7xl font-playfair font-bold pr-2 leading-[0.8] text-[#1A1A1A] mt-1">T</span>
                                he day I met her, I was immediately compelled to talk to her. My first thought?
                            </p>
                            <p className="font-playfair text-2xl italic font-semibold text-center my-6 text-[#1A1A1A]">
                                Damn... she fine as f*ck.
                            </p>
                            <p>
                                As I got closer, her rich, expensive perfume hit me. Right then, I knew she was way out of my tax bracket. Her voice was soft, smooth—like velvet—and for a second, my brain just stopped working.
                            </p>
                            <p>
                                And Every days since, I have the same recurring question:
                            </p>
                            <p className="font-playfair text-2xl italic font-semibold text-center my-6 text-[#1A1A1A]">
                                How is she still this unbelievably hot?
                            </p>
                            <p>
                                You'd think I'd get used to it by now. I haven't. Somehow, every single time I see her, she manages to look even more stunning than the last. It's honestly unfair.
                            </p>
                        </div>
                    </div>
                    
                </main>
            </div>
        </div>
    );
}
