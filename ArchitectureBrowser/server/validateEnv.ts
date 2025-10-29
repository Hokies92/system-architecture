import { z } from 'zod';

/**
 * Environment variable schema
 * Defines all required and optional environment variables with validation
 */
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid PostgreSQL connection string'),

  // Session
  SESSION_SECRET: z.string().min(32, 'SESSION_SECRET must be at least 32 characters for security'),

  // Node environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Optional: Application URL for generating links
  APP_URL: z.string().url().optional(),

  // Optional: Stripe API keys (for future payment integration)
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Validates environment variables on application startup
 * Exits the process if required variables are missing or invalid
 */
export function validateEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Invalid environment variables:');
    console.error(result.error.format());
    console.error('\nPlease check your .env file and ensure all required variables are set.');
    console.error('See .env.example for reference.\n');
    process.exit(1);
  }

  // Warn about optional but recommended variables
  if (!result.data.APP_URL && result.data.NODE_ENV === 'production') {
    console.warn('⚠️  Warning: APP_URL is not set. Email verification links may not work correctly.');
  }

  console.log('✅ Environment variables validated successfully');
  return result.data;
}
