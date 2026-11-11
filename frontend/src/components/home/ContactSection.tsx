import React, { useState } from 'react';
import { Clock, Mail, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Connected With Us, <br />
              We're Here to Help
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md">
              Want to share? Contact us directly via below. We'll respond as soon as possible.
            </p>

            <div className="space-y-6 pt-4">
              {/* Working Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Working Hours</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Monday – Friday: 09:00 – 17:00 WIB<br />
                    Saturday: 09:00 – 13:00 WIB<br />
                    Sunday & Public Holidays: Closed
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Contact</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    alumni@youruniversity.ac.id<br />
                    +62 812-3456-7890 (WhatsApp)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Card Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-7 sm:p-8 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 tracking-tight mb-6">
              Send us a message
            </h3>

            {submitted ? (
              <div className="p-8 text-center space-y-2 rounded-xl bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">Pesan Berhasil Terkirim</h4>
                <p className="text-xs text-emerald-700">
                  Terima kasih, tim sekretariat alumni akan segera menghubungi Anda.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    id="contact-name"
                    aria-label="Full name"
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <input
                    id="contact-phone"
                    aria-label="+62 Phone number"
                    type="text"
                    placeholder="+62"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <input
                    id="contact-email"
                    aria-label="Your Email"
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <textarea
                    id="contact-message"
                    aria-label="Type your message here"
                    placeholder="Type your message here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors placeholder:text-slate-400 resize-y"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-7 py-2.5 text-xs font-semibold transition-colors shadow-xs cursor-pointer"
                  >
                    Submit Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
