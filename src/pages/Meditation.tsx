import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Volume2, PlayCircle, PauseCircle, Activity } from 'lucide-react';

export default function Meditation() {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const leftOscRef = useRef<OscillatorNode | null>(null);
  const rightOscRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (isPlaying) {
        stopBinauralBeats();
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [isPlaying]);

  const startBinauralBeats = async () => {
    try {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      // Play background ambience to ensure sound is working
      const bgAudio = document.getElementById('bg-ambience') as HTMLAudioElement;
      if (bgAudio) {
        bgAudio.volume = 0.5;
        bgAudio.play().catch(console.error);
      }

      // Master volume (keep it pleasant but audible)
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.6;
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Base Carrier (200 Hz - deeper tone, easier to hear)
      const carrierFreq = 200;
      const beatFreq = 8; // Alpha waves (8 Hz difference)

      const leftOsc = ctx.createOscillator();
      let leftPanner, rightPanner;
      
      // Feature detect StereoPanner
      if (typeof ctx.createStereoPanner === 'function') {
        leftPanner = ctx.createStereoPanner();
        leftPanner.pan.value = -1;
        rightPanner = ctx.createStereoPanner();
        rightPanner.pan.value = 1;
      } else {
        leftPanner = ctx.createPanner();
        leftPanner.panningModel = 'equalpower';
        leftPanner.setPosition(-1, 0, 0);
        rightPanner = ctx.createPanner();
        rightPanner.panningModel = 'equalpower';
        rightPanner.setPosition(1, 0, 0);
      }
      
      leftOsc.type = 'sine';
      leftOsc.frequency.value = carrierFreq - (beatFreq / 2);
      leftOsc.connect(leftPanner);
      leftPanner.connect(masterGain);

      // Right Ear
      const rightOsc = ctx.createOscillator();
      rightOsc.type = 'sine';
      rightOsc.frequency.value = carrierFreq + (beatFreq / 2);
      rightOsc.connect(rightPanner);
      rightPanner.connect(masterGain);

      leftOsc.start();
      rightOsc.start();

      leftOscRef.current = leftOsc;
      rightOscRef.current = rightOsc;
    } catch (e) {
      console.error('Audio start error:', e);
    }
  };

  const stopBinauralBeats = () => {
    try {
      if (leftOscRef.current) {
        leftOscRef.current.stop();
        leftOscRef.current.disconnect();
        leftOscRef.current = null;
      }
      if (rightOscRef.current) {
        rightOscRef.current.stop();
        rightOscRef.current.disconnect();
        rightOscRef.current = null;
      }
      const bgAudio = document.getElementById('bg-ambience') as HTMLAudioElement;
      if (bgAudio) {
        bgAudio.pause();
      }
    } catch (e) {
      console.error('Audio stop error:', e);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopBinauralBeats();
    } else {
      startBinauralBeats();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="p-5 pb-24 max-w-md mx-auto space-y-6 flex flex-col min-h-screen">
      <div>
        <h2 className="text-3xl font-serif text-[#1A2A1E] mb-2 flex items-center gap-3">
          {t('Guided Meditation', 'গাইডেড মেডিটেশন')}
        </h2>
        <p className="text-[#636E72] font-serif italic mb-6">
          {t('Relax your mind and body with authentic binaural beats (432Hz base, 8Hz alpha wave).', 'আসল বিনরাল বিটসের সাথে আপনার মন এবং শরীরকে শিথিল করুন (432Hz বেস, 8Hz আলফা)।')}
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
              <Activity className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
              <span className="text-sm font-medium tracking-wide uppercase">
                {isPlaying ? t('Alpha Waves Active', 'আলফা তরঙ্গ চলছে') : t('Tap to Play', 'চালাতে চাপুন')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F9FBF9] p-6 rounded-[2rem] border border-[#E0E6E0] shadow-sm text-center">
        <h3 className="font-bold text-[#1A2A1E] mb-2 flex items-center justify-center gap-2">
          <Volume2 className="w-5 h-5 text-[#4A7C59]" />
          {t('Stereo Headphones Required', 'স্টেরিও হেডফোন আবশ্যক')}
        </h3>
        <p className="text-[#636E72] text-sm">
          {t('True binaural beats require sending different frequencies to each ear. You must wear headphones to experience the 8Hz relaxation effect.', 'প্রকৃত বিনরাল বিটসের জন্য আপনার প্রতিটি কানে ভিন্ন ফ্রিকোয়েন্সি পাঠাতে হয়। 8Hz শিথিলকরণ প্রভাব অনুভব করতে আপনাকে অবশ্যই হেডফোন পরতে হবে।')}
        </p>
      </div>

      <audio id="bg-ambience" loop crossOrigin="anonymous">
        <source src="https://cdn.pixabay.com/download/audio/2022/10/30/audio_510b656eba.mp3?filename=tibetan-singing-bowl-2-123490.mp3" type="audio/mpeg" />
        <source src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_fc90dcbc5a.mp3?filename=wind-chimes-111559.mp3" type="audio/mpeg" />
        <source src="https://actions.google.com/sounds/v1/alarms/dinner_bell_triangle.ogg" type="audio/ogg" />
      </audio>
    </div>
  );
}
