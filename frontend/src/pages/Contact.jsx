import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: ['support@examfusion.com', 'info@examfusion.com'],
      description: 'We typically respond within 24 hours'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 98765 43210', '+91 98765 43211'],
      description: 'Mon-Fri 9AM-6PM IST'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ['Mumbai, Maharashtra', 'India'],
      description: 'Head Office'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 9AM-6PM', 'Saturday: 9AM-2PM'],
      description: 'Sunday: Closed'
    }
  ];

  const supportCategories = [
    {
      title: 'Technical Support',
      description: 'Help with platform issues, login problems, or technical difficulties',
      email: 'tech@examfusion.com',
      response: 'Within 2 hours'
    },
    {
      title: 'Course Inquiries',
      description: 'Questions about course content, enrollment, or curriculum',
      email: 'courses@examfusion.com',
      response: 'Within 4 hours'
    },
    {
      title: 'Billing & Payments',
      description: 'Payment issues, refund requests, or billing questions',
      email: 'billing@examfusion.com',
      response: 'Within 6 hours'
    },
    {
      title: 'General Inquiries',
      description: 'General questions about our services or company',
      email: 'info@examfusion.com',
      response: 'Within 24 hours'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-primary text-white section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card text-center p-6"
              >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{info.title}</h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 dark:text-gray-300">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
              
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg flex items-center"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-green-800 dark:text-green-200">
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="course">Course Information</option>
                      <option value="billing">Billing & Payment</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="input-field resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Map & Office Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Office</h2>
              
              {/* Map Placeholder */}
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 mb-6 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 dark:text-gray-400">Interactive Map</p>
                  <p className="text-sm text-gray-400">Mumbai, Maharashtra, India</p>
                </div>
              </div>

              {/* Office Details */}
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4">EXAMFUSION Headquarters</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-primary-600 mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-600 dark:text-gray-300">
                        Plot No. 123, Tech Park<br />
                        Andheri East, Mumbai<br />
                        Maharashtra 400069, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-primary-600 mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600 dark:text-gray-300">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-primary-600 mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600 dark:text-gray-300">info@examfusion.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-primary-600 mr-3 mt-1" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-gray-600 dark:text-gray-300">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 9:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="bg-white dark:bg-gray-800 section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Need Specific Help?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Contact the right team for faster and more accurate assistance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">{category.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {category.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-primary-600">
                    {category.email}
                  </p>
                  <p className="text-xs text-gray-500">
                    Response: {category.response}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Find quick answers to common questions
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How can I enroll in a course?",
                answer: "You can enroll in any course by visiting our courses page, selecting your desired course, and clicking the 'Enroll Now' button. You'll be guided through the payment process and will receive immediate access to the course content."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, debit cards, net banking, UPI, and digital wallets like Paytm, Google Pay, and PhonePe. We also offer EMI options for courses above ₹10,000."
              },
              {
                question: "Can I get a refund if I'm not satisfied?",
                answer: "Yes, we offer a 7-day money-back guarantee. If you're not satisfied with the course within 7 days of enrollment, you can request a full refund. No questions asked."
              },
              {
                question: "Do you provide certificates upon completion?",
                answer: "Yes, all our courses provide certificates upon successful completion. These certificates are recognized by industry professionals and can be shared on your LinkedIn profile."
              },
              {
                question: "Is there a mobile app available?",
                answer: "Yes, we have mobile apps available for both iOS and Android devices. You can download them from the App Store or Google Play Store to access your courses on the go."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card p-6"
              >
                <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary text-white section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Our support team is here to help you 24/7. Don't hesitate to reach out!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919876543210" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
              <a href="mailto:support@examfusion.com" className="btn-secondary border-white text-white hover:bg-white hover:text-primary-600">
                <Mail className="w-5 h-5 mr-2" />
                Email Support
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
