// Realistic Unique Flower SVG Components with Stems
// Each flower is a unique artistic design with proper stems

import React from 'react';

interface FlowerProps {
  size?: number;
  color?: string;
  stemColor?: string;
  showStem?: boolean;
  stemLength?: number;
}

// Rose - Classic layered petals with spiral center and stem
export const Rose: React.FC<FlowerProps> = ({ 
  size = 60, 
  color = '#D56A6A',
  stemColor = '#4A7C59',
  showStem = true,
  stemLength = 80
}) => (
  <svg width={size} height={showStem ? size + stemLength : size} viewBox={`0 0 100 ${showStem ? 100 + stemLength : 100}`} className="flower-svg">
    <defs>
      <radialGradient id={`roseGrad-${color.replace('#', '')}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} />
        <stop offset="70%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor={color} stopOpacity="0.6" />
      </radialGradient>
      <linearGradient id={`stemGrad-${stemColor}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={stemColor} />
        <stop offset="100%" stopColor={stemColor} stopOpacity="0.7" />
      </linearGradient>
    </defs>
    
    {showStem && (
      <>
        {/* Main stem */}
        <line 
          x1="50" 
          y1="70" 
          x2="50" 
          y2={70 + stemLength} 
          stroke={`url(#stemGrad-${stemColor})`} 
          strokeWidth="4" 
          strokeLinecap="round"
        />
        {/* Thorn */}
        <path 
          d={`M 50 ${90 + stemLength * 0.2} L 55 ${88 + stemLength * 0.2} L 50 ${86 + stemLength * 0.2}`}
          fill={stemColor}
        />
        {/* Leaves */}
        <ellipse cx="40" cy={80 + stemLength * 0.3} rx="12" ry="6" fill={stemColor} transform={`rotate(-30 40 ${80 + stemLength * 0.3})`} />
        <ellipse cx="60" cy={85 + stemLength * 0.5} rx="12" ry="6" fill={stemColor} transform={`rotate(30 60 ${85 + stemLength * 0.5})`} />
      </>
    )}
    
    {/* Flower head */}
    <g transform={showStem ? '' : ''}>
      {/* Outer petals */}
      <ellipse cx="50" cy="55" rx="28" ry="25" fill={`url(#roseGrad-${color.replace('#', '')})`} />
      <ellipse cx="35" cy="50" rx="18" ry="22" fill={color} opacity="0.9" transform="rotate(-30 35 50)" />
      <ellipse cx="65" cy="50" rx="18" ry="22" fill={color} opacity="0.9" transform="rotate(30 65 50)" />
      <ellipse cx="50" cy="35" rx="20" ry="18" fill={color} opacity="0.85" />
      <ellipse cx="50" cy="70" rx="20" ry="15" fill={color} opacity="0.85" />
      {/* Middle petals */}
      <ellipse cx="42" cy="48" rx="14" ry="16" fill={color} opacity="0.95" transform="rotate(-20 42 48)" />
      <ellipse cx="58" cy="48" rx="14" ry="16" fill={color} opacity="0.95" transform="rotate(20 58 48)" />
      <ellipse cx="50" cy="42" rx="15" ry="14" fill={color} opacity="0.9" />
      {/* Inner spiral center */}
      <circle cx="50" cy="48" r="8" fill={color} opacity="1" />
      <circle cx="50" cy="48" r="4" fill="#2B1E1A" opacity="0.2" />
    </g>
  </svg>
);

// Tulip - Elegant cup-shaped with pointed petals and stem
export const Tulip: React.FC<FlowerProps> = ({ 
  size = 60, 
  color = '#E8B4B4',
  stemColor = '#4A7C59',
  showStem = true,
  stemLength = 90
}) => (
  <svg width={size} height={showStem ? size + stemLength : size} viewBox={`0 0 100 ${showStem ? 100 + stemLength : 100}`} className="flower-svg">
    <defs>
      <linearGradient id={`tulipGrad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor={color} stopOpacity="0.7" />
      </linearGradient>
      <linearGradient id={`tulipStemGrad-${stemColor}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={stemColor} />
        <stop offset="100%" stopColor={stemColor} stopOpacity="0.7" />
      </linearGradient>
    </defs>
    
    {showStem && (
      <>
        {/* Long stem */}
        <line 
          x1="50" 
          y1="75" 
          x2="50" 
          y2={75 + stemLength} 
          stroke={`url(#tulipStemGrad-${stemColor})`} 
          strokeWidth="3" 
          strokeLinecap="round"
        />
        {/* Long leaves */}
        <path 
          d={`M 50 ${85 + stemLength * 0.2} Q 25 ${80 + stemLength * 0.3} 20 ${100 + stemLength * 0.4} Q 35 ${95 + stemLength * 0.4} 50 ${90 + stemLength * 0.4}`}
          fill={stemColor}
          opacity="0.9"
        />
        <path 
          d={`M 50 ${90 + stemLength * 0.3} Q 75 ${85 + stemLength * 0.4} 80 ${105 + stemLength * 0.5} Q 65 ${100 + stemLength * 0.5} 50 ${95 + stemLength * 0.4}`}
          fill={stemColor}
          opacity="0.9"
        />
      </>
    )}
    
    {/* Flower head */}
    <g>
      {/* Left petal */}
      <path 
        d="M 35 75 Q 25 50 35 20 Q 45 30 42 75 Z"
        fill={`url(#tulipGrad-${color.replace('#', '')})`}
      />
      {/* Right petal */}
      <path 
        d="M 65 75 Q 75 50 65 20 Q 55 30 58 75 Z"
        fill={`url(#tulipGrad-${color.replace('#', '')})`}
      />
      {/* Center petal */}
      <path 
        d="M 42 75 Q 50 15 58 75 Q 50 80 42 75 Z"
        fill={color}
        opacity="0.95"
      />
      {/* Petal edges highlight */}
      <path d="M 35 20 Q 40 25 42 30" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4" />
      <path d="M 65 20 Q 60 25 58 30" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4" />
      {/* Inner shadow */}
      <ellipse cx="50" cy="55" rx="8" ry="15" fill="#2B1E1A" opacity="0.1" />
    </g>
  </svg>
);

// Daisy - White petals with yellow center and stem
export const Daisy: React.FC<FlowerProps> = ({ 
  size = 60, 
  color = '#FFF8E7',
  stemColor = '#4A7C59',
  showStem = true,
  stemLength = 85
}) => (
  <svg width={size} height={showStem ? size + stemLength : size} viewBox={`0 0 100 ${showStem ? 100 + stemLength : 100}`} className="flower-svg">
    <defs>
      <linearGradient id={`daisyStemGrad-${stemColor}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={stemColor} />
        <stop offset="100%" stopColor={stemColor} stopOpacity="0.7" />
      </linearGradient>
    </defs>
    
    {showStem && (
      <>
        {/* Stem */}
        <line 
          x1="50" 
          y1="65" 
          x2="50" 
          y2={65 + stemLength} 
          stroke={`url(#daisyStemGrad-${stemColor})`} 
          strokeWidth="3" 
          strokeLinecap="round"
        />
        {/* Leaves */}
        <ellipse cx="38" cy={75 + stemLength * 0.3} rx="10" ry="5" fill={stemColor} transform={`rotate(-25 38 ${75 + stemLength * 0.3})`} />
        <ellipse cx="62" cy={80 + stemLength * 0.5} rx="10" ry="5" fill={stemColor} transform={`rotate(25 62 ${80 + stemLength * 0.5})`} />
      </>
    )}
    
    {/* Flower head */}
    <g>
      {/* Petals - 12 white petals */}
      {[...Array(12)].map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="22"
          rx="6"
          ry="22"
          fill={color}
          transform={`rotate(${i * 30} 50 50)`}
        />
      ))}
      {/* Center */}
      <circle cx="50" cy="50" r="14" fill="#FFD93D" />
      <circle cx="50" cy="50" r="11" fill="#FFC93D" />
      {/* Center texture */}
      {[...Array(8)].map((_, i) => (
        <circle
          key={i}
          cx={50 + Math.cos(i * Math.PI / 4) * 6}
          cy={50 + Math.sin(i * Math.PI / 4) * 6}
          r="2"
          fill="#E6B800"
          opacity="0.5"
        />
      ))}
    </g>
  </svg>
);

// Sunflower - Large with textured center and thick stem
export const Sunflower: React.FC<FlowerProps> = ({ 
  size = 70, 
  color = '#FFD93D',
  stemColor = '#4A7C59',
  showStem = true,
  stemLength = 95
}) => (
  <svg width={size} height={showStem ? size + stemLength : size} viewBox={`0 0 100 ${showStem ? 100 + stemLength : 100}`} className="flower-svg">
    <defs>
      <linearGradient id={`sunflowerStemGrad-${stemColor}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={stemColor} />
        <stop offset="100%" stopColor={stemColor} stopOpacity="0.7" />
      </linearGradient>
    </defs>
    
    {showStem && (
      <>
        {/* Thick stem */}
        <line 
          x1="50" 
          y1="72" 
          x2="50" 
          y2={72 + stemLength} 
          stroke={`url(#sunflowerStemGrad-${stemColor})`} 
          strokeWidth="6" 
          strokeLinecap="round"
        />
        {/* Large leaves */}
        <ellipse cx="35" cy={85 + stemLength * 0.3} rx="18" ry="8" fill={stemColor} transform={`rotate(-35 35 ${85 + stemLength * 0.3})`} />
        <ellipse cx="65" cy={90 + stemLength * 0.5} rx="18" ry="8" fill={stemColor} transform={`rotate(35 65 ${90 + stemLength * 0.5})`} />
      </>
    )}
    
    {/* Flower head */}
    <g>
      {/* Outer petals */}
      {[...Array(16)].map((_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="18"
          rx="7"
          ry="20"
          fill={color}
          transform={`rotate(${i * 22.5} 50 50)`}
        />
      ))}
      {/* Inner petals */}
      {[...Array(16)].map((_, i) => (
        <ellipse
          key={`inner-${i}`}
          cx="50"
          cy="22"
          rx="5"
          ry="15"
          fill="#FFC93D"
          transform={`rotate(${i * 22.5 + 11.25} 50 50)`}
        />
      ))}
      {/* Center disk */}
      <circle cx="50" cy="50" r="22" fill="#4A3728" />
      {/* Seeds pattern */}
      {[...Array(5)].map((_, ring) => (
        <g key={ring}>
          {[...Array(8 + ring * 4)].map((_, i) => {
            const radius = 8 + ring * 4;
            const angle = (i / (8 + ring * 4)) * Math.PI * 2;
            return (
              <circle
                key={i}
                cx={50 + Math.cos(angle) * radius}
                cy={50 + Math.sin(angle) * radius}
                r="1.5"
                fill="#6B4E3D"
              />
            );
          })}
        </g>
      ))}
      <circle cx="50" cy="50" r="5" fill="#3D2B1F" />
    </g>
  </svg>
);

// Lily - Elegant trumpet shape with long stem
export const Lily: React.FC<FlowerProps> = ({ 
  size = 65, 
  color = '#F8E8E8',
  stemColor = '#4A7C59',
  showStem = true,
  stemLength = 95
}) => (
  <svg width={size} height={showStem ? size + stemLength : size} viewBox={`0 0 100 ${showStem ? 100 + stemLength : 100}`} className="flower-svg">
    <defs>
      <linearGradient id={`lilyGrad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor={color} stopOpacity="0.6" />
      </linearGradient>
      <linearGradient id={`lilyStemGrad-${stemColor}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={stemColor} />
        <stop offset="100%" stopColor={stemColor} stopOpacity="0.7" />
      </linearGradient>
    </defs>
    
    {showStem && (
      <>
        {/* Long stem */}
        <line 
          x1="50" 
          y1="70" 
          x2="50" 
          y2={70 + stemLength} 
          stroke={`url(#lilyStemGrad-${stemColor})`} 
          strokeWidth="3" 
          strokeLinecap="round"
        />
        {/* Narrow leaves */}
        <ellipse cx="38" cy={80 + stemLength * 0.3} rx="8" ry="20" fill={stemColor} transform={`rotate(-15 38 ${80 + stemLength * 0.3})`} />
        <ellipse cx="62" cy={85 + stemLength * 0.5} rx="8" ry="20" fill={stemColor} transform={`rotate(15 62 ${85 + stemLength * 0.5})`} />
      </>
    )}
    
    {/* Flower head */}
    <g>
      {/* 6 petals */}
      {[...Array(6)].map((_, i) => (
        <path
          key={i}
          d={`M 50 50 Q ${30 + Math.cos(i * Math.PI / 3) * 15} ${30 + Math.sin(i * Math.PI / 3) * 15} ${50 + Math.cos(i * Math.PI / 3) * 35} ${20 + Math.sin(i * Math.PI / 3) * 35} Q ${55 + Math.cos(i * Math.PI / 3) * 20} ${40 + Math.sin(i * Math.PI / 3) * 20} 50 50`}
          fill={`url(#lilyGrad-${color.replace('#', '')})`}
          stroke={color}
          strokeWidth="0.5"
        />
      ))}
      {/* Petal spots */}
      {[...Array(6)].map((_, i) => (
        <g key={`spots-${i}`}>
          <circle
            cx={50 + Math.cos(i * Math.PI / 3) * 20}
            cy={35 + Math.sin(i * Math.PI / 3) * 20}
            r="2"
            fill="#D56A6A"
            opacity="0.4"
          />
        </g>
      ))}
      {/* Stamens */}
      {[...Array(6)].map((_, i) => (
        <line
          key={i}
          x1="50"
          y1="50"
          x2={50 + Math.cos(i * Math.PI / 3) * 15}
          y2={35 + Math.sin(i * Math.PI / 3) * 15}
          stroke="#4A7C59"
          strokeWidth="1"
        />
      ))}
      {/* Anthers */}
      {[...Array(6)].map((_, i) => (
        <ellipse
          key={`anther-${i}`}
          cx={50 + Math.cos(i * Math.PI / 3) * 16}
          cy={34 + Math.sin(i * Math.PI / 3) * 16}
          rx="3"
          ry="1.5"
          fill="#8B6914"
          transform={`rotate(${i * 60} ${50 + Math.cos(i * Math.PI / 3) * 16} ${34 + Math.sin(i * Math.PI / 3) * 16})`}
        />
      ))}
    </g>
  </svg>
);

// Orchid - Exotic butterfly shape
export const Orchid: React.FC<FlowerProps> = ({ 
  size = 65, 
  color = '#E6E6FA',
  stemColor = '#4A7C59',
  showStem = true,
  stemLength = 80
}) => (
  <svg width={size} height={showStem ? size + stemLength : size} viewBox={`0 0 100 ${showStem ? 100 + stemLength : 100}`} className="flower-svg">
    <defs>
      <radialGradient id={`orchidGrad-${color.replace('#', '')}`} cx="50%" cy="30%" r="60%">
        <stop offset="0%" stopColor={color} />
        <stop offset="60%" stopColor={color} stopOpacity="0.8" />
        <stop offset="100%" stopColor={color} stopOpacity="0.5" />
      </radialGradient>
      <linearGradient id={`orchidStemGrad-${stemColor}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={stemColor} />
        <stop offset="100%" stopColor={stemColor} stopOpacity="0.7" />
      </linearGradient>
    </defs>
    
    {showStem && (
      <>
        {/* Curved stem */}
        <path 
          d={`M 50 75 Q 55 ${75 + stemLength * 0.5} 50 ${75 + stemLength}`}
          stroke={`url(#orchidStemGrad-${stemColor})`} 
          strokeWidth="3" 
          fill="none"
        />
        {/* Fleshy leaves */}
        <ellipse cx="40" cy={80 + stemLength * 0.3} rx="10" ry="6" fill={stemColor} />
        <ellipse cx="60" cy={85 + stemLength * 0.5} rx="10" ry="6" fill={stemColor} />
      </>
    )}
    
    {/* Flower head */}
    <g>
      {/* Upper petals */}
      <ellipse cx="35" cy="35" rx="15" ry="20" fill={`url(#orchidGrad-${color.replace('#', '')})`} transform="rotate(-30 35 35)" />
      <ellipse cx="65" cy="35" rx="15" ry="20" fill={`url(#orchidGrad-${color.replace('#', '')})`} transform="rotate(30 65 35)" />
      <ellipse cx="50" cy="25" rx="12" ry="18" fill={color} />
      {/* Lower petal (lip) */}
      <path 
        d="M 50 45 Q 30 55 35 75 Q 50 85 65 75 Q 70 55 50 45 Z"
        fill={color}
        opacity="0.9"
      />
      {/* Lip pattern */}
      <path 
        d="M 50 55 Q 40 60 42 70 Q 50 75 58 70 Q 60 60 50 55 Z"
        fill="#D56A6A"
        opacity="0.3"
      />
      {/* Center column */}
      <ellipse cx="50" cy="45" rx="4" ry="12" fill="#F5E6D3" />
    </g>
  </svg>
);

// Peony - Full, ruffled bloom with stem
export const Peony: React.FC<FlowerProps> = ({ 
  size = 70, 
  color = '#F4C2C2',
  stemColor = '#4A7C59',
  showStem = true,
  stemLength = 75
}) => (
  <svg width={size} height={showStem ? size + stemLength : size} viewBox={`0 0 100 ${showStem ? 100 + stemLength : 100}`} className="flower-svg">
    <defs>
      <radialGradient id={`peonyGrad-${color.replace('#', '')}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor={color} stopOpacity="0.7" />
      </radialGradient>
      <linearGradient id={`peonyStemGrad-${stemColor}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={stemColor} />
        <stop offset="100%" stopColor={stemColor} stopOpacity="0.7" />
      </linearGradient>
    </defs>
    
    {showStem && (
      <>
        {/* Stem */}
        <line 
          x1="50" 
          y1="72" 
          x2="50" 
          y2={72 + stemLength} 
          stroke={`url(#peonyStemGrad-${stemColor})`} 
          strokeWidth="4" 
          strokeLinecap="round"
        />
        {/* Leaves */}
        <ellipse cx="38" cy={80 + stemLength * 0.3} rx="12" ry="6" fill={stemColor} transform={`rotate(-25 38 ${80 + stemLength * 0.3})`} />
        <ellipse cx="62" cy={85 + stemLength * 0.5} rx="12" ry="6" fill={stemColor} transform={`rotate(25 62 ${85 + stemLength * 0.5})`} />
      </>
    )}
    
    {/* Flower head */}
    <g>
      {/* Outer ruffled petals */}
      {[...Array(8)].map((_, i) => (
        <ellipse
          key={i}
          cx={50 + Math.cos(i * Math.PI / 4) * 20}
          cy={50 + Math.sin(i * Math.PI / 4) * 20}
          rx="18"
          ry="22"
          fill={`url(#peonyGrad-${color.replace('#', '')})`}
          transform={`rotate(${i * 45 + 20} ${50 + Math.cos(i * Math.PI / 4) * 20} ${50 + Math.sin(i * Math.PI / 4) * 20})`}
          opacity="0.8"
        />
      ))}
      {/* Middle layer */}
      {[...Array(6)].map((_, i) => (
        <ellipse
          key={`mid-${i}`}
          cx={50 + Math.cos(i * Math.PI / 3) * 12}
          cy={50 + Math.sin(i * Math.PI / 3) * 12}
          rx="14"
          ry="18"
          fill={color}
          transform={`rotate(${i * 60 + 10} ${50 + Math.cos(i * Math.PI / 3) * 12} ${50 + Math.sin(i * Math.PI / 3) * 12})`}
          opacity="0.9"
        />
      ))}
      {/* Inner center */}
      {[...Array(5)].map((_, i) => (
        <ellipse
          key={`inner-${i}`}
          cx={50 + Math.cos(i * 72 * Math.PI / 180) * 6}
          cy={50 + Math.sin(i * 72 * Math.PI / 180) * 6}
          rx="8"
          ry="12"
          fill={color}
          transform={`rotate(${i * 72 + 30} ${50 + Math.cos(i * 72 * Math.PI / 180) * 6} ${50 + Math.sin(i * 72 * Math.PI / 180) * 6})`}
        />
      ))}
      <circle cx="50" cy="50" r="6" fill={color} opacity="0.95" />
    </g>
  </svg>
);

// Lavender - Spike of tiny flowers with stem
export const Lavender: React.FC<FlowerProps> = ({ 
  size = 50, 
  color = '#9B7CB6',
  stemColor = '#4A7C59',
  showStem = true,
  stemLength = 70
}) => (
  <svg width={size} height={showStem ? size + stemLength : size} viewBox={`0 0 100 ${showStem ? 100 + stemLength : 100}`} className="flower-svg">
    <defs>
      <linearGradient id={`lavenderGrad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor={color} stopOpacity="0.5" />
      </linearGradient>
      <linearGradient id={`lavenderStemGrad-${stemColor}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={stemColor} />
        <stop offset="100%" stopColor={stemColor} stopOpacity="0.7" />
      </linearGradient>
    </defs>
    
    {showStem && (
      <>
        {/* Woody stem */}
        <line 
          x1="50" 
          y1="70" 
          x2="50" 
          y2={70 + stemLength} 
          stroke={`url(#lavenderStemGrad-${stemColor})`} 
          strokeWidth="3" 
          strokeLinecap="round"
        />
        {/* Small leaves */}
        <ellipse cx="42" cy={78 + stemLength * 0.3} rx="6" ry="3" fill={stemColor} />
        <ellipse cx="58" cy={82 + stemLength * 0.5} rx="6" ry="3" fill={stemColor} />
      </>
    )}
    
    {/* Flower spike */}
    <g>
      {[...Array(12)].map((_, i) => (
        <g key={i}>
          <ellipse
            cx={45 + (i % 2) * 10}
            cy={35 + i * 3}
            rx="5"
            ry="7"
            fill={`url(#lavenderGrad-${color.replace('#', '')})`}
          />
          <ellipse
            cx={50}
            cy={33 + i * 3}
            rx="5"
            ry="7"
            fill={color}
            opacity="0.9"
          />
          <ellipse
            cx={55 - (i % 2) * 10}
            cy={35 + i * 3}
            rx="5"
            ry="7"
            fill={`url(#lavenderGrad-${color.replace('#', '')})`}
            opacity="0.8"
          />
        </g>
      ))}
      <circle cx="50" cy="28" r="4" fill={color} />
    </g>
  </svg>
);

// Carnation - Ruffled petals with stem
export const Carnation: React.FC<FlowerProps> = ({ 
  size = 55, 
  color = '#FFB6C1',
  stemColor = '#4A7C59',
  showStem = true,
  stemLength = 85
}) => (
  <svg width={size} height={showStem ? size + stemLength : size} viewBox={`0 0 100 ${showStem ? 100 + stemLength : 100}`} className="flower-svg">
    <defs>
      <linearGradient id={`carnationStemGrad-${stemColor}`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={stemColor} />
        <stop offset="100%" stopColor={stemColor} stopOpacity="0.7" />
      </linearGradient>
    </defs>
    
    {showStem && (
      <>
        {/* Stem */}
        <line 
          x1="50" 
          y1="70" 
          x2="50" 
          y2={70 + stemLength} 
          stroke={`url(#carnationStemGrad-${stemColor})`} 
          strokeWidth="3" 
          strokeLinecap="round"
        />
        {/* Leaves */}
        <ellipse cx="38" cy={80 + stemLength * 0.3} rx="10" ry="5" fill={stemColor} transform={`rotate(-30 38 ${80 + stemLength * 0.3})`} />
        <ellipse cx="62" cy={85 + stemLength * 0.5} rx="10" ry="5" fill={stemColor} transform={`rotate(30 62 ${85 + stemLength * 0.5})`} />
      </>
    )}
    
    {/* Flower head */}
    <g>
      {/* Ruffled outer petals */}
      {[...Array(12)].map((_, i) => (
        <path
          key={i}
          d={`M 50 50 Q ${35 + Math.cos(i * 30 * Math.PI / 180) * 10} ${35 + Math.sin(i * 30 * Math.PI / 180) * 10} ${50 + Math.cos(i * 30 * Math.PI / 180) * 30} ${20 + Math.sin(i * 30 * Math.PI / 180) * 30} Q ${55 + Math.cos(i * 30 * Math.PI / 180) * 15} ${40 + Math.sin(i * 30 * Math.PI / 180) * 15} 50 50`}
          fill={color}
          opacity="0.7"
          stroke={color}
          strokeWidth="0.5"
        />
      ))}
      {/* Inner layer */}
      {[...Array(8)].map((_, i) => (
        <ellipse
          key={`inner-${i}`}
          cx={50 + Math.cos(i * 45 * Math.PI / 180) * 12}
          cy={50 + Math.sin(i * 45 * Math.PI / 180) * 12}
          rx="10"
          ry="14"
          fill={color}
          transform={`rotate(${i * 45} ${50 + Math.cos(i * 45 * Math.PI / 180) * 12} ${50 + Math.sin(i * 45 * Math.PI / 180) * 12})`}
          opacity="0.85"
        />
      ))}
      <circle cx="50" cy="50" r="10" fill={color} />
      <circle cx="50" cy="50" r="5" fill={color} opacity="0.9" />
    </g>
  </svg>
);

// Flower type mapping
export const FLOWER_COMPONENTS = {
  rose: Rose,
  tulip: Tulip,
  daisy: Daisy,
  sunflower: Sunflower,
  lily: Lily,
  orchid: Orchid,
  peony: Peony,
  lavender: Lavender,
  carnation: Carnation
} as const;

export type FlowerType = keyof typeof FLOWER_COMPONENTS;

// Render a specific flower
export const RenderFlower: React.FC<{
  type: FlowerType;
  size?: number;
  color?: string;
  stemColor?: string;
  showStem?: boolean;
  stemLength?: number;
}> = ({ type, size, color, stemColor, showStem, stemLength }) => {
  const FlowerComponent = FLOWER_COMPONENTS[type];
  if (!FlowerComponent) return null;
  
  return (
    <FlowerComponent 
      size={size} 
      color={color} 
      stemColor={stemColor}
      showStem={showStem}
      stemLength={stemLength}
    />
  );
};

export default FLOWER_COMPONENTS;
