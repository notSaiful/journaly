import React, { useEffect, useRef } from 'react';

/**
 * Robust Looping Video Component
 * Handles modern browser autoplay restrictions, React muted attribute quirks,
 * intersection observer viewport activation, and guaranteed looping across
 * mobile (iOS Safari, Android Chrome) and desktop browsers.
 */
export default function LoopingVideo({
  src,
  className = '',
  poster = '',
  ariaLabel = 'Looping video',
  ...props
}) {
  const videoRef = useRef(null);

  const setVideoRef = (node) => {
    videoRef.current = node;
    if (node) {
      node.muted = true;
      node.defaultMuted = true;
      node.playsInline = true;
      node.setAttribute('muted', '');
      node.setAttribute('playsinline', '');
      node.setAttribute('webkit-playsinline', 'true');
      node.setAttribute('x5-playsinline', 'true');
      node.setAttribute('autoplay', '');
      node.setAttribute('loop', '');
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isDisposed = false;
    let interactionListenersActive = false;

    // Direct guarantee on DOM properties
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playSafe = () => {
      if (!video || isDisposed) return;
      video.muted = true;
      const promise = video.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            // Successfully playing; remove interaction listeners
            removeListeners();
          })
          .catch(() => {
            // Autoplay delayed or restricted by browser power mode.
            // Interaction listeners remain active to unlock on first gesture.
          });
      }
    };

    // 1. Initial play attempt immediately upon mount
    playSafe();

    // 2. Preload data if stalled
    if (video.readyState < 2) {
      try {
        video.load();
      } catch (e) {
        // ignore
      }
    }

    // 3. Media lifecycle listeners
    const handleLoadedMetadata = () => playSafe();
    const handleLoadedData = () => playSafe();
    const handleCanPlay = () => playSafe();
    const handleCanPlayThrough = () => playSafe();
    const handlePlaying = () => removeListeners();

    // 4. Guaranteed seamless looping fallback if native loop stalls
    const handleEnded = () => {
      if (!video || isDisposed) return;
      video.currentTime = 0;
      playSafe();
    };

    // 5. If video pauses unexpectedly while page is visible, resume
    const handlePause = () => {
      if (!video || isDisposed) return;
      if (document.visibilityState === 'visible') {
        playSafe();
      }
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('pause', handlePause);

    // 6. Intersection Observer: play when element enters viewport
    let observer;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              playSafe();
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(video);
    } else {
      playSafe();
    }

    // 7. Page visibility change: resume when tab becomes visible
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        playSafe();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // 8. Global gesture unlock across all pointer and scroll events
    const interactionEvents = [
      'pointerdown',
      'touchstart',
      'touchend',
      'click',
      'scroll',
      'wheel',
      'keydown'
    ];

    const handleUserInteraction = () => {
      if (video && video.paused) {
        playSafe();
      }
    };

    const addListeners = () => {
      if (interactionListenersActive) return;
      interactionListenersActive = true;
      interactionEvents.forEach((evt) => {
        window.addEventListener(evt, handleUserInteraction, { passive: true });
      });
    };

    const removeListeners = () => {
      if (!interactionListenersActive) return;
      interactionListenersActive = false;
      interactionEvents.forEach((evt) => {
        window.removeEventListener(evt, handleUserInteraction);
      });
    };

    addListeners();

    return () => {
      isDisposed = true;
      if (video) {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('canplaythrough', handleCanPlayThrough);
        video.removeEventListener('playing', handlePlaying);
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('pause', handlePause);
      }
      if (observer) {
        observer.disconnect();
      }
      document.removeEventListener('visibilitychange', handleVisibility);
      removeListeners();
    };
  }, [src]);

  return (
    <video
      ref={setVideoRef}
      src={src}
      autoPlay
      muted
      playsInline
      webkit-playsinline="true"
      x5-playsinline="true"
      loop
      preload="auto"
      poster={poster}
      aria-label={ariaLabel}
      className={className}
      {...props}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
