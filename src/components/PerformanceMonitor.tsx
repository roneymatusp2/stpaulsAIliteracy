import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PerformanceMetrics {
  fps: number;
  memory?: number;
  loading: boolean;
  networkType?: string;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    loading: false
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development mode AND when explicitly enabled
    const shouldShow = process.env.NODE_ENV === 'development' && 
                      localStorage.getItem('showPerformanceMonitor') === 'true';
    setIsVisible(shouldShow);

    if (!shouldShow) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        setMetrics(prev => ({
          ...prev,
          fps,
          memory: (performance as any).memory?.usedJSHeapSize ? 
            Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024) : undefined,
          networkType: (navigator as any).connection?.effectiveType
        }));

        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    measureFPS();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const getFPSColor = (fps: number) => {
    if (fps >= 55) return 'text-sps-green';
    if (fps >= 30) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getPerformanceStatus = (fps: number) => {
    if (fps >= 55) return { label: 'Excellent', color: 'bg-sps-green' };
    if (fps >= 45) return { label: 'Good', color: 'bg-yellow-500' };
    if (fps >= 30) return { label: 'Fair', color: 'bg-orange-500' };
    return { label: 'Poor', color: 'bg-red-500' };
  };

  // Don't render anything unless explicitly enabled
  if (!isVisible) return null;

  const status = getPerformanceStatus(metrics.fps);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.8, x: 100 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <motion.div
          className="bg-black/80 backdrop-blur-sm text-white rounded-xl p-4 shadow-2xl border border-white/10"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center space-x-3 mb-2">
            <motion.div
              className={`w-3 h-3 rounded-full ${status.color}`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-semibold">{status.label}</span>
            <button
              onClick={() => {
                localStorage.removeItem('showPerformanceMonitor');
                setIsVisible(false);
              }}
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-1 text-xs">
            <div className="flex justify-between items-center">
              <span>FPS:</span>
              <span className={`font-mono ${getFPSColor(metrics.fps)}`}>
                {metrics.fps}
              </span>
            </div>
            
            {metrics.memory && (
              <div className="flex justify-between items-center">
                <span>Memory:</span>
                <span className="font-mono text-blue-400">
                  {metrics.memory}MB
                </span>
              </div>
            )}
            
            {metrics.networkType && (
              <div className="flex justify-between items-center">
                <span>Network:</span>
                <span className="font-mono text-purple-400">
                  {metrics.networkType}
                </span>
              </div>
            )}
          </div>

          {/* Visual FPS graph */}
          <div className="mt-3 h-8 bg-gray-800 rounded overflow-hidden">
            <motion.div
              className={`h-full ${status.color} transition-all duration-300`}
              style={{ width: `${Math.min(metrics.fps / 60 * 100, 100)}%` }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PerformanceMonitor;
