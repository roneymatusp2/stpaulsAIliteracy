import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  initializeAINewsAutomation,
  getAutomationStatus,
  triggerManualNewsFetch,
  triggerManualSummaryProcessing,
  performAutomaticCleanup,
  checkSystemHealth,
  startRealtimeMonitoring,
  AutomationStatus,
  AUTOMATION_CONFIG
} from '../lib/aiNewsAutomation';

const AINewsAutomationPanel: React.FC = () => {
  const [status, setStatus] = useState<AutomationStatus | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const [systemHealth, setSystemHealth] = useState<{ healthy: boolean; issues: string[] } | null>(null);

  useEffect(() => {
    loadStatus();
    checkHealth();

    const monitoring = startRealtimeMonitoring();
    const interval = setInterval(() => {
      loadStatus();
      checkHealth();
    }, 30000);

    return () => {
      clearInterval(interval);
      monitoring?.stop();
    };
  }, []);

  const loadStatus = async () => {
    try {
      const automationStatus = await getAutomationStatus();
      setStatus(automationStatus);
    } catch (error) {
      console.error('Unable to load automation status', error);
    }
  };

  const checkHealth = async () => {
    try {
      const health = await checkSystemHealth();
      setSystemHealth(health);
    } catch (error) {
      console.error('Unable to check system health', error);
    }
  };

  const handleInitialize = async () => {
    setIsInitializing(true);
    try {
      const result = await initializeAINewsAutomation();
      if (result.success) {
        alert('Automation initialised successfully.');
        await loadStatus();
      } else {
        alert(`Initialisation issue: ${result.message}`);
      }
    } catch (error) {
      alert(`Initialisation failed: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsInitializing(false);
    }
  };

  const handleManualFetch = async () => {
    setIsFetching(true);
    try {
      const result = await triggerManualNewsFetch();
      alert(result.message);
      await loadStatus();
    } catch (error) {
      alert(`Unable to fetch news: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsFetching(false);
    }
  };

  const handleManualProcessing = async () => {
    setIsProcessing(true);
    try {
      const result = await triggerManualSummaryProcessing();
      alert(result.message);
      await loadStatus();
    } catch (error) {
      alert(`Unable to process summaries: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCleanup = async () => {
    setIsCleaning(true);
    try {
      const result = await performAutomaticCleanup();
      alert(result.message);
      await loadStatus();
    } catch (error) {
      alert(`Automatic clean-up failed: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsCleaning(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not yet recorded';
    return new Date(dateString).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getHealthColour = (health: 'healthy' | 'warning' | 'error') => {
    switch (health) {
      case 'healthy': return 'text-sps-green';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-500';
    }
  };

  const getHealthCopy = (health: 'healthy' | 'warning' | 'error') => {
    switch (health) {
      case 'healthy': return 'All services nominal';
      case 'warning': return 'Requires review';
      case 'error': return 'Immediate action needed';
      default: return 'Pending';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading text-sps-indigo dark:text-white">AI News Automation</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <span className={`w-3 h-3 rounded-full ${status?.isRunning ? 'bg-sps-green animate-pulse' : 'bg-red-500'}`}></span>
          <span>{status?.isRunning ? 'Running' : 'Paused'}</span>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-sps-indigo/5 dark:bg-gray-800 rounded-xl p-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-sps-indigo/70">Project ID</p>
          <p className="font-mono text-sps-indigo dark:text-white">{AUTOMATION_CONFIG.PROJECT_ID}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-sps-indigo/70">Supabase URL</p>
          <p className="font-mono text-sps-indigo dark:text-white break-all">{AUTOMATION_CONFIG.SUPABASE_URL}</p>
        </div>
      </div>

      {status && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-sps-indigo/70">Last fetch</p>
            <p className="mt-2 text-gray-900 dark:text-white">{formatDate(status.lastFetch)}</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-sps-indigo/70">Last summary batch</p>
            <p className="mt-2 text-gray-900 dark:text-white">{formatDate(status.lastSummary)}</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-sps-indigo/70">Articles queued</p>
            <p className="mt-2 text-3xl font-heading text-sps-indigo dark:text-white">{status.articlesInQueue}</p>
          </div>
          <div className="glass-card p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-sps-indigo/70">Next scheduled run</p>
            <p className="mt-2 text-gray-900 dark:text-white">{formatDate(status.nextScheduledFetch)}</p>
          </div>
        </div>
      )}

      {systemHealth && (() => {
        const severity: 'healthy' | 'warning' | 'error' =
          systemHealth.healthy ? 'healthy' : systemHealth.issues.length ? 'warning' : 'error';
        return (
          <div className="mb-8 p-4 bg-sps-green/10 rounded-xl">
            <p className={`font-semibold ${getHealthColour(severity)}`}>
              {getHealthCopy(severity)}
            </p>
            {systemHealth.issues.length > 0 && (
              <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300 list-disc list-inside">
                {systemHealth.issues.map((issue) => (
                  <li key={issue}>{issue}</li>
                ))}
              </ul>
            )}
          </div>
        );
      })()}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.button
          onClick={handleInitialize}
          disabled={isInitializing}
          className="px-4 py-3 rounded-xl bg-gradient-to-r from-sps-ruby to-sps-indigo text-white font-semibold disabled:opacity-50"
          whileHover={{ scale: isInitializing ? 1 : 1.02 }}
        >
          {isInitializing ? 'Initialising…' : 'Initialise automation'}
        </motion.button>
        <motion.button
          onClick={handleCleanup}
          disabled={isCleaning}
          className="px-4 py-3 rounded-xl bg-sps-indigo/10 text-sps-indigo font-semibold disabled:opacity-50"
          whileHover={{ scale: isCleaning ? 1 : 1.02 }}
        >
          {isCleaning ? 'Cleaning…' : 'Clean & validate data'}
        </motion.button>
        <motion.button
          onClick={handleManualFetch}
          disabled={isFetching}
          className="px-4 py-3 rounded-xl bg-sps-green text-white font-semibold disabled:opacity-50"
          whileHover={{ scale: isFetching ? 1 : 1.02 }}
        >
          {isFetching ? 'Fetching…' : 'Manual news fetch'}
        </motion.button>
        <motion.button
          onClick={handleManualProcessing}
          disabled={isProcessing}
          className="px-4 py-3 rounded-xl bg-white border border-sps-indigo/30 text-sps-indigo font-semibold disabled:opacity-50"
          whileHover={{ scale: isProcessing ? 1 : 1.02 }}
        >
          {isProcessing ? 'Processing…' : 'Process AI summaries'}
        </motion.button>
      </div>
    </div>
  );
};

export default AINewsAutomationPanel;
