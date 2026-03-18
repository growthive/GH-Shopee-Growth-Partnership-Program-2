import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, AlertCircle, Users, ShoppingCart, Clock, 
  XOctagon, CheckCircle2, Target, BarChart3, Zap, 
  MessageCircle, ArrowRight, Check, Search, Settings, 
  LineChart, Award, Briefcase, LayoutDashboard
} from 'lucide-react';

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Trigger Meta Pixel Purchase Event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', { currency: 'IDR', value: 1 });
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

    // Jika URL Google Script belum diatur, gunakan simulasi cepat
    if (!scriptUrl) {
      setTimeout(() => {
        setFormStatus('submitted');
        form.reset();
      }, 800);
      return;
    }

    try {
      // Background Processing (Optimistic UI)
      fetch(scriptUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors', // Penting untuk Google Apps Script
      }).catch((error) => {
        console.error('Error in background fetch:', error);
      });
      
      // Langsung tampilkan pesan sukses setelah animasi loading singkat (600ms)
      setTimeout(() => {
        setFormStatus('submitted');
        form.reset();
      }, 600);

    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };

  const scrollToForm = () => {
    // Trigger Meta Pixel InitiateCheckout Event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout');
    }
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-[#FF6A00] selection:text-white pb-20 md:pb-0">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-[#0B3C5D] rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <span className="font-bold text-lg md:text-xl tracking-tight text-[#0B3C5D]">GrowtHive</span>
          </div>
          <button 
            onClick={scrollToForm}
            className="hidden md:flex items-center gap-2 bg-[#FF6A00] hover:bg-[#e65f00] text-white px-6 py-2.5 rounded-full font-medium transition-colors"
          >
            Diskusikan Toko Saya
          </button>
        </div>
      </header>

      <main className="pt-16 md:pt-20">
        {/* SECTION 1 - HERO */}
        <section className="relative overflow-hidden bg-white pt-12 pb-20 md:pt-20 md:pb-32">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100/50 -z-10" />
          <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <FadeIn>
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-[#FF6A00] text-xs md:text-sm font-semibold mb-6">
                  <Zap className="w-3 h-3 md:w-4 md:h-4" />
                  Shopee Growth Partnership Program
                </div>
                <h1 className="text-[40px] md:text-5xl lg:text-6xl font-bold text-[#0B3C5D] leading-[1.15] md:leading-[1.1] mb-6 tracking-tight">
                  Shopee kamu sudah jalan, tapi growth-nya masih stagnan?
                </h1>
                <p className="text-base md:text-lg text-slate-600 mb-8 md:mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Banyak brand sudah memiliki produk bagus, menjalankan Shopee Ads, dan punya traffic. 
                  Tetapi penjualan tetap stuck karena struktur growth marketplace belum optimal.
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 md:gap-4">
                  <button 
                    onClick={scrollToForm}
                    className="flex items-center justify-center gap-2 bg-[#FF6A00] hover:bg-[#e65f00] text-white px-6 py-3.5 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40"
                  >
                    Diskusikan Toko Saya
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => document.getElementById('framework')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-6 py-3.5 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all"
                  >
                    Lihat Cara Kami Membantu
                  </button>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="relative mt-8 lg:mt-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0B3C5D]/10 to-[#FF6A00]/10 rounded-3xl blur-3xl -z-10" />
                <div className="bg-white border border-slate-200 p-5 md:p-6 rounded-3xl shadow-2xl">
                  <div className="flex items-center justify-between mb-6 md:mb-8">
                    <div>
                      <h3 className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wider">Revenue Growth</h3>
                      <p className="text-2xl md:text-3xl font-bold text-[#0B3C5D]">Rp 725.000.000</p>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="h-48 md:h-64 flex items-end gap-2 md:gap-3">
                    {[30, 45, 40, 60, 55, 80, 100].map((height, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                        className={`flex-1 rounded-t-md md:rounded-t-lg ${i === 6 ? 'bg-[#FF6A00]' : 'bg-[#0B3C5D]/20'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* SECTION 2 - PROBLEM RECOGNITION */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <FadeIn>
              <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B3C5D] mb-4">Kenapa banyak toko Shopee sulit berkembang?</h2>
                <p className="text-base md:text-lg text-slate-600">Gejala umum yang sering dialami brand owner saat mencoba scale up.</p>
              </div>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                { icon: Zap, title: "Traffic naik hanya saat campaign atau flash sale." },
                { icon: Target, title: "Shopee Ads jalan terus tapi hasilnya stagnan." },
                { icon: Users, title: "Banyak yang lihat tapi sedikit yang beli." },
                { icon: Clock, title: "Seller sibuk operasional tapi growth tidak bergerak." }
              ].map((problem, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col items-center text-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 md:mb-6 mx-auto">
                      <problem.icon className="w-5 h-5 md:w-6 md:h-6 text-red-500" />
                    </div>
                    <p className="font-semibold text-slate-800 text-base md:text-lg leading-snug">{problem.title}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 - ROOT CAUSE */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <FadeIn className="order-2 lg:order-1">
              <div className="relative p-6 md:p-8 bg-slate-50 rounded-3xl border border-slate-200 mt-8 lg:mt-0">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#FF6A00]/10 rounded-full blur-2xl" />
                <div className="space-y-4 md:space-y-6 relative z-10">
                  <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl shadow-sm opacity-50">
                    <XOctagon className="text-red-500 w-5 h-5 md:w-6 md:h-6 shrink-0" />
                    <span className="font-medium text-sm md:text-base text-slate-700">Struktur produk tidak jelas</span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl shadow-sm opacity-70">
                    <XOctagon className="text-red-500 w-5 h-5 md:w-6 md:h-6 shrink-0" />
                    <span className="font-medium text-sm md:text-base text-slate-700">Tidak ada hero product</span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl shadow-sm">
                    <XOctagon className="text-red-500 w-5 h-5 md:w-6 md:h-6 shrink-0" />
                    <span className="font-medium text-sm md:text-base text-slate-700">Strategi Shopee Ads tidak terstruktur</span>
                  </div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2} className="order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B3C5D] mb-4 md:mb-6">
                Yang sering terjadi di balik toko Shopee yang stagnan
              </h2>
              <p className="text-base md:text-lg text-slate-600 mb-6 md:mb-8">
                Sebagian besar masalah terjadi karena struktur marketplace yang tidak dioptimasi dengan benar dari dasar.
              </p>
              <ul className="space-y-3 md:space-y-4">
                {[
                  "Struktur produk tidak jelas",
                  "Tidak ada hero product",
                  "Listing belum optimal",
                  "Visual produk kurang menarik",
                  "Strategi Shopee Ads tidak terstruktur",
                  "Promo marketplace tidak dimaksimalkan"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-orange-500 shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </section>

        {/* SECTION 4 - GROWTH BELIEF */}
        <section className="py-16 md:py-24 bg-[#0B3C5D] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
            <FadeIn>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 leading-tight">
                Marketplace growth bukan hanya soal menjalankan ads
              </h2>
              <p className="text-lg md:text-xl text-blue-100 mb-8 md:mb-10 leading-relaxed">
                Di GrowtHive, kami percaya bahwa pertumbuhan marketplace membutuhkan strategi yang jelas, struktur toko yang sehat, optimasi conversion, dan scaling traffic yang terukur.
              </p>
              <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 p-4 md:px-8 md:py-4 rounded-2xl">
                <p className="text-lg md:text-xl font-semibold text-[#FF6A00]">
                  GrowtHive bekerja sebagai Marketing Growth Partner, bukan sekadar digital marketing agency.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* SECTION 5 - GH GROWTH FRAMEWORK */}
        <section id="framework" className="py-16 md:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <FadeIn>
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B3C5D]">GH Shopee Growth Framework</h2>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8 relative">
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-200 -z-10" />
              
              {[
                { icon: Search, title: "Diagnose", desc: "Memahami kondisi toko secara objektif dan menemukan bottleneck growth." },
                { icon: Settings, title: "Optimize", desc: "Mengoptimalkan listing, visual produk, dan struktur Shopee Ads." },
                { icon: LineChart, title: "Scale", desc: "Scaling traffic, campaign marketplace, dan strategi promo." }
              ].map((step, i) => (
                <FadeIn key={i} delay={i * 0.2}>
                  <div className="relative bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 text-center h-full">
                    <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-[#0B3C5D] rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-white shadow-lg shadow-blue-900/20">
                      <step.icon className="w-7 h-7 md:w-8 md:h-8" />
                    </div>
                    <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-8 h-8 bg-[#FF6A00] text-white font-bold rounded-full flex items-center justify-center border-4 border-white text-sm md:text-base">
                      {i + 1}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 md:mb-4">{step.title}</h3>
                    <p className="text-sm md:text-base text-slate-600">{step.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 - REAL GROWTH RESULTS */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <FadeIn>
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B3C5D]">Real Growth Results</h2>
              </div>
            </FadeIn>

            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { before: "Rp360 juta", after: "Rp725 juta", improvements: ["Listing optimization", "Hero product ads strategy", "Visual improvement"] },
                { before: "Rp59 juta", after: "Rp140 juta", improvements: ["Ads restructuring", "Hero product scaling", "Marketplace promo strategy"] },
                { before: "Rp0", after: "Rp100 juta", improvements: ["Hero product strategy", "Listing optimization", "Structured ads scaling"] }
              ].map((study, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-6 md:mb-8">
                      <div>
                        <p className="text-xs md:text-sm font-semibold text-slate-500 mb-1">Before</p>
                        <p className="text-lg md:text-xl font-bold text-slate-700">{study.before}</p>
                      </div>
                      <ArrowRight className="text-[#FF6A00] w-5 h-5 md:w-6 md:h-6" />
                      <div className="text-right">
                        <p className="text-xs md:text-sm font-semibold text-[#FF6A00] mb-1">After</p>
                        <p className="text-xl md:text-2xl font-bold text-[#0B3C5D]">{study.after}</p>
                      </div>
                    </div>
                    <div className="mt-auto pt-5 md:pt-6 border-t border-slate-200">
                      <p className="text-sm font-semibold text-slate-800 mb-3">Key improvements:</p>
                      <ul className="space-y-2">
                        {study.improvements.map((imp, j) => (
                          <li key={j} className="flex items-center gap-2 text-xs md:text-sm text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                            {imp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7 - WHAT YOU WILL GET */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <FadeIn>
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B3C5D]">Apa yang Anda dapatkan di GH Shopee Growth Partnership</h2>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {[
                { icon: Search, title: "Shopee Store Diagnostic", desc: "Identifikasi bottleneck utama toko Anda." },
                { icon: LayoutDashboard, title: "90 Day Growth Strategy Roadmap", desc: "Strategi growth marketplace selama 3 bulan." },
                { icon: BarChart3, title: "Weekly Optimization & Monitoring", desc: "Optimasi dan monitoring performa secara rutin." },
                { icon: Target, title: "Quarterly Growth Strategy Review", desc: "Evaluasi strategi growth jangka panjang." }
              ].map((feature, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="flex flex-col items-center text-center gap-4 md:gap-6 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 mx-auto">
                      <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-[#0B3C5D]" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-1 md:mb-2">{feature.title}</h3>
                      <p className="text-sm md:text-base text-slate-600">{feature.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8 - WHO THIS PROGRAM IS FOR */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-12">
            <FadeIn>
              <div className="bg-green-50 rounded-3xl p-6 md:p-10 border border-green-100 h-full">
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 md:mb-8">Program ini cocok untuk brand yang:</h3>
                <ul className="space-y-3 md:space-y-4">
                  {[
                    "Sudah memiliki produk dengan demand",
                    "Ingin menjadikan Shopee sebagai channel revenue utama",
                    "Memiliki omzet marketplace Rp50 juta – Rp300 juta per bulan",
                    "Ingin scale secara lebih terstruktur"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base text-slate-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="bg-red-50 rounded-3xl p-6 md:p-10 border border-red-100 h-full">
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 md:mb-8">Program ini tidak cocok untuk:</h3>
                <ul className="space-y-3 md:space-y-4">
                  {[
                    "Seller affiliate individu",
                    "Toko yang masih tahap coba-coba",
                    "Brand tanpa demand produk"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <XOctagon className="w-5 h-5 md:w-6 md:h-6 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base text-slate-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* SECTION 9 - WHY GROWTHIVE */}
        <section className="py-16 md:py-24 bg-[#0B3C5D] text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <FadeIn>
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Kenapa brand bekerja sama dengan GrowtHive</h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {[
                { icon: Target, title: "Strategic Marketplace Approach" },
                { icon: BarChart3, title: "Data-Driven Optimization" },
                { icon: Award, title: "Proven Growth Experience" },
                { icon: Briefcase, title: "Growth Partnership Mindset" },
                { icon: LayoutDashboard, title: "Structured Execution" }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 md:p-6 rounded-2xl text-center h-full flex flex-col items-center justify-center gap-3 md:gap-4 hover:bg-white/20 transition-colors">
                    <item.icon className="w-6 h-6 md:w-8 md:h-8 text-[#FF6A00]" />
                    <h3 className="font-semibold text-sm md:text-lg leading-snug">{item.title}</h3>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10 - PROGRAM OPTIONS */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <FadeIn>
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B3C5D]">GH Shopee Growth Partnership</h2>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {/* Starter */}
              <FadeIn delay={0.1}>
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm h-full flex flex-col text-center">
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2">Growth Starter</h3>
                  <div className="my-4 md:my-6">
                    <span className="text-3xl md:text-4xl font-extrabold text-[#0B3C5D]">3%</span>
                    <span className="text-slate-500 font-medium text-sm md:text-base"> revenue</span>
                  </div>
                  <p className="text-sm md:text-base text-slate-600 font-medium mb-6 md:mb-8 pb-6 md:pb-8 border-b border-slate-100">
                    minimum Rp2 juta / bulan
                  </p>
                  <button onClick={scrollToForm} className="mt-auto w-full py-3 rounded-xl font-semibold text-[#0B3C5D] bg-blue-50 hover:bg-blue-100 transition-colors">
                    Pilih Paket
                  </button>
                </div>
              </FadeIn>

              {/* Partner (Highlighted) */}
              <FadeIn delay={0.2}>
                <div className="bg-[#0B3C5D] rounded-3xl p-6 md:p-8 border border-[#0B3C5D] shadow-xl relative h-full flex flex-col text-center transform md:-translate-y-4 mt-4 md:mt-0">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF6A00] text-white px-3 py-1 md:px-4 md:py-1 rounded-full text-xs md:text-sm font-bold tracking-wide uppercase whitespace-nowrap">
                    Most Popular
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2">Growth Partner</h3>
                  <div className="my-4 md:my-6">
                    <span className="text-3xl md:text-4xl font-extrabold text-white">2.5%</span>
                    <span className="text-blue-200 font-medium text-sm md:text-base"> revenue</span>
                  </div>
                  <p className="text-sm md:text-base text-blue-100 font-medium mb-6 md:mb-8 pb-6 md:pb-8 border-b border-white/10">
                    minimum Rp4 juta / bulan
                  </p>
                  <button onClick={scrollToForm} className="mt-auto w-full py-3 rounded-xl font-semibold text-white bg-[#FF6A00] hover:bg-[#e65f00] transition-colors shadow-lg shadow-orange-500/20">
                    Pilih Paket
                  </button>
                </div>
              </FadeIn>

              {/* Scale */}
              <FadeIn delay={0.3}>
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm h-full flex flex-col text-center mt-4 md:mt-0">
                  <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2">Scale Partnership</h3>
                  <div className="my-4 md:my-6">
                    <span className="text-3xl md:text-4xl font-extrabold text-[#0B3C5D]">2%</span>
                    <span className="text-slate-500 font-medium text-sm md:text-base"> revenue</span>
                  </div>
                  <p className="text-sm md:text-base text-slate-600 font-medium mb-6 md:mb-8 pb-6 md:pb-8 border-b border-slate-100">
                    minimum Rp7 juta / bulan
                  </p>
                  <button onClick={scrollToForm} className="mt-auto w-full py-3 rounded-xl font-semibold text-[#0B3C5D] bg-blue-50 hover:bg-blue-100 transition-colors">
                    Pilih Paket
                  </button>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* SECTION 11 - LEAD FORM */}
        <section id="lead-form" className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <FadeIn>
              <div className="bg-white rounded-3xl p-6 md:p-12 border border-slate-200 shadow-2xl shadow-slate-200/50">
                <div className="text-center mb-8 md:mb-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0B3C5D] mb-3 md:mb-4">Cek Potensi Growth Toko Shopee Anda</h2>
                  <p className="text-sm md:text-base text-slate-600">Isi form di bawah ini untuk mendapatkan analisa awal dari tim kami.</p>
                </div>

                {formStatus === 'submitted' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-200 rounded-2xl p-6 md:p-8 text-center"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Terima Kasih!</h3>
                    <p className="text-sm md:text-base text-slate-600">Tim GrowtHive akan menghubungi Anda dalam 1x24 jam.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-1.5 md:space-y-2">
                        <label className="text-xs md:text-sm font-semibold text-slate-700">Nama</label>
                        <input required name="nama" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0B3C5D] focus:border-[#0B3C5D] outline-none transition-all text-sm md:text-base" placeholder="Nama Anda" />
                      </div>
                      <div className="space-y-1.5 md:space-y-2">
                        <label className="text-xs md:text-sm font-semibold text-slate-700">Brand Name</label>
                        <input required name="brand" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0B3C5D] focus:border-[#0B3C5D] outline-none transition-all text-sm md:text-base" placeholder="Nama Brand" />
                      </div>
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-xs md:text-sm font-semibold text-slate-700">Kategori Produk</label>
                      <input required name="kategori" type="text" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0B3C5D] focus:border-[#0B3C5D] outline-none transition-all text-sm md:text-base" placeholder="Contoh: Fashion Wanita, Elektronik" />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-xs md:text-sm font-semibold text-slate-700">Omzet Shopee per bulan</label>
                      <select required name="omzet" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0B3C5D] focus:border-[#0B3C5D] outline-none transition-all bg-white text-sm md:text-base">
                        <option value="">Pilih Range Omzet</option>
                        <option value="<50">&lt; Rp 50 Juta</option>
                        <option value="50-100">Rp 50 Juta - Rp 100 Juta</option>
                        <option value="100-300">Rp 100 Juta - Rp 300 Juta</option>
                        <option value=">300">&gt; Rp 300 Juta</option>
                      </select>
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-xs md:text-sm font-semibold text-slate-700">Link Toko Shopee</label>
                      <input required name="link" type="url" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0B3C5D] focus:border-[#0B3C5D] outline-none transition-all text-sm md:text-base" placeholder="https://shopee.co.id/..." />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-xs md:text-sm font-semibold text-slate-700">WhatsApp</label>
                      <input required name="whatsapp" type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#0B3C5D] focus:border-[#0B3C5D] outline-none transition-all text-sm md:text-base" placeholder="0812..." />
                    </div>
                    
                    {formStatus === 'error' && (
                      <div className="p-3 md:p-4 bg-red-50 text-red-600 rounded-xl text-xs md:text-sm font-medium">
                        Terjadi kesalahan saat mengirim data. Silakan coba lagi.
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={formStatus === 'submitting'}
                      className="w-full py-3.5 md:py-4 rounded-xl font-bold text-white text-base md:text-lg bg-[#FF6A00] hover:bg-[#e65f00] transition-colors shadow-lg shadow-orange-500/20 mt-4 md:mt-6 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        'Analisa Toko Saya'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* SECTION 12 - FINAL CTA */}
        <section className="py-16 md:py-24 bg-[#0B3C5D] text-white text-center">
          <div className="max-w-3xl mx-auto px-4 md:px-6">
            <FadeIn>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Siap mengembangkan Shopee Anda secara lebih terstruktur?</h2>
              <p className="text-base md:text-xl text-blue-100 mb-8 md:mb-10">
                GrowtHive siap menjadi Marketing Growth Partner untuk membantu brand Anda bertumbuh secara nyata.
              </p>
              <button 
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 bg-[#FF6A00] hover:bg-[#e65f00] text-white px-8 py-4 md:px-10 md:py-5 rounded-full font-bold text-lg md:text-xl transition-all shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 hover:-translate-y-1"
              >
                Diskusikan Toko Saya
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* SECTION 13 - FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 md:py-16 border-t border-slate-800 pb-28 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">GrowtHive</span>
            </div>
            <p className="text-sm">Shopee Growth Partnership Program</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 md:mb-4">Address</h4>
            <p className="text-sm leading-relaxed">
              APL Tower Central Park Lt.26<br />
              Jakarta
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 md:mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>WhatsApp: +62 881-0824-87487</li>
              <li>Instagram: @growthive.id</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 mt-12 md:mt-16 pt-8 border-t border-slate-800 text-sm text-center">
          &copy; {new Date().getFullYear()} GrowtHive. All rights reserved.
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/62881082487487" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-24 md:bottom-6 right-4 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:-translate-y-1 transition-transform z-40"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
      </a>

      {/* Mobile Sticky Bottom CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.05)] z-50">
        <button 
          onClick={scrollToForm}
          className="w-full bg-[#FF6A00] text-white py-3.5 rounded-xl font-bold text-base shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          Diskusikan Toko Saya
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
