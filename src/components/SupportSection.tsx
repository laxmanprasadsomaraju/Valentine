// Support Section with Author Story
import React from 'react';
import { Heart, Coffee, Mail, Sparkles, Gift, MessageCircle } from 'lucide-react';

export const SupportSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#F6F2EE] via-[#F8E8E8] to-[#FFF5F5]">
      <div className="max-w-[800px] mx-auto">
        {/* Author Story Card */}
        <div className="lovelink-card p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D56A6A] to-[#FFB6C1] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#2B1E1A] mb-1">The Story Behind LoveLink</h3>
              <p className="text-sm text-[#7A6B63]">Created with love, for love</p>
            </div>
          </div>
          
          <div className="text-[#2B1E1A] leading-relaxed space-y-4">
            <p>
              Hi, I'm <strong>Laxman</strong>. I created LoveLink because I know what it's like to be far from someone you love. 
              My girlfriend lives miles away, and I wanted to send her something special—something that would make her smile, 
              feel my presence, and know how much she means to me.
            </p>
            
            <p>
              I couldn't find the perfect digital Valentine experience, so I built one. LoveLink is designed for everyone 
              who wants to surprise their special someone with a beautiful, interactive, and personal love note—complete with 
              custom flowers, heartfelt messages, music, and playful cards.
            </p>
            
            <p>
              No login. No friction. Just create, share, and watch their heart melt. 
              Because love deserves to be expressed in the most beautiful way possible.
            </p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-[#2B1E1A]/10 flex items-center gap-2 text-sm text-[#7A6B63]">
            <Heart className="w-4 h-4 text-[#D56A6A] fill-[#D56A6A]" />
            <span>Made with love for all the long-distance lovers out there</span>
          </div>
        </div>
        
        {/* Support Card */}
        <div className="lovelink-card p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[#D56A6A]/10 flex items-center justify-center mx-auto mb-6">
            <Coffee className="w-8 h-8 text-[#D56A6A]" />
          </div>
          
          <h3 className="text-2xl font-semibold text-[#2B1E1A] mb-3">
            Support LoveLink
          </h3>
          
          <p className="text-[#7A6B63] mb-6 max-w-md mx-auto">
            If you enjoyed creating your Valentine and want to support future updates, 
            you can buy me a coffee. Every contribution helps keep LoveLink free for everyone!
          </p>
          
          <a 
            href="https://www.buymeacoffee.com/lovelink"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 mb-8"
          >
            <Coffee className="w-5 h-5" />
            Buy me a coffee
          </a>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {/* Feedback */}
            <div className="lovelink-card-inner p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#9370DB]/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-[#9370DB]" />
                </div>
                <div>
                  <p className="font-medium text-[#2B1E1A]">Feedback</p>
                  <p className="text-xs text-[#7A6B63]">Share your thoughts</p>
                </div>
              </div>
              <a 
                href="mailto:somarajulaxmanprasad100@gmail.com?subject=LoveLink Feedback"
                className="text-[#9370DB] text-sm hover:underline flex items-center gap-1"
              >
                <Mail className="w-4 h-4" />
                somarajulaxmanprasad100@gmail.com
              </a>
            </div>
            
            {/* Collaboration */}
            <div className="lovelink-card-inner p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#7CB87C]/10 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-[#7CB87C]" />
                </div>
                <div>
                  <p className="font-medium text-[#2B1E1A]">Collaborate</p>
                  <p className="text-xs text-[#7A6B63]">Want to work together?</p>
                </div>
              </div>
              <a 
                href="mailto:somarajulaxmanprasad100@gmail.com?subject=LoveLink Collaboration"
                className="text-[#7CB87C] text-sm hover:underline flex items-center gap-1"
              >
                <Mail className="w-4 h-4" />
                Let's build together
              </a>
            </div>
          </div>
          
          {/* Thank you message */}
          <div className="mt-8 pt-6 border-t border-[#2B1E1A]/10">
            <p className="text-sm text-[#7A6B63] italic">
              "Thank you for using LoveLink. Every love story shared here makes my heart full."
            </p>
            <p className="text-sm text-[#D56A6A] font-medium mt-2">— Laxman</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
