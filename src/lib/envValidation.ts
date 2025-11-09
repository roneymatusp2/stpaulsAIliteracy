// Environment variable validation
// This ensures all required environment variables are present at build time

interface EnvConfig {
  // Firebase
  VITE_FIREBASE_API_KEY: string;
  VITE_FIREBASE_AUTH_DOMAIN: string;
  VITE_FIREBASE_PROJECT_ID: string;
  VITE_FIREBASE_STORAGE_BUCKET: string;
  VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  VITE_FIREBASE_APP_ID: string;
  VITE_FIREBASE_MEASUREMENT_ID?: string;

  // Supabase
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_ANON_KEY: string;
}

const requiredEnvVars: (keyof EnvConfig)[] = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
];

export function validateEnv(): void {
  const missing: string[] = [];
  const invalid: string[] = [];

  for (const varName of requiredEnvVars) {
    const value = import.meta.env[varName];

    if (!value) {
      missing.push(varName);
    } else if (typeof value !== 'string' || value.trim() === '') {
      invalid.push(varName);
    }
  }

  if (missing.length > 0 || invalid.length > 0) {
    const errorMessages: string[] = ['❌ Environment Configuration Error:'];

    if (missing.length > 0) {
      errorMessages.push('');
      errorMessages.push('Missing required environment variables:');
      missing.forEach((v) => errorMessages.push(`  - ${v}`));
    }

    if (invalid.length > 0) {
      errorMessages.push('');
      errorMessages.push('Invalid environment variables (empty or not string):');
      invalid.forEach((v) => errorMessages.push(`  - ${v}`));
    }

    errorMessages.push('');
    errorMessages.push('📝 Please check your .env file and ensure all required variables are set.');
    errorMessages.push('See .env.example for reference.');

    console.error(errorMessages.join('\n'));

    // In development, throw an error to fail fast
    if (import.meta.env.DEV) {
      throw new Error('Missing or invalid environment variables. Check console for details.');
    }
  } else {
    console.log('✅ All environment variables validated successfully');
  }
}

// Helper to safely access env vars with fallback
export function getEnv(key: keyof EnvConfig, fallback?: string): string {
  const value = import.meta.env[key];
  if (!value && !fallback) {
    console.warn(`Environment variable ${key} is not set and no fallback provided`);
    return '';
  }
  return value || fallback || '';
}

// Export typed environment config
export const env: EnvConfig = {
  VITE_FIREBASE_API_KEY: getEnv('VITE_FIREBASE_API_KEY'),
  VITE_FIREBASE_AUTH_DOMAIN: getEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  VITE_FIREBASE_PROJECT_ID: getEnv('VITE_FIREBASE_PROJECT_ID'),
  VITE_FIREBASE_STORAGE_BUCKET: getEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  VITE_FIREBASE_MESSAGING_SENDER_ID: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  VITE_FIREBASE_APP_ID: getEnv('VITE_FIREBASE_APP_ID'),
  VITE_FIREBASE_MEASUREMENT_ID: getEnv('VITE_FIREBASE_MEASUREMENT_ID', ''),
  VITE_SUPABASE_URL: getEnv('VITE_SUPABASE_URL'),
  VITE_SUPABASE_ANON_KEY: getEnv('VITE_SUPABASE_ANON_KEY'),
};
