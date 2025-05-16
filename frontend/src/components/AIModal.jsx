import React, { useEffect, Fragment } from 'react';

const ResponseSection = ({ title, content, icon }) => {
  // Function to convert markdown bold syntax to HTML bold tags
  const formatBoldText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <strong className='font-semibold' key={index}>{boldText}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="mb-6 bg-blue-50 rounded-lg p-6 hover:bg-blue-100 transition-colors duration-300">
      <h4 className="text-lg font-semibold text-blue-700 mb-3 flex items-center">
        <span className="mr-2">{icon}</span>
        {title}
      </h4>
      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap pl-6">
        {content.split('\n').map((line, lineIndex) => (
          <React.Fragment key={lineIndex}>
            {formatBoldText(line)}
            {lineIndex < content.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const AIModal = ({ isOpen, onClose, response, onNewQuestion }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Icons for each section
  const sectionIcons = {
    'Treatment': '🏥',
    'Home Remedies': '🏠',
    'Medication': '💊',
    'When to Consult a Doctor': '👨‍⚕️',
    'Additional Advice': '📋',
    'Disclaimer': '⚠️'
  };

  // Function to parse sections from response
  const parseSections = (text) => {
    const sections = {};
    let currentSection = '';
    let currentContent = [];

    // Check if the response has expected sections
    const hasSections = /^(Treatment|Home Remedies|Medication|When to Consult a Doctor|Additional Advice|Disclaimer):/.test(text);

    // If no sections are found, return the entire response as a "Response" section
    if (!hasSections) {
      return { 'Response': text };
    }

    text.split('\n').forEach(line => {
      if (line.match(/^(Treatment|Home Remedies|Medication|When to Consult a Doctor|Additional Advice|Disclaimer):/)) {
        if (currentSection) {
          sections[currentSection] = currentContent.join('\n');
          currentContent = [];
        }
        currentSection = line.split(':')[0];
      } else if (currentSection) {
        currentContent.push(line);
      }
    });

    if (currentSection) {
      sections[currentSection] = currentContent.join('\n');
    }

    return sections;
  };

  if (!isOpen) return null;

  // Parse the response
  const parsedSections = parseSections(response);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`relative w-full max-w-4xl rounded-2xl bg-white shadow-xl transform transition-all duration-300 ease-out
            ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-xl">👨‍⚕️</span>
                </div>
                <h2 className="text-xl font-bold text-blue-800">
                  Medical Assistant
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={onNewQuestion}
                  className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors duration-300 transform hover:scale-105"
                >
                  New Question
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                >
                  <svg
                    className="w-6 h-6 transform hover:rotate-90 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-h-[calc(80vh-8rem)] overflow-y-auto px-6 py-4">
            <div className="space-y-6">
              {Object.entries(parsedSections).map(([title, content]) => (
                <ResponseSection
                  key={title}
                  title={title}
                  content={content}
                  icon={title === 'Response' ? '💬' : sectionIcons[title] || '📝'}
                />
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-8 bg-red-50 border border-red-100 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-red-600 mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span className="font-medium">Important Disclaimer</span>
              </div>
              <p className="text-gray-600 text-sm">
                MediCare provides general information and is not a substitute for professional medical advice.
                Always consult with qualified healthcare providers for diagnosis and treatment.
                If you're experiencing a medical emergency, please call emergency services immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIModal;