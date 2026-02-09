
import React from 'react';

const EmptyStateIcon: React.FC = () => (
    <svg className="w-24 h-24 text-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
        <path d="M12 15L12 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 12L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
        <path d="M17.6569 17.6569L6.34315 6.34315" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
        <path d="M17.6569 6.34315L6.34315 17.6569" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
    </svg>
);


const EmptyState: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-8 bg-gray-900/10 rounded-lg animate-fade-in">
            <div className="relative">
                <div className="absolute inset-0 bg-brand-primary/20 blur-2xl rounded-full animate-pulse"></div>
                <EmptyStateIcon />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-300">Awaiting Image for Analysis</h3>
            <p className="mt-1 text-gray-500">Upload an image and the classification result will appear here.</p>
        </div>
    );
};

export default EmptyState;
