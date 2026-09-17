"use client";

import { useState } from "react";

/**
 * Click-to-play YouTube embed: renders only the thumbnail until the
 * viewer asks for the video, so the page loads no third-party script
 * by default.
 */
export function VideoEmbed({ youtubeId, label }: { youtubeId: string; label: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video overflow-hidden bg-navy">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${label}`}
      className="group relative block aspect-video w-full overflow-hidden bg-navy text-left"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-85 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
      />
      <span className="absolute inset-0 bg-navy/25 transition-opacity duration-500 group-hover:bg-navy/10" />
      <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/60 bg-navy/55 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden fill="#FBFAF7">
          <path d="M4.5 2.7v10.6c0 .6.65.97 1.17.66l8.6-5.3a.78.78 0 0 0 0-1.32l-8.6-5.3a.78.78 0 0 0-1.17.66z" />
        </svg>
      </span>
      <span className="absolute bottom-3 left-4 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-paper/90">
        Watch the story
      </span>
    </button>
  );
}
