import React from "react";

const BentoCard: React.FC<{
  className?: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ className = "", icon, title, description }) => (
  <div
    className={`bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700/80 transition-all duration-300 hover:border-brand-primary hover:scale-[1.02] ${className}`}
  >
    <div className="text-brand-primary mb-3">{icon}</div>
    <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);

const Features: React.FC = () => {
  return (
    <section
      className="mt-20 py-12 animate-fade-in-up"
      style={{ animationDelay: "0.6s" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-brand-primary font-semibold tracking-wide uppercase">
            Technology Stack
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Built with Cutting-Edge Tools
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <BentoCard
            className="md:col-span-2"
            title="Resnet V2 Model"
            description="Inception-ResNet-v2 is a high-performance 164-layer convolutional neural network, trained on ImageNet, that merges Inception blocks with residual connections for improved deep network training"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2 1M4 7l2-1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                />
              </svg>
            }
          />
          <BentoCard
            title="High Accuracy"
            description="Achieved >85% accuracy via advanced data preprocessing and augmentation techniques."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            }
          />
          <BentoCard
            title="FastAPI Backend"
            description="The model is deployed with FastAPI, providing a scalable and high-performance backend."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            }
          />
          <BentoCard
            className="md:col-span-2"
            title="Modern Frontend"
            description="A responsive interface built with React, TypeScript, and Tailwind CSS for a seamless user experience on any device."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
