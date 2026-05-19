import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Volume2, PlayCircle, PauseCircle } from 'lucide-react';

export default function Meditation() {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="p-5 pb-24 max-w-md mx-auto space-y-6 flex flex-col min-h-screen">
      <div>
        <h2 className="text-3xl font-serif text-[#1A2A1E] mb-2">
          {t('Guided Meditation', 'গাইডেড মেডিটেশন')}
        </h2>
        <p className="text-[#636E72] font-serif italic mb-6">
          {t('Relax your mind and body with binaural beats.', 'বিনরাল বিটসের সাথে আপনার মন এবং শরীরকে শিথিল করুন।')}
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="relative w-full max-w-sm aspect-square bg-[#E8EEE8] rounded-full overflow-hidden shadow-sm border-[4px] border-white group">
          <img 
            src="https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=800&auto=format&fit=crop"
            alt="Meditation"
            className={`w-full h-full object-cover transition-transform duration-[20s] ease-linear ${isPlaying ? 'scale-125' : 'scale-100'}`}
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center transition-colors">
            <button 
              onClick={togglePlay}
              className="text-white hover:scale-110 active:scale-95 transition-transform"
            >
              {isPlaying ? (
                <PauseCircle className="w-24 h-24 drop-shadow-lg" />
              ) : (
                <PlayCircle className="w-24 h-24 drop-shadow-lg" />
              )}
            </button>
            <div className="mt-6 flex items-center gap-2 text-white/90 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
              <Volume2 className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wide uppercase">
                {isPlaying ? t('Playing', 'চলছে') : t('Tap to Play', 'চালাতে চাপুন')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F9FBF9] p-6 rounded-[2rem] border border-[#E0E6E0] shadow-sm text-center">
        <h3 className="font-bold text-[#1A2A1E] mb-2 flex items-center justify-center gap-2">
          <Volume2 className="w-5 h-5 text-[#4A7C59]" />
          {t('Use Headphones', 'হেডফোন ব্যবহার করুন')}
        </h3>
        <p className="text-[#636E72] text-sm">
          {t('For the best experience and effectiveness of binaural beats, please use stereo headphones and find a quiet place.', 'সবচেয়ে ভালো অভিজ্ঞতা এবং বিনরাল বিটসের কার্যকারিতার জন্য, অনুগ্রহ করে স্টেরিও হেডফোন ব্যবহার করুন এবং একটি শান্ত জায়গা খুঁজুন।')}
        </p>
      </div>

      {/* Hidden audio element using placeholder binaural beat/ambient sound */}
      <audio ref={audioRef} loop>
        <source src="https://actions.google.com/sounds/v1/ambient/atmospheric_background_sound.ogg" type="audio/ogg" />
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
