import type { Express, Request, Response } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { registerUser, loginUser, verifyEmail, verifyPhone, resendPhoneVerification } from "./auth";
import { insertUserSchema } from "@shared/schema";
import { authLimiter } from "./rateLimiter";

const registerSchema = insertUserSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  password: true,
  phone: true,
  company: true,
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const verifyPhoneSchema = z.object({
  userId: z.number(),
  code: z.string().length(6),
});

export function setupAuthRoutes(app: Express) {
  app.post("/api/auth/register", authLimiter, async (req: Request, res: Response) => {
    try {
      const data = registerSchema.parse(req.body);

      const { user, emailVerificationToken, phoneVerificationCode } = await registerUser(data);

      // TODO: In production, send verification tokens via email and SMS services
      // For development, log them to console
      if (process.env.NODE_ENV === 'development') {
        console.log('=== DEVELOPMENT ONLY - Verification Codes ===');
        console.log(`Email verification link: ${process.env.APP_URL || 'http://localhost:5000'}/api/auth/verify-email/${emailVerificationToken}`);
        console.log(`Phone verification code: ${phoneVerificationCode}`);
        console.log('=============================================');
      }

      res.status(201).json({
        success: true,
        data: {
          userId: user.id,
          email: user.email,
          message: "Registration successful! Please check your email and phone for verification codes."
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: fromZodError(error).message
        });
      }
      console.error("Registration error:", error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Registration failed"
      });
    }
  });

  app.post("/api/auth/login", authLimiter, async (req: Request, res: Response) => {
    try {
      const data = loginSchema.parse(req.body);
      
      const user = await loginUser(data);

      (req.session as any).userId = user.id;

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            company: user.company,
            role: user.role
          }
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: fromZodError(error).message
        });
      }
      console.error("Login error:", error);
      res.status(401).json({
        success: false,
        message: error instanceof Error ? error.message : "Login failed"
      });
    }
  });

  app.get("/api/auth/verify-email/:token", authLimiter, async (req: Request, res: Response) => {
    try {
      const { token } = req.params;
      
      const user = await verifyEmail(token);

      res.json({
        success: true,
        data: {
          message: "Email verified successfully!",
          userId: user.id
        }
      });
    } catch (error) {
      console.error("Email verification error:", error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Email verification failed"
      });
    }
  });

  app.post("/api/auth/verify-phone", authLimiter, async (req: Request, res: Response) => {
    try {
      const data = verifyPhoneSchema.parse(req.body);
      
      const user = await verifyPhone(data.userId, data.code);

      (req.session as any).userId = user.id;

      res.json({
        success: true,
        data: {
          message: "Phone verified successfully!",
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            company: user.company,
            role: user.role
          }
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: fromZodError(error).message
        });
      }
      console.error("Phone verification error:", error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Phone verification failed"
      });
    }
  });

  app.post("/api/auth/resend-phone-verification", authLimiter, async (req: Request, res: Response) => {
    try {
      const { userId } = z.object({ userId: z.number() }).parse(req.body);
      
      const { phoneVerificationCode, user } = await resendPhoneVerification(userId);

      res.json({
        success: true,
        data: {
          message: "Verification code sent!",
          phoneVerificationCode,
          phone: user.phone
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: fromZodError(error).message
        });
      }
      console.error("Resend verification error:", error);
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to resend verification code"
      });
    }
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Logout failed"
        });
      }
      res.json({
        success: true,
        message: "Logged out successfully"
      });
    });
  });

  app.get("/api/auth/session", async (req: Request, res: Response) => {
    const userId = (req.session as any).userId;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated"
      });
    }

    try {
      const { storage } = await import("./storage");
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      res.json({
        success: true,
        data: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          company: user.company,
          role: user.role,
          emailVerified: user.emailVerified,
          phoneVerified: user.phoneVerified
        }
      });
    } catch (error) {
      console.error("Session error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch session"
      });
    }
  });
}
