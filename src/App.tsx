import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, CheckCircle2, TrendingUp, Users, Target, Shield, 
  BarChart3, ChevronDown, MessageSquare, Briefcase, ChevronRight, X, MessageCircle, Star
} from 'lucide-react';

const WHATSAPP_LINK = "https://api.whatsapp.com/send/?phone=5535997577907&text=Quero+saber+mais+sobre+a+Consultoria+Comercial...&type=phone_number&app_absent=0";

const Button = ({ children, className = '', href = WHATSAPP_LINK, variant = 'primary' }: any) => {
  const isPrimary = variant === 'primary';
  const baseStyles = isPrimary 
    ? "bg-gradient-to-br from-[#BF953F] via-[#FCF6BA] via-[#D4AF37] via-[#FBF5B7] to-[#AA771C] text-[#0C0C0C] shadow-[0_10px_20px_rgba(211,175,55,0.2)]"
    : "bg-[#0C0C0C] hover:bg-white hover:text-[#0C0C0C] text-white shadow-2xl border border-[#D3AF37]/50";

  return (
    <motion.a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex px-6 py-3 md:px-10 md:py-5 rounded-full font-bold text-[11px] md:text-sm uppercase tracking-widest hover:brightness-110 transition-all items-center justify-center gap-2 group relative overflow-hidden ${baseStyles} ${className}`}
    >
      {isPrimary && (
        <motion.div 
          animate={{ x: ['-200%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
        />
      )}
      <span className="relative z-10 text-center">{children}</span>
      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform relative z-10" />
    </motion.a>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroBgY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const scrollContainer = carouselRef.current;
    if (!scrollContainer) return;

    let intervalId: any;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const autoScroll = () => {
      if (isDown) return;
      const { scrollLeft: currentScroll, scrollWidth, clientWidth } = scrollContainer;
      
      if (currentScroll + clientWidth >= scrollWidth - 20) {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainer.scrollBy({ left: clientWidth, behavior: 'smooth' });
      }
    };

    const startInterval = () => {
      intervalId = setInterval(autoScroll, 5000);
    };

    // Dragging Logic
    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      scrollContainer.style.scrollSnapType = 'none'; // Disable snapping while dragging
      scrollContainer.style.scrollBehavior = 'auto'; // Instant movement while dragging
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
      clearInterval(intervalId);
    };

    const handleMouseLeave = () => {
      if (!isDown) return;
      isDown = false;
      scrollContainer.style.scrollSnapType = 'x mandatory';
      scrollContainer.style.scrollBehavior = 'smooth';
      startInterval();
    };

    const handleMouseUp = () => {
      if (!isDown) return;
      isDown = false;
      scrollContainer.style.scrollSnapType = 'x mandatory';
      scrollContainer.style.scrollBehavior = 'smooth';
      startInterval();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 1.5; // Adjusted scroll speed
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    startInterval();

    const handleMouseEnter = () => clearInterval(intervalId);
    const handleMouseLeaveAuto = () => {
      if (!isDown) startInterval();
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeaveAuto);
    scrollContainer.addEventListener('mousedown', handleMouseDown as any);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('mouseup', handleMouseUp);
    scrollContainer.addEventListener('mousemove', handleMouseMove as any);

    return () => {
      clearInterval(intervalId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeaveAuto);
      scrollContainer.removeEventListener('mousedown', handleMouseDown as any);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      scrollContainer.removeEventListener('mouseup', handleMouseUp);
      scrollContainer.removeEventListener('mousemove', handleMouseMove as any);
    };
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
  };

  const staggerContainer = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    viewport: { once: true, margin: "-100px" },
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0C0C0C] text-white font-sans selection:bg-[#D3AF37]/30 selection:text-white overflow-x-hidden">
      {/* Premium Border Effect from design */}
      <div className="fixed inset-0 border-[1px] border-[#D3AF37]/20 pointer-events-none z-50"></div>
      
      {/* HEADER */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#0C0C0C]/90 backdrop-blur-md py-4 shadow-xl border-b border-[#D3AF37]/10' : 'bg-gradient-to-b from-[#0a0a0a]/80 to-transparent py-6 border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <img 
              src="https://elitegrowthsales.com.br/wp-content/uploads/2026/04/logo-dourado.png" 
              alt="Elite Growth Sales Logo" 
              className="h-12 md:h-16 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button className="hidden md:flex py-2 px-6 text-sm">
              Agendar Diagnóstico
            </Button>
          </motion.div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[100svh] flex items-center pt-20 overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://elitegrowthsales.com.br/wp-content/uploads/2025/02/BG.png" 
            alt="Background" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Texture Overlay */}
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full z-0 opacity-40 md:opacity-100 pointer-events-none translate-x-1/4">
          <img 
            src="https://elitegrowthsales.com.br/wp-content/uploads/2025/02/Ellipse-9.svg" 
            alt="Texture" 
            className="w-full h-full object-contain" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-6xl font-light font-serif leading-[1.2] mb-8 text-white"
              >
                Escala e <span className="text-[#D3AF37] italic font-serif">Previsibilidade</span> nas Vendas através de um processo de vendas assertivo.
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
              >
                Aumente sua taxa de conversão e acelere o faturamento da sua empresa através da <strong className="text-white font-semibold">estruturação de processos comerciais</strong>, implementação do método de gestão comercial e treinamento de time.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Button className="w-full sm:w-auto px-8 py-4 !rounded-sm text-[11px] md:text-[11px] font-bold tracking-[0.1em]">
                  AGENDE UM DIAGNÓSTICO COMERCIAL
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Column: Character/Brand Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative hidden lg:flex justify-end items-center h-[650px]"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Floating Logo Badge centered */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="z-20"
                >
                  <div className="w-48 h-48 rounded-full border border-[#D3AF37]/30 bg-[#0C0C0C]/20 backdrop-blur-md flex items-center justify-center p-8 shadow-[0_0_50px_rgba(211,175,55,0.1)]">
                    <img 
                      src="https://elitegrowthsales.com.br/wp-content/uploads/2026/04/logo-dourado.png" 
                      alt="Badge Logo" 
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE DOR */}
      <section className="py-24 bg-[#0C0C0C] relative border-t border-[#D3AF37]/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#D3AF37]/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-light font-serif mb-6">Reconhece alguma dessas <span className="text-[#D3AF37] italic">situações?</span></h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            {[
              { icon: MessageSquare, text: "Lead entra, você atende — e some no WhatsApp sem resposta." },
              { icon: Briefcase, text: "Proposta vai, não volta. Nunca houve follow-up." },
              { icon: Users, text: "Cliente antigo que poderia comprar de novo? Esquecido." },
              { icon: TrendingUp, text: "O mês fecha abaixo do esperado e você não sabe exatamente por quê." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className="bg-[#111111] border border-[#D3AF37]/10 hover:border-[#D3AF37]/30 p-8 rounded-lg transition-all duration-300 group hover:-translate-y-2 flex gap-6 items-start shadow-2xl"
              >
                <div className="bg-[#D3AF37]/10 p-4 rounded-full text-[#D3AF37] group-hover:scale-110 group-hover:bg-[#D3AF37]/20 transition-all">
                  <item.icon className="w-6 h-6" />
                </div>
                <p className="text-lg text-gray-300 font-light pt-2 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeIn} className="text-center bg-[#161616] border border-[#D3AF37]/20 p-8 md:p-12 rounded-lg shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-light text-white mb-4 leading-tight">
                Isso não é falta de demanda. <span className="text-[#D3AF37] font-serif italic">É falta de estrutura comercial.</span>
              </h3>
              <p className="text-lg text-gray-400 font-light max-w-2xl mx-auto">
                Enquanto o comercial funciona no improviso, o crescimento depende da sorte. Quando há um método, você passa a controlar o resultado.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEÇÃO TRANSFORMAÇÃO */}
      <section className="pt-[46px] pb-24 bg-[#0a0a0a] relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeIn} className="mb-16">
            <h2 className="text-3xl md:text-5xl font-light font-serif max-w-2xl leading-tight">
              O que muda quando você tem um <span className="text-[#D3AF37] font-serif italic">comercial estruturado</span>
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { title: "Faturamento previsível", desc: "Você sabe quais ações geram receita e deixa de depender de mês bom ou indicação de última hora.", icon: TrendingUp },
              { title: "Mais vendas da base", desc: "Leads antigos, clientes inativos, seguidores e oportunidades paradas passam a ser trabalhados com método.", icon: Users },
              { title: "Ticket médio maior", desc: "Sua venda ganha mais percepção de valor, melhor condução e mais capacidade de fechar soluções completas.", icon: Target },
              { title: "Time seguro para vender", desc: "Quem fala com o cliente sabe como conduzir, responder objeções, fazer follow-up e gerar confiança.", icon: Shield },
              { title: "Clareza sobre travas", desc: "Você enxerga se o problema está no atendimento, na conversão, no follow-up, na oferta ou na gestão.", icon: SearchIcon },
              { title: "Crescimento com controle", desc: "O comercial para de ser uma sequência de tentativas soltas e passa a funcionar com indicadores e decisão.", icon: BarChart3 }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className="bg-[#111111] border border-[#D3AF37]/10 p-8 rounded-sm hover:bg-[#161616] transition-colors group"
              >
                <div className="mb-6 flex space-x-4 items-center">
                   <div className="h-10 w-10 flex text-[#D3AF37] items-center justify-center rounded-full bg-[#D3AF37]/5 group-hover:bg-[#D3AF37]/10 transition-colors">
                      <item.icon className="absolute w-5 h-5"/>
                   </div>
                   <h3 className="text-sm tracking-wider uppercase font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-gray-400 font-light leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO MÉTODO — OS 3 PILARES */}
      <section className="pt-[80px] pb-24 ml-[-5px] mt-[-63px] bg-[#0C0C0C] relative border-y border-[#D3AF37]/10 overflow-hidden">
         {/* Subtle background element */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D3AF37]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#D3AF37] text-[#D3AF37] drop-shadow-[0_0_10px_rgba(211,175,55,0.4)]" />
              ))}
            </div>
            <h2 className="text-3xl md:text-5xl font-light font-serif mb-6">Como aceleramos o seu <span className="text-[#D3AF37] font-serif italic">faturamento</span></h2>
            <p className="text-lg text-gray-400 font-light leading-relaxed">
              A <strong className="text-white font-normal uppercase tracking-wider text-sm">Arquitetura Comercial da EGS</strong> é um programa de 90 a 180 dias para sua empresa vender mais, vender mais caro, vender mais vezes para o mesmo cliente — e ter previsibilidade no faturamento.
            </p>
          </motion.div>



          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {[
              {
                number: "01",
                title: "Ativação de Receita Oculta",
                text: "Mapeamos oportunidades que já existem dentro da sua operação: leads antigos, clientes inativos, propostas não fechadas, seguidores e indicações. O objetivo é transformar base parada em faturamento rápido e alto — antes de investir mais em aquisição."
              },
              {
                number: "02",
                title: "Conversão de Alto Ticket",
                text: "Treinamos o time para conduzir conversas com mais intenção, empatia e estratégia. Scripts, matriz de objeções, condução para WhatsApp, reunião e fechamento de vendas de alto valor. Ajustando oferta e tendo método de vendas, conseguimos aumentar o ticket."
              },
              {
                number: "03",
                title: "Governança Comercial",
                text: "CRM, indicadores, metas, rotina de gestão e playbook comercial. Para que a liderança enxergue gargalos antes que o faturamento desabe e tome decisões com base em dados, não em intuição. Cultura, gestão e processos para ter previsibilidade."
              }
            ].map((pilar, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className="bg-[#111111] border border-[#D3AF37]/10 hover:border-[#D3AF37]/40 p-10 rounded-sm relative transition-all duration-500 group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 text-8xl font-serif font-bold text-white/5 group-hover:text-[#D3AF37]/5 -translate-y-8 translate-x-4 transition-colors">
                  {pilar.number}
                </div>
                <div className="relative z-10">
                  <div className="text-[#D3AF37] font-mono mb-2 text-[10px]">PILAR {pilar.number}</div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6 pr-8">{pilar.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed text-sm">{pilar.text}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D3AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO PROVA SOCIAL */}
      <section className="mt-[-70px] py-24 bg-[#0a0a0a] relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D3AF37]/5 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-[#D3AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4">Depoimentos</h2>
            <h2 className="text-3xl md:text-5xl font-light font-serif mb-6">
              Resultados de quem parou de <span className="text-[#D3AF37] italic font-serif">vender no escuro.</span>
            </h2>
          </motion.div>

          {/* Testimonials Carousel */}
          <div className="relative group/carousel">
            <motion.div 
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-12 px-4 -mx-4 cursor-grab active:cursor-grabbing"
              style={{ scrollBehavior: 'smooth' }}
            >
              {[
                {
                  name: "Dra. Aline Pinho",
                  ig: "@draalinepinhoendocrino",
                  type: "Clínica Médica",
                  quote: "Mais que dobramos nosso faturamento em 180 Dias de aceleração comercial. (+1.4 MILHÕES)",
                  img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400&h=400"
                },
                {
                  name: "Thiago Rosa",
                  ig: "@othiago.rosa",
                  type: "Mentor de Médico",
                  quote: "Ao longo do trabalho com o Efra, faturamos ‘dois 7 Dígitos’ (+ 2 MILHÕES) apenas com o time comercial no perpétuo.",
                  img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400"
                },
                {
                  name: "Rodrigo Mendanha",
                  ig: "@rodrigomendanhanutri",
                  type: "Nutricionista",
                  quote: "Depois da chegada do Efraym em minha empresa, a gente alavancou exponencialmente os nossos resultados, crescemos não apenas em faturamento, mas em Lucro.",
                  img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400"
                },
                {
                  name: "Lari Colebrusco",
                  ig: "@laricolebrusco",
                  type: "Hipnoterapeuta",
                  quote: "Durante a aceleração comercial a empresa bateu +R$ 1.3 MILHÕES em faturamento.",
                  img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400"
                }
              ].map((t, i) => (
                <motion.div 
                  key={i}
                  variants={fadeIn}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-full md:w-[600px] snap-center bg-[#111111] border border-[#D3AF37]/10 p-8 md:p-12 rounded-sm hover:border-[#D3AF37]/30 transition-all duration-500 group shadow-2xl relative select-none"
                >
                  <div className="absolute top-8 right-12 text-[#D3AF37]/10">
                    <MessageSquare size={60} />
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-8 items-start md:items-center h-full">
                    <div className="w-40 h-40 md:w-56 md:h-56 rounded-sm border border-[#D3AF37]/20 p-1 flex-shrink-0 group-hover:border-[#D3AF37]/50 transition-all duration-500 overflow-hidden bg-[#0a0a0a]">
                      <img 
                        src={t.img} 
                        alt={t.name}
                        draggable="false"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100 pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="mb-6">
                        <h4 className="text-white font-bold text-2xl mb-1 tracking-tight">{t.name}</h4>
                        <p className="text-[#D3AF37] text-sm font-medium tracking-wide mb-1">{t.ig}</p>
                        <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">{t.type}</p>
                      </div>
                      
                      <div className="relative">
                        <span className="absolute -left-4 -top-2 text-[#D3AF37] text-4xl font-serif opacity-30 select-none">&ldquo;</span>
                        <blockquote className="text-gray-300 italic font-light text-lg md:text-xl leading-relaxed">
                          {t.quote}&rdquo;
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Scroll indicators hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {[0, 1, 2, 3].map((dot) => (
                <div key={dot} className="w-1.5 h-1.5 rounded-full bg-[#D3AF37]/20"></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA INTERMEDIÁRIO */}
      <section className="py-32 bg-[#0C0C0C] relative overflow-hidden" id="diagnostico">
        <div className="absolute inset-0 bg-[url('https://elitegrowthsales.com.br/wp-content/uploads/2026/04/Hero-desktop.png')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0C0C] via-transparent to-[#0C0C0C] opacity-100"></div>
        
        <div className="max-w-4xl mx-auto px-10 py-16 md:py-24 relative z-10 text-center bg-gradient-to-br from-[#BF953F] via-[#FCF6BA] via-[#D4AF37] via-[#FBF5B7] to-[#AA771C] rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.5)] border border-[#D3AF37]/50">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0C0C0C] mb-8 leading-tight">
              Descubra onde sua empresa está perdendo faturamento.
            </h2>
            <p className="text-xl text-[#0C0C0C]/80 font-medium mb-10 max-w-3xl mx-auto leading-relaxed">
              Agende um Diagnóstico Comercial com nossos especialistas. Em uma conversa direta, analisamos onde as vendas estão travando — atendimento, conversão, follow-up, oferta, CRM ou gestão — e mostramos quais oportunidades podem virar faturamento imediato.
            </p>
            <Button variant="secondary" className="px-10 py-5">
              Agendar Diagnóstico Comercial
            </Button>
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO CREDENCIAL / AUTORIDADE */}
      <section className="py-24 bg-[#0C0C0C] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              style={{ y: useTransform(scrollYProgress, [0.6, 0.8], [0, -100]) }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1 mt-[50px]"
            >
              <div className="relative rounded-sm overflow-hidden aspect-[4/5] bg-[#111111] border border-[#D3AF37]/10">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#D3AF37]/20 to-transparent mix-blend-overlay z-10"></div>
                <img 
                  src="https://elitegrowthsales.com.br/wp-content/uploads/2025/02/Efraym_03-1-1.png" 
                  alt="Efraym Faria - Fundador" 
                  className="w-full h-full object-cover object-center relative z-0 grayscale hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-[#0C0C0C]/90 via-[#0C0C0C]/50 to-transparent z-20">
                  <div className="text-2xl font-bold text-white mb-1 uppercase tracking-widest text-lg">Efraym Faria</div>
                  <div className="text-[#D3AF37] font-medium text-[10px] tracking-widest uppercase">Fundador & Especialista</div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-[#D3AF37]/40 pointer-events-none"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-[#D3AF37]/40 pointer-events-none"></div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <img 
                src="https://elitegrowthsales.com.br/wp-content/uploads/2026/04/logo-dourado.png" 
                alt="Elite Growth Sales Logo" 
                className="h-16 md:h-24 w-auto object-contain mb-8"
                referrerPolicy="no-referrer"
              />
              <h2 className="text-3xl md:text-5xl font-light font-serif mb-8">Quem está por trás da <span className="text-[#D3AF37] italic font-serif">EGS</span></h2>
              
              <div className="space-y-6 text-sm text-gray-400 font-light leading-relaxed">
                <p>
                  A <strong className="text-white font-normal">Elite Growth Sales</strong> foi fundada por Efraym Faria, especialista em inteligência comercial, vendas consultivas de alto valor e aceleração de clínicas, experts, mentores e empresas que dependem de relacionamento para vender.
                </p>
                <p>
                  Nos últimos 4 anos, Efraym e a EGS geraram <strong className="text-white font-normal">mais de R$40 milhões em faturamento</strong> para clientes, estruturando processos comerciais, treinando times, ativando bases de oportunidades e implementando inteligência de vendas para transformar demanda em receita real.
                </p>
                <p>
                  A EGS atua dentro da operação para identificar onde o faturamento está travando, corrigir gargalos comerciais e construir uma estrutura capaz de vender mais, vender por um valor maior e gerar previsibilidade.
                </p>
              </div>


            </motion.div>
          </div>
        </div>
      </section>

      {/* SEÇÃO FAQ */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6 mt-[-80px]">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light font-serif">Perguntas <span className="text-[#D3AF37] font-serif italic">frequentes</span></h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { 
                q: "Qual a duração do programa?", 
                a: "De 90 a 180 dias, conforme o nível de maturidade e crescimento da empresa. O objetivo é estruturar um comercial capaz de gerar mais faturamento, ticket maior e previsibilidade." 
              },
              { 
                q: "Preciso ter um time comercial pronto?", 
                a: "Não. Atuamos tanto com empresas que já têm time quanto com aquelas que ainda precisam criar a estrutura. O ponto de partida é onde você está." 
              },
              { 
                q: "A EGS faz tráfego pago?", 
                a: "Não somos agência de tráfego. Nosso foco é fazer sua empresa converter melhor as oportunidades que já existem — leads, audiência, base de clientes e indicações." 
              },
              { 
                q: "Para que tipo de empresa a EGS é indicada?", 
                a: "Clínicas médicas, estéticas e odontológicas, hospitais veterinários, terapeutas, mentores, experts, infoprodutores e empresas com venda consultiva — qualquer negócio onde venda depende de confiança e condução." 
              },
              { 
                q: "O que acontece no Diagnóstico Comercial?", 
                a: "Analisamos onde sua empresa está perdendo vendas: atendimento, base de clientes, oportunidades paradas, follow-up, CRM, oferta, conversão e indicadores. Ao final, você sabe onde estão as travas e quais ações têm maior potencial de resultado." 
              },
              { 
                q: "O projeto tem remuneração variável por resultado?", 
                a: "Em alguns projetos, sim. Parte do investimento pode ser estruturada de forma variável, condicionada ao atingimento das metas definidas no início." 
              }
            ].map((faq, i) => (
              <FaqItem key={i} question={faq.q} answer={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-32 bg-[#0C0C0C] relative border-t border-[#D3AF37]/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#D3AF37]/5 via-[#0C0C0C] to-[#0C0C0C]"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-light font-serif text-white mb-8 leading-[1.1] mt-[-70px]">
              Pare de depender de <span className="text-[#D3AF37] italic font-serif">sorte</span> para vender. Estruture um comercial que cresce com método.
            </h2>
            <p className="text-xl text-gray-400 font-light mb-12 max-w-2xl mx-auto">
              Agende agora um Diagnóstico Comercial e descubra onde sua empresa pode destravar faturamento nos próximos 90 dias.
            </p>
            <Button className="text-lg py-5 px-12">
              Agendar Diagnóstico Comercial Gratuito
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 bg-[#0a0a0a] border-t border-[#D3AF37]/10">
        <div className="max-w-7xl mx-auto px-6 text-center md:flex justify-between items-center text-sm font-light text-gray-500">
          <div className="mb-4 md:mb-0 font-bold tracking-widest text-[#D3AF37]">
            ELITE GROWTH SALES
          </div>
          <div>
            &copy; {new Date().getFullYear()} Elite Growth Sales. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* BOTÃO FLUTUANTE WHATSAPP */}
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#BF953F] via-[#FCF6BA] via-[#D4AF37] via-[#FBF5B7] to-[#AA771C] rounded-full flex items-center justify-center text-[#0C0C0C] shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-[#D4AF37]/30 hover:brightness-110 transition-all overflow-hidden"
        title="Fale conosco no WhatsApp"
      >
        <motion.div 
          animate={{ x: ['-200%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
        />
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8 relative z-10" />
      </motion.a>
    </div>
  );
}

function FaqItem({ question, answer, index }: { question: string, answer: string, index: number, key?: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border-b border-[#D3AF37]/10"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-6 text-left focus:outline-none group"
      >
        <span className={`text-lg transition-colors ${isOpen ? 'text-[#D3AF37]' : 'text-gray-300 group-hover:text-white'}`}>
          {question}
        </span>
        <div className={`ml-4 w-8 h-8 rounded-sm border flex items-center justify-center transition-all ${isOpen ? 'bg-[#D3AF37]/10 border-[#D3AF37]/30 text-[#D3AF37] rotate-180' : 'border-[#D3AF37]/10 bg-[#111111] text-gray-400 group-hover:bg-[#161616]'}`}>
          <ChevronDown className="w-4 h-4 transition-transform" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 font-light leading-relaxed pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
