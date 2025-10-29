import { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { storage } from "./storage";
import { setupAuthRoutes } from "./authRoutes";
import { requireAuth, requireOwnership, requireRole } from "./middleware";
import { 
  insertUserSchema, 
  insertArchitectureStepSchema,
  insertDomainExampleSchema,
  insertRelatedConceptSchema,
  insertSavedArchitectureSchema,
  insertAnnotationSchema,
  insertSystemSchema,
  insertModuleConfigurationSchema,
  insertInvariantRuleSchema,
  insertMessageBoardSchema,
  insertBoardMessageSchema,
  insertChatMessageSchema
} from "@shared/schema";

// Architecture API routes
const setupArchitectureRoutes = (app: Express) => {
  // Get all architecture steps
  app.get("/api/architecture/steps", async (req, res) => {
    try {
      const steps = await storage.getAllArchitectureSteps();
      res.json({ success: true, data: steps });
    } catch (error) {
      console.error("Error fetching architecture steps:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch architecture steps" 
      });
    }
  });

  // Get architecture step by number
  app.get("/api/architecture/steps/:number", async (req, res) => {
    try {
      const stepNumber = parseInt(req.params.number);
      if (isNaN(stepNumber)) {
        return res.status(400).json({ success: false, message: "Invalid step number" });
      }
      
      const step = await storage.getArchitectureStepByNumber(stepNumber);
      if (!step) {
        return res.status(404).json({ success: false, message: "Architecture step not found" });
      }
      
      res.json({ success: true, data: step });
    } catch (error) {
      console.error("Error fetching architecture step:", error);
      res.status(500).json({ success: false, message: "Failed to fetch architecture step" });
    }
  });

  // Create a new architecture step
  app.post("/api/architecture/steps", async (req, res) => {
    try {
      const stepData = insertArchitectureStepSchema.parse(req.body);
      const newStep = await storage.createArchitectureStep(stepData);
      res.status(201).json({ success: true, data: newStep });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: fromZodError(error).message 
        });
      }
      console.error("Error creating architecture step:", error);
      res.status(500).json({ success: false, message: "Failed to create architecture step" });
    }
  });

  // Get domain examples for a step
  app.get("/api/architecture/steps/:stepId/domain-examples", async (req, res) => {
    try {
      const stepId = parseInt(req.params.stepId);
      if (isNaN(stepId)) {
        return res.status(400).json({ success: false, message: "Invalid step ID" });
      }
      
      const domainExamples = await storage.getDomainExamplesByStep(stepId);
      res.json({ success: true, data: domainExamples });
    } catch (error) {
      console.error("Error fetching domain examples:", error);
      res.status(500).json({ success: false, message: "Failed to fetch domain examples" });
    }
  });

  // Get domain example by step and domain
  app.get("/api/architecture/domain-examples/:stepId/:domain", async (req, res) => {
    try {
      const stepId = parseInt(req.params.stepId);
      const domain = req.params.domain;
      
      if (isNaN(stepId)) {
        return res.status(400).json({ success: false, message: "Invalid step ID" });
      }
      
      const example = await storage.getDomainExampleByStepAndDomain(stepId, domain);
      if (!example) {
        return res.status(404).json({ success: false, message: "Domain example not found" });
      }
      
      res.json({ success: true, data: example });
    } catch (error) {
      console.error("Error fetching domain example:", error);
      res.status(500).json({ success: false, message: "Failed to fetch domain example" });
    }
  });

  // Get related concepts for a step
  app.get("/api/architecture/steps/:stepId/related-concepts", async (req, res) => {
    try {
      const stepId = parseInt(req.params.stepId);
      if (isNaN(stepId)) {
        return res.status(400).json({ success: false, message: "Invalid step ID" });
      }
      
      const relatedConcepts = await storage.getRelatedConceptsByStep(stepId);
      res.json({ success: true, data: relatedConcepts });
    } catch (error) {
      console.error("Error fetching related concepts:", error);
      res.status(500).json({ success: false, message: "Failed to fetch related concepts" });
    }
  });
};

// User Progress and Saved Architectures routes
const setupProgressRoutes = (app: Express) => {
  // Save user progress
  app.post('/api/progress/save', async (req, res) => {
    try {
      const { userId, currentStep, activeDomain } = req.body;
      
      // Create or update saved architecture
      if (userId) {
        const architectureData = {
          userId,
          name: `Architecture ${new Date().toLocaleDateString()}`,
          currentStep
        };
        
        const savedArchitecture = await storage.createSavedArchitecture(architectureData);
        
        res.json({ 
          success: true, 
          message: 'Progress saved successfully',
          data: {
            id: savedArchitecture.id,
            userId,
            currentStep,
            activeDomain,
            savedAt: new Date().toISOString()
          }
        });
      } else {
        // For anonymous users, just return success without saving to DB
        res.json({ 
          success: true, 
          message: 'Progress acknowledged (anonymous user)',
          data: {
            currentStep,
            activeDomain,
            savedAt: new Date().toISOString()
          }
        });
      }
    } catch (error) {
      console.error("Error saving progress:", error);
      res.status(500).json({ 
        success: false,
        message: 'Failed to save progress'
      });
    }
  });

  // Get user's saved architectures
  app.get("/api/users/:userId/saved-architectures", requireAuth, requireOwnership(), async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ success: false, message: "Invalid user ID" });
      }
      
      const savedArchitectures = await storage.getSavedArchitecturesByUser(userId);
      res.json({ success: true, data: savedArchitectures });
    } catch (error) {
      console.error("Error fetching saved architectures:", error);
      res.status(500).json({ success: false, message: "Failed to fetch saved architectures" });
    }
  });

  // Update current step of saved architecture
  app.put("/api/saved-architectures/:id/step", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { step } = req.body;
      
      if (isNaN(id) || typeof step !== 'number') {
        return res.status(400).json({ success: false, message: "Invalid parameters" });
      }
      
      const updatedArchitecture = await storage.updateSavedArchitectureStep(id, step);
      if (!updatedArchitecture) {
        return res.status(404).json({ success: false, message: "Saved architecture not found" });
      }
      
      res.json({ success: true, data: updatedArchitecture });
    } catch (error) {
      console.error("Error updating saved architecture step:", error);
      res.status(500).json({ success: false, message: "Failed to update saved architecture step" });
    }
  });
};

// Annotations routes
const setupAnnotationsRoutes = (app: Express) => {
  // Get a user's annotations for a specific step
  app.get("/api/users/:userId/steps/:stepId/annotations", requireAuth, requireOwnership(), async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const stepId = parseInt(req.params.stepId);
      
      if (isNaN(userId) || isNaN(stepId)) {
        return res.status(400).json({ success: false, message: "Invalid parameters" });
      }
      
      const annotations = await storage.getAnnotationsByUserAndStep(userId, stepId);
      res.json({ success: true, data: annotations });
    } catch (error) {
      console.error("Error fetching annotations:", error);
      res.status(500).json({ success: false, message: "Failed to fetch annotations" });
    }
  });

  // Create a new annotation
  app.post("/api/annotations", requireAuth, async (req, res) => {
    try {
      const annotationData = insertAnnotationSchema.parse(req.body);
      const newAnnotation = await storage.createAnnotation(annotationData);
      res.status(201).json({ success: true, data: newAnnotation });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: fromZodError(error).message 
        });
      }
      console.error("Error creating annotation:", error);
      res.status(500).json({ success: false, message: "Failed to create annotation" });
    }
  });

  // Update an annotation
  app.put("/api/annotations/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { content } = req.body;
      
      if (isNaN(id) || typeof content !== 'string') {
        return res.status(400).json({ success: false, message: "Invalid parameters" });
      }
      
      const updatedAnnotation = await storage.updateAnnotation(id, content);
      if (!updatedAnnotation) {
        return res.status(404).json({ success: false, message: "Annotation not found" });
      }
      
      res.json({ success: true, data: updatedAnnotation });
    } catch (error) {
      console.error("Error updating annotation:", error);
      res.status(500).json({ success: false, message: "Failed to update annotation" });
    }
  });

  // Delete an annotation
  app.delete("/api/annotations/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid annotation ID" });
      }
      
      const success = await storage.deleteAnnotation(id);
      if (!success) {
        return res.status(404).json({ success: false, message: "Annotation not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting annotation:", error);
      res.status(500).json({ success: false, message: "Failed to delete annotation" });
    }
  });
};

// System routes
const setupSystemRoutes = (app: Express) => {
  // Get user's systems
  app.get("/api/users/:userId/systems", requireAuth, requireOwnership(), async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ success: false, message: "Invalid user ID" });
      }
      
      const systems = await storage.getSystemsByUser(userId);
      res.json({ success: true, data: systems });
    } catch (error) {
      console.error("Error fetching systems:", error);
      res.status(500).json({ success: false, message: "Failed to fetch systems" });
    }
  });

  // Get a specific system
  app.get("/api/systems/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid system ID" });
      }
      
      const system = await storage.getSystem(id);
      if (!system) {
        return res.status(404).json({ success: false, message: "System not found" });
      }
      
      res.json({ success: true, data: system });
    } catch (error) {
      console.error("Error fetching system:", error);
      res.status(500).json({ success: false, message: "Failed to fetch system" });
    }
  });

  // Create a new system
  app.post("/api/systems", async (req, res) => {
    try {
      const systemData = insertSystemSchema.parse(req.body);
      const newSystem = await storage.createSystem(systemData);
      res.status(201).json({ success: true, data: newSystem });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: fromZodError(error).message 
        });
      }
      console.error("Error creating system:", error);
      res.status(500).json({ success: false, message: "Failed to create system" });
    }
  });

  // Update a system
  app.put("/api/systems/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid system ID" });
      }
      
      const updates = req.body;
      const updatedSystem = await storage.updateSystem(id, updates);
      if (!updatedSystem) {
        return res.status(404).json({ success: false, message: "System not found" });
      }
      
      res.json({ success: true, data: updatedSystem });
    } catch (error) {
      console.error("Error updating system:", error);
      res.status(500).json({ success: false, message: "Failed to update system" });
    }
  });

  // Delete a system
  app.delete("/api/systems/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid system ID" });
      }
      
      const success = await storage.deleteSystem(id);
      if (!success) {
        return res.status(404).json({ success: false, message: "System not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      console.error("Error deleting system:", error);
      res.status(500).json({ success: false, message: "Failed to delete system" });
    }
  });

  // Get module configurations for a system
  app.get("/api/systems/:systemId/modules", async (req, res) => {
    try {
      const systemId = parseInt(req.params.systemId);
      if (isNaN(systemId)) {
        return res.status(400).json({ success: false, message: "Invalid system ID" });
      }
      
      const moduleConfigs = await storage.getModuleConfigurationsBySystem(systemId);
      res.json({ success: true, data: moduleConfigs });
    } catch (error) {
      console.error("Error fetching module configurations:", error);
      res.status(500).json({ success: false, message: "Failed to fetch module configurations" });
    }
  });

  // Get specific module configuration
  app.get("/api/systems/:systemId/modules/:moduleId", async (req, res) => {
    try {
      const systemId = parseInt(req.params.systemId);
      const moduleId = parseInt(req.params.moduleId);
      
      if (isNaN(systemId) || isNaN(moduleId)) {
        return res.status(400).json({ success: false, message: "Invalid parameters" });
      }
      
      const moduleConfig = await storage.getModuleConfiguration(systemId, moduleId);
      if (!moduleConfig) {
        return res.status(404).json({ success: false, message: "Module configuration not found" });
      }
      
      res.json({ success: true, data: moduleConfig });
    } catch (error) {
      console.error("Error fetching module configuration:", error);
      res.status(500).json({ success: false, message: "Failed to fetch module configuration" });
    }
  });

  // Create module configuration
  app.post("/api/systems/:systemId/modules", async (req, res) => {
    try {
      const systemId = parseInt(req.params.systemId);
      if (isNaN(systemId)) {
        return res.status(400).json({ success: false, message: "Invalid system ID" });
      }
      
      const configData = insertModuleConfigurationSchema.parse({ ...req.body, systemId });
      const newConfig = await storage.createModuleConfiguration(configData);
      res.status(201).json({ success: true, data: newConfig });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: fromZodError(error).message 
        });
      }
      console.error("Error creating module configuration:", error);
      res.status(500).json({ success: false, message: "Failed to create module configuration" });
    }
  });

  // Get invariant rules for a module
  app.get("/api/modules/:moduleId/rules", async (req, res) => {
    try {
      const moduleId = parseInt(req.params.moduleId);
      if (isNaN(moduleId)) {
        return res.status(400).json({ success: false, message: "Invalid module ID" });
      }
      
      const activeOnly = req.query.active === 'true';
      const rules = activeOnly 
        ? await storage.getActiveInvariantRulesByModule(moduleId)
        : await storage.getInvariantRulesByModule(moduleId);
      
      res.json({ success: true, data: rules });
    } catch (error) {
      console.error("Error fetching invariant rules:", error);
      res.status(500).json({ success: false, message: "Failed to fetch invariant rules" });
    }
  });

  // Create invariant rule (publisher only)
  app.post("/api/modules/:moduleId/rules", async (req, res) => {
    try {
      const moduleId = parseInt(req.params.moduleId);
      if (isNaN(moduleId)) {
        return res.status(400).json({ success: false, message: "Invalid module ID" });
      }
      
      const ruleData = insertInvariantRuleSchema.parse({ ...req.body, moduleId });
      const newRule = await storage.createInvariantRule(ruleData);
      res.status(201).json({ success: true, data: newRule });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: fromZodError(error).message 
        });
      }
      console.error("Error creating invariant rule:", error);
      res.status(500).json({ success: false, message: "Failed to create invariant rule" });
    }
  });
};

// Social features routes
const setupSocialRoutes = (app: Express) => {
  // Helper: Get authenticated user ID from session
  const getAuthenticatedUserId = (req: any): number | null => {
    return req.session.userId || null;
  };

  // Helper: Check if user owns a system
  const userOwnsSystem = async (userId: number, systemId: number): Promise<boolean> => {
    const system = await storage.getSystem(systemId);
    return system?.userId === userId;
  };

  // Helper: Check if user has access to a board (via system ownership)
  const userHasAccessToBoard = async (userId: number, boardId: number): Promise<boolean> => {
    const board = await storage.getMessageBoard(boardId);
    if (!board) return false;
    return await userOwnsSystem(userId, board.systemId);
  };

  // Message Boards - Get all boards for a system
  app.get("/api/systems/:systemId/boards", requireAuth, async (req: any, res) => {
    try {
      const systemId = parseInt(req.params.systemId);
      if (isNaN(systemId)) {
        return res.status(400).json({ success: false, message: "Invalid system ID" });
      }
      
      const userId = getAuthenticatedUserId(req);
      if (!userId) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      
      // Verify user owns the system
      if (!(await userOwnsSystem(userId, systemId))) {
        return res.status(403).json({ success: false, message: "Access denied: You don't have access to this system" });
      }
      
      const boards = await storage.getMessageBoardsBySystem(systemId);
      res.json({ success: true, data: boards });
    } catch (error) {
      console.error("Error fetching message boards:", error);
      res.status(500).json({ success: false, message: "Failed to fetch message boards" });
    }
  });

  // Create a new message board for a system
  app.post("/api/systems/:systemId/boards", requireAuth, async (req: any, res) => {
    try {
      const systemId = parseInt(req.params.systemId);
      if (isNaN(systemId)) {
        return res.status(400).json({ success: false, message: "Invalid system ID" });
      }
      
      const userId = getAuthenticatedUserId(req);
      if (!userId) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      
      // Verify user owns the system
      if (!(await userOwnsSystem(userId, systemId))) {
        return res.status(403).json({ success: false, message: "Access denied: You don't have access to this system" });
      }
      
      // Remove any userId/createdBy from request body - use authenticated user only
      const { userId: _, createdBy: __, ...sanitizedBody } = req.body;
      
      const boardData = insertMessageBoardSchema.parse({ 
        ...sanitizedBody, 
        systemId,
        createdBy: userId 
      });
      const newBoard = await storage.createMessageBoard(boardData);
      res.status(201).json({ success: true, data: newBoard });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: fromZodError(error).message 
        });
      }
      console.error("Error creating message board:", error);
      res.status(500).json({ success: false, message: "Failed to create message board" });
    }
  });

  // Board Messages - Get all messages for a board
  app.get("/api/boards/:boardId/messages", requireAuth, async (req: any, res) => {
    try {
      const boardId = parseInt(req.params.boardId);
      if (isNaN(boardId)) {
        return res.status(400).json({ success: false, message: "Invalid board ID" });
      }
      
      const userId = getAuthenticatedUserId(req);
      if (!userId) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      
      // Verify user has access to the board
      if (!(await userHasAccessToBoard(userId, boardId))) {
        return res.status(403).json({ success: false, message: "Access denied: You don't have access to this board" });
      }
      
      const messages = await storage.getBoardMessagesByBoard(boardId);
      res.json({ success: true, data: messages });
    } catch (error) {
      console.error("Error fetching board messages:", error);
      res.status(500).json({ success: false, message: "Failed to fetch board messages" });
    }
  });

  // Create a new board message
  app.post("/api/boards/:boardId/messages", requireAuth, async (req: any, res) => {
    try {
      const boardId = parseInt(req.params.boardId);
      if (isNaN(boardId)) {
        return res.status(400).json({ success: false, message: "Invalid board ID" });
      }
      
      const userId = getAuthenticatedUserId(req);
      if (!userId) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      
      // Verify user has access to the board
      if (!(await userHasAccessToBoard(userId, boardId))) {
        return res.status(403).json({ success: false, message: "Access denied: You don't have access to this board" });
      }
      
      // Remove any userId from request body - use authenticated user only
      const { userId: _, ...sanitizedBody } = req.body;
      
      const messageData = insertBoardMessageSchema.parse({ 
        ...sanitizedBody, 
        boardId,
        userId 
      });
      const newMessage = await storage.createBoardMessage(messageData);
      res.status(201).json({ success: true, data: newMessage });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: fromZodError(error).message 
        });
      }
      console.error("Error creating board message:", error);
      res.status(500).json({ success: false, message: "Failed to create board message" });
    }
  });

  // Chat Messages - Get all chat messages for a system
  app.get("/api/systems/:systemId/chat", requireAuth, async (req: any, res) => {
    try {
      const systemId = parseInt(req.params.systemId);
      if (isNaN(systemId)) {
        return res.status(400).json({ success: false, message: "Invalid system ID" });
      }
      
      const userId = getAuthenticatedUserId(req);
      if (!userId) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      
      // Verify user owns the system
      if (!(await userOwnsSystem(userId, systemId))) {
        return res.status(403).json({ success: false, message: "Access denied: You don't have access to this system" });
      }
      
      const messages = await storage.getChatMessagesBySystem(systemId);
      res.json({ success: true, data: messages });
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      res.status(500).json({ success: false, message: "Failed to fetch chat messages" });
    }
  });

  // Create a new chat message
  app.post("/api/systems/:systemId/chat", requireAuth, async (req: any, res) => {
    try {
      const systemId = parseInt(req.params.systemId);
      if (isNaN(systemId)) {
        return res.status(400).json({ success: false, message: "Invalid system ID" });
      }
      
      const userId = getAuthenticatedUserId(req);
      if (!userId) {
        return res.status(401).json({ success: false, message: "Authentication required" });
      }
      
      // Verify user owns the system
      if (!(await userOwnsSystem(userId, systemId))) {
        return res.status(403).json({ success: false, message: "Access denied: You don't have access to this system" });
      }
      
      // Remove any userId from request body - use authenticated user only
      const { userId: _, ...sanitizedBody } = req.body;
      
      const messageData = insertChatMessageSchema.parse({ 
        ...sanitizedBody, 
        systemId,
        userId 
      });
      const newMessage = await storage.createChatMessage(messageData);
      res.status(201).json({ success: true, data: newMessage });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: fromZodError(error).message 
        });
      }
      console.error("Error creating chat message:", error);
      res.status(500).json({ success: false, message: "Failed to create chat message" });
    }
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint (before authentication)
  app.get("/health", async (_req, res) => {
    try {
      // Check database connectivity
      const { pool } = await import("./db");
      await pool.query('SELECT 1');

      res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: 'connected'
      });
    } catch (error) {
      console.error("Health check failed:", error);
      res.status(503).json({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Setup authentication routes
  setupAuthRoutes(app);

  // Setup API routes
  setupArchitectureRoutes(app);
  setupProgressRoutes(app);
  setupAnnotationsRoutes(app);
  setupSystemRoutes(app);
  setupSocialRoutes(app);

  // Error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Unhandled error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
