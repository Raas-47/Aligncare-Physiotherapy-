import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TrendingUp, ActivitySquare, CalendarCheck, Footprints } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

function StatCard({ 
  icon, 
  title, 
  value, 
  subtitle,
  colorClass,
  progressClass
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  colorClass: string;
  progressClass?: string;
}) {
  return (
    <div className={cn("p-5 rounded-[1.5rem] border shadow-sm flex flex-col bg-[#F9FBF9] border-[#EDF2ED] text-[#1A2A1E]")}>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2.5 bg-white rounded-xl shadow-sm">
          {icon}
        </div>
        <h3 className="font-bold text-[#636E72]">{title}</h3>
      </div>
      <div className="flex items-end gap-2 mt-auto">
        <span className="text-3xl font-bold">{value}</span>
        <span className="text-sm font-medium text-[#636E72] mb-1">{subtitle}</span>
      </div>
      {progressClass && (
         <div className="w-full bg-[#E0E6E0] h-1.5 rounded-full mt-4 overflow-hidden">
           <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "70%" }}
            transition={{ duration: 1, delay: 0.2 }}
            className={cn("h-full rounded-full", progressClass)} 
           />
         </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const { lang, t } = useLanguage();

  return (
    <div className="p-5 pb-24 max-w-md mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#1A2A1E] mb-1">
          {t('Recovery Progress', 'উন্নতির প্রতিবেদন')}
        </h2>
        <p className="text-[#636E72] font-medium">
          {t('Knee Replacement Rehab', 'হাঁটু রিপ্লেসমেন্ট রিহ্যাব')}
        </p>
      </div>

      {/* Main Progress Circle */}
      <div className="bg-white rounded-[2rem] p-6 sm:p-8 flex items-center gap-6 shadow-sm border border-[#E0E6E0] relative overflow-hidden">
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="64" cy="64" r="56" className="stroke-[#E0E6E0]" strokeWidth="12" fill="none" />
            <motion.circle 
              cx="64" cy="64" r="56" 
              className="stroke-[#4A7C59]" 
              strokeWidth="12" 
              fill="none" 
              strokeDasharray="351.8" 
              initial={{ strokeDashoffset: 351.8 }}
              animate={{ strokeDashoffset: 351.8 - (351.8 * 0.65) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round" 
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-[#1A2A1E]">
            <span className="text-3xl font-bold">65%</span>
            <span className="text-[0.65rem] text-[#636E72] font-bold uppercase tracking-wider mt-1">
              {t('Recovered', 'সুস্থ')}
            </span>
          </div>
        </div>
        
        <div className="z-10">
          <h3 className="font-bold text-xl text-[#1A2A1E] mb-1 leading-tight">
            {t("You're doing great!", "আপনি ভালো করছেন!")}
          </h3>
          <p className="text-[#636E72] font-medium text-sm">
            {t("Consistent exercise is showing results.", "নিয়মিত ব্যায়ামে লাভ দেখা যাচ্ছে।")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={<ActivitySquare className="w-6 h-6 text-[#E74C3C]" />}
          title={t('Pain Level', 'ব্যথার মাত্রা')}
          value="4/10"
          subtitle={t('Started at 8/10', 'শুরুতে ছিল ৮/১০')}
          colorClass="bg-[#F9FBF9]"
          progressClass="bg-[#E74C3C]"
        />
        
        <StatCard
          icon={<Footprints className="w-6 h-6 text-[#4A7C59]" />}
          title={t('Walking', 'হাঁটা')}
          value="15"
          subtitle={t('mins / day', 'মিনিট / দিন')}
          colorClass="bg-[#F9FBF9]"
          progressClass="bg-[#4A7C59]"
        />

        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-[#F1C40F]" />}
          title={t('Mobility', 'নড়াচড়া')}
          value="+40%"
          subtitle={t('improvement', 'উন্নতি')}
          colorClass="bg-[#F9FBF9]"
        />

        <StatCard
          icon={<CalendarCheck className="w-6 h-6 text-[#1A2A1E]" />}
          title={t('Sessions', 'সেশন')}
          value="12"
          subtitle={t('completed', 'সম্পন্ন')}
          colorClass="bg-[#F9FBF9]"
        />
      </div>
    </div>
  );
}
