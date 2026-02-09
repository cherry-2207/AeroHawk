import React from "react";

const About: React.FC = () => {
  return (
    <div className="animate-fade-in-up space-y-12">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          About AeroHawk
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-300">
          Pioneering the future of aerial object detection with cutting-edge
          artificial intelligence.
        </p>
      </div>

      <div className="max-w-4xl mx-auto p-8 bg-gray-800/50 rounded-lg shadow-xl">
        <h3 className="text-2xl font-bold text-brand-primary mb-4">
          Our Mission
        </h3>
        <p className="text-gray-300 leading-relaxed">
          At AeroHawk, our mission is to provide a highly accurate, accessible,
          and real-time solution for distinguishing between drones and birds in
          aerial imagery. This technology is crucial for airspace security,
          wildlife conservation, and urban planning. By leveraging the power of
          advanced Convolutional Neural Networks (CNNs), we aim to create a
          safer and more harmonious coexistence between technology and nature.
        </p>
      </div>

      <div className="max-w-4xl mx-auto p-8 bg-gray-800/50 rounded-lg shadow-xl">
        <h3 className="text-2xl font-bold text-brand-primary mb-4">
          The Technology
        </h3>
        <p className="text-gray-300 leading-relaxed mb-4">
          AeroHawk is built on a foundation of robust and scalable technologies.
          Our core is a sophisticated Resnet V2 model developed using TensorFlow
          and OpenCV, trained on thousands of augmented images to achieve over
          85% accuracy.
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>
            <strong>TensorFlow & OpenCV:</strong> For model creation, training,
            and image processing.
          </li>
          <li>
            <strong>Data Augmentation:</strong> Advanced techniques to create a
            diverse and resilient dataset.
          </li>
          <li>
            <strong>FastAPI Backend:</strong> Ensures a high-performance,
            scalable, and reliable API service.
          </li>
          <li>
            <strong>React & Tailwind CSS:</strong> A modern, responsive, and
            intuitive user interface.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
