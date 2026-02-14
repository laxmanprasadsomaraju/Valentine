// Animated Avatars and Visual Elements Component
// Adds attractive animated characters and decorative elements

import React from 'react';
import { Heart, Gift, MessageCircle, Sparkles } from 'lucide-react';

// Floating hearts animation
export const FloatingHearts: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${4 + i * 0.5}s`
          }}
        >
          <Heart 
            className="text-[#D56A6A] fill-[#D56A6A]"
            style={{ 
              width: `${12 + i * 4}px`, 
              height: `${12 + i * 4}px`,
              opacity: 0.2 + i * 0.1
            }} 
          />
        </div>
      ))}
    </div>
  );
};

// Animated couple illustration
export const CoupleIllustration: React.FC<{ size?: number }> = ({ size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" className="couple-illustration">
    <defs>
      <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F5D0C5" />
        <stop offset="100%" stopColor="#E8B4A5" />
      </linearGradient>
      <linearGradient id="hairGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4A3728" />
        <stop offset="100%" stopColor="#2B1E1A" />
      </linearGradient>
      <linearGradient id="hairGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8B6914" />
        <stop offset="100%" stopColor="#5A4A0A" />
      </linearGradient>
      <linearGradient id="shirtGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#D56A6A" />
        <stop offset="100%" stopColor="#B85C5C" />
      </linearGradient>
      <linearGradient id="shirtGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#F4C2C2" />
        <stop offset="100%" stopColor="#E8B4B4" />
      </linearGradient>
    </defs>
    
    {/* Person 1 (left) */}
    <g className="person-1" style={{ animation: 'gentleSway 4s ease-in-out infinite' }}>
      {/* Body */}
      <ellipse cx="60" cy="160" rx="30" ry="35" fill="url(#shirtGrad1)" />
      {/* Neck */}
      <rect x="52" y="95" width="16" height="20" fill="url(#skinGrad)" />
      {/* Head */}
      <ellipse cx="60" cy="75" rx="28" ry="32" fill="url(#skinGrad)" />
      {/* Hair */}
      <path 
        d="M 32 65 Q 35 35 60 35 Q 85 35 88 65 Q 90 80 85 85 Q 88 60 60 55 Q 32 60 35 85 Q 30 80 32 65"
        fill="url(#hairGrad1)"
      />
      {/* Eyes (closed happy) */}
      <path d="M 48 72 Q 52 75 56 72" fill="none" stroke="#2B1E1A" strokeWidth="2" strokeLinecap="round" />
      <path d="M 64 72 Q 68 75 72 72" fill="none" stroke="#2B1E1A" strokeWidth="2" strokeLinecap="round" />
      {/* Smile */}
      <path d="M 52 85 Q 60 92 68 85" fill="none" stroke="#2B1E1A" strokeWidth="2" strokeLinecap="round" />
      {/* Blush */}
      <ellipse cx="45" cy="80" rx="6" ry="4" fill="#D56A6A" opacity="0.3" />
      <ellipse cx="75" cy="80" rx="6" ry="4" fill="#D56A6A" opacity="0.3" />
    </g>
    
    {/* Person 2 (right) */}
    <g className="person-2" style={{ animation: 'gentleSway 4s ease-in-out infinite 0.5s' }}>
      {/* Body */}
      <ellipse cx="140" cy="160" rx="30" ry="35" fill="url(#shirtGrad2)" />
      {/* Neck */}
      <rect x="132" y="95" width="16" height="20" fill="url(#skinGrad)" />
      {/* Head */}
      <ellipse cx="140" cy="75" rx="28" ry="32" fill="url(#skinGrad)" />
      {/* Hair (longer) */}
      <path 
        d="M 112 70 Q 115 25 140 25 Q 165 25 168 70 Q 172 100 165 110 Q 168 70 140 60 Q 112 70 115 110 Q 108 100 112 70"
        fill="url(#hairGrad2)"
      />
      {/* Eyes (closed happy) */}
      <path d="M 128 72 Q 132 75 136 72" fill="none" stroke="#2B1E1A" strokeWidth="2" strokeLinecap="round" />
      <path d="M 144 72 Q 148 75 152 72" fill="none" stroke="#2B1E1A" strokeWidth="2" strokeLinecap="round" />
      {/* Smile */}
      <path d="M 132 85 Q 140 92 148 85" fill="none" stroke="#2B1E1A" strokeWidth="2" strokeLinecap="round" />
      {/* Blush */}
      <ellipse cx="125" cy="80" rx="6" ry="4" fill="#D56A6A" opacity="0.3" />
      <ellipse cx="155" cy="80" rx="6" ry="4" fill="#D56A6A" opacity="0.3" />
    </g>
    
    {/* Hearts between them */}
    <g style={{ animation: 'float 3s ease-in-out infinite' }}>
      <Heart className="text-[#D56A6A]" style={{ x: 92, y: 50, width: 16, height: 16 }} />
    </g>
    <g style={{ animation: 'float 3s ease-in-out infinite 1s' }}>
      <Heart className="text-[#D56A6A]" style={{ x: 85, y: 40, width: 12, height: 12, opacity: 0.7 }} />
    </g>
    <g style={{ animation: 'float 3s ease-in-out infinite 2s' }}>
      <Heart className="text-[#D56A6A]" style={{ x: 100, y: 45, width: 10, height: 10, opacity: 0.5 }} />
    </g>
    
    <style>{`
      @keyframes gentleSway {
        0%, 100% { transform: rotate(-2deg); }
        50% { transform: rotate(2deg); }
      }
    `}</style>
  </svg>
);

// Animated card stack
export const CardStackIllustration: React.FC<{ size?: number }> = ({ size = 180 }) => (
  <svg width={size} height={size} viewBox="0 0 180 180" className="card-stack-illustration">
    {/* Card 1 (back) */}
    <rect 
      x="30" y="40" width="100" height="120" rx="12" 
      fill="#F8E8E8" 
      stroke="#D56A6A" 
      strokeWidth="2"
      style={{ animation: 'cardFloat1 3s ease-in-out infinite' }}
    />
    <Heart x="75" y="85" width="20" height="20" className="text-[#D56A6A]" />
    
    {/* Card 2 (middle) */}
    <rect 
      x="45" y="30" width="100" height="120" rx="12" 
      fill="#FFF8E7" 
      stroke="#E8B4B4" 
      strokeWidth="2"
      style={{ animation: 'cardFloat2 3s ease-in-out infinite 0.3s' }}
    />
    <text x="75" y="95" fontSize="24" fill="#D56A6A">?</text>
    
    {/* Card 3 (front) */}
    <rect 
      x="60" y="20" width="100" height="120" rx="12" 
      fill="white" 
      stroke="#D56A6A" 
      strokeWidth="2"
      style={{ animation: 'cardFloat3 3s ease-in-out infinite 0.6s' }}
    />
    <Sparkles x="100" y="70" width="24" height="24" className="text-[#D56A6A]" />
    
    <style>{`
      @keyframes cardFloat1 {
        0%, 100% { transform: translateY(0) rotate(-5deg); }
        50% { transform: translateY(-5px) rotate(-3deg); }
      }
      @keyframes cardFloat2 {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-8px) rotate(2deg); }
      }
      @keyframes cardFloat3 {
        0%, 100% { transform: translateY(0) rotate(5deg); }
        50% { transform: translateY(-10px) rotate(7deg); }
      }
    `}</style>
  </svg>
);

// Animated gift box
export const GiftIllustration: React.FC<{ size?: number }> = ({ size = 150 }) => (
  <svg width={size} height={size} viewBox="0 0 150 150" className="gift-illustration">
    <defs>
      <linearGradient id="boxGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#D56A6A" />
        <stop offset="100%" stopColor="#B85C5C" />
      </linearGradient>
      <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFD93D" />
        <stop offset="100%" stopColor="#FFC93D" />
      </linearGradient>
    </defs>
    
    {/* Box */}
    <rect 
      x="35" y="60" width="80" height="70" rx="4" 
      fill="url(#boxGrad)"
      style={{ animation: 'giftBounce 2s ease-in-out infinite' }}
    />
    
    {/* Vertical ribbon */}
    <rect 
      x="70" y="60" width="10" height="70" 
      fill="url(#ribbonGrad)"
      style={{ animation: 'giftBounce 2s ease-in-out infinite' }}
    />
    
    {/* Horizontal ribbon */}
    <rect 
      x="35" y="90" width="80" height="10" 
      fill="url(#ribbonGrad)"
      style={{ animation: 'giftBounce 2s ease-in-out infinite' }}
    />
    
    {/* Bow */}
    <g style={{ animation: 'bowWiggle 2s ease-in-out infinite' }}>
      <ellipse cx="55" cy="50" rx="20" ry="12" fill="url(#ribbonGrad)" transform="rotate(-30 55 50)" />
      <ellipse cx="95" cy="50" rx="20" ry="12" fill="url(#ribbonGrad)" transform="rotate(30 95 50)" />
      <circle cx="75" cy="55" r="8" fill="#FFC93D" />
    </g>
    
    {/* Sparkles */}
    <g style={{ animation: 'sparkle 1.5s ease-in-out infinite' }}>
      <Sparkles x="30" y="40" width={16} height={16} className="text-[#FFD93D]" />
    </g>
    <g style={{ animation: 'sparkle 1.5s ease-in-out infinite 0.5s' }}>
      <Sparkles x="110" y="50" width={14} height={14} className="text-[#FFD93D]" />
    </g>
    
    <style>{`
      @keyframes giftBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
      @keyframes bowWiggle {
        0%, 100% { transform: rotate(-3deg); }
        50% { transform: rotate(3deg); }
      }
      @keyframes sparkle {
        0%, 100% { opacity: 0.5; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.2); }
      }
    `}</style>
  </svg>
);

// Animated envelope
export const EnvelopeIllustration: React.FC<{ size?: number }> = ({ size = 140 }) => (
  <svg width={size} height={size} viewBox="0 0 140 140" className="envelope-illustration">
    {/* Envelope body */}
    <rect 
      x="20" y="50" width="100" height="70" rx="4" 
      fill="#F8E8E8" 
      stroke="#D56A6A" 
      strokeWidth="2"
      style={{ animation: 'envelopeFloat 3s ease-in-out infinite' }}
    />
    
    {/* Envelope flap */}
    <path 
      d="M 20 50 L 70 85 L 120 50"
      fill="#FFF8E7"
      stroke="#D56A6A"
      strokeWidth="2"
      style={{ animation: 'envelopeFloat 3s ease-in-out infinite' }}
    />
    
    {/* Heart seal */}
    <g style={{ animation: 'sealPulse 2s ease-in-out infinite' }}>
      <circle cx="70" cy="75" r="15" fill="#D56A6A" />
      <Heart 
        x="62" y="67" 
        width={16} 
        height={16} 
        className="text-white fill-white" 
      />
    </g>
    
    {/* Floating hearts around */}
    <g style={{ animation: 'heartFloat1 2.5s ease-in-out infinite' }}>
      <Heart x="10" y="30" width={12} height={12} className="text-[#D56A6A]" opacity={0.6} />
    </g>
    <g style={{ animation: 'heartFloat2 2.5s ease-in-out infinite 0.8s' }}>
      <Heart x="115" y="35" width={10} height={10} className="text-[#D56A6A]" opacity={0.5} />
    </g>
    
    <style>{`
      @keyframes envelopeFloat {
        0%, 100% { transform: translateY(0) rotate(-2deg); }
        50% { transform: translateY(-8px) rotate(2deg); }
      }
      @keyframes sealPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
      @keyframes heartFloat1 {
        0%, 100% { transform: translateY(0); opacity: 0.6; }
        50% { transform: translateY(-10px); opacity: 1; }
      }
      @keyframes heartFloat2 {
        0%, 100% { transform: translateY(0); opacity: 0.5; }
        50% { transform: translateY(-8px); opacity: 0.9; }
      }
    `}</style>
  </svg>
);

// Logo with animation
export const AnimatedLogo: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <div className="flex items-center gap-2" style={{ animation: 'logoPulse 3s ease-in-out infinite' }}>
    <div 
      className="relative"
      style={{ 
        width: size, 
        height: size,
        animation: 'heartBeat 1.5s ease-in-out infinite'
      }}
    >
      <Heart 
        className="text-[#D56A6A] fill-[#D56A6A]" 
        style={{ width: size, height: size }}
      />
      <Sparkles 
        className="absolute -top-1 -right-1 text-[#FFD93D]" 
        style={{ width: size * 0.4, height: size * 0.4 }}
      />
    </div>
    <span 
      className="font-['Playfair_Display'] text-xl font-semibold text-[#2B1E1A]"
      style={{ animation: 'textShimmer 3s ease-in-out infinite' }}
    >
      LoveLink
    </span>
    
    <style>{`
      @keyframes heartBeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.08); }
      }
      @keyframes textShimmer {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
      }
      @keyframes logoPulse {
        0%, 100% { filter: drop-shadow(0 0 0 transparent); }
        50% { filter: drop-shadow(0 0 8px rgba(213, 106, 106, 0.3)); }
      }
    `}</style>
  </div>
);

// Support Section Component
export const SupportSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#F6F2EE] to-[#F8E8E8]">
      <div className="lovelink-card max-w-[600px] mx-auto p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-[#D56A6A]/10 flex items-center justify-center mx-auto mb-6">
          <Heart className="w-8 h-8 text-[#D56A6A] fill-[#D56A6A]" />
        </div>
        
        <h3 className="text-2xl font-semibold text-[#2B1E1A] mb-3">
          Support this project
        </h3>
        
        <p className="text-[#7A6B63] mb-6">
          If you enjoyed this Valentine experience and want to support future updates, 
          you can leave a tip. Thank you — it genuinely helps keep this free for everyone.
        </p>
        
        <a 
          href="https://www.buymeacoffee.com/lovelink"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2 mb-6"
        >
          <Gift className="w-5 h-5" />
          Buy me a coffee
        </a>
        
        <div className="border-t border-[#2B1E1A]/10 pt-6">
          <p className="text-sm font-medium text-[#2B1E1A] mb-2">
            Feedback / Collaboration
          </p>
          <p className="text-sm text-[#7A6B63] mb-3">
            Want to share feedback or collaborate on this project?
          </p>
          <a 
            href="mailto:somarajulaxmanprasad100@gmail.com"
            className="text-[#D56A6A] font-medium hover:underline flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            somarajulaxmanprasad100@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default {
  FloatingHearts,
  CoupleIllustration,
  CardStackIllustration,
  GiftIllustration,
  EnvelopeIllustration,
  AnimatedLogo,
  SupportSection
};
