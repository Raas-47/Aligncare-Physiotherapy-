import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PlayCircle, CheckCircle2, ChevronLeft, ChevronRight, Volume2, Info } from 'lucide-react';
import { cn } from '../lib/utils';

// Fake data for exercises
const EXERCISES = [
  {
    id: 1,
    title: { en: 'Knee Extension', bn: 'হাঁটু সোজা করা' },
    reps: 10,
    videoUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop', // Placeholder image acting as video cover
    completed: false
  },
  {
    id: 2,
    title: { en: 'Ankle Pumps', bn: 'গোড়ালি ঘোরানো' },
    reps: 15,
    videoUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    completed: false
  },
  {
    id: 3,
    title: { en: 'Straight Leg Raise', bn: 'পা সোজা করে তোলা' },
    reps: 10,
    videoUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
    completed: false
  },
  {
    id: 4,
    title: { en: 'Meditation', bn: 'মেডিটেশন' },
    reps: 1,
    videoUrl: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?q=80&w=800&auto=format&fit=crop',
    audioUrl: 'https://actions.google.com/sounds/v1/ambient/atmospheric_background_sound.ogg',
    isMeditation: true,
    completed: false
  }
];

export default function Exercises() {
  const { lang, t } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [exercises, setExercises] = useState(EXERCISES);
  const [isPlaying, setIsPlaying] = useState(false);
  const [repsDone, setRepsDone] = useState(0);

  const currentEx = exercises[currentIdx];
  const allCompleted = exercises.every(e => e.completed);

  // Reset reps when changing exercise
  useEffect(() => {
    setRepsDone(0);
    setIsPlaying(false);
  }, [currentIdx]);

  const markCompleted = () => {
    const next = [...exercises];
    next[currentIdx].completed = true;
    setExercises(next);
    
    if (currentIdx < exercises.length - 1) {
      setTimeout(() => setCurrentIdx(currentIdx + 1), 600);
    }
  };

  if (allCompleted) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-24 h-24 bg-[#EAF2EA] rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-[#4A7C59]" />
        </div>
        <h2 className="text-3xl font-bold text-[#1A2A1E] mb-4">
          {t('Great Job!', 'খুব ভালো!')}
        </h2>
        <p className="text-lg text-[#636E72] mb-8">
          {t("You have completed all exercises for today.", "আপনি আজকের সব ব্যায়াম শেষ করেছেন।")}
        </p>
        <button 
          onClick={() => setExercises(EXERCISES.map(e => ({...e, completed: false})))}
          className="px-6 py-3 border-2 border-[#E0E6E0] rounded-[1.5rem] font-bold text-[#636E72] hover:border-[#4A7C59] transition-colors uppercase tracking-wider text-sm"
        >
          {t('Do it again', 'আবার করুন')}
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 pb-24 h-full flex flex-col max-w-md mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1.5">
          {exercises.map((ex, i) => (
            <div 
              key={ex.id} 
              className={cn(
                "h-2 w-8 sm:w-10 rounded-full transition-colors",
                ex.completed ? "bg-[#4A7C59]" : i === currentIdx ? "bg-[#1A2A1E]" : "bg-[#E0E6E0]"
              )}
            />
          ))}
        </div>
        <span className="text-sm font-bold text-[#636E72]">
          {currentIdx + 1} / {exercises.length}
        </span>
      </div>

      <h2 className="text-2xl font-bold text-[#1A2A1E] mb-1">
        {lang === 'en' ? currentEx.title.en : currentEx.title.bn}
      </h2>
      <p className="text-[#636E72] font-medium mb-6">
        {currentEx.isMeditation 
          ? t('Goal: Relax and listen to binaural beats', 'লক্ষ্য: শান্ত হন এবং বিনরাল বিটস শুনুন')
          : t(`Goal: ${currentEx.reps} repetitions`, `লক্ষ্য: ${currentEx.reps} বার`)}
      </p>

      {/* Video/Audio Area */}
      <div className="relative aspect-video bg-[#1A2A1E] rounded-[2rem] overflow-hidden mb-8 shadow-sm border border-[#E0E6E0]">
        <img 
          src={currentEx.videoUrl} 
          alt="Exercise"
          className="w-full h-full object-cover opacity-60"
        />
        
        {currentEx.isMeditation && (
          <div className="absolute inset-x-0 bottom-4 flex justify-center z-20 px-8">
            <audio src={currentEx.audioUrl} controls className="w-full max-w-sm rounded-full drop-shadow-lg" />
          </div>
        )}
        
        {/* Play Button Overlay */}
        {!isPlaying && !currentEx.isMeditation && (
          <button 
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors z-10"
          >
             <PlayCircle className="w-16 h-16 text-white drop-shadow-lg" />
          </button>
        )}

        {/* Audio guidance indicator */}
        {isPlaying && !currentEx.isMeditation && (
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 text-white/90 text-xs font-medium animate-pulse z-10">
            <Volume2 className="w-3.5 h-3.5" />
            {t('Bengali Audio ON', 'বাংলা ভয়েস চালু')}
          </div>
        )}
      </div>

      {/* Counter or Info */}
      {!currentEx.isMeditation ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-[#F9FBF9] rounded-[2rem] p-6 border border-[#E0E6E0] mb-6 shadow-sm">
          <span className="text-sm text-[#636E72] font-bold uppercase tracking-wider mb-2">
            {t('Counter', 'কাউন্টার')}
          </span>
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setRepsDone(Math.max(0, repsDone - 1))}
              className="w-12 h-12 rounded-full border-2 border-[#E0E6E0] flex items-center justify-center text-[#1A2A1E] active:bg-[#E8EEE8]"
            >
              -
            </button>
            <div className="text-6xl font-black text-[#1A2A1E] w-24 text-center tabular-nums">
              {repsDone}
            </div>
            <button 
              onClick={() => setRepsDone(repsDone + 1)}
              className="w-12 h-12 rounded-full border-2 border-transparent bg-[#EAF2EA] flex items-center justify-center text-[#4A7C59] active:brightness-95 font-bold text-xl"
            >
              +
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center text-center justify-center bg-[#F9FBF9] rounded-[2rem] p-6 border border-[#E0E6E0] mb-6 shadow-sm space-y-4">
          <Volume2 className="w-8 h-8 text-[#4A7C59]" />
          <h3 className="text-xl font-bold text-[#1A2A1E]">
            {t('Binaural Beats Meditation', 'বিনরাল বিটস মেডিটেশন')}
          </h3>
          <p className="text-[#636E72] text-sm leading-relaxed">
            {t('Use headphones for the best experience. Binaural beats can help reduce stress, improve focus, and promote deep relaxation during your recovery journey.', 'সবচেয়ে ভালো অভিজ্ঞতার জন্য হেডফোন ব্যবহার করুন। বিনরাল বিটস স্ট্রেস কমাতে, ফোকাস উন্নত করতে এবং আপনার সুস্থতার যাত্রায় গভীর শিথিলতা বাড়াতে সাহায্য করতে পারে।')}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button 
          onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
          disabled={currentIdx === 0}
          className="p-4 bg-[#E8EEE8] text-[#1A2A1E] rounded-[1.5rem] disabled:opacity-50"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button 
          onClick={markCompleted}
          disabled={currentEx.completed}
          className={cn(
            "flex-1 py-4 font-bold text-lg rounded-[1.5rem] flex items-center justify-center gap-2 transition-all",
            currentEx.completed 
              ? "bg-[#E8EEE8] text-[#4A7C59]"
              : "bg-[#4A7C59] text-white shadow-lg shadow-[#4A7C59]/30 active:scale-95"
          )}
        >
          {currentEx.completed ? (
            <>
              <CheckCircle2 className="w-6 h-6" />
              {t('Done', 'সম্পন্ন')}
            </>
          ) : (
            t('Completed Today', 'আজকের জন্য সম্পন্ন')
          )}
        </button>

        <button 
          onClick={() => setCurrentIdx(Math.min(exercises.length - 1, currentIdx + 1))}
          disabled={currentIdx === exercises.length - 1}
          className="p-4 bg-[#E8EEE8] text-[#1A2A1E] rounded-[1.5rem] disabled:opacity-50"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
