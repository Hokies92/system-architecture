import { Request, Response, NextFunction } from "express";
import { storage } from "./storage";

// Extend Express Session type
declare module 'express-session' {
  interface SessionData {
    userId?: number;
  }
}

/**
 * Middleware to ensure user is authenticated
 * Checks for userId in session
 */
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const userId = req.session.userId;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Authentication required. Please log in."
    });
  }

  // Verify user still exists
  const user = await storage.getUser(userId);
  if (!user) {
    req.session.userId = undefined;
    return res.status(401).json({
      success: false,
      message: "User not found. Please log in again."
    });
  }

  // Attach user to request for use in route handlers
  (req as any).user = user;
  next();
}

/**
 * Middleware to ensure user owns a resource
 * Must be used after requireAuth
 */
export function requireOwnership(resourceUserIdParam: string = 'userId') {
  return (req: Request, res: Response, next: NextFunction) => {
    const sessionUserId = req.session.userId;
    const resourceUserId = parseInt(req.params[resourceUserIdParam]);

    if (!sessionUserId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    if (sessionUserId !== resourceUserId) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You do not have permission to access this resource."
      });
    }

    next();
  };
}

/**
 * Middleware to ensure user has specific role
 * Must be used after requireAuth
 */
export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${allowedRoles.join(' or ')}`
      });
    }

    next();
  };
}

/**
 * Middleware to check if user is authenticated (optional)
 * Attaches user to request if logged in, but doesn't block unauthenticated requests
 */
export async function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const userId = req.session.userId;

  if (userId) {
    const user = await storage.getUser(userId);
    if (user) {
      (req as any).user = user;
    }
  }

  next();
}
