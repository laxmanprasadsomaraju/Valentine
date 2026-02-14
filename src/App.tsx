import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Heart,
  ArrowRight,
  Sparkles,
  Gift,
  MessageCircle,
  Lock,
  Copy,
  Share2,
  Check,
  ChevronLeft,
  Calendar,
  Clock,
  Eye,
  Mail,
  Loader2
} from 'lucide-react';
import type {
  WizardData,
  PartnerTitle,
  Tone,
  CardType,
  ExpiryOption
} from './types';
import { DEFAULT_WIZARD_DATA, CARD_TEMPLATES } from './types';
import { RenderFlower } from './components/Flowers';
import { BouquetBuilder, computeBouquetLayout } from './components/BouquetBuilder';
import { MusicPlayer } from './components/MusicPlayer';
import { AIWritingHelper } from './components/AIWritingHelper';
import { PreviewModal } from './components/PreviewModal';
import { StatsDisplay } from './components/Stats';
import { SupportSection } from './components/SupportSection';
import {
  FloatingHearts,
  CoupleIllustration,
  CardStackIllustration,
  GiftIllustration,
  EnvelopeIllustration,
  AnimatedLogo
} from './components/AnimatedAvatars';
import { generateSlug, upsertUser, getUserValentines, createValentine, getValentineBySlug, incrementViewCount } from './lib/supabaseClient';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Email is stored in sessionStorage for the current session
const getStoredEmail = () => sessionStorage.getItem('lovelink_email') || '';
const getStoredUserId = () => sessionStorage.getItem('lovelink_user_id') || '';

// Navigation Component
function Navigation({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-[#F6F2EE]/80 backdrop-blur-md">
      <Link to="/" className="flex items-center gap-2">
        <AnimatedLogo size={32} />
      </Link>
      <button
        onClick={onCreateClick}
        className="btn-primary text-sm py-2.5 px-5"
      >
        Create a Link
      </button>
    </nav>
  );
}

// Hero Section
function HeroSection({ onStart }: { onStart: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 40, scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.9, ease: 'power2.out' }
      );

      gsap.fromTo(ctaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.4, ease: 'power2.out' }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen w-full flex flex-col items-center justify-center relative dot-grid pt-20">
      <FloatingHearts />
      <div className="vignette absolute inset-0 pointer-events-none" />

      <div
        ref={cardRef}
        className="lovelink-card w-[min(860px,90vw)] min-h-[320px] flex flex-col items-center justify-center p-8 md:p-12 text-center relative z-10"
      >
        <div className="mb-6">
          <CoupleIllustration size={160} />
        </div>

        <h1 className="text-4xl md:text-6xl font-semibold text-[#2B1E1A] mb-4">
          Create a Valentine Link
        </h1>

        <p className="text-lg text-[#7A6B63] mb-8">
          No login. Just love.
        </p>
      </div>

      <button
        ref={ctaRef}
        onClick={onStart}
        className="btn-primary mt-8 flex items-center gap-2 text-lg"
      >
        Start Creating
        <ArrowRight className="w-5 h-5" />
      </button>

      <p className="mt-6 text-sm text-[#7A6B63]">
        Takes 5–10 minutes. One link to share.
      </p>
    </section>
  );
}

// How It Works Section
function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Create',
      desc: 'Build your page: a note, cards, a bouquet, and plans.',
      illustration: <EnvelopeIllustration size={100} />
    },
    {
      num: '02',
      title: 'Share',
      desc: 'Send one link. Optional PIN + open date.',
      illustration: <GiftIllustration size={100} />
    },
    {
      num: '03',
      title: 'Keep',
      desc: 'They open, play, reply. It becomes a shared capsule.',
      illustration: <CardStackIllustration size={100} />
    }
  ];

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center py-20 px-4">
      <h2 className="text-3xl md:text-4xl font-semibold text-[#2B1E1A] mb-16 text-center">
        How LoveLink works
      </h2>

      <div className="flex flex-col md:flex-row gap-6 md:gap-[3.5vw] w-full max-w-[960px] justify-center">
        {steps.map((step, i) => (
          <div
            key={step.num}
            className="lovelink-card flex-1 min-h-[320px] p-8 flex flex-col items-center text-center animate-float"
            style={{ animationDelay: `${i * 0.5}s` }}
          >
            <div className="mb-4">
              {step.illustration}
            </div>
            <span className="text-sm font-semibold text-[#D56A6A] mb-2">{step.num}</span>
            <h3 className="text-2xl font-semibold text-[#2B1E1A] mb-3">{step.title}</h3>
            <p className="text-[#7A6B63] leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// Feature Highlight Section
function FeatureHighlightSection({
  title,
  description,
  linkText,
  illustration,
  reversed = false
}: {
  title: string;
  description: string;
  linkText: string;
  illustration: React.ReactNode;
  reversed?: boolean;
}) {
  return (
    <section className="min-h-[80vh] w-full flex items-center justify-center py-20 px-4 md:px-[8vw]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-[4vw] w-full max-w-[1200px] items-center">
        {!reversed && (
          <div className="lovelink-card w-full p-8 flex items-center justify-center min-h-[350px]">
            {illustration}
          </div>
        )}

        <div className="flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-semibold text-[#2B1E1A] mb-4">{title}</h3>
          <p className="text-[#7A6B63] leading-relaxed mb-6">{description}</p>
          <a href="#" className="text-[#D56A6A] font-medium flex items-center gap-2 hover:gap-3 transition-all">
            {linkText}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {reversed && (
          <div className="lovelink-card w-full p-8 flex items-center justify-center min-h-[350px]">
            {illustration}
          </div>
        )}
      </div>
    </section>
  );
}

// Wizard Step 1: Basics
function WizardBasics({ data, onUpdate, onNext }: {
  data: WizardData;
  onUpdate: (data: Partial<WizardData>) => void;
  onNext: () => void;
}) {
  const titles: PartnerTitle[] = ['Partner', 'Wife', 'Husband', 'Girlfriend', 'Boyfriend', 'Fiancé', 'Fiancée', 'Custom'];
  const tones: Tone[] = ['Sweet', 'Funny', 'Poetic', 'Deep', 'Spicy'];

  return (
    <div className="lovelink-card w-full max-w-[760px] mx-auto p-8 md:p-10">
      <span className="step-indicator">Step 1 of 6</span>
      <h2 className="text-3xl font-semibold text-[#2B1E1A] mt-2 mb-8">Who is this for?</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#2B1E1A] mb-2">Partner name</label>
          <input
            type="text"
            value={data.receiverName}
            onChange={(e) => onUpdate({ receiverName: e.target.value })}
            placeholder="Their name"
            className="lovelink-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2B1E1A] mb-2">Your name</label>
          <input
            type="text"
            value={data.senderName}
            onChange={(e) => onUpdate({ senderName: e.target.value })}
            placeholder="Your name"
            className="lovelink-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2B1E1A] mb-3">Partner title</label>
          <div className="flex flex-wrap gap-2">
            {titles.map((title) => (
              <button
                key={title}
                onClick={() => onUpdate({ partnerTitle: title })}
                className={`lovelink-chip ${data.partnerTitle === title ? 'active' : ''}`}
              >
                {title}
              </button>
            ))}
          </div>
          {data.partnerTitle === 'Custom' && (
            <input
              type="text"
              value={data.customTitle}
              onChange={(e) => onUpdate({ customTitle: e.target.value })}
              placeholder="Enter custom title"
              className="lovelink-input mt-3"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2B1E1A] mb-3">Tone</label>
          <div className="flex flex-wrap gap-2">
            {tones.map((tone) => (
              <button
                key={tone}
                onClick={() => onUpdate({ tone })}
                className={`lovelink-chip ${data.tone === tone ? 'active' : ''}`}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <Link to="/" className="btn-secondary">Cancel</Link>
        <button onClick={onNext} className="btn-primary flex items-center gap-2">
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Wizard Step 2: Love Note
function WizardLoveNote({ data, onUpdate, onNext, onBack }: {
  data: WizardData;
  onUpdate: (data: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [showAIHelper, setShowAIHelper] = useState(false);
  const quickPrompts = ['How I feel today', 'What I miss', 'One promise'];

  const applyPrompt = (prompt: string) => {
    const name = data.receiverName || 'my love';
    const prompts: Record<string, string> = {
      'How I feel today': `My dearest ${name},

Every day with you feels like a gift I never expected to receive. Today, I find myself overwhelmed with gratitude for your presence in my life...`,
      'What I miss': `My dearest ${name},

There are moments when the distance between us feels unbearable. I miss the way your hand fits perfectly in mine...`,
      'One promise': `My dearest ${name},

I want to make you a promise today—a promise to always choose us, to choose love, even when things get hard...`
    };
    onUpdate({ senderNote: prompts[prompt] });
  };

  return (
    <div className="lovelink-card w-full max-w-[760px] mx-auto p-8 md:p-10">
      <span className="step-indicator">Step 2 of 6</span>
      <h2 className="text-3xl font-semibold text-[#2B1E1A] mt-2 mb-6">Your love note</h2>

      <div className="flex flex-wrap gap-2 mb-6">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => applyPrompt(prompt)}
            className="lovelink-chip text-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {prompt}
          </button>
        ))}
      </div>

      <textarea
        value={data.senderNote}
        onChange={(e) => onUpdate({ senderNote: e.target.value })}
        placeholder={`Write your heart out...`}
        className="lovelink-input lovelink-textarea"
      />

      <button
        onClick={() => setShowAIHelper(true)}
        className="text-[#D56A6A] text-sm font-medium mt-4 flex items-center gap-2 hover:underline"
      >
        <Sparkles className="w-4 h-4" />
        Need help writing?
      </button>

      <AIWritingHelper
        isOpen={showAIHelper}
        onClose={() => setShowAIHelper(false)}
        onSelect={(text) => onUpdate({ senderNote: text })}
        partnerName={data.receiverName}
        partnerTitle={data.partnerTitle}
        customTitle={data.customTitle}
        tone={data.tone}
      />

      <div className="flex justify-between mt-10">
        <button onClick={onBack} className="btn-secondary flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <button onClick={onNext} className="btn-primary flex items-center gap-2">
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Wizard Step 3: Cards
function WizardCards({ data, onUpdate, onNext, onBack }: {
  data: WizardData;
  onUpdate: (data: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const cardTypes: CardType[] = [
    'Memory Lane', 'This or That', 'Love Quiz', 'Gratitude',
    'Promise Card', 'Future Map', 'Secret Reveal', 'Playlist Link', 'Photo Link'
  ];

  const toggleCard = (cardType: CardType) => {
    const newSelection = data.selectedCards.includes(cardType)
      ? data.selectedCards.filter(c => c !== cardType)
      : [...data.selectedCards, cardType];
    onUpdate({ selectedCards: newSelection });
  };

  return (
    <div className="lovelink-card w-full max-w-[760px] mx-auto p-8 md:p-10">
      <span className="step-indicator">Step 3 of 6</span>
      <h2 className="text-3xl font-semibold text-[#2B1E1A] mt-2 mb-2">Add cards to play</h2>
      <p className="text-[#7A6B63] mb-6">Select 3-10 interactive cards for them to enjoy</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {cardTypes.map((cardType) => {
          const template = CARD_TEMPLATES[cardType];
          const isSelected = data.selectedCards.includes(cardType);

          return (
            <button
              key={cardType}
              onClick={() => toggleCard(cardType)}
              className={`lovelink-card-medium p-4 text-left transition-all ${isSelected ? 'ring-2 ring-[#D56A6A] bg-[#D56A6A]/5' : ''
                }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{template.icon}</span>
                <div>
                  <h4 className="font-semibold text-[#2B1E1A]">{cardType}</h4>
                  <p className="text-sm text-[#7A6B63]">{template.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between p-4 bg-[#D56A6A]/5 rounded-xl mb-8">
        <span className="text-sm text-[#7A6B63]">Selected cards</span>
        <span className="font-semibold text-[#D56A6A]">{data.selectedCards.length}</span>
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="btn-secondary flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <button onClick={onNext} className="btn-primary flex items-center gap-2">
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Wizard Step 4: Bouquet Builder
function WizardBouquet({ data, onUpdate, onNext, onBack }: {
  data: WizardData;
  onUpdate: (data: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="lovelink-card w-full max-w-[760px] mx-auto p-8 md:p-10">
      <span className="step-indicator">Step 4 of 6</span>
      <h2 className="text-3xl font-semibold text-[#2B1E1A] mt-2 mb-6">Design a bouquet</h2>

      <BouquetBuilder
        bouquet={data.bouquet}
        onUpdate={(bouquet) => onUpdate({ bouquet })}
      />

      <div className="flex justify-between mt-10">
        <button onClick={onBack} className="btn-secondary flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <button onClick={onNext} className="btn-primary flex items-center gap-2">
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Wizard Step 5: Plans
function WizardPlans({ data, onUpdate, onNext, onBack }: {
  data: WizardData;
  onUpdate: (data: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="lovelink-card w-full max-w-[760px] mx-auto p-8 md:p-10">
      <span className="step-indicator">Step 5 of 6</span>
      <h2 className="text-3xl font-semibold text-[#2B1E1A] mt-2 mb-6">Plans + links</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#2B1E1A] mb-2">This year together</label>
          <textarea
            value={data.plans.thisYear}
            onChange={(e) => onUpdate({ plans: { ...data.plans, thisYear: e.target.value } })}
            placeholder="What do you want to do together this year?"
            className="lovelink-input lovelink-textarea"
            style={{ minHeight: '100px' }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2B1E1A] mb-2">Next year dream</label>
          <textarea
            value={data.plans.nextYear}
            onChange={(e) => onUpdate({ plans: { ...data.plans, nextYear: e.target.value } })}
            placeholder="What are you dreaming of for next year?"
            className="lovelink-input lovelink-textarea"
            style={{ minHeight: '100px' }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2B1E1A] mb-2">Our manifestation (optional)</label>
          <textarea
            value={data.plans.manifestation}
            onChange={(e) => onUpdate({ plans: { ...data.plans, manifestation: e.target.value } })}
            placeholder="What are you calling into your relationship?"
            className="lovelink-input lovelink-textarea"
            style={{ minHeight: '80px' }}
          />
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <button onClick={onBack} className="btn-secondary flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <button onClick={onNext} className="btn-primary flex items-center gap-2">
          Continue
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Wizard Step 6: Share Settings + Generate Link
function WizardShare({ data, onUpdate, onCreate, onBack }: {
  data: WizardData;
  onUpdate: (data: Partial<WizardData>) => void;
  onCreate: (slug: string) => void;
  onBack: () => void;
}) {
  const [created, setCreated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [slug, setSlug] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const expiryOptions: ExpiryOption[] = ['7 days', '30 days', 'never'];

  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      const newSlug = generateSlug();
      const userId = getStoredUserId();
      await createValentine({
        slug: newSlug,
        user_id: userId,
        sender_name: data.senderName,
        receiver_name: data.receiverName,
        partner_title: data.partnerTitle,
        custom_title: data.customTitle,
        tone: data.tone,
        sender_note: data.senderNote,
        bouquet: data.bouquet,
        selected_cards: data.selectedCards,
        plans: data.plans,
        music_url: data.musicUrl,
        pin: data.pin,
        expiry: data.expiry,
        open_date: data.openDate?.toISOString(),
        status: 'sent',
      });
      setSlug(newSlug);
      onCreate(newSlug);
      setCreated(true);
    } catch (err) {
      console.error('Failed to create valentine:', err);
      alert('Failed to create your link. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const copyLink = () => {
    const link = `${window.location.origin}/v/${slug}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareWhatsApp = () => {
    const link = `${window.location.origin}/v/${slug}`;
    const message = `I made something special for you! 💝\n\n${link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (created) {
    const shareLink = `${window.location.origin}/v/${slug}`;

    return (
      <div className="lovelink-card w-full max-w-[760px] mx-auto p-8 md:p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-[#D56A6A]/10 flex items-center justify-center mx-auto mb-6">
          <Heart className="w-8 h-8 text-[#D56A6A] fill-[#D56A6A]" />
        </div>

        <h2 className="text-3xl font-semibold text-[#2B1E1A] mb-2">Your link is ready!</h2>
        <p className="text-[#7A6B63] mb-8">Share this link with {data.receiverName || 'your love'}</p>

        <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#2B1E1A]/10 mb-6">
          <input
            type="text"
            value={shareLink}
            readOnly
            className="flex-1 bg-transparent text-sm text-[#2B1E1A] outline-none"
          />
          <button
            onClick={copyLink}
            className="btn-primary py-2 px-4 text-sm flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={shareWhatsApp}
            className="btn-secondary flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'A Valentine for you',
                  text: `I made something special for you! 💝`,
                  url: shareLink
                });
              }
            }}
            className="btn-secondary flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>

        {/* What's included summary */}
        <div className="lovelink-card-inner p-5 mb-6 text-left">
          <h4 className="font-semibold text-[#2B1E1A] mb-3 text-sm">✨ What your Valentine includes:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-[#7A6B63]">
            <div className="flex items-center gap-2">
              <span>💌</span> Love note from {data.senderName || 'you'}
            </div>
            {data.selectedCards.length > 0 && (
              <div className="flex items-center gap-2">
                <span>🎴</span> {data.selectedCards.length} interactive card{data.selectedCards.length > 1 ? 's' : ''}
              </div>
            )}
            {data.bouquet.flowers.length > 0 && (
              <div className="flex items-center gap-2">
                <span>💐</span> {data.bouquet.flowers.length}-flower bouquet
              </div>
            )}
            {data.musicUrl && (
              <div className="flex items-center gap-2">
                <span>🎵</span> YouTube music (auto-plays on open)
              </div>
            )}
            {data.pin && (
              <div className="flex items-center gap-2">
                <span>🔒</span> PIN protected
              </div>
            )}
            {(data.plans?.thisYear || data.plans?.nextYear) && (
              <div className="flex items-center gap-2">
                <span>🗓️</span> Future plans together
              </div>
            )}
          </div>
        </div>

        {/* Author Story */}
        <div className="lovelink-card-inner p-5 mb-6 text-left bg-gradient-to-r from-[#FFF5F5] to-[#FFF8E8]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D56A6A] to-[#FFB6C1] flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <p className="font-semibold text-[#2B1E1A] text-sm">The Story Behind LoveLink</p>
              <p className="text-xs text-[#7A6B63]">by Laxman</p>
            </div>
          </div>
          <p className="text-sm text-[#2B1E1A] leading-relaxed mb-3">
            I built LoveLink because my girlfriend lives far away, and I wanted to send her something truly special —
            not just a text, but a whole experience filled with flowers, music, and heartfelt messages.
          </p>
          <p className="text-xs text-[#7A6B63] italic">
            "Every love story shared here makes my heart full." — Laxman
          </p>
        </div>

        {/* Support & Contact */}
        <div className="lovelink-card-inner p-5 bg-gradient-to-r from-[#D56A6A]/5 to-[#FFD93D]/5">
          <p className="text-sm text-[#7A6B63] mb-3">
            Enjoyed creating this? Support LoveLink to keep it free for everyone!
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <a
              href="https://www.buymeacoffee.com/lovelink"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary py-2 px-4 text-sm inline-flex items-center gap-2"
            >
              ☕ Buy me a coffee
            </a>
            <a
              href="mailto:somarajulaxmanprasad100@gmail.com?subject=LoveLink Feedback"
              className="btn-secondary py-2 px-4 text-sm inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Send Feedback
            </a>
          </div>
          <p className="text-xs text-[#7A6B63]">
            📧 somarajulaxmanprasad100@gmail.com
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="lovelink-card w-full max-w-[760px] mx-auto p-8 md:p-10">
      <span className="step-indicator">Step 6 of 6</span>
      <h2 className="text-3xl font-semibold text-[#2B1E1A] mt-2 mb-6">Share settings</h2>

      <div className="space-y-6">
        {/* Preview Button */}
        <button
          onClick={() => setShowPreview(true)}
          className="w-full btn-secondary flex items-center justify-center gap-2"
        >
          <Eye className="w-5 h-5" />
          Preview Your Valentine
        </button>

        {/* Music */}
        <MusicPlayer
          youtubeUrl={data.musicUrl}
          onUrlChange={(url) => onUpdate({ musicUrl: url })}
          editable
          onPreview={() => setShowPreview(true)}
        />

        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#2B1E1A]/10">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-[#7A6B63]" />
            <div>
              <p className="font-medium text-[#2B1E1A]">Lock with PIN</p>
              <p className="text-sm text-[#7A6B63]">Add a 4-digit PIN for extra privacy</p>
            </div>
          </div>
          <input
            type="password"
            maxLength={4}
            value={data.pin}
            onChange={(e) => onUpdate({ pin: e.target.value.replace(/\D/g, '').slice(0, 4) })}
            placeholder="0000"
            className="lovelink-input w-24 text-center tracking-widest"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#2B1E1A]/10">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#7A6B63]" />
            <div>
              <p className="font-medium text-[#2B1E1A]">Open date (optional)</p>
              <p className="text-sm text-[#7A6B63]">They can only open it on this date</p>
            </div>
          </div>
          <input
            type="date"
            className="lovelink-input w-auto"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2B1E1A] mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Expires in
          </label>
          <div className="flex flex-wrap gap-2">
            {expiryOptions.map((option) => (
              <button
                key={option}
                onClick={() => onUpdate({ expiry: option })}
                className={`lovelink-chip ${data.expiry === option ? 'active' : ''}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <button onClick={onBack} className="btn-secondary flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <button onClick={handleCreate} disabled={isCreating} className="btn-primary flex items-center gap-2 disabled:opacity-60">
          {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Heart className="w-4 h-4" />}
          {isCreating ? 'Creating...' : 'Create my link'}
        </button>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        data={data}
      />
    </div>
  );
}

// Create Wizard Main Component - with email entry
function CreateWizard() {
  const [step, setStep] = useState(0); // Start at 0 for email entry
  const [wizardData, setWizardData] = useState<WizardData>(DEFAULT_WIZARD_DATA);
  const [email, setEmail] = useState(getStoredEmail());
  const [emailLoading, setEmailLoading] = useState(false);
  const [existingValentines, setExistingValentines] = useState<any[]>([]);

  // Skip email if already stored
  useEffect(() => {
    if (getStoredUserId()) {
      setStep(1);
    }
  }, []);

  const updateWizardData = (data: Partial<WizardData>) => {
    setWizardData(prev => ({ ...prev, ...data }));
  };

  const handleEmailSubmit = async () => {
    if (!email.trim()) return;
    setEmailLoading(true);
    try {
      const user = await upsertUser(email);
      sessionStorage.setItem('lovelink_email', email.toLowerCase().trim());
      sessionStorage.setItem('lovelink_user_id', user.id);
      const valentines = await getUserValentines(user.id);
      setExistingValentines(valentines);
      if (valentines.length > 0) {
        setStep(-1);
      } else {
        setStep(1);
      }
    } catch (err) {
      console.error('Email error:', err);
      setStep(1);
    } finally {
      setEmailLoading(false);
    }
  };

  const handleCreate = (_slug: string) => {
    console.log('Link created:', _slug);
  };

  return (
    <main className="min-h-screen bg-[#F6F2EE] py-24 px-4">
      <Navigation onCreateClick={() => { }} />

      {/* Step 0: Email Entry */}
      {step === 0 && (
        <div className="lovelink-card w-full max-w-[760px] mx-auto p-8 md:p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-[#D56A6A]/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-[#D56A6A]" />
          </div>
          <h2 className="text-3xl font-semibold text-[#2B1E1A] mb-2">Let's get started</h2>
          <p className="text-[#7A6B63] mb-8">Enter your email so we can save your Valentine</p>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="lovelink-input text-center text-lg mb-4"
            onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
          />

          <div className="flex justify-center gap-3">
            <Link to="/" className="btn-secondary">Back</Link>
            <button
              onClick={handleEmailSubmit}
              disabled={!email.trim() || emailLoading}
              className="btn-primary flex items-center gap-2 disabled:opacity-60"
            >
              {emailLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step -1: Existing Valentines */}
      {step === -1 && (
        <div className="lovelink-card w-full max-w-[760px] mx-auto p-8 md:p-10">
          <h2 className="text-3xl font-semibold text-[#2B1E1A] mb-2">Welcome back! 💝</h2>
          <p className="text-[#7A6B63] mb-6">You have {existingValentines.length} existing Valentine{existingValentines.length > 1 ? 's' : ''}.</p>

          <div className="space-y-3 mb-8">
            {existingValentines.map((v: any) => (
              <div key={v.id} className="lovelink-card-inner p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#2B1E1A]">For {v.receiver_name || 'your love'}</p>
                  <p className="text-sm text-[#7A6B63]">
                    {new Date(v.created_at).toLocaleDateString()} · {v.view_count || 0} views
                  </p>
                </div>
                <button
                  onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/v/${v.slug}`); }}
                  className="btn-secondary text-sm py-2 px-3 flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  Copy Link
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => setStep(1)}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5" />
            Create a New Valentine
          </button>
        </div>
      )}

      {step === 1 && (
        <WizardBasics
          data={wizardData}
          onUpdate={updateWizardData}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <WizardLoveNote
          data={wizardData}
          onUpdate={updateWizardData}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <WizardCards
          data={wizardData}
          onUpdate={updateWizardData}
          onNext={() => setStep(4)}
          onBack={() => setStep(2)}
        />
      )}

      {step === 4 && (
        <WizardBouquet
          data={wizardData}
          onUpdate={updateWizardData}
          onNext={() => setStep(5)}
          onBack={() => setStep(3)}
        />
      )}

      {step === 5 && (
        <WizardPlans
          data={wizardData}
          onUpdate={updateWizardData}
          onNext={() => setStep(6)}
          onBack={() => setStep(4)}
        />
      )}

      {step === 6 && (
        <WizardShare
          data={wizardData}
          onUpdate={updateWizardData}
          onCreate={handleCreate}
          onBack={() => setStep(5)}
        />
      )}
    </main>
  );
}

// Receiver View Component
function ReceiverView() {
  const { id } = useParams<{ id: string }>();
  const [unwrapped, setUnwrapped] = useState(false);
  const [linkData, setLinkData] = useState<any | null>(null);
  const [pinEntered, setPinEntered] = useState('');
  const [pinError, setPinError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchValentine = async () => {
      if (id) {
        const data = await getValentineBySlug(id);
        setLinkData(data);
        setLoading(false);
      }
    };
    fetchValentine();
  }, [id]);

  const checkPin = () => {
    if (linkData?.pin && pinEntered !== linkData.pin) {
      setPinError(true);
      setTimeout(() => setPinError(false), 2000);
    } else {
      // Update view count in Supabase
      if (id) incrementViewCount(id);
      setUnwrapped(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F2EE] flex items-center justify-center">
        <Heart className="w-12 h-12 text-[#D56A6A] animate-pulse" />
      </div>
    );
  }

  if (!linkData) {
    return (
      <div className="min-h-screen bg-[#F6F2EE] flex items-center justify-center p-4">
        <div className="text-center">
          <Heart className="w-16 h-16 text-[#D56A6A] mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-[#2B1E1A]">Link not found</h2>
          <p className="text-[#7A6B63]">This Valentine link may have expired or doesn't exist.</p>
          <Link to="/" className="btn-primary mt-6 inline-block">
            Create Your Own
          </Link>
        </div>
      </div>
    );
  }

  if (!unwrapped) {
    return (
      <div className="min-h-screen bg-[#F6F2EE] flex flex-col items-center justify-center dot-grid p-4">
        <FloatingHearts />

        {linkData.pin ? (
          <div className="lovelink-card w-[min(400px,90vw)] p-8 text-center">
            <Lock className="w-12 h-12 text-[#D56A6A] mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-[#2B1E1A] mb-2">Enter PIN</h2>
            <p className="text-[#7A6B63] mb-6">This Valentine is protected</p>
            <input
              type="password"
              maxLength={4}
              value={pinEntered}
              onChange={(e) => setPinEntered(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="0000"
              className={`lovelink-input text-center text-2xl tracking-widest mb-4 ${pinError ? 'border-red-500 bg-red-50' : ''}`}
            />
            {pinError && <p className="text-red-500 text-sm mb-4">Incorrect PIN</p>}
            <button onClick={checkPin} className="btn-primary w-full">
              Unlock
            </button>
          </div>
        ) : (
          <div
            onClick={() => checkPin()}
            className="lovelink-card w-[min(720px,90vw)] min-h-[400px] flex flex-col items-center justify-center p-8 md:p-12 text-center cursor-pointer hover:scale-[1.02] transition-transform unwrap-glow"
          >
            <Heart className="w-8 h-8 text-[#D56A6A] fill-[#D56A6A] mb-6" />
            <h2 className="text-2xl md:text-3xl font-semibold text-[#2B1E1A] mb-2">
              You received a Valentine
            </h2>
            <p className="text-[#7A6B63] mb-8">from {linkData.sender_name || 'someone special'}</p>

            <div className="w-24 h-24 rounded-full bg-[#D56A6A]/10 flex items-center justify-center mb-6 animate-heartbeat">
              <Gift className="w-12 h-12 text-[#D56A6A]" />
            </div>

            <p className="text-[#D56A6A] font-medium">Tap to unwrap</p>
          </div>
        )}
      </div>
    );
  }

  // Unwrapped view - compute bouquet layout for proper stem attachment
  const bouquet = linkData.bouquet || { flowers: [], bunchTightness: 0.5 };
  const flowers = bouquet.flowers || [];
  const receiverLayout = computeBouquetLayout(flowers, bouquet.bunchTightness || 0.5);

  return (
    <div className="min-h-screen bg-[#F6F2EE] py-12 px-4">
      {/* Background Music - only plays for receiver after unwrap */}
      {linkData.music_url && <MusicPlayer youtubeUrl={linkData.music_url} />}

      <FloatingHearts />

      <div className="max-w-[800px] mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <Heart className="w-12 h-12 text-[#D56A6A] fill-[#D56A6A] mx-auto mb-4 animate-heartbeat" />
          <h2 className="text-3xl md:text-4xl font-semibold text-[#2B1E1A] mb-2">
            Happy Valentine's Day!
          </h2>
          <p className="text-[#7A6B63]">
            From {linkData.sender_name || 'someone who loves you'}
          </p>
        </div>

        {/* Love Note */}
        {linkData.sender_note && (
          <div className="lovelink-card p-8">
            <h3 className="text-xl font-semibold text-[#2B1E1A] mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#D56A6A]" />
              A Note For You
            </h3>
            <div className="lovelink-card-inner p-6">
              <p className="text-[#2B1E1A] leading-relaxed whitespace-pre-wrap">
                {linkData.sender_note}
              </p>
            </div>
          </div>
        )}

        {/* Bouquet with proper stems */}
        <div className="lovelink-card p-8">
          <h3 className="text-xl font-semibold text-[#2B1E1A] mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#D56A6A]" />
            A Bouquet For You
          </h3>

          <div className="lovelink-card-inner p-6 relative" style={{ minHeight: '350px' }}>
            <svg viewBox="0 0 200 300" className="w-full h-full" style={{ maxHeight: '350px' }}>
              <defs>
                <linearGradient id="receiverStemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4A7C59" />
                  <stop offset="100%" stopColor="#4A7C59" stopOpacity="0.7" />
                </linearGradient>
              </defs>

              {/* Individual stems per flower */}
              {receiverLayout.map((item: any) => (
                <path
                  key={`stem-${item.flower.id}`}
                  d={item.stemPath}
                  fill="none"
                  stroke="url(#receiverStemGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              ))}

              {/* Stem bundle at bottom */}
              {flowers.length > 0 && bouquet.potStyle === 'none' && (
                <path
                  d={`M ${100 - 6 * (bouquet.bunchTightness || 0.5) * Math.min(flowers.length, 8) * 0.3} 185 
                      Q 100 210 100 260 
                      Q 100 210 ${100 + 6 * (bouquet.bunchTightness || 0.5) * Math.min(flowers.length, 8) * 0.3} 185`}
                  fill="none"
                  stroke="url(#receiverStemGrad)"
                  strokeWidth={4 + Math.min(flowers.length, 8) * (bouquet.bunchTightness || 0.5) * 0.8}
                  strokeLinecap="round"
                />
              )}

              {/* Wrapper */}
              {bouquet.wrapStyle !== 'none' && (
                <path
                  d="M 75 170 Q 100 240 125 170 L 115 230 Q 100 240 85 230 Z"
                  fill="#C4A77D"
                  stroke="rgba(0,0,0,0.1)"
                />
              )}

              {/* Pot */}
              {bouquet.potStyle !== 'none' && (
                <g>
                  <path d="M 70 200 L 75 240 Q 100 245 125 240 L 130 200 Q 100 195 70 200" fill="#D2691E" />
                  <ellipse cx="100" cy="200" rx="32" ry="6" fill="#D2691E" />
                </g>
              )}

              {/* Ribbon */}
              <rect x="80" y="185" width="40" height="12" rx="3" fill="#D56A6A" />

              {/* Ribbon Name */}
              {bouquet.ribbonName && (
                <g transform="translate(100, 205)">
                  <rect x="-35" y="-8" width="70" height="16" rx="8" fill="white" stroke="#D56A6A" strokeWidth="1" />
                  <text x="0" y="3" textAnchor="middle" fontSize="7" fill="#2B1E1A">
                    {bouquet.ribbonName.length > 12 ? bouquet.ribbonName.slice(0, 12) + '...' : bouquet.ribbonName}
                  </text>
                </g>
              )}

              {/* Tag */}
              {bouquet.tagLine && (
                <g transform="translate(100, 255)">
                  <rect x="-45" y="-10" width="90" height="20" rx="4" fill="#FFF8E7" stroke="#D4A574" strokeWidth="1" />
                  <text x="0" y="4" textAnchor="middle" fontSize="8" fill="#2B1E1A" fontStyle="italic">
                    {bouquet.tagLine.length > 20 ? bouquet.tagLine.slice(0, 20) + '...' : bouquet.tagLine}
                  </text>
                </g>
              )}

              {/* Flowers on top of stems */}
              {receiverLayout.map((item: any) => (
                <g
                  key={item.flower.id}
                  transform={`translate(${item.flowerX}, ${item.flowerY}) rotate(${item.flower.rotation}) scale(${item.flower.scale})`}
                >
                  <RenderFlower type={item.flower.type} size={35} color={item.flower.color} showStem={false} />
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Interactive Cards */}
        {linkData.selected_cards?.length > 0 && (
          <div className="lovelink-card p-8">
            <h3 className="text-xl font-semibold text-[#2B1E1A] mb-2 flex items-center gap-2">
              <Gift className="w-5 h-5 text-[#D56A6A]" />
              Interactive Cards
            </h3>
            <p className="text-sm text-[#7A6B63] mb-6">Tap each card to explore together 💕</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {linkData.selected_cards.map((cardType: CardType, index: number) => {
                const template = CARD_TEMPLATES[cardType];
                const cardColors = [
                  'from-[#FFF0F0] to-[#FFE8E8]',
                  'from-[#F0F4FF] to-[#E8EEFF]',
                  'from-[#FFF8E8] to-[#FFF0D4]',
                  'from-[#F0FFF0] to-[#E8FFE8]',
                  'from-[#FFF0FF] to-[#FFE8FF]',
                  'from-[#F0FFFF] to-[#E8FFFF]',
                  'from-[#FFFFF0] to-[#FFFFE8]',
                  'from-[#FFF5F0] to-[#FFE8E0]',
                  'from-[#F5F0FF] to-[#E8E0FF]',
                ];
                const bgGrad = cardColors[index % cardColors.length];

                return (
                  <div key={index} className={`rounded-2xl p-5 bg-gradient-to-br ${bgGrad} border border-white/60 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{template.icon}</span>
                      <div>
                        <h4 className="font-semibold text-[#2B1E1A] text-base">{cardType}</h4>
                        <p className="text-xs text-[#7A6B63]">{template.description}</p>
                      </div>
                    </div>
                    {template.defaultQuestions && template.defaultQuestions.length > 0 && (
                      <div className="space-y-2 mt-3 pt-3 border-t border-[#2B1E1A]/10">
                        {template.defaultQuestions.map((q, qi) => (
                          <div key={qi} className="flex items-start gap-2">
                            <span className="text-xs font-bold text-[#D56A6A] mt-0.5">{qi + 1}.</span>
                            <p className="text-sm text-[#2B1E1A] leading-relaxed">{q}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Plans */}
        {(linkData.plans?.thisYear || linkData.plans?.nextYear || linkData.plans?.manifestation) && (
          <div className="lovelink-card p-8">
            <h3 className="text-xl font-semibold text-[#2B1E1A] mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#D56A6A]" />
              Our Future
            </h3>
            <div className="space-y-4">
              {linkData.plans.thisYear && (
                <div className="lovelink-card-inner p-4">
                  <p className="text-sm text-[#7A6B63] mb-1">This year together</p>
                  <p className="text-[#2B1E1A]">{linkData.plans.thisYear}</p>
                </div>
              )}
              {linkData.plans.nextYear && (
                <div className="lovelink-card-inner p-4">
                  <p className="text-sm text-[#7A6B63] mb-1">Next year dream</p>
                  <p className="text-[#2B1E1A]">{linkData.plans.nextYear}</p>
                </div>
              )}
              {linkData.plans.manifestation && (
                <div className="lovelink-card-inner p-4">
                  <p className="text-sm text-[#7A6B63] mb-1">Our manifestation</p>
                  <p className="text-[#2B1E1A]">{linkData.plans.manifestation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reply CTA */}
        <div className="text-center">
          <Link to="/create" className="btn-primary text-lg flex items-center gap-2 mx-auto">
            <Heart className="w-5 h-5" />
            Send a reply back
          </Link>
        </div>
      </div>
    </div>
  );
}

// Landing Page Component
function LandingPage() {
  const navigate = useNavigate();

  const scrollToCreate = () => {
    navigate('/create');
  };

  return (
    <>
      <div className="grain-overlay" />
      <Navigation onCreateClick={scrollToCreate} />

      <main className="bg-[#F6F2EE]">
        <HeroSection onStart={scrollToCreate} />

        {/* Stats Section */}
        <section className="py-12 px-4">
          <div className="max-w-[960px] mx-auto">
            <StatsDisplay />
          </div>
        </section>

        <HowItWorksSection />

        <FeatureHighlightSection
          title="Write a note. Add a game."
          description="Choose cards like Memory Lane, This or That, Love Quiz, and more. Make it interactive and fun."
          linkText="See all card types"
          illustration={<CardStackIllustration size={140} />}
        />

        <FeatureHighlightSection
          title="Build a bouquet."
          description="Pick from 9 unique flower types with realistic stems, choose colors, add a pot or wrapper, and personalize the ribbon with their name."
          linkText="Preview styles"
          illustration={<GiftIllustration size={140} />}
          reversed
        />

        <FeatureHighlightSection
          title="Plan the year. Save the links."
          description="Add 'This year together,' 'Next year dream,' and links that matter to both of you."
          linkText="Example plans"
          illustration={<EnvelopeIllustration size={140} />}
        />

        {/* Demo sections */}
        <section className="py-20 px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-[#2B1E1A] mb-6">Ready to create your link?</h2>
          <p className="text-[#7A6B63] mb-8 max-w-md mx-auto">No login required. Takes 5–10 minutes. One link to share with your special someone.</p>
          <button onClick={scrollToCreate} className="btn-primary text-lg flex items-center gap-2 mx-auto">
            <Heart className="w-5 h-5" />
            Start Creating
          </button>
        </section>

        {/* Support Section */}
        <SupportSection />

        {/* Footer */}
        <footer className="py-12 px-4 text-center border-t border-[#2B1E1A]/10">
          <AnimatedLogo size={32} />
          <p className="text-sm text-[#7A6B63] mt-4">Made with love for Valentine's Day</p>
          <p className="text-xs text-[#7A6B63] mt-2">
            Created by <a href="mailto:somarajulaxmanprasad100@gmail.com" className="text-[#D56A6A] hover:underline">Laxman</a>
          </p>
        </footer>
      </main>
    </>
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<CreateWizard />} />
        <Route path="/v/:id" element={<ReceiverView />} />
      </Routes>
    </Router>
  );
}

export default App;
