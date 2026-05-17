import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { ActivitySquare, ArrowRight, Activity } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const QUESTIONS = [
  {
    id: 'walk',
    en: 'Can you walk comfortably for 10 minutes?',
    bn: 'আপনি কি ১০ মিনিট আরামে হাঁটতে পারেন?',
    options: [
      { val: 'yes', en: 'Yes', bn: 'হ্যাঁ' },
      { val: 'some', en: 'With some pain', bn: 'একটু ব্যথার সাথে' },
      { val: 'no', en: 'No, it hurts a lot', bn: 'না, খুব ব্যথা করে' }
    ]
  },
  {
    id: 'pain',
    en: 'What is your current pain level?',
    bn: 'আপনার এখন ব্যথার মাত্রা কেমন?',
    options: [
      { val: 'low', en: 'Low (1-3)', bn: 'কম (১-৩)' },
      { val: 'med', en: 'Medium (4-6)', bn: 'মাঝারি (৪-৬)' },
      { val: 'high', en: 'High (7-10)', bn: 'বেশি (৭-১০)' }
    ]
  },
  {
    id: 'stiff',
    en: 'Do you feel stiffness in the morning?',
    bn: 'সকালে ঘুম থেকে উঠার পর কি শরীর শক্ত লাগে?',
    options: [
      { val: 'yes', en: 'Yes, takes time to ease', bn: 'হ্যাঁ, কমতে সময় লাগে' },
      { val: 'little', en: 'Just a little', bn: 'খুব সামান্য' },
      { val: 'no', en: 'No', bn: 'না' }
    ]
  }
];

export default function PainCheck() {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (val: string) => {
    const q = QUESTIONS[qIndex];
    setAnswers(prev => ({ ...prev, [q.id]: val }));

    if (qIndex < QUESTIONS.length - 1) {
      setTimeout(() => setQIndex(qIndex + 1), 300);
    } else {
      setTimeout(() => setShowResult(true), 400);
    }
  };

  if (showResult) {
    const highPain = answers.pain === 'high' || answers.walk === 'no';
    
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 text-center max-w-md mx-auto"
      >
        <div className={cn(
          "w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6",
          highPain ? "bg-[#FADBD8]" : "bg-[#FFF9EA]"
        )}>
          <ActivitySquare className={cn(
            "w-12 h-12",
            highPain ? "text-[#E74C3C]" : "text-[#F1C40F]"
          )} />
        </div>

        <h2 className="text-2xl font-bold text-[#1A2A1E] mb-2">
          {t('Assessment Complete', 'মূল্যায়ন সম্পন্ন')}
        </h2>
        
        <div className="bg-[#F5F7F5] p-6 rounded-[2rem] mb-8 border border-[#E0E6E0] shadow-inner">
          <p className="text-lg text-[#2D3436] font-bold mt-2 mb-4">
            {highPain 
              ? t(
                  "Based on your answers, you need professional physiotherapy care.",
                  "আপনার উত্তরের ভিত্তিতে, আপনার পেশাদার ফিজিওথেরাপি প্রয়োজন।"
                )
              : t(
                  "You have mild discomfort. A home visit can help you recover faster.",
                  "আপনার সামান্য সমস্যা আছে। বাড়িতে ফিজিওথেরাপি নিলে দ্রুত সুস্থ হবেন।"
                )}
          </p>
          <p className="text-[#4A7C59] font-bold bg-[#EAF2EA] py-3 rounded-[1.5rem]">
            {t("Recommended: Home Visit Physiotherapy", "পরামর্শ: বাড়িতে ফিজিওথেরাপি")}
          </p>
        </div>

        <button 
          onClick={() => navigate('/book')}
          className="w-full py-4 text-white font-bold text-lg rounded-[1.5rem] bg-[#4A7C59] shadow-lg shadow-[#4A7C59]/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          {t('Book Home Visit Now', 'এখনই বুক করুন')}
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    );
  }

  const currentQ = QUESTIONS[qIndex];

  return (
    <div className="p-6 max-w-md mx-auto">
      {/* Progress */}
      <div className="flex gap-2 mb-10">
        {QUESTIONS.map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "h-2 flex-1 rounded-full transition-colors duration-300",
              i <= qIndex ? "bg-[#4A7C59]" : "bg-[#E0E6E0]"
            )}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={qIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-[#6B8E6B] font-bold text-[0.65rem] tracking-wider uppercase mb-2 block">
            {t(`Question ${qIndex + 1} of ${QUESTIONS.length}`, `প্রশ্ন ${qIndex + 1} / ${QUESTIONS.length}`)}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2A1E] mb-8 leading-tight">
            {lang === 'en' ? currentQ.en : currentQ.bn}
          </h2>

          <div className="space-y-4">
            {currentQ.options.map((opt) => {
              const isSelected = answers[currentQ.id] === opt.val;
              return (
                <button
                  key={opt.val}
                  onClick={() => handleAnswer(opt.val)}
                  className={cn(
                    "w-full p-6 rounded-[1.5rem] border-2 text-left font-bold text-lg transition-all active:scale-95",
                    isSelected
                      ? "border-[#4A7C59] bg-[#EAF2EA] text-[#1A2A1E] shadow-sm"
                      : "border-[#E0E6E0] bg-white text-[#2D3436] hover:border-[#4A7C59]"
                  )}
                >
                  {lang === 'en' ? opt.en : opt.bn}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
