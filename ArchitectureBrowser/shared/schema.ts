import { pgTable, text, serial, integer, boolean, timestamp, json, varchar, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: json("sess").$type<any>().notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Users with role-based permissions (5 classes: architect, designer, contributor, agent, administrator)
// Supports both Replit Auth (OAuth) and email/password authentication with email and SMS verification
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  replitUserId: text("replit_user_id").unique(), // For Replit Auth (OAuth)
  profileImageUrl: text("profile_image_url"), // For Replit Auth profile image
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email").unique().notNull(), // Username is always email
  password: text("password"), // Hashed password (nullable for OAuth users)
  phone: text("phone"), // For SMS verification
  company: text("company"),
  role: text("role").notNull().default("architect"), // All new users get architect status
  stripeCustomerId: text("stripe_customer_id"),
  entitlements: json("entitlements").$type<Record<string, any>>(),
  emailVerified: boolean("email_verified").notNull().default(false),
  phoneVerified: boolean("phone_verified").notNull().default(false),
  emailVerificationToken: text("email_verification_token"),
  phoneVerificationCode: text("phone_verification_code"),
  phoneVerificationExpires: timestamp("phone_verification_expires"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const usersRelations = relations(users, ({ many }) => ({
  savedArchitectures: many(savedArchitectures),
  annotations: many(annotations),
  systems: many(systems),
  chatMessages: many(chatMessages),
  boardMessages: many(boardMessages),
  createdBoards: many(messageBoards),
}));

// Architecture Steps
export const architectureSteps = pgTable("architecture_steps", {
  id: serial("id").primaryKey(),
  stepNumber: integer("step_number").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  keyCharacteristics: json("key_characteristics").$type<string[]>().notNull(),
  diagramData: json("diagram_data").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const architectureStepsRelations = relations(architectureSteps, ({ many }) => ({
  domainExamples: many(domainExamples),
  relatedConcepts: many(relatedConcepts),
}));

// Domain Examples
export const domainExamples = pgTable("domain_examples", {
  id: serial("id").primaryKey(),
  stepId: integer("step_id").references(() => architectureSteps.id),
  domain: text("domain").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  tags: json("tags").$type<string[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const domainExamplesRelations = relations(domainExamples, ({ one }) => ({
  step: one(architectureSteps, {
    fields: [domainExamples.stepId],
    references: [architectureSteps.id],
  }),
}));

// Related Concepts
export const relatedConcepts = pgTable("related_concepts", {
  id: serial("id").primaryKey(),
  stepId: integer("step_id").references(() => architectureSteps.id),
  concept: text("concept").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const relatedConceptsRelations = relations(relatedConcepts, ({ one }) => ({
  step: one(architectureSteps, {
    fields: [relatedConcepts.stepId],
    references: [architectureSteps.id],
  }),
}));

// User Saved Architectures
export const savedArchitectures = pgTable("saved_architectures", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  currentStep: integer("current_step").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const savedArchitecturesRelations = relations(savedArchitectures, ({ one }) => ({
  user: one(users, {
    fields: [savedArchitectures.userId],
    references: [users.id],
  }),
}));

// User Annotations
export const annotations = pgTable("annotations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  stepId: integer("step_id").references(() => architectureSteps.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const annotationsRelations = relations(annotations, ({ one }) => ({
  user: one(users, {
    fields: [annotations.userId],
    references: [users.id],
  }),
  step: one(architectureSteps, {
    fields: [annotations.stepId],
    references: [architectureSteps.id],
  }),
}));

// Systems - User-created system architecture projects
export const systems = pgTable("systems", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  purpose: text("purpose"),
  currentModuleId: integer("current_module_id"),
  status: text("status").notNull().default("draft"), // draft, active, completed
  metadata: json("metadata").$type<Record<string, any>>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const systemsRelations = relations(systems, ({ one, many }) => ({
  user: one(users, {
    fields: [systems.userId],
    references: [users.id],
  }),
  moduleConfigurations: many(moduleConfigurations),
  encapsulations: many(encapsulations),
  simulations: many(simulations),
  ingestionRecords: many(ingestionRecords),
  messageBoards: many(messageBoards),
  chatMessages: many(chatMessages),
}));

// Module Configurations - Per-system, per-module settings and data
export const moduleConfigurations = pgTable("module_configurations", {
  id: serial("id").primaryKey(),
  systemId: integer("system_id").references(() => systems.id),
  moduleId: integer("module_id").references(() => architectureSteps.id),
  conditions: json("conditions").$type<Record<string, any>>(),
  inputs: json("inputs").$type<Record<string, any>>(),
  outputs: json("outputs").$type<Record<string, any>>(),
  visualizationData: json("visualization_data"),
  deliverables: json("deliverables").$type<string[]>(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const moduleConfigurationsRelations = relations(moduleConfigurations, ({ one }) => ({
  system: one(systems, {
    fields: [moduleConfigurations.systemId],
    references: [systems.id],
  }),
  module: one(architectureSteps, {
    fields: [moduleConfigurations.moduleId],
    references: [architectureSteps.id],
  }),
}));

// Invariant Rules - Publisher-controlled rules that govern system behavior
export const invariantRules = pgTable("invariant_rules", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").references(() => architectureSteps.id),
  ruleName: text("rule_name").notNull(),
  ruleDescription: text("rule_description").notNull(),
  ruleType: text("rule_type").notNull(), // constraint, validation, pattern
  ruleData: json("rule_data").$type<Record<string, any>>().notNull(),
  isActive: boolean("is_active").notNull().default(true),
  publisherId: integer("publisher_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const invariantRulesRelations = relations(invariantRules, ({ one }) => ({
  module: one(architectureSteps, {
    fields: [invariantRules.moduleId],
    references: [architectureSteps.id],
  }),
  publisher: one(users, {
    fields: [invariantRules.publisherId],
    references: [users.id],
  }),
}));

// Encapsulations - Module-specific emergent outputs and conditions
export const encapsulations = pgTable("encapsulations", {
  id: serial("id").primaryKey(),
  systemId: integer("system_id").references(() => systems.id),
  moduleId: integer("module_id").references(() => architectureSteps.id),
  name: text("name").notNull(),
  conditions: json("conditions").$type<Record<string, any>>().notNull(),
  emergentOutputs: json("emergent_outputs").$type<Record<string, any>>(),
  boundaries: json("boundaries").$type<Record<string, any>>(),
  forces: json("forces").$type<string[]>(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const encapsulationsRelations = relations(encapsulations, ({ one }) => ({
  system: one(systems, {
    fields: [encapsulations.systemId],
    references: [systems.id],
  }),
  module: one(architectureSteps, {
    fields: [encapsulations.moduleId],
    references: [architectureSteps.id],
  }),
}));

// Simulations - Module simulation runs and results
export const simulations = pgTable("simulations", {
  id: serial("id").primaryKey(),
  systemId: integer("system_id").references(() => systems.id),
  moduleId: integer("module_id").references(() => architectureSteps.id),
  name: text("name").notNull(),
  parameters: json("parameters").$type<Record<string, any>>().notNull(),
  results: json("results").$type<Record<string, any>>(),
  visualizationData: json("visualization_data"),
  status: text("status").notNull().default("pending"), // pending, running, completed, failed
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const simulationsRelations = relations(simulations, ({ one }) => ({
  system: one(systems, {
    fields: [simulations.systemId],
    references: [systems.id],
  }),
  module: one(architectureSteps, {
    fields: [simulations.moduleId],
    references: [architectureSteps.id],
  }),
}));

// Ingestion Records - User input tracking for system creation
export const ingestionRecords = pgTable("ingestion_records", {
  id: serial("id").primaryKey(),
  systemId: integer("system_id").references(() => systems.id),
  moduleId: integer("module_id").references(() => architectureSteps.id),
  inputType: text("input_type").notNull(), // text, file, structured_data, api
  inputData: json("input_data").$type<Record<string, any>>().notNull(),
  processedData: json("processed_data").$type<Record<string, any>>(),
  status: text("status").notNull().default("pending"), // pending, processed, failed
  createdAt: timestamp("created_at").defaultNow(),
  processedAt: timestamp("processed_at"),
});

export const ingestionRecordsRelations = relations(ingestionRecords, ({ one }) => ({
  system: one(systems, {
    fields: [ingestionRecords.systemId],
    references: [systems.id],
  }),
  module: one(architectureSteps, {
    fields: [ingestionRecords.moduleId],
    references: [architectureSteps.id],
  }),
}));

// Message Boards - Discussion threads for each system
export const messageBoards = pgTable("message_boards", {
  id: serial("id").primaryKey(),
  systemId: integer("system_id").references(() => systems.id),
  title: text("title").notNull(),
  description: text("description"),
  createdBy: integer("created_by").references(() => users.id),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const messageBoardsRelations = relations(messageBoards, ({ one, many }) => ({
  system: one(systems, {
    fields: [messageBoards.systemId],
    references: [systems.id],
  }),
  creator: one(users, {
    fields: [messageBoards.createdBy],
    references: [users.id],
  }),
  messages: many(boardMessages),
}));

// Board Messages - Posts on message boards
export const boardMessages = pgTable("board_messages", {
  id: serial("id").primaryKey(),
  boardId: integer("board_id").references(() => messageBoards.id),
  userId: integer("user_id").references(() => users.id),
  content: text("content").notNull(),
  parentMessageId: integer("parent_message_id"), // For threaded replies
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const boardMessagesRelations = relations(boardMessages, ({ one }) => ({
  board: one(messageBoards, {
    fields: [boardMessages.boardId],
    references: [messageBoards.id],
  }),
  user: one(users, {
    fields: [boardMessages.userId],
    references: [users.id],
  }),
}));

// Chat Messages - Real-time chat for each system
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  systemId: integer("system_id").references(() => systems.id),
  userId: integer("user_id").references(() => users.id),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  system: one(systems, {
    fields: [chatMessages.systemId],
    references: [systems.id],
  }),
  user: one(users, {
    fields: [chatMessages.userId],
    references: [users.id],
  }),
}));

// Insert Schemas
// For Replit Auth / OAuth users
export const insertUserSchema = createInsertSchema(users).pick({
  replitUserId: true,
  firstName: true,
  lastName: true,
  email: true,
  profileImageUrl: true,
  company: true,
  role: true,
  stripeCustomerId: true,
  entitlements: true,
});

// For email/password authentication users
export const insertEmailPasswordUserSchema = createInsertSchema(users).pick({
  firstName: true,
  lastName: true,
  email: true,
  password: true,
  phone: true,
  company: true,
  role: true,
  emailVerified: true,
  phoneVerified: true,
  emailVerificationToken: true,
  phoneVerificationCode: true,
  phoneVerificationExpires: true,
});

// UpsertUser type for Replit Auth integration
export type UpsertUser = {
  replitUserId: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  profileImageUrl?: string | null;
  company?: string | null;
  role?: string;
};

export const insertArchitectureStepSchema = createInsertSchema(architectureSteps).pick({
  stepNumber: true,
  name: true,
  description: true,
  keyCharacteristics: true,
  diagramData: true,
});

export const insertDomainExampleSchema = createInsertSchema(domainExamples).pick({
  stepId: true,
  domain: true,
  title: true,
  description: true,
  tags: true,
});

export const insertRelatedConceptSchema = createInsertSchema(relatedConcepts).pick({
  stepId: true,
  concept: true,
});

export const insertSavedArchitectureSchema = createInsertSchema(savedArchitectures).pick({
  userId: true,
  name: true,
  description: true,
  currentStep: true,
});

export const insertAnnotationSchema = createInsertSchema(annotations).pick({
  userId: true,
  stepId: true,
  content: true,
});

export const insertSystemSchema = createInsertSchema(systems).pick({
  userId: true,
  name: true,
  description: true,
  purpose: true,
  currentModuleId: true,
  status: true,
  metadata: true,
});

export const insertModuleConfigurationSchema = createInsertSchema(moduleConfigurations).pick({
  systemId: true,
  moduleId: true,
  conditions: true,
  inputs: true,
  outputs: true,
  visualizationData: true,
  deliverables: true,
});

export const insertInvariantRuleSchema = createInsertSchema(invariantRules).pick({
  moduleId: true,
  ruleName: true,
  ruleDescription: true,
  ruleType: true,
  ruleData: true,
  isActive: true,
  publisherId: true,
});

export const insertEncapsulationSchema = createInsertSchema(encapsulations).pick({
  systemId: true,
  moduleId: true,
  name: true,
  conditions: true,
  emergentOutputs: true,
  boundaries: true,
  forces: true,
});

export const insertSimulationSchema = createInsertSchema(simulations).pick({
  systemId: true,
  moduleId: true,
  name: true,
  parameters: true,
  results: true,
  visualizationData: true,
  status: true,
});

export const insertIngestionRecordSchema = createInsertSchema(ingestionRecords).pick({
  systemId: true,
  moduleId: true,
  inputType: true,
  inputData: true,
  processedData: true,
  status: true,
});

export const insertMessageBoardSchema = createInsertSchema(messageBoards).pick({
  systemId: true,
  title: true,
  description: true,
  createdBy: true,
  isActive: true,
});

export const insertBoardMessageSchema = createInsertSchema(boardMessages).pick({
  boardId: true,
  userId: true,
  content: true,
  parentMessageId: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).pick({
  systemId: true,
  userId: true,
  message: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertEmailPasswordUser = z.infer<typeof insertEmailPasswordUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertArchitectureStep = z.infer<typeof insertArchitectureStepSchema>;
export type ArchitectureStep = typeof architectureSteps.$inferSelect;

export type InsertDomainExample = z.infer<typeof insertDomainExampleSchema>;
export type DomainExample = typeof domainExamples.$inferSelect;

export type InsertRelatedConcept = z.infer<typeof insertRelatedConceptSchema>;
export type RelatedConcept = typeof relatedConcepts.$inferSelect;

export type InsertSavedArchitecture = z.infer<typeof insertSavedArchitectureSchema>;
export type SavedArchitecture = typeof savedArchitectures.$inferSelect;

export type InsertAnnotation = z.infer<typeof insertAnnotationSchema>;
export type Annotation = typeof annotations.$inferSelect;

export type InsertSystem = z.infer<typeof insertSystemSchema>;
export type System = typeof systems.$inferSelect;

export type InsertModuleConfiguration = z.infer<typeof insertModuleConfigurationSchema>;
export type ModuleConfiguration = typeof moduleConfigurations.$inferSelect;

export type InsertInvariantRule = z.infer<typeof insertInvariantRuleSchema>;
export type InvariantRule = typeof invariantRules.$inferSelect;

export type InsertEncapsulation = z.infer<typeof insertEncapsulationSchema>;
export type Encapsulation = typeof encapsulations.$inferSelect;

export type InsertSimulation = z.infer<typeof insertSimulationSchema>;
export type Simulation = typeof simulations.$inferSelect;

export type InsertIngestionRecord = z.infer<typeof insertIngestionRecordSchema>;
export type IngestionRecord = typeof ingestionRecords.$inferSelect;

export type InsertMessageBoard = z.infer<typeof insertMessageBoardSchema>;
export type MessageBoard = typeof messageBoards.$inferSelect;

export type InsertBoardMessage = z.infer<typeof insertBoardMessageSchema>;
export type BoardMessage = typeof boardMessages.$inferSelect;

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
