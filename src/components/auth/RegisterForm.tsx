import React, { useState } from 'react';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface RegisterFormProps {
  onToggleForm: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onToggleForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  
  const { register, isLoading, error } = useAuth();
  
  const validateForm = () => {
    setFormError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setFormError('All fields are required.');
      return false;
    }
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return false;
    }
    
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long.');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await register(name, email, password);
    } catch (err) {
      console.error('Registration error:', err);
    }
  };
  
  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Error Display */}
      {(formError || error) && (
        <div className="bg-danger-50 border-l-4 border-danger-500 p-4 animate-fade-in">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-danger-500 mr-2 flex-shrink-0" />
            <p className="text-sm text-danger-700">
              {formError || error}
            </p>
          </div>
        </div>
      )}
      
      {/* Name */}
      <div>
        <label htmlFor="name" className="label">
          Full Name
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input pl-10"
            placeholder="John Doe"
          />
        </div>
      </div>
      
      {/* Email */}
      <div>
        <label htmlFor="email" className="label">
          Email address
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input pl-10"
            placeholder="name@example.com"
          />
        </div>
      </div>
      
      {/* Password */}
      <div>
        <label htmlFor="password" className="label">
          Password
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>
      
      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="label">
          Confirm Password
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input pl-10"
          />
        </div>
      </div>
      
      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className={`btn-primary w-full py-2.5 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
          ) : (
            <span>Create account</span>
          )}
        </button>
      </div>
      
      {/* Toggle to Login Form */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onToggleForm}
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Sign in
          </button>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
