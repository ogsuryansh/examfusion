import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle,
  CheckCircle,
  User,
  Chrome,
  Smartphone
} from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // For demo purposes, always succeed
      navigate('/dashboard');
    }, 2000);
  };

  const handleSocialRegister = (provider) => {
    // Simulate social registration
    console.log(`Registering with ${provider}`);
  };

  const passwordStrength = () => {
    if (!formData.password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    if (formData.password.length >= 8) score++;
    if (/[a-z]/.test(formData.password)) score++;
    if (/[A-Z]/.test(formData.password)) score++;
    if (/\d/.test(formData.password)) score++;
    if (/[^A-Za-z0-9]/.test(formData.password)) score++;

    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['red', 'orange', 'yellow', 'lightgreen', 'green'];
    
    return {
      score: Math.min(score, 4),
      label: labels[Math.min(score - 1, 4)],
      color: colors[Math.min(score - 1, 4)]
    };
  };

  const strength = passwordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="form-container"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-3xl font-bold text-gradient">EXAMFUSION</span>
            </Link>
            
            <h2 className="text-3xl font-bold text-accessible mb-2">
              Create your account
            </h2>
            <p className="text-accessible-muted">
              Start your learning journey with EXAMFUSION
            </p>
          </div>

          {/* Social Registration Buttons */}
          <div className="space-y-3 mb-8">
            <button
              onClick={() => handleSocialRegister('google')}
              className="social-btn"
            >
              <Chrome className="w-5 h-5 mr-3" />
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="form-divider">
            <div className="line"></div>
            <div className="text">Or register with email</div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`input-field pl-10 ${errors.firstName ? 'error' : ''}`}
                    placeholder="First name"
                  />
                  {errors.firstName && (
                    <div className="form-error">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.firstName}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`input-field pl-10 ${errors.lastName ? 'error' : ''}`}
                    placeholder="Last name"
                  />
                  {errors.lastName && (
                    <div className="form-error">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.lastName}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`input-field pl-10 ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <div className="form-error">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`input-field pl-10 pr-10 ${errors.password ? 'error' : ''}`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {errors.password && (
                  <div className="form-error">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.password}
                  </div>
                )}
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div 
                        className={`strength-fill ${strength.color === 'red' ? 'bg-red-500' : strength.color === 'orange' ? 'bg-orange-500' : strength.color === 'yellow' ? 'bg-yellow-500' : strength.color === 'lightgreen' ? 'bg-green-400' : 'bg-green-500'}`}
                        style={{ width: `${(strength.score + 1) * 20}%` }}
                      ></div>
                    </div>
                    <div className={`strength-text ${strength.color === 'red' ? 'text-red-600 dark:text-red-400' : strength.color === 'orange' ? 'text-orange-600 dark:text-orange-400' : strength.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' : strength.color === 'lightgreen' ? 'text-green-600 dark:text-green-400' : 'text-green-600 dark:text-green-400'}`}>
                      {strength.label}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`input-field pl-10 pr-10 ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {errors.confirmPassword && (
                  <div className="form-error">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="form-group">
              <div className="flex items-start">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="form-checkbox mt-1"
                />
                <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-accessible-secondary">
                  I agree to the{' '}
                  <Link
                    to="/terms"
                    className="font-medium text-primary hover:text-primary-700 transition-colors duration-300"
                  >
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link
                    to="/privacy"
                    className="font-medium text-primary hover:text-primary-700 transition-colors duration-300"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeToTerms && (
                <div className="form-error">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.agreeToTerms}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center py-3 text-base font-semibold"
            >
              {isSubmitting ? (
                <>
                  <div className="loading-spinner mr-2"></div>
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-accessible-muted">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-primary hover:text-primary-700 transition-colors duration-300"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
