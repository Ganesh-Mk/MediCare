import React, { useState } from 'react';
import AIModal from '../components/AIModal';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/doctor/assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      const data = await res.json();
      setResponse(data.response);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewQuestion = () => {
    setUserInput('');
    setResponse('');
    setIsModalOpen(false);
  };

  return (
    <div className="rounded-md bg-gradient-to-b from-blue-50 to-white">

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            How can I help you with your health today?
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none h-40 text-gray-700"
                placeholder="Please describe your symptoms or health concerns in detail..."
              />
              <button
                type="submit"
                disabled={isLoading || !userInput.trim()}
                className="absolute bottom-4 right-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Analyzing...
                  </div>
                ) : (
                  <>Get Medical Advice <span className="ml-2">→</span></>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-red-50 border border-red-100 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-red-600 mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-medium">Important Disclaimer</span>
          </div>
          <p className="text-gray-600 text-sm">
            MediCare provides general information and is not a substitute for professional medical advice.
            Always consult with qualified healthcare providers for diagnosis and treatment.
            If you're experiencing a medical emergency, please call emergency services immediately.
          </p>
        </div>
      </main>

      {/* AI Modal */}
      <AIModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        response={response}
        onNewQuestion={handleNewQuestion}
      />
    </div>
  );
};

export default Home;