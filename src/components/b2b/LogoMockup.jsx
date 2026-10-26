import { useEffect, useRef, useState } from 'react';
import SiteLink from '../SiteLink';
import { trackFunnel } from '../../utils/funnel';

const COVERS = [
  { id: 'paper', label: 'Warm paper', fill: '#F4EFE6', ink: '#1E1B18', band: '#E5A93C' },
  { id: 'ink', label: 'Ink', fill: '#1E1B18', ink: '#FAF7F2', band: '#E5A93C' },
  { id: 'gold', label: 'Gold edge', fill: '#E5A93C', ink: '#1E1B18', band: '#1E1B18' }
];

function drawCover(canvas, cover, logo) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = cover.fill;
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(8, 8, width - 16, height - 16, 18);
  } else {
    ctx.rect(8, 8, width - 16, height - 16);
  }
  ctx.fill();
  ctx.fillStyle = cover.band;
  ctx.fillRect(8, 8, 14, height - 16);
  ctx.strokeStyle = cover.ink;
  ctx.globalAlpha = 0.35;
  ctx.strokeRect(36, 36, width - 72, height - 72);
  ctx.globalAlpha = 1;
  if (logo) {
    const maxW = width * 0.46;
    const maxH = height * 0.28;
    const scale = Math.min(maxW / logo.width, maxH / logo.height, 1);
    const drawW = logo.width * scale;
    const drawH = logo.height * scale;
    ctx.drawImage(logo, (width - drawW) / 2, height * 0.38, drawW, drawH);
  } else {
    ctx.fillStyle = cover.ink;
    ctx.font = '600 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Your logo', width / 2, height * 0.48);
  }
}

export default function LogoMockup() {
  const refs = useRef([]);
  const [logo, setLogo] = useState(null);
  const [coverId, setCoverId] = useState(COVERS[0].id);
  const tracked = useRef(false);

  useEffect(() => {
    refs.current.forEach((canvas, index) => {
      if (canvas) drawCover(canvas, COVERS[index], logo);
    });
  }, [logo]);

  const onFile = (event) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      setLogo(image);
      URL.revokeObjectURL(url);
      if (!tracked.current) {
        tracked.current = true;
        trackFunnel('mockup_used', { cover: coverId });
      }
    };
    image.onerror = () => URL.revokeObjectURL(url);
    image.src = url;
  };

  return (
    <section id="logo-mockup" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="mockup-heading">
      <div className="max-w-2xl mb-8">
        <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#7C5A1E] font-semibold mb-3">Preview</p>
        <h2 id="mockup-heading" className="text-3xl sm:text-4xl font-medium tracking-tight">See your logo on a cover</h2>
        <p className="mt-3 text-sm text-[#6A6054] font-light">
          The preview stays in your browser. The file is not uploaded. These are layout styles for the preview, not a list of materials we have confirmed.
        </p>
      </div>
      <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
        <div className="space-y-4">
          <label className="block text-xs font-mono uppercase tracking-wider">
            Logo file
            <input type="file" accept="image/*" onChange={onFile} className="mt-2 block w-full text-sm" />
          </label>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Cover style">
            {COVERS.map((cover) => (
              <button
                key={cover.id}
                type="button"
                aria-pressed={coverId === cover.id}
                onClick={() => setCoverId(cover.id)}
                className={`min-h-11 px-4 rounded-full border text-xs font-semibold uppercase tracking-widest cursor-pointer ${coverId === cover.id ? 'bg-[#1E1B18] text-[#FAF7F2] border-[#1E1B18]' : 'bg-white border-[#E5DDCF]'}`}
              >
                {cover.label}
              </button>
            ))}
          </div>
          <SiteLink href="/business" onClick={() => trackFunnel('cta_click', { cta: 'mockup_quote' })} className="inline-flex min-h-11 items-center justify-center px-6 py-3.5 rounded-full bg-[#1E1B18] text-[#FAF7F2] text-xs font-semibold uppercase tracking-widest">
            Get a quote with this direction
          </SiteLink>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {COVERS.map((cover, index) => (
            <figure key={cover.id} className={`rounded-2xl border bg-white p-3 ${coverId === cover.id ? 'border-[#1E1B18]' : 'border-[#E5DDCF]'}`}>
              <canvas
                ref={(node) => { refs.current[index] = node; }}
                width="320"
                height="420"
                aria-label={`${cover.label} journal cover preview`}
                className="w-full h-auto rounded-xl"
              />
              <figcaption className="mt-2 text-sm text-[#1E1B18] text-center">{cover.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
