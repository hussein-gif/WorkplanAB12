import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const Insights = () => {
  const posts = [
    {
      title: "Framtiden för Distansarbete: Trender för 2025",
      excerpt: "Upptäck hur distansarbete fortsätter att utvecklas och vad det betyder för både arbetsgivare och arbetssökande under det kommande året.",
      category: "Arbetsplatstrender",
      readTime: "5 min läsning",
      date: "15 dec 2024",
      image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg"
    },
    {
      title: "Bygga Högpresterande Team inom Tech",
      excerpt: "Lär dig de nyckelstrategier som framgångsrika företag använder för att attrahera, anställa och behålla toppteknisk talang på en konkurrensutsatt marknad.",
      category: "Rekryteringstips",
      readTime: "7 min läsning",
      date: "12 dec 2024",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
    },
    {
      title: "Lönebenchmarking Guide för 2025",
      excerpt: "Vår omfattande analys av lönetrender inom olika branscher för att hjälpa dig fatta välgrundade kompensationsbeslut.",
      category: "Marknadsinsikter",
      readTime: "12 min läsning",
      date: "10 dec 2024",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
    }
  ];

  return (
    <section id="insights" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: '400' }}>
            Insikter & Resurser
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Håll dig uppdaterad med de senaste branschtränderna, rekryteringsinsikter och karriärråd
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article 
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: '400' }}>
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center space-x-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <Calendar size={12} />
                      <span>{post.date}</span>
                    </span>
                    <span className="flex items-center space-x-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2" style={{ fontFamily: 'Zen Kaku Gothic Antique, sans-serif', fontWeight: '400' }}>
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {post.excerpt}
                </p>
                
                <button className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group">
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500' }}>Läs Mer</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;