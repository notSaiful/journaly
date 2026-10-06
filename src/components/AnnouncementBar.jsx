import React, { useState, useEffect } from 'react';
import { Sparkles, Truck, ShieldCheck, Clock } from 'lucide-react';

export default function AnnouncementBar({ currency, setCurrency }) {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 22, seconds: 15 });

  const messages = [
    { icon: Sparkles, text: 'Researched Prompts by IntelligentLab — 9/10 Build a Lasting Habit' },
    { icon: Truck, text: 'Free Express Priority Delivery Across India' },
    { icon: ShieldCheck, text: '60-Day "Empty Book" Trial: Keep it & Get 100% Refund if Not Transformed' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % messages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [messages.length]);

  useEffect(() => {
    const clock = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 5, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(clock);
  }, []);

  const ActiveIcon = messages[tickerIndex].icon;

  return (
    <div className="bg-[#EFE8DD] text-[#3D352E] text-[11px] sm:text-xs py-2 px-4 border-b border-[#E0D5C3] z-50 sticky top-0 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Scarcity Countdown in Minimalist Beige Style */}
        <div className="hidden lg:flex items-center gap-1.5 text-[#735C3E] font-mono">
          <Clock className="w-3.5 h-3.5 text-[#8C6D46]" />
          <span>Today's Batch:</span>
          <span className="font-semibold text-[#2B2520]">
            {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
          </span>
        </div>

        {/* Central Rotating Value Driver */}
        <div className="flex-1 flex items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 transition-all duration-500 ease-in-out">
            <ActiveIcon className="w-3.5 h-3.5 text-[#8C6D46] flex-shrink-0" />
            <span className="font-medium tracking-wide">
              {messages[tickerIndex].text}
            </span>
          </div>
        </div>

        {/* India Delivery & INR Badge */}
        <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-[#2B2520]">
          <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
          <span className="font-semibold">India Delivery (₹ INR)</span>
        </div>

      </div>
    </div>
  );
}
