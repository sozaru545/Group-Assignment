// src/pages/Random.js
import { useState } from "react";
import Navbar from "../components/Navbar";
import LyricCard from "../components/LyricCard";
import ShuffleButton from "../components/ShuffleButton";
import mockData from "../mockData";

export default function Random() {
  const [index, setIndex] = useState(0); 

  const shuffleLyric = () => {
    const randomIndex = Math.floor(Math.random() * mockData.length);
    setIndex(randomIndex);
  };

  return (
    <>
      <Navbar />
      <main style={{ textAlign: "center" }}>
        <LyricCard lyric={mockData[index].lyric} artist={mockData[index].artist} />
        <ShuffleButton onShuffle={shuffleLyric} />
      </main>
    </>
  );
}
