// YouTube Music Player Component with Preview
import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX, Play, Pause, ExternalLink, Eye } from 'lucide-react';

interface MusicPlayerProps {
  youtubeUrl: string;
  onUrlChange?: (url: string) => void;
  editable?: boolean;
  onPreview?: () => void;
}

// Extract YouTube video ID from various URL formats
const extractYouTubeId = (url: string): string | null => {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
    /youtube\.com\/watch\?.*v=([^&\s]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
};

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ 
  youtubeUrl, 
  onUrlChange,
  editable = false,
  onPreview
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [inputUrl, setInputUrl] = useState(youtubeUrl);
  const [videoId, setVideoId] = useState<string | null>(extractYouTubeId(youtubeUrl));
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const id = extractYouTubeId(youtubeUrl);
    setVideoId(id);
    setInputUrl(youtubeUrl);
  }, [youtubeUrl]);

  const handleSave = () => {
    const id = extractYouTubeId(inputUrl);
    setVideoId(id);
    if (onUrlChange) {
      onUrlChange(inputUrl);
    }
  };

  const handleClear = () => {
    setInputUrl('');
    setVideoId(null);
    if (onUrlChange) {
      onUrlChange('');
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (editable) {
    return (
      <div className="lovelink-card-inner p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#D56A6A]/10 flex items-center justify-center">
            <Music className="w-5 h-5 text-[#D56A6A]" />
          </div>
          <div>
            <h4 className="font-semibold text-[#2B1E1A]">Add Background Music</h4>
            <p className="text-sm text-[#7A6B63]">Paste a YouTube link to play music when they open your Valentine</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="lovelink-input flex-1"
          />
          <button 
            onClick={handleSave}
            className="btn-primary py-2 px-4 text-sm"
          >
            Add
          </button>
          {videoId && (
            <button 
              onClick={handleClear}
              className="btn-secondary py-2 px-4 text-sm"
            >
              Clear
            </button>
          )}
        </div>
        
        {videoId && (
          <div className="mt-4 space-y-3">
            <div className="p-3 bg-[#D56A6A]/5 rounded-xl flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#D56A6A]/20 flex items-center justify-center">
                <Music className="w-6 h-6 text-[#D56A6A]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[#2B1E1A]">Music added!</p>
                <p className="text-xs text-[#7A6B63]">Will auto-play when they open your link</p>
              </div>
              <div className="flex gap-2">
                <a 
                  href={`https://youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
                  title="Open on YouTube"
                >
                  <ExternalLink className="w-4 h-4 text-[#7A6B63]" />
                </a>
              </div>
            </div>
            
            {/* Preview button */}
            {onPreview && (
              <button 
                onClick={onPreview}
                className="w-full btn-secondary flex items-center justify-center gap-2 text-sm"
              >
                <Eye className="w-4 h-4" />
                Preview with Music
              </button>
            )}
          </div>
        )}
        
        <p className="text-xs text-[#7A6B63] mt-3">
          Tip: Choose a romantic song that reminds you of them. The music will loop automatically.
        </p>
      </div>
    );
  }

  // Receiver view - floating player
  if (!videoId) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 music-player">
      <div className="lovelink-card p-3 flex items-center gap-3 shadow-lg">
        {/* Hidden YouTube iframe for audio */}
        <iframe
          ref={iframeRef}
          width="0"
          height="0"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&loop=1&playlist=${videoId}`}
          title="Background Music"
          allow="autoplay; encrypted-media"
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
        />
        
        <div className="w-10 h-10 rounded-full bg-[#D56A6A]/10 flex items-center justify-center">
          <Music className="w-5 h-5 text-[#D56A6A]" />
        </div>
        
        <div className="flex-1 min-w-[100px]">
          <p className="text-sm font-medium text-[#2B1E1A]">Background Music</p>
          <p className="text-xs text-[#7A6B63]">{isPlaying ? 'Playing' : 'Paused'}</p>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-[#D56A6A]/10 flex items-center justify-center hover:bg-[#D56A6A]/20 transition-colors"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-[#D56A6A]" />
            ) : (
              <Play className="w-4 h-4 text-[#D56A6A]" />
            )}
          </button>
          
          <button 
            onClick={toggleMute}
            className="w-8 h-8 rounded-full bg-[#D56A6A]/10 flex items-center justify-center hover:bg-[#D56A6A]/20 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-[#7A6B63]" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#D56A6A]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
