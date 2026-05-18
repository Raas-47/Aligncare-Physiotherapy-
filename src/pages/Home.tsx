import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { CalendarClock, ActivitySquare, CheckCircle2, PhoneCall, Activity, HeartPulse, UserCircle2, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import React from 'react';

function FeatureCard({ 
  to, 
  icon, 
  title, 
  subtitle,
  bgColor
}: { 
  to: string; 
  icon: React.ReactNode; 
  title: string; 
  subtitle: string;
  bgColor: string;
}) {
  return (
    <Link 
      to={to}
      className={cn(
        "flex flex-col p-8 bg-transparent rounded-xl border border-[#E0Dcd0] hover:border-[#1A2A1E] transition-all group"
      )}
    >
      <div className={cn("mb-6 w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform", bgColor)}>
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-serif text-[#1A2A1E] mb-2">{title}</h3>
        <p className="text-[#636E72] font-medium leading-relaxed text-sm">{subtitle}</p>
      </div>
      <div className="mt-8 flex items-center gap-2 text-[#1A2A1E] font-medium text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Open</span>
        <ArrowRight className="w-3 h-3" />
      </div>
    </Link>
  );
}

export default function Home() {
  const { lang, t } = useLanguage();

  return (
    <div className="bg-[#F5F7F5] min-h-screen">
      
      {/* Hero Section */}
      <section className="relative px-6 py-16 md:py-24 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAF2EA] text-[#4A7C59] font-medium text-sm tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#4A7C59] animate-pulse"></span>
            {t('Serving Kolkata', 'কলকাতা পরিষেবা')}
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[#1A2A1E] leading-[1.1] tracking-tight">
            {t('Regain Mobility.', 'আপনার গতিশীলতা ফিরে পান।')} <br/>
            <span className="text-[#4A7C59] italic">{t('Eliminate Pain.', 'ব্যথা দূর করুন।')}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#636E72] leading-relaxed max-w-xl font-medium">
            {t(
              "Professional, personalized physical rehabilitation directly to your doorstep. Remove the stress of commuting and heal in the comfort of your home.",
              "আপনার দোরগোড়ায় পেশাদার এবং ব্যক্তিগত ফিজিওথেরাপি। যাতায়াতের কষ্ট ভুলে নিজের বাড়িতে থেকেই সুস্থ হয়ে উঠুন।"
            )}
          </p>
          
          <div className="flex flex-row items-center gap-4 justify-center md:justify-start pt-4">
            <Link 
              to="/book"
              className="px-8 py-4 bg-[#1A2A1E] text-[#F5F2ED] font-serif rounded-full shadow-xl flex items-center justify-center gap-3 hover:bg-[#2A3C31] active:scale-95 transition-all text-lg tracking-wide flex-1 sm:flex-none"
            >
              <CalendarClock className="w-5 h-5" />
              {t('Book Home Visit', 'হোম ভিজিট বুক করুন')}
            </Link>
            
            <a 
              href="tel:09051700147"
              title="Call Us"
              className="w-14 h-14 shrink-0 bg-transparent text-[#1A2A1E] border border-[#1A2A1E] rounded-full flex items-center justify-center hover:bg-[#1A2A1E] hover:text-[#F5F2ED] active:scale-95 transition-all"
            >
              <PhoneCall className="w-5 h-5" />
            </a>

            <a 
              href={`https://wa.me/9109051700147?text=${encodeURIComponent('Hi AlignCare, I would like to know more about your home physiotherapy services.')}`}
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp Support"
              className="w-14 h-14 shrink-0 bg-[#25D366] text-white rounded-full flex items-center justify-center hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#25D366]/20"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>

        <div className="flex-1 w-full max-w-md lg:max-w-lg relative mt-10 md:mt-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="aspect-[3/4] relative mx-auto"
          >
             <div className="absolute inset-0 bg-[#E0Dcd0] rounded-t-full transform translate-x-4 translate-y-4"></div>
             <img 
               src="https://lh3.googleusercontent.com/d/1AAS6qJOzlsTDvgGFy2pIK1LmaXayjuLf" 
               alt="Dr. Soumyadip Saha - Physiotherapist" 
               className="relative w-full h-full object-cover object-top rounded-t-full rounded-b-xl shadow-xl border-4 border-white"
               referrerPolicy="no-referrer"
             />
             
             {/* Floating badge */}
             <div className="absolute -bottom-6 -left-4 sm:left-0 right-0 bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-xl shadow-lg border border-[#E0Dcd0] mx-auto max-w-[90%]">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 border rounded-full flex items-center justify-center shrink-0 border-[#E0Dcd0]">
                    <UserCircle2 className="w-6 h-6 text-[#1A2A1E]" />
                 </div>
                 <div>
                   <p className="text-[0.65rem] font-bold text-[#636E72] uppercase tracking-[0.2em] mb-0.5">Professional Lead</p>
                   <p className="font-serif font-bold text-[#1A2A1E] text-lg leading-tight mb-1">Soumyadip Saha</p>
                   <p className="text-xs text-[#1A2A1E] opacity-70 font-medium whitespace-nowrap">Certified Physiotherapy Tech (JYCSM)</p>
                 </div>
               </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="bg-white py-20 px-6 border-y border-[#E0E6E0]">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-[#4A7C59] font-medium tracking-[0.2em] uppercase text-xs">Core Specialties</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-[#1A2A1E]">Comprehensive Care</h3>
            <p className="text-[#636E72] text-lg font-medium font-serif italic text-opacity-80">Tailored treatments to meet specific recovery goals, delivered with expertise and compassion.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: t('At-Home Physiotherapy', 'বাড়িতে ফিজিওথেরাপি'),
                desc: t('Convenient, door-to-door physical rehabilitation services.', 'সুবিধাজনক, বাড়ি বাড়ি শারীরিক পুনর্বাসন পরিষেবা।'),
                icon: <Activity className="w-6 h-6 text-[#1A2A1E]" />
              },
              {
                title: t('Orthopedic Rehab', 'অর্থোপেডিক রিহ্যাব'),
                desc: t('Expert care designed to treat back pain, neck stiffness, and joint injuries.', 'কোমর ব্যথা, ঘাড়ের আড়ষ্টতা এবং জয়েন্টের আঘাত সারাতে বিশেষজ্ঞ যত্ন।'),
                icon: <ActivitySquare className="w-6 h-6 text-[#1A2A1E]" />
              },
              {
                title: t('Post-Surgical Recovery', 'সার্জারি পরবর্তী সুস্থতা'),
                desc: t('Specialized physical therapy to safely regain strength following surgery.', 'সার্জারির পর নিরাপদে শক্তি ফিরে পেতে বিশেষ ফিজিক্যাল থেরাপি।'),
                icon: <HeartPulse className="w-6 h-6 text-[#1A2A1E]" />
              }
            ].map((service, i) => (
              <div key={i} className="p-8 bg-[#F5F2ED] rounded-xl border border-[#E0Dcd0] hover:border-[#1A2A1E] transition-colors relative">
                <div className="w-12 h-12 bg-white shadow-sm border border-[#E0Dcd0] rounded-full flex items-center justify-center mb-6 absolute -top-6 left-8">
                  {service.icon}
                </div>
                <h4 className="text-2xl font-serif text-[#1A2A1E] mb-3 mt-4">{service.title}</h4>
                <p className="text-[#636E72] leading-relaxed font-medium">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Stories */}
      <section className="py-20 px-6 max-w-5xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-[#4A7C59] font-medium tracking-[0.2em] uppercase text-xs">Patient Stories</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-[#1A2A1E]">Words of Healing</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-8 bg-white rounded-xl border border-[#E0Dcd0] shadow-sm relative hover:border-[#1A2A1E] transition-colors">
             <div className="text-6xl text-[#4A7C59] opacity-20 font-serif absolute -top-2 left-6">"</div>
             <p className="text-[#636E72] font-medium leading-relaxed italic relative z-10 pt-4">
              "I thought my knee pain would never go away. Thanks to Aligncare's home service, I could recover in my own space without the stress of traveling. Highly recommended!"
             </p>
             <div className="mt-6 flex items-center gap-4">
                <div className="w-10 h-10 bg-[#EAF2EA] rounded-full flex items-center justify-center">
                  <span className="font-bold text-[#4A7C59] text-sm">AD</span>
                </div>
                <div>
                  <p className="font-bold text-[#1A2A1E]">Amitava D.</p>
                  <p className="text-[0.65rem] font-bold text-[#636E72] uppercase tracking-wider">Salt Lake, Kolkata</p>
                </div>
             </div>
          </div>
          <div className="p-8 bg-white rounded-xl border border-[#E0Dcd0] shadow-sm relative hover:border-[#1A2A1E] transition-colors">
             <div className="text-6xl text-[#4A7C59] opacity-20 font-serif absolute -top-2 left-6">"</div>
             <p className="text-[#636E72] font-medium leading-relaxed italic relative z-10 pt-4">
              "Very professional and punctual. Soumyadip helped my mother walk again after her hip replacement surgery. The convenience of home therapy is a blessing."
             </p>
             <div className="mt-6 flex items-center gap-4">
                <div className="w-10 h-10 bg-[#FADBD8] rounded-full flex items-center justify-center">
                  <span className="font-bold text-[#E74C3C] text-sm">SM</span>
                </div>
                <div>
                  <p className="font-bold text-[#1A2A1E]">Sarmistha M.</p>
                  <p className="text-[0.65rem] font-bold text-[#636E72] uppercase tracking-wider">New Town, Kolkata</p>
                </div>
             </div>
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <a 
            href="https://g.page/r/Cb-u7tj6fTLIEAE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#E0Dcd0] text-[#1A2A1E] font-medium rounded-full shadow-sm hover:border-[#1A2A1E] hover:bg-[#F5F2ED] transition-all"
          >
            <svg className="w-5 h-5 text-[#F1C40F]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            Review us on Google
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#1A2A1E] text-[#F5F2ED] py-24 px-6 border-y border-[#1A2A1E]">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-[#6B8E6B] font-medium tracking-[0.2em] uppercase text-xs">Common Questions</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-white">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Do I need to arrange any equipment?",
                a: "No, our physiotherapist carries all the essential equipment needed for your specific treatment during the home visit."
              },
              {
                q: "How long is a typical session?",
                a: "A regular session lasts about 45 to 60 minutes, depending on the treatment plan and patient's condition."
              },
              {
                q: "Which areas in Kolkata do you serve?",
                a: "We currently cover most major locations in Kolkata, including Salt Lake, New Town, South Kolkata, and Central Kolkata. Please message us on WhatsApp to confirm availability for your specific area."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-[#2A3C31] p-6 md:p-8 rounded-xl border border-white/10 hover:border-white/30 transition-colors">
                <h4 className="font-serif text-xl font-bold text-white mb-3">{faq.q}</h4>
                <p className="text-white/70 italic text-lg leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Features Area (Dashboard Menu) */}
      <section className="py-20 px-6 max-w-5xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-[#4A7C59] font-medium tracking-[0.2em] uppercase text-xs">Patient Tools</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-[#1A2A1E]">Your Recovery App</h3>
          <p className="text-[#636E72] text-lg font-medium font-serif italic text-opacity-80">Use our simple digital tools to track your progress and do your exercises properly.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            to="/exercises"
            icon={<Activity className="w-8 h-8 text-[#4A7C59]" />}
            title={t("Today's Exercises", 'আজকের ব্যায়াম')}
            subtitle={t('Watch guided videos and follow along.', 'ভিডিও দেখুন এবং একসাথে ব্যায়াম করুন।')}
            bgColor="bg-[#EAF2EA]"
          />
          <FeatureCard 
            to="/pain-check"
            icon={<ActivitySquare className="w-8 h-8 text-[#F39C12]" />}
            title={t('Check Pain', 'ব্যথা পরীক্ষা')}
            subtitle={t('Assess your current mobility and pain level.', 'আপনার বর্তমান ব্যথা এবং নড়াচড়া মূল্যায়ন করুন।')}
            bgColor="bg-[#FFF9EA]"
          />
          <FeatureCard 
            to="/book"
            icon={<CalendarClock className="w-8 h-8 text-[#E74C3C]" />}
            title={t('Book a Visit', 'ভিজিট বুক করুন')}
            subtitle={t('Schedule a session with our experts.', 'আমাদের বিশেষজ্ঞদের সাথে সেশন বুক করুন।')}
            bgColor="bg-[#FADBD8]"
          />
        </div>
      </section>

      {/* Modern Footer CTA */}
      <footer className="bg-[#1A2A1E] text-[#F5F2ED] py-20 px-6 mt-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h3 className="text-4xl md:text-5xl font-serif tracking-tight">Need immediate physical therapy support?</h3>
          <p className="text-lg opacity-80 max-w-xl mx-auto font-serif italic">Get in touch with us today and start your journey towards a pain-free life.</p>
          <div className="flex flex-row items-center justify-center gap-6 pt-6">
             <a 
              href="tel:09051700147"
              title="Call Us"
              className="w-16 h-16 shrink-0 bg-transparent border border-white/30 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#1A2A1E] transition-all"
            >
              <PhoneCall className="w-6 h-6" />
            </a>
             <a 
              href={`https://wa.me/9109051700147?text=${encodeURIComponent('Hi AlignCare, I need immediate physical therapy support.')}`}
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp Support"
              className="w-16 h-16 shrink-0 bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/20 flex items-center justify-center hover:brightness-110 transition-all"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
          <div className="pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-60 font-medium tracking-wide">
            <p>Aligncare Physiotherapy © {new Date().getFullYear()}</p>
            <p>Kolkata, West Bengal</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
