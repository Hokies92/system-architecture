import bcrypt from "bcrypt";
import crypto from "crypto";
import { storage } from "./storage";

const SALT_ROUNDS = 10;

export interface RegisterData {
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  password: string;
  phone?: string | null;
  company?: string | null;
}

export interface LoginData {
  email: string;
  password: string;
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function registerUser(data: RegisterData) {
  const existingUser = await storage.getUserByEmail(data.email);
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const hashedPassword = await hashPassword(data.password);
  const emailVerificationToken = generateVerificationToken();
  const phoneVerificationCode = generateVerificationCode();
  const phoneVerificationExpires = new Date(Date.now() + 10 * 60 * 1000);

  const user = await storage.createUser({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashedPassword,
    phone: data.phone,
    company: data.company,
    role: 'architect',
    emailVerified: false,
    phoneVerified: false,
    emailVerificationToken,
    phoneVerificationCode,
    phoneVerificationExpires,
  });

  return {
    user,
    emailVerificationToken,
    phoneVerificationCode,
  };
}

export async function loginUser(data: LoginData) {
  const user = await storage.getUserByEmail(data.email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await comparePassword(data.password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  if (!user.emailVerified) {
    throw new Error('Email not verified. Please check your email for verification link.');
  }

  if (!user.phoneVerified) {
    throw new Error('Phone not verified. Please verify your phone number.');
  }

  return user;
}

export async function verifyEmail(token: string) {
  const user = await storage.getUserByEmailVerificationToken(token);
  if (!user) {
    throw new Error('Invalid verification token');
  }

  await storage.updateUser(user.id, {
    emailVerified: true,
    emailVerificationToken: null,
  });

  return user;
}

export async function verifyPhone(userId: number, code: string) {
  const user = await storage.getUser(userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (user.phoneVerificationCode !== code) {
    throw new Error('Invalid verification code');
  }

  if (user.phoneVerificationExpires && new Date() > user.phoneVerificationExpires) {
    throw new Error('Verification code expired');
  }

  await storage.updateUser(user.id, {
    phoneVerified: true,
    phoneVerificationCode: null,
    phoneVerificationExpires: null,
  });

  return user;
}

export async function resendPhoneVerification(userId: number) {
  const user = await storage.getUser(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const phoneVerificationCode = generateVerificationCode();
  const phoneVerificationExpires = new Date(Date.now() + 10 * 60 * 1000);

  await storage.updateUser(user.id, {
    phoneVerificationCode,
    phoneVerificationExpires,
  });

  return { phoneVerificationCode, user };
}
