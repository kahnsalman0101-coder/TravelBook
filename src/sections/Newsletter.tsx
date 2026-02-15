import { useState, useEffect, useRef } from 'react';
import { Mail, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setStatus('success');
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-custom relative z-10">
        <div 
          ref={sectionRef}
          className="max-w-4xl mx-auto opacity-0 translate-y-8 [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0 transition-all duration-700"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm mb-4">
                <Mail className="w-4 h-4" />
                Newsletter
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join our newsletter
              </h2>
              <p className="text-white/80 text-lg">
                Get the latest deals and travel updates delivered directly to your inbox. 
                Subscribe now and never miss an offer!
              </p>
            </div>

            {/* Form */}
            <div>
              {status === 'success' ? (
                <div className="bg-white rounded-2xl p-8 text-center animate-scale-in">
                  <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-dark mb-2">Thank You!</h3>
                  <p className="text-gray-600">You've successfully subscribed to our newsletter.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-dark placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          required
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-xl transition-all"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Subscribe Now
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By subscribing, you agree to our Privacy Policy and consent to receive updates.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
