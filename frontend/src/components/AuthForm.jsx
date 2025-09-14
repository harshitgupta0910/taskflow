import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, CheckSquare, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthForm = ({ onLogin, onRegister, loading }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!isLogin && !formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (!isLogin && formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      if (isLogin) await onLogin({ email: formData.email, password: formData.password });
      else await onRegister({ name: formData.name, email: formData.email, password: formData.password });
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  // Theme toggle
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 
                    bg-gradient-to-br from-pink-300 via-purple-400 to-indigo-600 
                    dark:from-gray-900 dark:via-gray-800 dark:to-black 
                    relative overflow-hidden">


      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/40 dark:bg-gray-800/40 
                   shadow-md hover:scale-105 transition"
      >
        <Sun className="hidden dark:block text-yellow-400" />
        <Moon className="dark:hidden text-indigo-600" />
      </button>


      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-[200px] right-[-100px] w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-100px] left-[150px] w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>


      <motion.div
        layout
        className="bg-white/30 dark:bg-gray-900/40 backdrop-blur-xl 
                   border border-white/40 dark:border-gray-700 
                   shadow-2xl rounded-3xl w-full max-w-md overflow-hidden"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <CheckSquare className="text-white" size={36} />
            <h1 className="text-3xl font-bold text-white tracking-wide">TaskFlow</h1>
          </div>
          <p className="text-indigo-200 text-sm">
            {isLogin ? 'Welcome back! Login to your account.' : 'Sign up to get started!'}
          </p>
        </div>


        <div className="flex bg-white/40 dark:bg-gray-800/40 p-1 rounded-xl mx-6 mt-4 shadow-inner">
          <button
            onClick={() => { setIsLogin(true); setErrors({}); setFormData({ name: '', email: '', password: '' }); }}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
              isLogin
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:text-indigo-700'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => { setIsLogin(false); setErrors({}); setFormData({ name: '', email: '', password: '' }); }}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
              !isLogin
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:text-indigo-700'
            }`}
          >
            Sign Up
          </button>
        </div>


        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <AnimatePresence>
            {!isLogin && (
              <motion.div
                key="name"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm 
                                dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 ${
                      errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </motion.div>
            )}
          </AnimatePresence>


          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm 
                            dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 ${
                  errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder={isLogin ? 'Enter your password' : 'Create a password (min 6 chars)'}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm 
                            dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 ${
                  errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>


          {errors.submit && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg p-3">
              <p className="text-red-600 dark:text-red-400 text-sm">{errors.submit}</p>
            </div>
          )}


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 
                       text-white py-3 px-6 rounded-xl hover:scale-[1.02] active:scale-[0.98] 
                       transition-all duration-300 font-semibold flex items-center justify-center gap-3 
                       disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                {isLogin ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>


          <div className="mt-5 text-center">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => { setIsLogin(!isLogin); setErrors({}); setFormData({ name: '', email: '', password: '' }); }}
                className="text-purple-600 dark:text-purple-400 font-medium hover:underline transition-all"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </form>
      </motion.div>


      <footer className="mt-6 text-center text-md text-gray-800 dark:text-gray-300">
        Made By : Harshit Gupta 
      </footer>
    </div>
  );
};

export default AuthForm;
