import React, { useState, useCallback, useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
import ResultCard from "./components/ResultCard";
import Loader from "./components/Loader";
import About from "./components/About";
import FAQ from "./components/FAQ";
import Sparkles from "./components/Sparkles";
import EmptyState from "./components/EmptyState";
import ExploreSection from "./components/ExploreSection";
import { classifyImage } from "./services/classificationService";
import { ClassificationResult } from "./types";

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState("home");

  const resultRef = useRef<HTMLDivElement>(null);

  const navigate = (pageName: string) => {
    setPage(pageName);
    // Clear image state when navigating away from home
    if (pageName !== "home") {
      handleClear();
    }
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      setResult(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const executeClassification = useCallback(async (imageToClassify: string) => {
    if (!imageToClassify) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);

    // Scroll to results
    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

    try {
      const base64Data = imageToClassify.split(",")[1];
      const imageType = imageToClassify.split(";")[0].split(":")[1];

      const classificationResult = await classifyImage(base64Data);
      setResult(classificationResult);
    } catch (err) {
      setError("Failed to classify the image. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDemoImageSelect = (base64Image: string) => {
    setImage(base64Image);
    executeClassification(base64Image);
  };

  const handleClear = () => {
    setImage(null);
    setResult(null);
    setError(null);
    setIsLoading(false);
  };

  const renderPage = () => {
    switch (page) {
      case "about":
        return <About />;
      case "faq":
        return <FAQ />;
      case "home":
      default:
        return (
          <>
            <Hero
              onImageUpload={handleImageUpload}
              onClassify={() => executeClassification(image!)}
              onClear={handleClear}
              imagePreview={image}
              isImageLoaded={!!image}
            />
            <div
              ref={resultRef}
              className="mt-12 text-center min-h-[220px] flex items-center justify-center"
            >
              {isLoading && <Loader />}
              {error && (
                <p className="text-red-400 bg-red-900/50 p-3 rounded-lg animate-pulse">
                  {error}
                </p>
              )}
              {!isLoading && !error && result && (
                <div className="animate-fade-in w-full">
                  <ResultCard result={result} />
                </div>
              )}
              {!isLoading && !error && !result && <EmptyState />}
            </div>
            <ExploreSection onSelectImage={handleDemoImageSelect} />
            <Features />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-gray-200 isolate">
      <div className="fixed inset-0 -z-10 bg-gray-900 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#8B5CF633,transparent)]"></div>
        <Sparkles />
      </div>

      <Header navigate={navigate} currentPage={page} />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
