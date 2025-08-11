"use client";
import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
// el tipo va desde "keen-slider", no desde "keen-slider/react"
import type { KeenSliderInstance } from "keen-slider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CommentCard from "./CommentCard";
import type { CommentItem, Theme } from "./types";

// Plugin de auto-slide
function AutoSlide(interval = 3000) {
  return (slider: KeenSliderInstance) => {
    let timer: ReturnType<typeof setInterval>;
    function start() {
      stop();
      timer = setInterval(() => {
        slider.next();
      }, interval);
    }
    function stop() {
      clearInterval(timer);
    }
    slider.on("created", start);
    slider.on("dragStarted", stop);
    slider.on("animationEnded", start);
    slider.on("updated", start);
  };
}

interface Props {
  comments: CommentItem[];
  theme: Theme;
}

export default function CommentsCarousel({ comments, theme }: Props) {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: comments.length > 3,
      rubberband: false,
      slideChanged(s) {
        setCurrent(s.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
      slides: {
        perView: 1,
        spacing: 24,
      },
      breakpoints: {
        "(min-width: 768px)": {
          slides: { perView: 2, spacing: 24 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 3, spacing: 24 },
        },
      },
    },
    [AutoSlide(3000)]
  );

  const snapCount =
    instanceRef.current?.track.details.slides.length ?? 0;

  return (
    <div className="relative">
      {/* Track */}
      <div ref={sliderRef} className="keen-slider">
        {comments.map((c) => (
          <div key={c.id} className="keen-slider__slide">
            <div className="h-full">
              <CommentCard c={c} theme={theme} />
            </div>
          </div>
        ))}
      </div>

      {/* Flechas */}
      {loaded && instanceRef.current && snapCount > 1 && (
        <>
          <button
            aria-label="Prev"
            onClick={() => instanceRef.current?.prev()}
            className={`absolute -left-8 lg:-left-10 top-1/2 -translate-y-1/2 z-10 rounded-full border ${theme.border} bg-black/30 backdrop-blur-md p-2 hover:bg-black/50 transition`}
          >
            <ChevronLeft className={`${theme.accent} h-5 w-5`} />
          </button>
          <button
            aria-label="Next"
            onClick={() => instanceRef.current?.next()}
            className={`absolute -right-8 lg:-right-10 top-1/2 -translate-y-1/2 z-10 rounded-full border ${theme.border} bg-black/30 backdrop-blur-md p-2 hover:bg-black/50 transition`}
          >
            <ChevronRight className={`${theme.accent} h-5 w-5`} />
          </button>
        </>
      )}

      {/* Dots */}
      {loaded && instanceRef.current && snapCount > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: snapCount }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => instanceRef.current?.moveToIdx(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === current ? "w-6" : "w-2.5"
              } bg-gradient-to-r ${theme.secondary}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
