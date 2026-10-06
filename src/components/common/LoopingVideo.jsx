import React, { useEffect, useRef } from 'react';

/**
 * Robust Looping Video Component
 * Handles modern browser autoplay restrictions, React muted attribute quirks,
 * intersection observer viewport activation, and guaranteed looping.
 */
export default function LoopingVideo({
  src,
  className = '',
  poster = '',
  ariaLabel = 'Looping video',
  ...props
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 1. Force muted & playsinline on the actual DOM properties
    // (Crucial: React JSX muted attribute does not always set DOM property)
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;

    const playSafe = () => {
      if (!video) return;
      video.muted = true;
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Fallback: retry on first user interaction if policy blocked
        });
      }
    };

    // 2. Play immediately when metadata/data is ready
    video.addEventListener('loadeddata', playSafe);
    video.addEventListener('canplay', playSafe);

    // 3. Guaranteed loop fallback if native loop attribute stalls
    const handleEnded = () => {
      if (video) {
        video.currentTime = 0;
        playSafe();
      }
    };
    video.addEventListener('ended', handleEnded);

    // 4. Viewport Intersection Observer: play when visible
    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              playSafe();
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(video);
    } else {
      playSafe();
    }

    // 5. Page visibility change: resume when tab becomes active
    const handleVisibility = () => {
      if (!document.hidden) {
        playSafe();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // 6. User interaction unlock (touch, click, scroll)
    const handleUserInteraction = () => {
      if (video && video.paused) {
        playSafe();
      }
    };
    window.addEventListener('touchstart', handleUserInteraction, { once: true, passive: true });
    window.addEventListener('click', handleUserInteraction, { once: true, passive: true });
    window.addEventListener('scroll', handleUserInteraction, { once: true, passive: true });

    // Initial play attempt
    playSafe();

    return () => {
      if (video) {
        video.removeEventListener('loadeddata', playSafe);
        video.removeEventListener('canplay', playSafe);
        video.removeEventListener('ended', handleEnded);
      }
      if (observer) {
        observer.disconnect();
      }
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      playsInline
      loop
      poster={poster}
      aria-label={ariaLabel}
      className={className}
      {...props}
    />
  );
}
