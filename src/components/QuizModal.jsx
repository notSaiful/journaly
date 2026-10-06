import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { PRODUCTS } from '../data/products';

export default function QuizModal({ isOpen, onClose, onAddToCart }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    purpose: '',
    format: '',
    writingTool: ''
  });

  if (!isOpen) return null;

  const questions = [
    {
      step: 1,
      title: 'What is your primary ritual for this journal?',
      subtitle: 'Pick the main purpose that grounds your daily writing.',
      options: [
        { id: 'clarity', label: 'Morning Clarity & Gratitude', desc: '5-minute daily reset and mental decompression' },
        { id: 'work', label: 'Executive Deep Work & Strategy', desc: 'Quarterly roadmaps, project architectures, and meeting logs' },
        { id: 'bullet', label: 'Creative Bullet Journaling & Notes', desc: 'Habit trackers, freeform ideation, sketches and dot grids' },
        { id: 'keepsake', label: 'Life Reflection & Personal Memoir', desc: 'Long-form writing, poetry, and heirloom journaling' }
      ]
    },
    {
      step: 2,
      title: 'What interior layout feels most natural to your mind?',
      subtitle: 'How do you like to structure your pages?',
      options: [
        { id: 'dot-grid', label: '5mm Subtle Dot Matrix', desc: 'Total creative freedom with invisible guidelines' },
        { id: 'daily-planner', label: 'Structured Daily Priority Sections', desc: 'Morning 3-priority matrix and evening decompression prompts' },
        { id: 'ruled', label: '7mm Classic Feint Ruled Lines', desc: 'Effortless continuous handwriting flow' },
        { id: 'blank', label: 'Pure Archival Blank Canvas', desc: 'For sketches, mind maps, and unbounded thought' }
      ]
    },
    {
      step: 3,
      title: 'What pen do you write with most often?',
      subtitle: 'Ensuring our premium opaque paper matches your writing flow with zero bleed.',
      options: [
        { id: 'fountain', label: 'Fountain Pen (Wet Ink)', desc: 'Needs zero-feathering and zero-bleed paper' },
        { id: 'rollerball', label: 'Liquid Rollerball or Gel Pen', desc: 'Needs silky smooth glide with instant dry absorption' },
        { id: 'marker', label: 'Art Marker, Brush Pen or Mildliner', desc: 'Needs heavy opaque paper that will never shadow' },
        { id: 'pencil', label: 'Fine Graphite or Ballpoint', desc: 'Needs tactile tooth and comfortable daily flow' }
      ]
    }
  ];

  const handleSelectOption = (field, value) => {
    setAnswers({ ...answers, [field]: value });
    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(4);
    }
  };

  const getRecommendedProduct = () => {
    if (answers.purpose === 'work' || answers.format === 'daily-planner') {
      return PRODUCTS[1];
    } else if (answers.purpose === 'keepsake') {
      return PRODUCTS[2];
    } else if (answers.purpose === 'work' && answers.format === 'dot-grid') {
      return PRODUCTS[3];
    }
    return PRODUCTS[0];
  };

  const recommended = getRecommendedProduct();

  const handleAddRecommended = () => {
    onAddToCart({
      ...recommended,
      customId: `quiz-${recommended.id}-${Date.now()}`,
      selectedColor: recommended.colors?.[0]?.name,
      paperRuling: answers.format === 'ruled' ? '7mm Ruled' : '5mm Dot Grid',
      monogram: 'M.P.'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-[#E5DDCF] p-6 sm:p-10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF7F2] hover:bg-[#F3ECE1] text-[#6A6054] transition-colors border border-[#E5DDCF]"
          aria-label="Close Quiz"
        >
          <X className="w-5 h-5" />
        </button>

        {step <= 3 ? (
          <div>
            {/* Progress Bar */}
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    s <= step ? 'bg-[#8C6D46]' : 'bg-[#EFE8DD]'
                  }`}
                />
              ))}
            </div>

            <span className="text-[11px] font-mono uppercase tracking-widest text-[#8C6D46] font-semibold block mb-1">
              Step {step} of 3 • Journal Matcher
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#2B2520] mb-2">
              {questions[step - 1].title}
            </h3>
            <p className="text-xs sm:text-sm text-[#6A6054] mb-8 font-light">
              {questions[step - 1].subtitle}
            </p>

            {/* Options List */}
            <div className="space-y-3">
              {questions[step - 1].options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    const field = step === 1 ? 'purpose' : step === 2 ? 'format' : 'writingTool';
                    handleSelectOption(field, opt.id);
                  }}
                  className="w-full text-left p-4 rounded-2xl border border-[#E5DDCF] hover:border-[#8C6D46] hover:bg-[#FAF7F2] transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-[#2B2520] group-hover:text-[#8C6D46]">
                      {opt.label}
                    </h4>
                    <p className="text-xs text-[#6A6054] mt-0.5 font-light">{opt.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C4B9A3] group-hover:text-[#8C6D46] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>

            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="mt-6 text-xs text-[#8C8072] hover:text-[#2B2520] flex items-center gap-1 font-light"
              >
                ← Back to previous question
              </button>
            )}
          </div>
        ) : (
          /* Match Result Screen */
          <div className="text-center py-2 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E2EBE5] text-[#345941] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#C5D9CC]">
              <Sparkles className="w-3.5 h-3.5 text-[#345941]" />
              <span>99.4% Match Found For Your Writing Ritual</span>
            </div>

            <h3 className="font-serif text-3xl font-normal text-[#2B2520] mb-2">
              Your Ideal Instrument: {recommended.name}
            </h3>
            <p className="text-xs text-[#6A6054] max-w-md mx-auto mb-6 font-light">
              Based on your workflow, this layout gives you the exact combination of structure and tactile focus.
            </p>

            {/* Recommended Product Preview Card */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E5DDCF] flex flex-col sm:flex-row items-center gap-5 max-w-lg mx-auto mb-6 text-left">
              <img
                src={recommended.image}
                alt={recommended.name}
                className="w-24 h-24 object-cover rounded-xl shadow-xs flex-shrink-0"
              />
              <div>
                <span className="text-xs font-serif font-bold text-[#2B2520] block">
                  {recommended.name}
                </span>
                <p className="text-[11px] text-[#6A6054] mb-2 font-light">{recommended.subtitle}</p>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-xl font-bold text-[#2B2520]">${recommended.price}</span>
                  <span className="text-[11px] bg-[#FAF3E8] text-[#735C3E] font-semibold px-2 py-0.5 rounded border border-[#E8DDCA]">
                    Quiz Perk: 15% OFF in bag
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleAddRecommended}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#332B24] hover:bg-[#251F1A] text-[#FAF7F2] rounded-full text-sm font-semibold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Claim Your Matched Journal</span>
                <ArrowRight className="w-4 h-4 text-[#D9C4A1]" />
              </button>

              <button
                onClick={() => setStep(1)}
                className="px-5 py-3 text-xs text-[#8C8072] hover:text-[#2B2520] flex items-center justify-center gap-1.5 font-light"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
