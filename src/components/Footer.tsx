import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Linkedin, Facebook, Instagram, ArrowRight, Sparkles, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const quickLinks = [
    { label: 'För Kandidater', href: '/for-candidates' },
    { label: 'För Kunder', href: '/partner' },
    { label: 'Jobb', href: '/jobs' },
    { label: 'Om Oss', href: '/about' }
  ];

  const legalLinks = [
    { label: 'Integritetspolicy', href: '#privacy' },
    { label: 'Användarvillkor', href: '#terms' },
    { label: 'Cookie Policy', href: '#cookies' },
    { label: 'GDPR Efterlevnad', href: '#gdpr' }
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-600' },
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-700' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 overflow-hidden">
      {/* Sophisticated Background System */}
      <div className="absolute inset-0">
        {/* Primary Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-slate-900/90 to-gray-800/95" />
        
        {/* Dynamic Gradient Orbs */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full opacity-[0.06] blur-3xl transition-all duration-1000"
          style={{
            background: `radial-gradient(circle, #3B82F6 0%, transparent 70%)`,
            left: `${mousePosition.x * 0.3}%`,
            top: `${mousePosition.y * 0.2}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.04] blur-3xl transition-all duration-1000 delay-500"
          style={{
            background: `radial-gradient(circle, #10B981 0%, transparent 70%)`,
            right: `${mousePosition.x * 0.2}%`,
            bottom: `${mousePosition.y * 0.3}%`,
            transform: 'translate(50%, 50%)',
          }}
        />

        {/* Elegant Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          }}
        />

        {/* Floating Accent Elements */}
        <div className="absolute top-20 right-32 w-2 h-2 bg-blue-400/20 rounded-full animate-pulse" />
        <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-emerald-400/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-purple-400/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Main Footer Content */}
        <div className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Brand & Newsletter Section */}
            <div className="lg:col-span-5 space-y-8">
              {/* Brand */}
              <div className="space-y-6">
                {/* Logo & Brand */}
                <div className="flex items-center space-x-4 group">
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-all duration-300">
                    <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Sparkles size={8} className="absolute top-1 right-1 text-white/60 animate-pulse" />
                      <Sparkles size={6} className="absolute bottom-1 left-1 text-white/40 animate-pulse" style={{ animationDelay: '300ms' }} />
                    </div>
                    <img
                      src="https://i.ibb.co/Rkq4d57H/Workplan-ABlogo1.png"
                      alt="Workplan Logo"
                      className="relative z-10 w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-light text-white tracking-tight">Workplan</h3>
                  </div>
                </div>

                {/* Mission Statement */}
                <p className="text-lg text-white/70 font-light leading-relaxed max-w-md" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Kopplar samman exceptionell talang med visionära företag genom precision, expertis och orubbligt engagemang för excellens.
                </p>
              </div>
            </div>

            {/* Navigation & Contact */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Quick Links */}
              <div className="space-y-6">
                <h4 className="text-lg font-medium text-white flex items-center space-x-2" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: '400' }}>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                  <span>Snabblänkar</span>
                </h4>
                <nav className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <a
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(link.href);
                      }}
                      className="
                        block text-white/70 hover:text-white font-light
                        transition-all duration-300 hover:translate-x-2
                        relative group cursor-pointer
                      "
                      onMouseEnter={() => setIsHovered(`quick-${index}`)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <div className={`
                        absolute left-0 top-1/2 transform -translate-y-1/2 w-0 h-4 bg-blue-500 rounded-r-full
                        transition-all duration-300
                        ${isHovered === `quick-${index}` ? 'w-1' : ''}
                      `} />
                      <span className="relative z-10">{link.label}</span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Legal */}
              <div className="space-y-6">
                <h4 className="text-lg font-medium text-white flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '500ms' }} />
                  <span>Juridiskt</span>
                </h4>
                <nav className="space-y-3">
                  {legalLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="
                        block text-white/70 hover:text-white font-light
                        transition-all duration-300 hover:translate-x-2
                        relative group
                      "
                      onMouseEnter={() => setIsHovered(`legal-${index}`)}
                      onMouseLeave={() => setIsHovered(null)}
                    >
                      <div className={`
                        absolute left-0 top-1/2 transform -translate-y-1/2 w-0 h-4 bg-emerald-500 rounded-r-full
                        transition-all duration-300
                        ${isHovered === `legal-${index}` ? 'w-1' : ''}
                      `} />
                      <span className="relative z-10">{link.label}</span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Contact */}
              <div className="space-y-6">
                <h4 className="text-lg font-medium text-white flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1000ms' }} />
                  <span>Kontakt</span>
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 group">
                    <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center mt-0.5 group-hover:bg-white/20 transition-colors">
                      <MapPin size={14} className="text-white/80" />
                    </div>
                    <div className="text-white/70 font-light">
                      <p>123 Business Street</p>
                      <p>Stockholm, 111 22</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 group">
                    <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Phone size={14} className="text-white/80" />
                    </div>
                    <span className="text-white/70 font-light">+46 8 123 456 78</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 group">
                    <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <Mail size={14} className="text-white/80" />
                    </div>
                    <span className="text-white/70 font-light">hello@talentbridge.se</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            
            {/* Copyright */}
            <div className="flex items-center space-x-4">
              <p className="text-white/60 font-light">
                © 2025 TalentBridge. Alla rättigheter förbehållna.
              </p>
              <div className="hidden lg:flex items-center space-x-2">
                <div className="w-1 h-1 bg-white/30 rounded-full" />
                <span className="text-white/40 text-sm font-light">Skapad med precision</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-white/60 text-sm font-light mr-2" style={{ fontFamily: 'Inter, sans-serif' }}>Följ oss</span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={`
                    group relative w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm
                    flex items-center justify-center
                    border border-white/20 ${social.color}
                    transition-all duration-300 hover:scale-110 hover:border-white/40
                    overflow-hidden
                  `}
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <social.icon size={16} className="relative z-10 text-white/80 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Bottom Accent */}
        <div className="pb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="flex space-x-2">
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
              <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '600ms' }} />
            </div>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;