import React, { useState } from 'react';
import { Mail, Send, Plus, Minus } from 'lucide-react';
import { faqItems } from '../data/mockData';

const SupportPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <>
      {/* Header */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Support Center</h1>
            <p className="text-xl text-primary-100">
              Get help with your account, signals, or any other questions you might have.
            </p>
          </div>
        </div>
      </section>
      
      {/* Quick Contact Info */}
      <section className="py-12 bg-gray-900">
        <div className="container-custom">
          <div className="card p-6 flex flex-col items-center text-center max-w-xl mx-auto bg-gray-800">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4">
              <Mail size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white">Email Support</h3>
            <p className="text-gray-400 mb-3">Our team typically responds within 24 hours</p>
            <a href="mailto:support@cryptosignals.com" className="text-primary-600 font-medium hover:text-primary-700">
              support@cryptosignals.com
            </a>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="section bg-gray-900" id="faq">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-400">
              Find answers to the most common questions about our crypto signals service.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div key={index} className="card overflow-hidden bg-gray-800">
                  <button
                    className="w-full px-6 py-4 flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className="text-lg font-semibold text-left text-white">{faq.question}</h3>
                    {openFaqIndex === index ? (
                      <Minus size={20} className="text-gray-500" />
                    ) : (
                      <Plus size={20} className="text-gray-500" />
                    )}
                  </button>
                  
                  {openFaqIndex === index && (
                    <div className="px-6 pb-4 animate-fade-in">
                      <p className="text-gray-400">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Form */}
      <section className="section bg-gray-900" id="contact">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Get in Touch</h2>
            <p className="text-lg text-gray-400">
              Can't find the answer you're looking for? Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>
          
          <div className="max-w-xl mx-auto">
            {submitSuccess ? (
              <div className="card p-8 text-center animate-fade-in bg-gray-800">
                <div className="w-16 h-16 mx-auto bg-success-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-8 w-8 text-success-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Message Sent Successfully!</h3>
                <p className="text-gray-400">Thank you for reaching out. Our support team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-6 md:p-8 bg-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="label text-gray-400">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input bg-gray-700 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="label text-gray-400">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input bg-gray-700 text-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="label text-gray-400">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="input bg-gray-700 text-white"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="account">Account Issue</option>
                    <option value="billing">Billing Question</option>
                    <option value="signals">Signals Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="label text-gray-400">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="input bg-gray-700 text-white"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-primary flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      
      {/* Terms and Privacy */}
      <section className="py-12 bg-gray-900" id="terms">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Terms of Service</h3>
              <p className="text-gray-400 mb-4">
                By using our crypto signals service, you agree to our terms of service.
                These terms outline your rights and responsibilities as a user of our platform.
              </p>
              <button className="btn-outline">
                Read Terms of Service
              </button>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Privacy Policy</h3>
              <p className="text-gray-400 mb-4">
                We take your privacy seriously. Our privacy policy explains how we collect, use,
                and protect your personal information.
              </p>
              <button className="btn-outline">
                Read Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SupportPage;
