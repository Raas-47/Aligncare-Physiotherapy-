import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ActivitySquare, MapPin, Clock, MessageCircle, ChevronRight, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const CONDITIONS = [
  { id: 'knee', en: 'Knee Pain / Surgery', bn: 'হাঁটু ব্যথা / সার্জারি' },
  { id: 'back', en: 'Back Pain', bn: 'কোমর / পিঠ ব্যথা' },
  { id: 'stroke', en: 'Stroke Recovery', bn: 'স্ট্রোক রিকভারি' },
  { id: 'paralysis', en: 'Paralysis', bn: 'প্যারালাইসিস' },
  { id: 'post-surgery', en: 'Post Surgery Rehab', bn: 'সার্জারির পর রিহ্যাব' },
  { id: 'other', en: 'Other Issues', bn: 'অন্যান্য সমস্যা' },
];

const TIMES = [
  { id: 'morning', en: 'Morning (8 AM - 12 PM)', bn: 'সকাল (৮টা - ১২টা)' },
  { id: 'afternoon', en: 'Afternoon (12 PM - 4 PM)', bn: 'দুপুর (১২টা - ৪টে)' },
  { id: 'evening', en: 'Evening (4 PM - 8 PM)', bn: 'সন্ধ্যা (৪টে - ৮টা)' },
];

export default function Booking() {
  const { lang, t } = useLanguage();
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    condition: '',
    time: '',
    address: 'Kolkata, WB' // placeholder
  });

  const getWhatsAppLink = () => {
    let message = `Hi AlignCare, I would like to book a home visit.\n\n`;
    const getLabel = (id: string, list: any[]) => {
      const item = list.find(i => i.id === id);
      return item ? item.en : id;
    };
    
    if (selections.condition) message += `Condition: ${getLabel(selections.condition, CONDITIONS)}\n`;
    if (selections.time) message += `Preferred Time: ${getLabel(selections.time, TIMES)}\n`;
    message += `\nPlease confirm.`;
    
    return `https://wa.me/9109051700147?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="p-5 pb-24 max-w-md mx-auto">
      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map(i => (
          <div 
            key={i} 
            className={cn(
              "h-2 flex-1 rounded-full transition-colors duration-500",
              step >= i ? "bg-[#4A7C59]" : "bg-[#E0E6E0]"
            )}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-[#1A2A1E] mb-2">
                {t('What is the problem?', 'আপনার কী সমস্যা হচ্ছে?')}
              </h2>
              <p className="text-[#636E72]">
                {t('Select the main condition', 'প্রধান সমস্যা নির্বাচন করুন')}
              </p>
            </div>

            <div className="space-y-4">
              {CONDITIONS.map(cond => (
                <button
                  key={cond.id}
                  onClick={() => {
                    setSelections(s => ({ ...s, condition: cond.id }));
                  }}
                  className={cn(
                    "w-full p-5 rounded-[1.5rem] border-2 text-left flex items-center justify-between transition-all active:scale-95",
                    selections.condition === cond.id 
                      ? "border-[#4A7C59] bg-[#EAF2EA] text-[#1A2A1E] shadow-sm" 
                      : "border-[#E0E6E0] bg-white hover:border-[#4A7C59] text-[#2D3436]"
                  )}
                >
                  <span className="font-bold text-lg">{lang === 'en' ? cond.en : cond.bn}</span>
                  {selections.condition === cond.id ? (
                    <Check className="w-6 h-6 text-[#4A7C59]" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-[#E0E6E0]" />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!selections.condition}
              className="w-full py-4 mt-8 bg-[#4A7C59] text-white font-bold text-lg rounded-[1.5rem] shadow-lg shadow-[#4A7C59]/30 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
            >
              {t('Continue', 'পরবর্তী')}
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <button 
                onClick={() => setStep(1)}
                className="text-sm font-bold text-[#4A7C59] mb-4 inline-block tracking-wider uppercase"
              >
                {t('← Back', '← পিছনে')}
              </button>
              <h2 className="text-2xl font-bold text-[#1A2A1E] mb-2">
                {t('When should we visit?', 'কখন গেলে ভালো হয়?')}
              </h2>
              <p className="text-[#636E72]">
                {t('Select your preferred time slot', 'আপনার পছন্দের সময় নির্বাচন করুন')}
              </p>
            </div>

            <div className="space-y-4">
              {TIMES.map(time => (
                <button
                  key={time.id}
                  onClick={() => {
                    setSelections(s => ({ ...s, time: time.id }));
                  }}
                  className={cn(
                    "w-full p-5 rounded-[1.5rem] border-2 text-left flex items-center justify-between transition-all active:scale-95",
                    selections.time === time.id 
                      ? "border-[#4A7C59] bg-[#EAF2EA] text-[#1A2A1E] shadow-sm" 
                      : "border-[#E0E6E0] bg-white hover:border-[#4A7C59] text-[#2D3436]"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn("p-2 rounded-xl", selections.time === time.id ? "bg-white" : "bg-[#F5F7F5]")}>
                      <Clock className={cn("w-6 h-6", selections.time === time.id ? "text-[#4A7C59]" : "text-[#636E72]")} />
                    </div>
                    <span className="font-bold text-lg">{lang === 'en' ? time.en : time.bn}</span>
                  </div>
                  {selections.time === time.id ? (
                    <Check className="w-6 h-6 text-[#4A7C59]" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-[#E0E6E0]" />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(3)}
              disabled={!selections.time}
              className="w-full py-4 mt-8 bg-[#4A7C59] text-white font-bold text-lg rounded-[1.5rem] shadow-lg shadow-[#4A7C59]/30 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
            >
              {t('Continue', 'পরবর্তী')}
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 text-center"
          >
            <div className="pt-8">
              <div className="w-24 h-24 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-12 h-12 text-[#25D366]" />
              </div>
              <h2 className="text-2xl font-bold text-[#1A2A1E] mb-4">
                {t('Almost Done!', 'প্রায় শেষ!')}
              </h2>
              <p className="text-[#636E72] text-lg mb-8 leading-relaxed">
                {t(
                  'Click the button below to send your request directly to our team via WhatsApp. We will reply instantly to confirm the exact address.',
                  'আপনার বুকিং কনফার্ম করতে নিচের হোয়াটসঅ্যাপ বোতামে ক্লিক করুন। আমরা খুব তাড়াতাড়ি সঠিক ঠিকানার জন্য মেসেজ করব।'
                )}
              </p>
            </div>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-5 px-4 bg-[#25D366] text-white font-bold text-xl rounded-[1.5rem] shadow-xl shadow-[#25D366]/30 flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 transition-all"
            >
              <MessageCircle className="w-7 h-7" />
              {t('Confirm on WhatsApp', 'হোয়াটসঅ্যাপে বুকিং করুন')}
            </a>
            
            <button 
              onClick={() => setStep(2)}
              className="w-full py-4 mt-4 text-[#636E72] font-bold tracking-wider uppercase text-sm"
            >
               {t('Go back', 'পিছনে যান')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
