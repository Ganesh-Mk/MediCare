import React, { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  Calendar,
  AlertCircle,
  Heart,
  UserCircle2,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    age: '',
    allergies: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.age) newErrors.age = 'Age is required';
    else if (formData.age < 0 || formData.age > 120) newErrors.age = 'Please enter a valid age';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      console.log("handle submit")
      try {
        const response = await fetch("http://localhost:3000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            gender: formData.gender,
            age: formData.age,
            allergies: formData.allergies,
          }),
        });

        const data = await response.json();
        console.log("Response:", data);

        if (response.ok) {
          console.log("Form submitted successfully!");
          navigate('/');
        } else {
          console.error("Error:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-4 group">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <Heart className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Join MedGenie
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your personal AI medical assistant
          </p>
        </div>

        {/* Form */}
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 transform hover:shadow-3xl transition-all duration-300">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                    <span>Full Name</span>
                  </div>
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors duration-300`}
                  />
                  {errors.name && (
                    <div className="absolute right-0 top-2 pr-3 flex items-center animate-bounce">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 animate-fade-in">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                    <span>Email</span>
                  </div>
                </label>
                <div className="mt-1 relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors duration-300`}
                  />
                  {errors.email && (
                    <div className="absolute right-0 top-2 pr-3 flex items-center animate-bounce">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 animate-fade-in">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                    <span>Password</span>
                  </div>
                </label>
                <div className="mt-1 relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors duration-300`}
                  />
                  {errors.password && (
                    <div className="absolute right-0 top-2 pr-3 flex items-center animate-bounce">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 animate-fade-in">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                    <span>Confirm Password</span>
                  </div>
                </label>
                <div className="mt-1 relative">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors duration-300`}
                  />
                  {errors.confirmPassword && (
                    <div className="absolute right-0 top-2 pr-3 flex items-center animate-bounce">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600 animate-fade-in">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Gender */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center space-x-2">
                    <UserCircle2 className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                    <span>Gender</span>
                  </div>
                </label>
                <div className="mt-1">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`block w-full px-3 py-2 border ${errors.gender ? 'border-red-300' : 'border-gray-300'
                      } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors duration-300`}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {errors.gender && (
                  <p className="mt-2 text-sm text-red-600 animate-fade-in">{errors.gender}</p>
                )}
              </div>

              {/* Age */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                    <span>Age</span>
                  </div>
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border ${errors.age ? 'border-red-300' : 'border-gray-300'
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors duration-300`}
                  />
                </div>
                {errors.age && (
                  <p className="mt-2 text-sm text-red-600 animate-fade-in">{errors.age}</p>
                )}
              </div>
            </div>

            {/* Allergies - Full Width */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                  <span>Allergies (Optional)</span>
                </div>
              </label>
              <div className="mt-1">
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  rows={3}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition-colors duration-300"
                  placeholder="List any allergies..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <span>Create Account</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Already have an account */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;