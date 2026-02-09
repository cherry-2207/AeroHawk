import React from "react";

interface ExploreSectionProps {
  onSelectImage: (base64Image: string) => void;
}

// FIX: Defined the DEMO_IMAGES constant, which was missing and causing a compilation error.
const DEMO_IMAGES = [
  {
    name: "Bird in Flight",
    base64: "./static/images/bird_in_flight.jpeg",
  },
  {
    name: "Commercial Drone",
    base64: "./static/images/commercial_drone.jpeg",
  },
  {
    name: "Bird on a Branch",
    base64: "./static/images/bird_on_a_branch.jpg",
  },
  {
    name: "Racing Drone",
    base64: "./static/images/racing_drone.jpg",
  },
];

const ExploreSection: React.FC<ExploreSectionProps> = ({ onSelectImage }) => {
  return (
    <section
      className="mt-20 py-12 animate-fade-in-up"
      style={{ animationDelay: "0.4s" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-brand-primary font-semibold tracking-wide uppercase">
            Live Demo
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Explore Examples
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            Don't have an image? Click on any example below to see AeroHawk in
            action.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEMO_IMAGES.map((image, index) => (
            <div
              key={index}
              className="group relative cursor-pointer"
              onClick={() => onSelectImage(image.base64)}
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={image.base64}
                  alt={image.name}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Classify This
                </p>
              </div>
              <p className="text-center mt-2 text-sm text-gray-400 font-medium">
                {image.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
