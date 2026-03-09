"use client";

import { useMemo } from "react";

type WordCloudProps = {
  words: { text: string; value: number }[];
};

export default function WordCloud({ words }: WordCloudProps) {
  if (!words || words.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center text-slate-400">
        Nenhuma palavra registrada ainda.
      </div>
    );
  }

  // Shuffle elements for visual randomness instead of d3 calculations
  const shuffledWords = useMemo(() => {
    // Normalize values to a reasonable range for font-sizes
    const maxVal = Math.max(...words.map(w => w.value));
    const minVal = Math.min(...words.map(w => w.value));
    
    return [...words].sort(() => 0.5 - Math.random()).map(w => {
      // Scale from 1rem to 4rem relative to highest vote
      const normalizedSize = minVal === maxVal ? 2 : 1 + ((w.value - minVal) / (maxVal - minVal)) * 3;
      
      return {
        ...w,
        fontSize: `${normalizedSize}rem`,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
        opacity: 0.8 + (Math.random() * 0.2)
      };
    });
  }, [words]);

  return (
    <div className="h-full w-full min-h-[300px] flex flex-wrap items-center justify-center content-center gap-4 p-4">
      {shuffledWords.map((item, i) => (
        <span
          key={`${item.text}-${i}`}
          className="inline-block transition-all hover:scale-110 cursor-default font-bold"
          style={{
            fontSize: item.fontSize,
            color: item.color,
            opacity: item.opacity,
          }}
          title={`${item.text} (${item.value / 10} votos)`} // value was multiplied by 10 before
        >
          {item.text}
        </span>
      ))}
    </div>
  );
}
