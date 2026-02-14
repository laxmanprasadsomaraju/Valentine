// AI Writing Helper Component
// Generates romantic messages based on tone and context

import React, { useState } from 'react';
import { Sparkles, X, Copy, Check, RefreshCw } from 'lucide-react';
import type { Tone, PartnerTitle } from '../types';

interface AIWritingHelperProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (text: string) => void;
  partnerName: string;
  partnerTitle: PartnerTitle;
  customTitle?: string;
  tone: Tone;
}

// AI-generated message templates
const generateMessages = (
  partnerName: string,
  partnerTitle: string,
  tone: Tone
): string[] => {
  const name = partnerName || 'my love';
  const title = partnerTitle;
  
  const templates: Record<Tone, string[]> = {
    Sweet: [
      `My dearest ${name},

Every morning I wake up grateful for you. Your smile is the first thing I think of, and your laughter is my favorite melody. You make ordinary moments feel magical just by being there.

I promise to always hold your hand, even when times get tough. You're my person, my home, my everything.

Forever yours,
[Your name]`,

      `To my wonderful ${title} ${name},

Being with you feels like a warm hug for my soul. You understand me in ways no one else does, and you love me despite all my quirks (and maybe even because of them!).

Thank you for choosing me every single day. I choose you too, now and always.

With all my love,
[Your name]`,

      `${name}, my heart,

I never believed in perfect until I met you. You're not perfect, and neither am I—but together, we're something pretty close to it. You make me want to be a better person.

Here's my promise: I'll always be your biggest supporter, your safe place, and your partner in crime.

Love you to the moon and back,
[Your name]`
    ],
    
    Funny: [
      `Hey ${name},

So, I was going to write you this super romantic poem... but then I remembered I'm terrible at poetry. So instead, here's a list of reasons you're awesome:

1. You laugh at my jokes (even the bad ones)
2. You share your fries with me (true love right there)
3. You haven't run away yet (impressive!)

Promise to keep making you laugh (and maybe snort) for years to come.

Your favorite weirdo,
[Your name]`,

      `To my partner-in-crime ${name},

Roses are red,
Violets are blue,
I'm not good at rhymes,
But I really like you! 

...Okay, that was terrible. But my feelings for you aren't! You're the peanut butter to my jelly, the cheese to my macaroni, the WiFi to my internet addiction.

Let's keep being weird together forever.

XOXO,
[Your name]`,

      `${name}! 

Warning: This message contains excessive cheesiness. Side effects may include eye-rolling, face-palming, and uncontrollable "awws."

You're basically my favorite notification. Seeing your name pop up on my phone instantly makes my day better. If you were a vegetable, you'd be a cute-cumber. If you were a fruit, you'd be a fine-apple.

Okay, I'll stop now. But seriously, you're the best thing that's ever happened to me.

Love you (and your tolerance for bad jokes),
[Your name]`
    ],
    
    Poetic: [
      `My beloved ${name},

In the garden of my heart, you are the most beautiful bloom—delicate yet resilient, soft yet strong. Your presence is the sunrise that chases away my darkest nights.

Like stars scattered across velvet skies, my love for you is infinite and eternal. Each beat of my heart writes a verse dedicated to you.

I promise to be your shelter in the storm, your warmth in the winter, your constant in an ever-changing world.

Eternally yours,
[Your name]`,

      `To ${name}, my muse,

If I could capture the essence of you in words, I would need all the languages of the world and still fall short. You are the poetry my soul has been trying to write since the beginning of time.

Your eyes hold galaxies I long to explore. Your touch is the melody my skin remembers. In your arms, I have found the home I never knew I was searching for.

I vow to love you not just with my heart, but with my soul, my mind, and every breath I take.

Yours in this life and beyond,
[Your name]`,

      `${name}, light of my life,

You are the whisper of wind through ancient trees, the gentle caress of moonlight on still waters, the first breath of spring after a long winter. With you, even silence speaks volumes.

Time stands still when I'm with you, yet flies too fast when we're apart. You have painted my world with colors I never knew existed.

My promise to you: I will be your anchor when the tides are rough, your compass when you lose your way, your haven in this chaotic world.

Forever enchanted,
[Your name]`
    ],
    
    Deep: [
      `My dearest ${name},

Love is not just a feeling—it's a choice we make every single day. And I choose you. I choose your light and your shadows, your strengths and your vulnerabilities. I choose to stand by you not just when it's easy, but especially when it's hard.

You have seen me at my worst and loved me anyway. That kind of love is rare, precious, and worth fighting for every single day.

I promise to grow with you, to learn with you, to evolve alongside you. Together, we can weather any storm.

With unwavering devotion,
[Your name]`,

      `To ${name}, my truth,

In a world full of temporary connections and surface-level interactions, what we have is real. It's raw, it's honest, it's transformative. You've challenged me to confront parts of myself I didn't know existed.

Our love isn't perfect—it's better than perfect. It's real. It's two imperfect people choosing each other every day, choosing to grow together rather than apart.

I promise to always communicate, even when it's uncomfortable. To listen, even when I disagree. To love you not just for who you are, but for who you're becoming.

Deeply and truly yours,
[Your name]`,

      `${name},

They say the best relationships are the ones that challenge you to be better. If that's true, then ours is extraordinary—because being with you has made me question, grow, and evolve in ways I never imagined.

You don't complete me (I'm already whole), but you complement me in the most beautiful way. Together, we're greater than the sum of our parts.

My promise: I will never take you for granted. I will always choose growth over comfort, truth over convenience, and us over ego.

With profound gratitude,
[Your name]`
    ],
    
    Spicy: [
      `Hey ${name},

Just thinking about you makes my heart race and my mind wander to places that would make us both blush. You have this effect on me that no one else does—one look, one touch, and I'm completely yours.

I love how you know exactly what I need, sometimes before I even know it myself. The way you look at me... let's just say it does things to me.

Can't wait to see you and show you just how much I've been thinking about you. 

Yours (in every way),
[Your name]

P.S. Wear that thing I like. You know the one.`,

      `To my irresistible ${title} ${name},

I was going to write something sweet and romantic, but honestly? I can't stop thinking about how good you look when you [redacted for privacy 😉]. 

You drive me crazy in the best possible way. The chemistry between us? Absolutely electric. I still get butterflies every time you walk into a room.

Let's make some memories tonight that'll make us both smile for days.

Counting down the minutes,
[Your name]`,

      `${name}, you beautiful human,

I'm supposed to be working right now, but my mind keeps drifting to you. Specifically, to that thing you do with your [censored] that makes me [also censored]. 

You have no idea what you do to me. Or maybe you do, and that's even hotter.

Tonight. You. Me. No interruptions. Deal?

Already excited,
[Your name]

P.S. I have plans. Good plans. Very good plans.`
    ]
  };
  
  return templates[tone] || templates.Sweet;
};

export const AIWritingHelper: React.FC<AIWritingHelperProps> = ({
  isOpen,
  onClose,
  onSelect,
  partnerName,
  partnerTitle,
  customTitle,
  tone
}) => {
  const [generatedMessages, setGeneratedMessages] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const title = partnerTitle === 'Custom' && customTitle ? customTitle : partnerTitle;

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation delay
    setTimeout(() => {
      const messages = generateMessages(partnerName, title, tone);
      setGeneratedMessages(messages);
      setIsGenerating(false);
    }, 800);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleUse = (text: string) => {
    onSelect(text);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="lovelink-card w-full max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#2B1E1A]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D56A6A] to-[#FFB6C1] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-[#2B1E1A]">AI Writing Helper</h3>
              <p className="text-sm text-[#7A6B63]">Tone: {tone}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#2B1E1A]/5 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-[#7A6B63]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {generatedMessages.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-[#D56A6A]/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-[#D56A6A]" />
              </div>
              <h4 className="text-lg font-semibold text-[#2B1E1A] mb-2">
                Need help writing your love note?
              </h4>
              <p className="text-[#7A6B63] mb-6 max-w-sm mx-auto">
                Our AI will generate romantic messages based on your selected tone ({tone}) for {partnerName || 'your love'}.
              </p>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="btn-primary flex items-center gap-2 mx-auto"
              >
                {isGenerating ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                {isGenerating ? 'Generating...' : 'Generate Messages'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#7A6B63]">
                  Generated {generatedMessages.length} messages for you
                </p>
                <button 
                  onClick={handleGenerate}
                  className="text-sm text-[#D56A6A] flex items-center gap-1 hover:underline"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Generate more
                </button>
              </div>
              
              {generatedMessages.map((message, index) => (
                <div 
                  key={index}
                  className="lovelink-card-inner p-4 relative group"
                >
                  <pre className="text-sm text-[#2B1E1A] whitespace-pre-wrap font-sans leading-relaxed">
                    {message}
                  </pre>
                  
                  <div className="flex gap-2 mt-4 pt-3 border-t border-[#2B1E1A]/10">
                    <button 
                      onClick={() => handleCopy(message, index)}
                      className="flex-1 btn-secondary py-2 text-sm flex items-center justify-center gap-2"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                    <button 
                      onClick={() => handleUse(message)}
                      className="flex-1 btn-primary py-2 text-sm flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Use This
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIWritingHelper;
