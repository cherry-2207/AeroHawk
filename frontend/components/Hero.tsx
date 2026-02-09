
import React, { useRef, useCallback, useState } from 'react';

interface HeroProps {
  onImageUpload: (file: File) => void;
  onClassify: () => void;
  onClear: () => void;
  imagePreview: string | null;
  isImageLoaded: boolean;
}

const Hero: React.FC<HeroProps> = ({
  onImageUpload,
  onClassify,
  onClear,
  imagePreview,
  isImageLoaded,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleDragOver = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  }, []);

  const handleDragEnter = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
        onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleMouseMove = (e: React.MouseEvent<HTMLLabelElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };

  return (
    <section className="text-center bg-gray-900/30 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-gray-700/50">
      <div className="animate-fade-in-up">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          AI-Powered Aerial Object Classification
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
          Is it a bird or a drone? Upload an image and let our advanced CNN model,
          AeroHawk, provide a real-time classification with high accuracy.
        </p>
      </div>

      <div className="mt-10 max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        
        {!isImageLoaded ? (
            <label 
                className={`
                  group relative block w-full h-64 border-2 border-dashed border-gray-600 rounded-lg p-12 text-center 
                  cursor-pointer transition-all duration-300 bg-gray-900/20 overflow-hidden
                  ${isDragging ? 'border-brand-primary animate-pulse-border' : 'hover:border-brand-primary'}
                `}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleUploadClick}
                onMouseMove={handleMouseMove}
            >
                <div 
                  className="absolute inset-0 bg-[radial-gradient(circle_200px_at_var(--x)_var(--y),rgba(139,92,246,0.15),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  aria-hidden="true"
                ></div>
                <div className="relative flex flex-col items-center justify-center h-full">
                    <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="mt-2 block text-sm font-medium text-gray-300">
                        <span className="text-brand-primary">Click to upload</span> or drag and drop
                    </span>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
            </label>
        ) : (
          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg shadow-lg">
            <img
              src={imagePreview as string}
              alt="Uploaded Preview"
              className="max-h-64 mx-auto rounded-md object-contain"
            />
          </div>
        )}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <button
          onClick={onClassify}
          disabled={!isImageLoaded}
          className="px-8 py-3 text-lg font-semibold text-white bg-brand-primary rounded-md shadow-lg hover:bg-brand-secondary disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
        >
          Classify Image
        </button>
        {isImageLoaded && (
          <button
            onClick={onClear}
            className="px-8 py-3 text-lg font-semibold text-gray-200 bg-gray-700 rounded-md shadow-lg hover:bg-gray-600 transition-colors duration-300"
          >
            Clear
          </button>
        )}
      </div>
    </section>
  );
};

export default Hero;
