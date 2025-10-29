import {
  users, annotations, architectureSteps, domainExamples,
  relatedConcepts, savedArchitectures, systems, moduleConfigurations,
  invariantRules, encapsulations, simulations, ingestionRecords,
  messageBoards, boardMessages, chatMessages,
  type User, type InsertUser, type InsertEmailPasswordUser, type UpsertUser,
  type ArchitectureStep, type InsertArchitectureStep,
  type DomainExample, type InsertDomainExample,
  type RelatedConcept, type InsertRelatedConcept,
  type SavedArchitecture, type InsertSavedArchitecture,
  type Annotation, type InsertAnnotation,
  type System, type InsertSystem,
  type ModuleConfiguration, type InsertModuleConfiguration,
  type InvariantRule, type InsertInvariantRule,
  type Encapsulation, type InsertEncapsulation,
  type Simulation, type InsertSimulation,
  type IngestionRecord, type InsertIngestionRecord,
  type MessageBoard, type InsertMessageBoard,
  type BoardMessage, type InsertBoardMessage,
  type ChatMessage, type InsertChatMessage
} from "@shared/schema";
import { db, pool } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User operations (supports both Replit Auth and email/password)
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByEmailVerificationToken(token: string): Promise<User | undefined>;
  getUserByReplitUserId(replitUserId: string): Promise<User | undefined>;
  upsertUser(userData: UpsertUser): Promise<User>;
  createUser(user: InsertUser | InsertEmailPasswordUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  
  // Architecture steps operations
  getArchitectureStep(id: number): Promise<ArchitectureStep | undefined>;
  getArchitectureStepByNumber(stepNumber: number): Promise<ArchitectureStep | undefined>;
  getAllArchitectureSteps(): Promise<ArchitectureStep[]>;
  createArchitectureStep(step: InsertArchitectureStep): Promise<ArchitectureStep>;
  
  // Domain example operations
  getDomainExamplesByStep(stepId: number): Promise<DomainExample[]>;
  getDomainExamplesByDomain(domain: string): Promise<DomainExample[]>;
  getDomainExampleByStepAndDomain(stepId: number, domain: string): Promise<DomainExample | undefined>;
  createDomainExample(example: InsertDomainExample): Promise<DomainExample>;
  
  // Related concepts operations
  getRelatedConceptsByStep(stepId: number): Promise<RelatedConcept[]>;
  createRelatedConcept(concept: InsertRelatedConcept): Promise<RelatedConcept>;
  
  // Saved architecture operations
  getSavedArchitecturesByUser(userId: number): Promise<SavedArchitecture[]>;
  getSavedArchitecture(id: number): Promise<SavedArchitecture | undefined>;
  createSavedArchitecture(architecture: InsertSavedArchitecture): Promise<SavedArchitecture>;
  updateSavedArchitectureStep(id: number, step: number): Promise<SavedArchitecture | undefined>;
  
  // Annotation operations
  getAnnotationsByUser(userId: number): Promise<Annotation[]>;
  getAnnotationsByStep(stepId: number): Promise<Annotation[]>;
  getAnnotationsByUserAndStep(userId: number, stepId: number): Promise<Annotation[]>;
  createAnnotation(annotation: InsertAnnotation): Promise<Annotation>;
  updateAnnotation(id: number, content: string): Promise<Annotation | undefined>;
  deleteAnnotation(id: number): Promise<boolean>;
  
  // System operations
  getSystemsByUser(userId: number): Promise<System[]>;
  getSystem(id: number): Promise<System | undefined>;
  createSystem(system: InsertSystem): Promise<System>;
  updateSystem(id: number, updates: Partial<InsertSystem>): Promise<System | undefined>;
  deleteSystem(id: number): Promise<boolean>;
  
  // Module configuration operations
  getModuleConfigurationsBySystem(systemId: number): Promise<ModuleConfiguration[]>;
  getModuleConfiguration(systemId: number, moduleId: number): Promise<ModuleConfiguration | undefined>;
  createModuleConfiguration(config: InsertModuleConfiguration): Promise<ModuleConfiguration>;
  updateModuleConfiguration(id: number, updates: Partial<InsertModuleConfiguration>): Promise<ModuleConfiguration | undefined>;
  
  // Invariant rules operations
  getInvariantRulesByModule(moduleId: number): Promise<InvariantRule[]>;
  getActiveInvariantRulesByModule(moduleId: number): Promise<InvariantRule[]>;
  createInvariantRule(rule: InsertInvariantRule): Promise<InvariantRule>;
  updateInvariantRule(id: number, updates: Partial<InsertInvariantRule>): Promise<InvariantRule | undefined>;
  
  // Social features - Message Boards
  getMessageBoardsBySystem(systemId: number): Promise<MessageBoard[]>;
  getMessageBoard(id: number): Promise<MessageBoard | undefined>;
  createMessageBoard(board: InsertMessageBoard): Promise<MessageBoard>;
  
  // Social features - Board Messages
  getBoardMessagesByBoard(boardId: number): Promise<BoardMessage[]>;
  createBoardMessage(message: InsertBoardMessage): Promise<BoardMessage>;
  
  // Social features - Chat Messages
  getChatMessagesBySystem(systemId: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class DatabaseStorage implements IStorage {
  // User operations (Replit Auth integration)
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByReplitUserId(replitUserId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.replitUserId, replitUserId));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        replitUserId: userData.replitUserId,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileImageUrl: userData.profileImageUrl,
        company: userData.company,
        role: userData.role || "agent",
      })
      .onConflictDoUpdate({
        target: users.replitUserId,
        set: {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          profileImageUrl: userData.profileImageUrl,
          company: userData.company,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async createUser(insertUser: InsertUser | InsertEmailPasswordUser): Promise<User> {
    const [user] = await db.insert(users).values([insertUser as any]).returning();
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async getUserByEmailVerificationToken(token: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.emailVerificationToken, token));
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db.update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }
  
  // Architecture steps operations
  async getArchitectureStep(id: number): Promise<ArchitectureStep | undefined> {
    const [step] = await db.select().from(architectureSteps).where(eq(architectureSteps.id, id));
    return step;
  }
  
  async getArchitectureStepByNumber(stepNumber: number): Promise<ArchitectureStep | undefined> {
    const [step] = await db.select().from(architectureSteps).where(eq(architectureSteps.stepNumber, stepNumber));
    return step;
  }
  
  async getAllArchitectureSteps(): Promise<ArchitectureStep[]> {
    return await db.select().from(architectureSteps).orderBy(architectureSteps.stepNumber);
  }
  
  async createArchitectureStep(step: InsertArchitectureStep): Promise<ArchitectureStep> {
    // Convert arrays to correctly formatted JSON
    // Use basic db query rather than ORM for JSON compatibility
    const query = `
      INSERT INTO architecture_steps 
      (name, step_number, description, key_characteristics, diagram_data) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *
    `;
    const result = await pool.query(query, [
      step.name,
      step.stepNumber,
      step.description,
      JSON.stringify(step.keyCharacteristics),
      JSON.stringify(step.diagramData)
    ]);
    
    return result.rows[0] as ArchitectureStep;
  }
  
  // Domain example operations
  async getDomainExamplesByStep(stepId: number): Promise<DomainExample[]> {
    return await db.select().from(domainExamples).where(eq(domainExamples.stepId, stepId));
  }
  
  async getDomainExamplesByDomain(domain: string): Promise<DomainExample[]> {
    return await db.select().from(domainExamples).where(eq(domainExamples.domain, domain));
  }
  
  async getDomainExampleByStepAndDomain(stepId: number, domain: string): Promise<DomainExample | undefined> {
    const [example] = await db.select().from(domainExamples)
      .where(and(
        eq(domainExamples.stepId, stepId),
        eq(domainExamples.domain, domain)
      ));
    return example;
  }
  
  async createDomainExample(example: InsertDomainExample): Promise<DomainExample> {
    // Use basic db query rather than ORM for JSON compatibility
    const query = `
      INSERT INTO domain_examples 
      (step_id, domain, title, description, tags) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *
    `;
    const result = await pool.query(query, [
      example.stepId,
      example.domain,
      example.title,
      example.description,
      JSON.stringify(example.tags)
    ]);
    
    return result.rows[0] as DomainExample;
  }
  
  // Related concepts operations
  async getRelatedConceptsByStep(stepId: number): Promise<RelatedConcept[]> {
    return await db.select().from(relatedConcepts).where(eq(relatedConcepts.stepId, stepId));
  }
  
  async createRelatedConcept(concept: InsertRelatedConcept): Promise<RelatedConcept> {
    const [newConcept] = await db.insert(relatedConcepts).values([concept]).returning();
    return newConcept;
  }
  
  // Saved architecture operations
  async getSavedArchitecturesByUser(userId: number): Promise<SavedArchitecture[]> {
    return await db.select().from(savedArchitectures).where(eq(savedArchitectures.userId, userId));
  }
  
  async getSavedArchitecture(id: number): Promise<SavedArchitecture | undefined> {
    const [architecture] = await db.select().from(savedArchitectures).where(eq(savedArchitectures.id, id));
    return architecture;
  }
  
  async createSavedArchitecture(architecture: InsertSavedArchitecture): Promise<SavedArchitecture> {
    const [newArchitecture] = await db.insert(savedArchitectures).values([architecture]).returning();
    return newArchitecture;
  }
  
  async updateSavedArchitectureStep(id: number, step: number): Promise<SavedArchitecture | undefined> {
    const [architecture] = await db.update(savedArchitectures)
      .set({ 
        currentStep: step, 
        updatedAt: new Date() 
      })
      .where(eq(savedArchitectures.id, id))
      .returning();
    return architecture;
  }
  
  // Annotation operations
  async getAnnotationsByUser(userId: number): Promise<Annotation[]> {
    return await db.select().from(annotations).where(eq(annotations.userId, userId));
  }
  
  async getAnnotationsByStep(stepId: number): Promise<Annotation[]> {
    return await db.select().from(annotations).where(eq(annotations.stepId, stepId));
  }
  
  async getAnnotationsByUserAndStep(userId: number, stepId: number): Promise<Annotation[]> {
    return await db.select().from(annotations)
      .where(and(
        eq(annotations.userId, userId),
        eq(annotations.stepId, stepId)
      ));
  }
  
  async createAnnotation(annotation: InsertAnnotation): Promise<Annotation> {
    const [newAnnotation] = await db.insert(annotations).values([annotation]).returning();
    return newAnnotation;
  }
  
  async updateAnnotation(id: number, content: string): Promise<Annotation | undefined> {
    const [annotation] = await db.update(annotations)
      .set({ 
        content: content, 
        updatedAt: new Date() 
      })
      .where(eq(annotations.id, id))
      .returning();
    return annotation;
  }
  
  async deleteAnnotation(id: number): Promise<boolean> {
    const result = await db.delete(annotations).where(eq(annotations.id, id)).returning();
    return result.length > 0;
  }
  
  // System operations
  async getSystemsByUser(userId: number): Promise<System[]> {
    return await db.select().from(systems).where(eq(systems.userId, userId));
  }
  
  async getSystem(id: number): Promise<System | undefined> {
    const [system] = await db.select().from(systems).where(eq(systems.id, id));
    return system;
  }
  
  async createSystem(system: InsertSystem): Promise<System> {
    const query = `
      INSERT INTO systems 
      (user_id, name, description, purpose, current_module_id, status, metadata) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *
    `;
    const result = await pool.query(query, [
      system.userId,
      system.name,
      system.description || null,
      system.purpose || null,
      system.currentModuleId || null,
      system.status || 'draft',
      system.metadata ? JSON.stringify(system.metadata) : null
    ]);
    
    return result.rows[0] as System;
  }
  
  async updateSystem(id: number, updates: Partial<InsertSystem>): Promise<System | undefined> {
    const [system] = await db.update(systems)
      .set({ 
        ...updates, 
        updatedAt: new Date() 
      })
      .where(eq(systems.id, id))
      .returning();
    return system;
  }
  
  async deleteSystem(id: number): Promise<boolean> {
    const result = await db.delete(systems).where(eq(systems.id, id)).returning();
    return result.length > 0;
  }
  
  // Module configuration operations
  async getModuleConfigurationsBySystem(systemId: number): Promise<ModuleConfiguration[]> {
    return await db.select().from(moduleConfigurations).where(eq(moduleConfigurations.systemId, systemId));
  }
  
  async getModuleConfiguration(systemId: number, moduleId: number): Promise<ModuleConfiguration | undefined> {
    const [config] = await db.select().from(moduleConfigurations)
      .where(and(
        eq(moduleConfigurations.systemId, systemId),
        eq(moduleConfigurations.moduleId, moduleId)
      ));
    return config;
  }
  
  async createModuleConfiguration(config: InsertModuleConfiguration): Promise<ModuleConfiguration> {
    const query = `
      INSERT INTO module_configurations 
      (system_id, module_id, conditions, inputs, outputs, visualization_data, deliverables) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *
    `;
    const result = await pool.query(query, [
      config.systemId,
      config.moduleId,
      config.conditions ? JSON.stringify(config.conditions) : null,
      config.inputs ? JSON.stringify(config.inputs) : null,
      config.outputs ? JSON.stringify(config.outputs) : null,
      config.visualizationData ? JSON.stringify(config.visualizationData) : null,
      config.deliverables ? JSON.stringify(config.deliverables) : null
    ]);
    
    return result.rows[0] as ModuleConfiguration;
  }
  
  async updateModuleConfiguration(id: number, updates: Partial<InsertModuleConfiguration>): Promise<ModuleConfiguration | undefined> {
    const updateData: Record<string, any> = { updatedAt: new Date() };
    
    if (updates.systemId !== undefined) updateData.systemId = updates.systemId;
    if (updates.moduleId !== undefined) updateData.moduleId = updates.moduleId;
    if (updates.conditions !== undefined) updateData.conditions = updates.conditions;
    if (updates.inputs !== undefined) updateData.inputs = updates.inputs;
    if (updates.outputs !== undefined) updateData.outputs = updates.outputs;
    if (updates.visualizationData !== undefined) updateData.visualizationData = updates.visualizationData;
    if (updates.deliverables !== undefined) updateData.deliverables = updates.deliverables;
    
    const [config] = await db.update(moduleConfigurations)
      .set(updateData)
      .where(eq(moduleConfigurations.id, id))
      .returning();
    return config;
  }
  
  // Invariant rules operations
  async getInvariantRulesByModule(moduleId: number): Promise<InvariantRule[]> {
    return await db.select().from(invariantRules).where(eq(invariantRules.moduleId, moduleId));
  }
  
  async getActiveInvariantRulesByModule(moduleId: number): Promise<InvariantRule[]> {
    return await db.select().from(invariantRules)
      .where(and(
        eq(invariantRules.moduleId, moduleId),
        eq(invariantRules.isActive, true)
      ));
  }
  
  async createInvariantRule(rule: InsertInvariantRule): Promise<InvariantRule> {
    const query = `
      INSERT INTO invariant_rules 
      (module_id, rule_name, rule_description, rule_type, rule_data, is_active, publisher_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *
    `;
    const result = await pool.query(query, [
      rule.moduleId,
      rule.ruleName,
      rule.ruleDescription,
      rule.ruleType,
      JSON.stringify(rule.ruleData),
      rule.isActive !== undefined ? rule.isActive : true,
      rule.publisherId || null
    ]);
    
    return result.rows[0] as InvariantRule;
  }
  
  async updateInvariantRule(id: number, updates: Partial<InsertInvariantRule>): Promise<InvariantRule | undefined> {
    const [rule] = await db.update(invariantRules)
      .set({ 
        ...updates, 
        updatedAt: new Date() 
      })
      .where(eq(invariantRules.id, id))
      .returning();
    return rule;
  }
  
  // Social features - Message Boards
  async getMessageBoardsBySystem(systemId: number): Promise<MessageBoard[]> {
    return await db.select().from(messageBoards)
      .where(eq(messageBoards.systemId, systemId))
      .orderBy(messageBoards.createdAt);
  }
  
  async getMessageBoard(id: number): Promise<MessageBoard | undefined> {
    const [board] = await db.select().from(messageBoards).where(eq(messageBoards.id, id));
    return board;
  }
  
  async createMessageBoard(board: InsertMessageBoard): Promise<MessageBoard> {
    const [newBoard] = await db.insert(messageBoards).values(board).returning();
    return newBoard;
  }
  
  // Social features - Board Messages
  async getBoardMessagesByBoard(boardId: number): Promise<BoardMessage[]> {
    return await db.select().from(boardMessages)
      .where(eq(boardMessages.boardId, boardId))
      .orderBy(boardMessages.createdAt);
  }
  
  async createBoardMessage(message: InsertBoardMessage): Promise<BoardMessage> {
    const [newMessage] = await db.insert(boardMessages).values(message).returning();
    return newMessage;
  }
  
  // Social features - Chat Messages  
  async getChatMessagesBySystem(systemId: number): Promise<ChatMessage[]> {
    return await db.select().from(chatMessages)
      .where(eq(chatMessages.systemId, systemId))
      .orderBy(chatMessages.createdAt);
  }
  
  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const [newMessage] = await db.insert(chatMessages).values(message).returning();
    return newMessage;
  }
}

export const storage = new DatabaseStorage();
