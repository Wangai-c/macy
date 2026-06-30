import './intro.css';

// Import assets for Vite bundling
import childPhoto from './assets/images/mercy-child-1.jpeg';
import duckSticker from './assets/images/duck_with_eggs.png';
import pandaSticker from './assets/images/panda in a hoodie.jpg';
import celebrationEmoji from './assets/svgs/celebration_emoji.svg';

/* ─── Sub-components ─── */

function HappyBirthdayHeader() {
  return (
    <div className="intro-header">
      <img
        src={duckSticker}
        alt="Cute penguin with hearts"
        className="intro-header-sticker"
      />
      <h1 className="intro-happy-birthday">Happy Birthday</h1>
    </div>
  );
}

function NameBlock() {
  return <p className="intro-name">MACY</p>;
}

function TurnedBlock() {
  return <p className="intro-turned">You've turned</p>;
}

function AgeBlock() {
  return <p className="intro-age">22</p>;
}

function CelebrationBlock() {
  return (
    <img
      src={celebrationEmoji}
      alt="Celebration emoji"
      className="intro-celebration"
    />
  );
}

function AdorableCard() {
  return (
    <div className="intro-adorable-card">
      <img
        src={pandaSticker}
        alt="Cute panda in a hoodie"
        className="intro-adorable-panda"
      />
      <div className="intro-adorable-text">
        <span className="omg-line">OMG</span>
        <span className="you-are-line">YOU ARE SO</span>
        <span className="adorable-line">ADORABLE!!!</span>
      </div>
    </div>
  );
}

/* ─── Main Intro component ─── */

import { useEffect } from 'react';
import coverArt from "./assets/images/Oh_No.jpg";
import audioTrack from "./assets/audio/Biig_Piig_Oh_No.mp3";

export default function Intro({ audioPlayer, setAudioTrack, isActive }) {
  useEffect(() => {
    if (isActive && setAudioTrack) {
      setAudioTrack({
        title: "Oh No",
        artist: "Biig Piig",
        album: "The Sky Is Bleeding",
        artUrl: coverArt,
        src: audioTrack,
      });
    }
  }, [isActive, setAudioTrack]);

  return (
    <section className="intro-page">
      <div className="intro-grid">
        {/* Left column: Large childhood photo */}
        <div className="intro-photo-col">
          <div className="intro-photo-frame">
            <img src={childPhoto} alt="Macy as a child" />
          </div>
        </div>

        {/* Right column: stacked content, centered vertically */}
        <div className="intro-content-col">
          <HappyBirthdayHeader />
          <NameBlock />
          <TurnedBlock />
          <AgeBlock />
          <CelebrationBlock />
          <AdorableCard />

          {/* Audio player passed in from parent */}
          {audioPlayer && (
            <div className="intro-audio-wrapper">
              {audioPlayer}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
