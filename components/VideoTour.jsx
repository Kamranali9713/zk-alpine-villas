"use client";

import { useState } from "react";
import { getEmbedUrl } from "@/lib/video";
import { Icon } from "./Icon";

export function VideoTour({ url }) {
  const [playing, setPlaying] = useState(false);
  if (!url) return null;
  const video = getEmbedUrl(url);

  return (
    <section className="py-24 bg-stone">
      <div className="section-shell">
        <div className="max-w-2xl mb-10">
          <p className="text-brass text-sm tracking-wide mb-3">See it for yourself</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight">
            A walk through ZK Alpine Villas
          </h2>
        </div>

        <div className="relative aspect-video rounded-sm overflow-hidden bg-ink">
          {playing ? (
            video.type === "file" ? (
              <video className="w-full h-full" src={video.src} controls autoPlay />
            ) : (
              <iframe
                className="w-full h-full"
                src={`${video.src}&autoplay=1`}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                title="Project video tour"
              />
            )
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="w-full h-full flex items-center justify-center group"
              aria-label="Play project video tour"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1800&auto=format&fit=crop"
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <span className="relative z-10 w-20 h-20 rounded-full bg-brass flex items-center justify-center text-ink group-hover:bg-brassLight transition-colors">
                <Icon name="play" className="w-8 h-8" />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
