import React from 'react';
import { Quote, Star, ArrowRight } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "TalentBridge found me the perfect role within just two weeks. Their team really understood what I was looking for and matched me with a company that aligned with my values and career goals.",
      name: "Sarah Johnson",
      role: "Senior Developer",
      company: "TechFlow",
      rating: 5
    },
    {
      quote: "We've been working with TalentBridge for over three years. They consistently deliver high-quality candidates and have become an invaluable partner in our growth journey.",
      name: "Michael Chen",
      role: "HR Director",
      company: "InnovateCorp",
      rating: 5
    },
    {
      quote: "The level of support and guidance I received throughout the interview process was exceptional. TalentBridge didn't just find me a job—they helped advance my entire career.",
      name: "Emma Williams",
      role: "Marketing Manager",
      company: "GrowthLab",
      rating: 5
    },
    {
      quote: "Their understanding of the healthcare sector is outstanding. They helped us fill critical positions quickly without compromising on quality. Highly recommended.",
      name: "Dr. James Porter",
      role: "Medical Director",
      company: "HealthFirst",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from candidates and clients who've achieved their goals with TalentBridge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <Quote className="text-blue-600 mr-2" size={24} />
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors group">
            <span>Read Full Case Studies</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;