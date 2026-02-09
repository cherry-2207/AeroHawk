
import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  children: React.ReactNode;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b-2 border-gray-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-5 text-left"
      >
        <span className="font-semibold text-lg text-white">{question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
           <svg className="w-6 h-6 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
      >
        <div className="pb-5 pr-4 text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in-up">
        <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
            Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
            </p>
        </div>

      <div className="space-y-4">
        <FAQItem question="What is AeroHawk?">
          <p>AeroHawk is a web application that uses a Convolutional Neural Network (CNN) to classify aerial objects from an image as either a bird or a drone. It's a demonstration of a powerful AI model with a responsive, user-friendly interface.</p>
        </FAQItem>
        <FAQItem question="What technology is used to build this model?">
          <p>The core model was developed using TensorFlow and OpenCV. We employed advanced data preprocessing and augmentation techniques to train the model. The backend is deployed with FastAPI, and this frontend is built with React and Tailwind CSS, using the Gemini API for the classification logic.</p>
        </FAQItem>
        <FAQItem question="How accurate is the classification?">
          <p>Our model has achieved a high accuracy of over 85% in our test datasets. Accuracy can vary based on image quality, object visibility, and other environmental factors.</p>
        </FAQItem>
        <FAQItem question="What kind of images work best?">
          <p>For the best results, use clear, high-resolution images where the aerial object (bird or drone) is the primary subject. Images with complex backgrounds or where the object is very small or blurry may be more challenging to classify correctly.</p>
        </FAQItem>
      </div>
    </div>
  );
};

export default FAQ;
