
import React, { useState, useEffect, useCallback } from 'react';

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

interface Sparkle {
  id: string;
  createdAt: number;
  color: string;
  size: number;
  style: React.CSSProperties;
}

const generateSparkle = (color: string, x?: number, y?: number): Sparkle => {
  const sparkle: Sparkle = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    color,
    size: random(10, 20) / 10,
    style: {
      top: (y !== undefined ? y : random(0, 100)) + 'px',
      left: (x !== undefined ? x : random(0, 100)) + '%',
      animationDelay: random(0, 3000) + 'ms',
      animationDuration: random(2000, 4000) + 'ms',
      position: x !== undefined ? 'fixed' : 'absolute',
    },
  };
  if (x === undefined) {
    delete sparkle.style.position;
  }
  return sparkle;
};

const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return mousePosition;
};

const Sparkles: React.FC = () => {
    const [sparkles, setSparkles] = useState<Sparkle[]>(() => 
        Array.from({ length: 50 }).map(() => generateSparkle('hsl(255deg 95% 85% / 0.8)'))
    );
    
    const mousePosition = useMousePosition();

    const addSparkle = useCallback((e: MouseEvent) => {
        const color = `hsl(${random(240, 300)}deg 95% 85% / 0.8)`;
        
        // Add a bit of randomness to the sparkle position around the cursor
        const x = e.clientX + random(-15, 15);
        const y = e.clientY + random(-15, 15);

        const newSparkle = generateSparkle(color, x, y);
        setSparkles(currentSparkles => [...currentSparkles, newSparkle]);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            // Clean up old sparkles that were added dynamically
            setSparkles(currentSparkles => 
                currentSparkles.filter(s => {
                    const duration = s.style.animationDuration ? parseInt(s.style.animationDuration as string, 10) : 4000;
                    return s.style.position !== 'fixed' || (now - s.createdAt < duration);
                })
            );
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            addSparkle(e);
        };

        const throttle = (func: (e: MouseEvent) => void, limit: number) => {
            let inThrottle: boolean;
            return function(this: any) {
                const args = arguments as any;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        };

        const throttledMouseMove = throttle(handleMouseMove, 100);
        window.addEventListener('mousemove', throttledMouseMove);

        return () => {
            window.removeEventListener('mousemove', throttledMouseMove);
        };
    }, [addSparkle]);


  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full animate-shimmer"
          style={{
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            backgroundColor: sparkle.color,
            boxShadow: `0 0 ${sparkle.size * 1.5}px 0px ${sparkle.color}`,
            ...sparkle.style,
          }}
        />
      ))}
    </div>
  );
};

export default Sparkles;
