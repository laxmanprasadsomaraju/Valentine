// Bouquet Builder Component with Stems, Pot, and Wrapper
import React, { useState } from 'react';
import { Plus, Minus, RotateCw, Trash2, Palette, Flower2 } from 'lucide-react';
import { RenderFlower } from './Flowers';
import type { FlowerType, SelectedFlower, RibbonColor, WrapStyle, PotStyle, StemColor } from '../types';
import { FLOWER_COLORS, FLOWER_NAMES, STEM_COLORS, POT_STYLES, RIBBON_COLORS, WRAP_STYLES } from '../types';

interface BouquetBuilderProps {
  bouquet: {
    flowers: SelectedFlower[];
    ribbonColor: RibbonColor;
    wrapStyle: WrapStyle;
    potStyle: PotStyle;
    tagLine: string;
    ribbonName: string;
    stemColor: StemColor;
    bunchTightness: number;
  };
  onUpdate: (bouquet: {
    flowers: SelectedFlower[];
    ribbonColor: RibbonColor;
    wrapStyle: WrapStyle;
    potStyle: PotStyle;
    tagLine: string;
    ribbonName: string;
    stemColor: StemColor;
    bunchTightness: number;
  }) => void;
}

const FLOWER_TYPES_LIST: FlowerType[] = ['rose', 'tulip', 'daisy', 'sunflower', 'lily', 'orchid', 'peony', 'lavender', 'carnation'];

// Helper: compute flower positions & stem paths for given bouquet
export function computeBouquetLayout(flowers: SelectedFlower[], bunchTightness: number) {
  const count = flowers.length;
  const gatherY = 185; // Y where stems converge at the ribbon
  const gatherX = 100; // Center X

  return flowers.map((flower, index) => {
    // Flower head X position (spread controlled by tightness)
    const spread = 20 * (1 - bunchTightness * 0.3);
    const flowerX = gatherX + (index - count / 2 + 0.5) * spread;
    const flowerY = flower.y;

    // Stem converges from flower head to gathering point
    const stemBottomX = gatherX + (index - count / 2 + 0.5) * (5 * bunchTightness);

    // Quadratic curve for a natural stem look
    const controlX = (flowerX + stemBottomX) / 2;
    const controlY = (flowerY + 50 + gatherY) / 2;
    const stemPath = `M ${flowerX} ${flowerY + 30} Q ${controlX} ${controlY} ${stemBottomX} ${gatherY}`;

    return {
      flower,
      flowerX,
      flowerY,
      stemPath,
      stemBottomX,
    };
  });
}

export const BouquetBuilder: React.FC<BouquetBuilderProps> = ({ bouquet, onUpdate }) => {
  const [selectedFlowerId, setSelectedFlowerId] = useState<string | null>(null);
  const [showFlowerPicker, setShowFlowerPicker] = useState(false);
  const [selectedType, setSelectedType] = useState<FlowerType>('rose');
  const [selectedColor, setSelectedColor] = useState<string>(FLOWER_COLORS['rose'][0]);
  const [activeTab, setActiveTab] = useState<'flowers' | 'stems' | 'wrap'>('flowers');

  const addFlower = () => {
    if (bouquet.flowers.length >= 15) return;

    const newFlower: SelectedFlower = {
      id: Date.now().toString(),
      type: selectedType,
      color: selectedColor,
      stemColor: bouquet.stemColor,
      x: 25 + Math.random() * 50,
      y: 15 + Math.random() * 25,
      rotation: (Math.random() - 0.5) * 40,
      scale: 0.7 + Math.random() * 0.4,
      stemLength: 70 + Math.random() * 30
    };

    onUpdate({
      ...bouquet,
      flowers: [...bouquet.flowers, newFlower]
    });
    setShowFlowerPicker(false);
  };

  const removeFlower = (id: string) => {
    onUpdate({
      ...bouquet,
      flowers: bouquet.flowers.filter(f => f.id !== id)
    });
    setSelectedFlowerId(null);
  };

  const updateFlower = (id: string, updates: Partial<SelectedFlower>) => {
    onUpdate({
      ...bouquet,
      flowers: bouquet.flowers.map(f => f.id === id ? { ...f, ...updates } : f)
    });
  };

  const updateAllStemColors = (color: StemColor) => {
    onUpdate({
      ...bouquet,
      stemColor: color,
      flowers: bouquet.flowers.map(f => ({ ...f, stemColor: color }))
    });
  };

  const handleTypeChange = (type: FlowerType) => {
    setSelectedType(type);
    setSelectedColor(FLOWER_COLORS[type][0]);
  };

  const stemColorHex = STEM_COLORS.find(s => s.value === bouquet.stemColor)?.color || '#4A7C59';
  const layout = computeBouquetLayout(bouquet.flowers, bouquet.bunchTightness);

  return (
    <div className="space-y-6">
      {/* Bouquet Preview */}
      <div className="lovelink-card-inner p-6 relative overflow-hidden" style={{ minHeight: '400px' }}>
        <svg viewBox="0 0 200 280" className="w-full h-full" style={{ maxHeight: '380px' }}>
          <defs>
            <linearGradient id="stemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={stemColorHex} />
              <stop offset="100%" stopColor={stemColorHex} stopOpacity="0.7" />
            </linearGradient>

            {bouquet.wrapStyle !== 'none' && (
              <linearGradient id="wrapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={WRAP_STYLES.find(w => w.value === bouquet.wrapStyle)?.color || '#C4A77D'} />
                <stop offset="100%" stopColor={WRAP_STYLES.find(w => w.value === bouquet.wrapStyle)?.color || '#C4A77D'} stopOpacity="0.8" />
              </linearGradient>
            )}

            {bouquet.potStyle !== 'none' && (
              <linearGradient id="potGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={POT_STYLES.find(p => p.value === bouquet.potStyle)?.color || '#D2691E'} />
                <stop offset="50%" stopColor={POT_STYLES.find(p => p.value === bouquet.potStyle)?.color || '#D2691E'} stopOpacity="0.9" />
                <stop offset="100%" stopColor={POT_STYLES.find(p => p.value === bouquet.potStyle)?.color || '#D2691E'} stopOpacity="0.8" />
              </linearGradient>
            )}
          </defs>

          {/* Individual Stems - drawn FIRST so they appear behind flowers */}
          {layout.map((item) => (
            <path
              key={`stem-${item.flower.id}`}
              d={item.stemPath}
              fill="none"
              stroke="url(#stemGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          ))}

          {/* Stem bundle at bottom (below ribbon) */}
          {bouquet.flowers.length > 0 && bouquet.potStyle === 'none' && (
            <path
              d={`M ${100 - 6 * bouquet.bunchTightness * Math.min(bouquet.flowers.length, 8) * 0.3} 185 
                  Q 100 210 100 245 
                  Q 100 210 ${100 + 6 * bouquet.bunchTightness * Math.min(bouquet.flowers.length, 8) * 0.3} 185`}
              fill="none"
              stroke="url(#stemGradient)"
              strokeWidth={4 + Math.min(bouquet.flowers.length, 8) * bouquet.bunchTightness * 0.8}
              strokeLinecap="round"
            />
          )}

          {/* Pot (if selected) */}
          {bouquet.potStyle !== 'none' && (
            <g>
              <path
                d="M 70 200 L 75 240 Q 100 245 125 240 L 130 200 Q 100 195 70 200"
                fill="url(#potGradient)"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="1"
              />
              <ellipse cx="100" cy="200" rx="32" ry="6" fill={POT_STYLES.find(p => p.value === bouquet.potStyle)?.color} stroke="rgba(0,0,0,0.1)" />
            </g>
          )}

          {/* Wrap / Wrapper */}
          {bouquet.wrapStyle !== 'none' && bouquet.potStyle === 'none' && (
            <g>
              <path
                d={`M ${100 - 25 - bouquet.flowers.length * 2} 170 
                    Q 100 240 ${100 + 25 + bouquet.flowers.length * 2} 170 
                    L ${100 + 15 + bouquet.flowers.length} 230 
                    Q 100 240 ${100 - 15 - bouquet.flowers.length} 230 Z`}
                fill="url(#wrapGradient)"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="1"
              />
              <path d={`M 100 170 L 100 235`} stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
              <path d={`M ${100 - 12} 175 L ${100 - 8} 230`} stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
              <path d={`M ${100 + 12} 175 L ${100 + 8} 230`} stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
            </g>
          )}

          {/* Ribbon */}
          <g>
            <rect
              x={100 - 20 - bouquet.flowers.length}
              y="185"
              width={40 + bouquet.flowers.length * 2}
              height="12"
              rx="3"
              fill={RIBBON_COLORS.find(r => r.value === bouquet.ribbonColor)?.color}
            />

            {/* Ribbon bow */}
            <g transform="translate(100, 191)">
              <ellipse cx="-15" cy="0" rx="12" ry="6" fill={RIBBON_COLORS.find(r => r.value === bouquet.ribbonColor)?.color} transform="rotate(-30)" />
              <ellipse cx="15" cy="0" rx="12" ry="6" fill={RIBBON_COLORS.find(r => r.value === bouquet.ribbonColor)?.color} transform="rotate(30)" />
              <circle cx="0" cy="0" r="5" fill={RIBBON_COLORS.find(r => r.value === bouquet.ribbonColor)?.color} />
              <path d="M 0 5 Q -8 15 -12 25" fill="none" stroke={RIBBON_COLORS.find(r => r.value === bouquet.ribbonColor)?.color} strokeWidth="4" strokeLinecap="round" />
              <path d="M 0 5 Q 8 15 12 25" fill="none" stroke={RIBBON_COLORS.find(r => r.value === bouquet.ribbonColor)?.color} strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* Ribbon Name Tag */}
            {bouquet.ribbonName && (
              <g transform="translate(100, 220)">
                <rect x="-35" y="-8" width="70" height="16" rx="8" fill="white" stroke={RIBBON_COLORS.find(r => r.value === bouquet.ribbonColor)?.color} strokeWidth="1" />
                <text x="0" y="3" textAnchor="middle" fontSize="8" fill="#2B1E1A" fontFamily="Inter, sans-serif">
                  {bouquet.ribbonName.length > 12 ? bouquet.ribbonName.slice(0, 12) + '...' : bouquet.ribbonName}
                </text>
              </g>
            )}
          </g>

          {/* Tag Line */}
          {bouquet.tagLine && (
            <g transform="translate(100, 260)">
              <rect x="-45" y="-10" width="90" height="20" rx="4" fill="#FFF8E7" stroke="#D4A574" strokeWidth="1" />
              <text x="0" y="4" textAnchor="middle" fontSize="9" fill="#2B1E1A" fontFamily="'Playfair Display', serif" fontStyle="italic">
                {bouquet.tagLine.length > 20 ? bouquet.tagLine.slice(0, 20) + '...' : bouquet.tagLine}
              </text>
            </g>
          )}

          {/* Flowers - drawn LAST so they appear on top of stems */}
          {layout.map((item) => (
            <g
              key={item.flower.id}
              transform={`translate(${item.flowerX}, ${item.flowerY}) rotate(${item.flower.rotation}) scale(${item.flower.scale})`}
              className={selectedFlowerId === item.flower.id ? 'drop-shadow-lg' : ''}
              onClick={() => setSelectedFlowerId(item.flower.id === selectedFlowerId ? null : item.flower.id)}
              style={{ cursor: 'pointer' }}
            >
              <RenderFlower
                type={item.flower.type}
                size={35}
                color={item.flower.color}
                stemColor={item.flower.stemColor}
                showStem={false}
              />
              {selectedFlowerId === item.flower.id && (
                <circle cx="0" cy="35" r="25" fill="none" stroke="#D56A6A" strokeWidth="2" strokeDasharray="4" />
              )}
            </g>
          ))}
        </svg>

        {/* Empty state */}
        {bouquet.flowers.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Flower2 className="w-16 h-16 text-[#D56A6A]/30 mx-auto mb-4" />
              <p className="text-[#7A6B63]">Click "Add Flower" to start building your bouquet</p>
            </div>
          </div>
        )}
      </div>

      {/* Selected Flower Controls */}
      {selectedFlowerId && (
        <div className="lovelink-card-inner p-4 selected-flower-controls">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-[#2B1E1A]">Selected Flower</span>
            <button
              onClick={() => removeFlower(selectedFlowerId)}
              className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => {
                const f = bouquet.flowers.find(flower => flower.id === selectedFlowerId);
                if (f) updateFlower(selectedFlowerId, { rotation: f.rotation - 15 });
              }}
              className="w-10 h-10 rounded-full bg-[#D56A6A]/10 flex items-center justify-center hover:bg-[#D56A6A]/20 transition-colors"
              title="Rotate Left"
            >
              <RotateCw className="w-4 h-4 text-[#D56A6A]" style={{ transform: 'scaleX(-1)' }} />
            </button>
            <button
              onClick={() => {
                const f = bouquet.flowers.find(flower => flower.id === selectedFlowerId);
                if (f) updateFlower(selectedFlowerId, { rotation: f.rotation + 15 });
              }}
              className="w-10 h-10 rounded-full bg-[#D56A6A]/10 flex items-center justify-center hover:bg-[#D56A6A]/20 transition-colors"
              title="Rotate Right"
            >
              <RotateCw className="w-4 h-4 text-[#D56A6A]" />
            </button>
            <button
              onClick={() => {
                const f = bouquet.flowers.find(flower => flower.id === selectedFlowerId);
                if (f) updateFlower(selectedFlowerId, { scale: Math.max(0.5, f.scale - 0.1) });
              }}
              className="w-10 h-10 rounded-full bg-[#D56A6A]/10 flex items-center justify-center hover:bg-[#D56A6A]/20 transition-colors"
              title="Smaller"
            >
              <Minus className="w-4 h-4 text-[#D56A6A]" />
            </button>
            <button
              onClick={() => {
                const f = bouquet.flowers.find(flower => flower.id === selectedFlowerId);
                if (f) updateFlower(selectedFlowerId, { scale: Math.min(1.5, f.scale + 0.1) });
              }}
              className="w-10 h-10 rounded-full bg-[#D56A6A]/10 flex items-center justify-center hover:bg-[#D56A6A]/20 transition-colors"
              title="Bigger"
            >
              <Plus className="w-4 h-4 text-[#D56A6A]" />
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#2B1E1A]/10">
        {(['flowers', 'stems', 'wrap'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${activeTab === tab
                ? 'text-[#D56A6A] border-b-2 border-[#D56A6A]'
                : 'text-[#7A6B63] hover:text-[#2B1E1A]'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'flowers' && (
          <>
            <button
              onClick={() => setShowFlowerPicker(true)}
              disabled={bouquet.flowers.length >= 15}
              className="w-full btn-secondary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Plus className="w-5 h-5" />
              Add Flower ({bouquet.flowers.length}/15)
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-[#7A6B63]">Bunch tightness:</span>
              <input
                type="range"
                min="0.3"
                max="1"
                step="0.1"
                value={bouquet.bunchTightness}
                onChange={(e) => onUpdate({ ...bouquet, bunchTightness: parseFloat(e.target.value) })}
                className="flex-1"
              />
            </div>
          </>
        )}

        {activeTab === 'stems' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2B1E1A] mb-2 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Stem Color (applies to all flowers)
              </label>
              <div className="flex flex-wrap gap-2">
                {STEM_COLORS.map((stem) => (
                  <button
                    key={stem.value}
                    onClick={() => updateAllStemColors(stem.value)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full border-2 transition-all ${bouquet.stemColor === stem.value
                        ? 'border-[#D56A6A] bg-[#D56A6A]/5'
                        : 'border-transparent bg-white'
                      }`}
                  >
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: stem.color }} />
                    <span className="text-sm text-[#2B1E1A]">{stem.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'wrap' && (
          <div className="space-y-4">
            {/* Pot Style */}
            <div>
              <label className="block text-sm font-medium text-[#2B1E1A] mb-2">Pot / Vase</label>
              <div className="grid grid-cols-3 gap-2">
                {POT_STYLES.map((pot) => (
                  <button
                    key={pot.value}
                    onClick={() => onUpdate({ ...bouquet, potStyle: pot.value })}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${bouquet.potStyle === pot.value
                        ? 'border-[#D56A6A] bg-[#D56A6A]/5'
                        : 'border-transparent bg-white hover:bg-gray-50'
                      }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full mb-2 mx-auto"
                      style={{ backgroundColor: pot.color, border: pot.value === 'none' ? '2px dashed #ccc' : 'none' }}
                    />
                    <span className="text-xs text-[#2B1E1A] block text-center">{pot.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Wrap Style (only if no pot) */}
            {bouquet.potStyle === 'none' && (
              <div>
                <label className="block text-sm font-medium text-[#2B1E1A] mb-2">Wrapper</label>
                <div className="flex flex-wrap gap-2">
                  {WRAP_STYLES.map((wrap) => (
                    <button
                      key={wrap.value}
                      onClick={() => onUpdate({ ...bouquet, wrapStyle: wrap.value })}
                      className={`px-3 py-2 rounded-full border-2 text-sm transition-all ${bouquet.wrapStyle === wrap.value
                          ? 'border-[#D56A6A] bg-[#D56A6A]/5'
                          : 'border-transparent bg-white'
                        }`}
                    >
                      {wrap.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Ribbon Color */}
            <div>
              <label className="block text-sm font-medium text-[#2B1E1A] mb-2">Ribbon Color</label>
              <div className="flex flex-wrap gap-2">
                {RIBBON_COLORS.map((ribbon) => (
                  <button
                    key={ribbon.value}
                    onClick={() => onUpdate({ ...bouquet, ribbonColor: ribbon.value })}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${bouquet.ribbonColor === ribbon.value ? 'border-[#2B1E1A] scale-110' : 'border-transparent'
                      }`}
                    style={{ backgroundColor: ribbon.color }}
                    title={ribbon.label}
                  />
                ))}
              </div>
            </div>

            {/* Ribbon Name */}
            <div>
              <label className="block text-sm font-medium text-[#2B1E1A] mb-2">Name on Ribbon</label>
              <input
                type="text"
                value={bouquet.ribbonName}
                onChange={(e) => onUpdate({ ...bouquet, ribbonName: e.target.value })}
                placeholder="e.g., For My Love"
                maxLength={15}
                className="lovelink-input"
              />
              <p className="text-xs text-[#7A6B63] mt-1">{bouquet.ribbonName.length}/15 characters</p>
            </div>

            {/* Tag Line */}
            <div>
              <label className="block text-sm font-medium text-[#2B1E1A] mb-2">Tag Message</label>
              <input
                type="text"
                value={bouquet.tagLine}
                onChange={(e) => onUpdate({ ...bouquet, tagLine: e.target.value })}
                placeholder="To my favorite human"
                maxLength={25}
                className="lovelink-input"
              />
              <p className="text-xs text-[#7A6B63] mt-1">{bouquet.tagLine.length}/25 characters</p>
            </div>
          </div>
        )}
      </div>

      {/* Flower Picker Modal */}
      {showFlowerPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="lovelink-card w-full max-w-[500px] max-h-[80vh] overflow-auto">
            <div className="p-5 border-b border-[#2B1E1A]/10 flex items-center justify-between">
              <h4 className="font-semibold text-[#2B1E1A]">Choose a Flower</h4>
              <button
                onClick={() => setShowFlowerPicker(false)}
                className="text-[#7A6B63] hover:text-[#2B1E1A]"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Flower Type Selection */}
              <div>
                <label className="block text-sm font-medium text-[#2B1E1A] mb-3">Flower Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {FLOWER_TYPES_LIST.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleTypeChange(type)}
                      className={`lovelink-card-small p-3 flex flex-col items-center gap-2 transition-all ${selectedType === type ? 'ring-2 ring-[#D56A6A] bg-[#D56A6A]/5' : ''
                        }`}
                    >
                      <RenderFlower type={type} size={40} showStem={false} />
                      <span className="text-xs text-[#2B1E1A]">{FLOWER_NAMES[type]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-medium text-[#2B1E1A] mb-3 flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {FLOWER_COLORS[selectedType].map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color ? 'border-[#2B1E1A] scale-110' : 'border-transparent'
                        }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="lovelink-card-inner p-6 flex items-center justify-center">
                <RenderFlower type={selectedType} size={100} color={selectedColor} showStem={true} stemLength={60} />
              </div>

              {/* Add Button */}
              <button
                onClick={addFlower}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add to Bouquet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BouquetBuilder;
