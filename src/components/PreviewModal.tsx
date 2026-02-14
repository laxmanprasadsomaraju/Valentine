// Preview Modal - Shows creator how their link will look
import React from 'react';
import { X, Eye, Heart, Music, MessageCircle, Gift, Calendar } from 'lucide-react';
import type { WizardData } from '../types';
import { RenderFlower } from './Flowers';
import { CARD_TEMPLATES } from '../types';
import { computeBouquetLayout } from './BouquetBuilder';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: WizardData;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const hasMusic = data.musicUrl && data.musicUrl.trim() !== '';
  const layout = computeBouquetLayout(data.bouquet.flowers, data.bouquet.bunchTightness);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="lovelink-card w-full max-w-[800px] max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur z-10 p-5 border-b border-[#2B1E1A]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D56A6A]/10 flex items-center justify-center">
              <Eye className="w-5 h-5 text-[#D56A6A]" />
            </div>
            <div>
              <h3 className="font-semibold text-[#2B1E1A]">Preview Your Valentine</h3>
              <p className="text-sm text-[#7A6B63]">This is how {data.receiverName || 'your love'} will see it</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-[#2B1E1A]/5 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-[#7A6B63]" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Music Preview Notice */}
          {hasMusic && (
            <div className="lovelink-card-inner p-4 bg-[#D56A6A]/5 border border-[#D56A6A]/20">
              <div className="flex items-center gap-3">
                <Music className="w-5 h-5 text-[#D56A6A]" />
                <div>
                  <p className="font-medium text-[#2B1E1A]">Background Music Added</p>
                  <p className="text-sm text-[#7A6B63]">Music will auto-play when they open your link (not during preview)</p>
                </div>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="text-center">
            <Heart className="w-12 h-12 text-[#D56A6A] fill-[#D56A6A] mx-auto mb-4 animate-heartbeat" />
            <h2 className="text-3xl font-semibold text-[#2B1E1A] mb-2">
              Happy Valentine's Day!
            </h2>
            <p className="text-[#7A6B63]">
              From {data.senderName || 'someone who loves you'}
            </p>
          </div>

          {/* Love Note */}
          {data.senderNote && (
            <div className="lovelink-card-inner p-6">
              <h3 className="text-lg font-semibold text-[#2B1E1A] mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#D56A6A]" />
                A Note For You
              </h3>
              <div className="bg-white/50 p-4 rounded-xl">
                <p className="text-[#2B1E1A] leading-relaxed whitespace-pre-wrap">
                  {data.senderNote}
                </p>
              </div>
            </div>
          )}

          {/* Bouquet Preview */}
          <div className="lovelink-card-inner p-6">
            <h3 className="text-lg font-semibold text-[#2B1E1A] mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#D56A6A]" />
              A Bouquet For You
            </h3>

            <div className="relative bg-gradient-to-b from-[#F8E8E8]/30 to-transparent rounded-xl p-4">
              <svg viewBox="0 0 200 280" className="w-full max-w-[400px] mx-auto" style={{ height: '280px' }}>
                <defs>
                  <linearGradient id="previewStemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4A7C59" />
                    <stop offset="100%" stopColor="#4A7C59" stopOpacity="0.7" />
                  </linearGradient>
                </defs>

                {/* Individual stems */}
                {layout.map((item) => (
                  <path
                    key={`stem-${item.flower.id}`}
                    d={item.stemPath}
                    fill="none"
                    stroke="url(#previewStemGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                ))}

                {/* Stem bundle at bottom */}
                {data.bouquet.flowers.length > 0 && (
                  <path
                    d={`M ${100 - 6 * data.bouquet.bunchTightness * Math.min(data.bouquet.flowers.length, 8) * 0.3} 185 
                        Q 100 210 100 245 
                        Q 100 210 ${100 + 6 * data.bouquet.bunchTightness * Math.min(data.bouquet.flowers.length, 8) * 0.3} 185`}
                    fill="none"
                    stroke="url(#previewStemGrad)"
                    strokeWidth={4 + Math.min(data.bouquet.flowers.length, 8) * data.bouquet.bunchTightness * 0.8}
                    strokeLinecap="round"
                  />
                )}

                {/* Wrapper */}
                {data.bouquet.wrapStyle !== 'none' && (
                  <path
                    d={`M ${100 - 25} 170 Q 100 240 ${100 + 25} 170 L ${100 + 15} 230 Q 100 240 ${100 - 15} 230 Z`}
                    fill="#C4A77D"
                    stroke="rgba(0,0,0,0.1)"
                  />
                )}

                {/* Ribbon */}
                <rect x="80" y="185" width="40" height="12" rx="3" fill="#D56A6A" />

                {/* Ribbon Name */}
                {data.bouquet.ribbonName && (
                  <g transform="translate(100, 205)">
                    <rect x="-35" y="-8" width="70" height="16" rx="8" fill="white" stroke="#D56A6A" strokeWidth="1" />
                    <text x="0" y="3" textAnchor="middle" fontSize="7" fill="#2B1E1A">
                      {data.bouquet.ribbonName.length > 12 ? data.bouquet.ribbonName.slice(0, 12) + '...' : data.bouquet.ribbonName}
                    </text>
                  </g>
                )}

                {/* Tag */}
                {data.bouquet.tagLine && (
                  <g transform="translate(100, 255)">
                    <rect x="-40" y="-10" width="80" height="20" rx="4" fill="#FFF8E7" stroke="#D4A574" strokeWidth="1" />
                    <text x="0" y="4" textAnchor="middle" fontSize="8" fill="#2B1E1A" fontStyle="italic">
                      {data.bouquet.tagLine.length > 18 ? data.bouquet.tagLine.slice(0, 18) + '...' : data.bouquet.tagLine}
                    </text>
                  </g>
                )}

                {/* Flowers */}
                {layout.map((item) => (
                  <g
                    key={item.flower.id}
                    transform={`translate(${item.flowerX}, ${item.flowerY}) rotate(${item.flower.rotation}) scale(${item.flower.scale})`}
                  >
                    <RenderFlower type={item.flower.type} size={30} color={item.flower.color} showStem={false} />
                  </g>
                ))}
              </svg>

              <p className="text-center text-sm text-[#7A6B63] mt-2">
                {data.bouquet.flowers.length} {data.bouquet.flowers.length === 1 ? 'flower' : 'flowers'} • {data.bouquet.ribbonColor} ribbon
              </p>
            </div>
          </div>

          {/* Cards */}
          {data.selectedCards.length > 0 && (
            <div className="lovelink-card-inner p-6">
              <h3 className="text-lg font-semibold text-[#2B1E1A] mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#D56A6A]" />
                Interactive Cards
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.selectedCards.map((cardType, index) => {
                  const template = CARD_TEMPLATES[cardType];
                  return (
                    <div key={index} className="bg-white/50 p-3 rounded-xl flex items-center gap-3">
                      <span className="text-2xl">{template.icon}</span>
                      <div>
                        <p className="font-medium text-[#2B1E1A] text-sm">{cardType}</p>
                        <p className="text-xs text-[#7A6B63]">{template.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Plans */}
          {(data.plans.thisYear || data.plans.nextYear || data.plans.manifestation) && (
            <div className="lovelink-card-inner p-6">
              <h3 className="text-lg font-semibold text-[#2B1E1A] mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#D56A6A]" />
                Our Future
              </h3>
              <div className="space-y-3">
                {data.plans.thisYear && (
                  <div className="bg-white/50 p-3 rounded-xl">
                    <p className="text-xs text-[#7A6B63] mb-1">This year together</p>
                    <p className="text-sm text-[#2B1E1A]">{data.plans.thisYear}</p>
                  </div>
                )}
                {data.plans.nextYear && (
                  <div className="bg-white/50 p-3 rounded-xl">
                    <p className="text-xs text-[#7A6B63] mb-1">Next year dream</p>
                    <p className="text-sm text-[#2B1E1A]">{data.plans.nextYear}</p>
                  </div>
                )}
                {data.plans.manifestation && (
                  <div className="bg-white/50 p-3 rounded-xl">
                    <p className="text-xs text-[#7A6B63] mb-1">Our manifestation</p>
                    <p className="text-sm text-[#2B1E1A]">{data.plans.manifestation}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PIN Notice */}
          {data.pin && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="text-amber-600 text-lg">🔒</span>
              </div>
              <div>
                <p className="font-medium text-amber-800">PIN Protected</p>
                <p className="text-sm text-amber-600">They'll need to enter the PIN to view your Valentine</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur p-5 border-t border-[#2B1E1A]/10">
          <button
            onClick={onClose}
            className="w-full btn-primary"
          >
            Looks Good! Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
