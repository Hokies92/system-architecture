import { pool } from "../server/db";
import {
  type InsertArchitectureStep,
  type InsertDomainExample,
  type InsertRelatedConcept 
} from "../shared/schema";

// Example data for seeding
const steps: InsertArchitectureStep[] = [
  {
    stepNumber: 1,
    name: "Context",
    description: "Understanding the environment in which a system operates, including constraints, requirements, and stakeholders.",
    keyCharacteristics: [
      "Identifies all relevant stakeholders and their concerns",
      "Defines system boundaries and external interfaces",
      "Captures business goals and technical constraints"
    ],
    diagramData: { type: "context", nodes: [], links: [] }
  },
  {
    stepNumber: 2,
    name: "Components",
    description: "Identifying the modular building blocks of the system that encapsulate specific functionality.",
    keyCharacteristics: [
      "High cohesion within components",
      "Well-defined interfaces between components",
      "Clear separation of concerns"
    ],
    diagramData: { type: "components", nodes: [], links: [] }
  },
  {
    stepNumber: 3,
    name: "Connections",
    description: "Defining how components interact with each other through well-defined interfaces.",
    keyCharacteristics: [
      "Low coupling between components",
      "Standardized communication protocols",
      "Clear data flow pathways"
    ],
    diagramData: { type: "connections", nodes: [], links: [] }
  }
];

const domainExamples: InsertDomainExample[] = [
  {
    stepId: 1, // Will be replaced with actual ID after step creation
    domain: "software",
    title: "E-commerce System Context",
    description: "The context for an e-commerce platform includes customers, merchants, payment processors, and shipping providers as external entities.",
    tags: ["e-commerce", "microservices", "context mapping"]
  },
  {
    stepId: 1, // Will be replaced with actual ID after step creation
    domain: "hardware",
    title: "Embedded System Context",
    description: "The context for an embedded system includes physical sensors, actuators, and external systems it interfaces with.",
    tags: ["embedded systems", "IoT", "real-time"]
  },
  {
    stepId: 2, // Will be replaced with actual ID after step creation
    domain: "software",
    title: "Microservice Components",
    description: "A microservice architecture breaks down an application into discrete, independently deployable services organized around business capabilities.",
    tags: ["microservices", "API gateway", "service discovery"]
  },
  {
    stepId: 2, // Will be replaced with actual ID after step creation
    domain: "hardware",
    title: "System-on-Chip Components",
    description: "A modern SoC includes CPU cores, GPU, memory controllers, and various peripheral interfaces integrated onto a single chip.",
    tags: ["SoC", "FPGA", "hardware acceleration"]
  },
  {
    stepId: 3, // Will be replaced with actual ID after step creation
    domain: "software",
    title: "API Integration Patterns",
    description: "Modern distributed systems connect through RESTful APIs, GraphQL, messaging queues, or event streams.",
    tags: ["APIs", "event-driven", "message queues"]
  },
  {
    stepId: 3, // Will be replaced with actual ID after step creation
    domain: "hardware",
    title: "Bus Architectures",
    description: "Hardware components communicate via standardized bus protocols like PCI Express, USB, or internal communication buses.",
    tags: ["bus protocols", "interfaces", "I/O"]
  }
];

const relatedConcepts: InsertRelatedConcept[] = [
  {
    stepId: 1, // Will be replaced with actual ID after step creation
    concept: "Domain-Driven Design"
  },
  {
    stepId: 1, // Will be replaced with actual ID after step creation
    concept: "Stakeholder Analysis"
  },
  {
    stepId: 2, // Will be replaced with actual ID after step creation
    concept: "Modular Design"
  },
  {
    stepId: 2, // Will be replaced with actual ID after step creation
    concept: "Encapsulation"
  },
  {
    stepId: 3, // Will be replaced with actual ID after step creation
    concept: "Loose Coupling"
  },
  {
    stepId: 3, // Will be replaced with actual ID after step creation
    concept: "Interface Design"
  }
];

// Function to seed the database
async function seedDatabase() {
  try {
    console.log("Starting database seeding...");
    
    // Insert architecture steps and collect their IDs
    const stepIds: Record<number, number> = {};
    
    for (const step of steps) {
      console.log(`Adding step: ${step.name}`);
      const query = `
        INSERT INTO architecture_steps 
        (step_number, name, description, key_characteristics, diagram_data) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING id
      `;
      const result = await pool.query(query, [
        step.stepNumber,
        step.name,
        step.description,
        JSON.stringify(step.keyCharacteristics),
        JSON.stringify(step.diagramData)
      ]);
      
      const stepId = result.rows[0].id;
      stepIds[step.stepNumber] = stepId;
      console.log(`Step ${step.name} added with ID: ${stepId}`);
    }
    
    // Update domain examples with correct step IDs
    for (const example of domainExamples) {
      const stepId = stepIds[example.stepId];
      console.log(`Adding domain example: ${example.title} for step ID ${stepId}`);
      
      const query = `
        INSERT INTO domain_examples 
        (step_id, domain, title, description, tags) 
        VALUES ($1, $2, $3, $4, $5)
      `;
      await pool.query(query, [
        stepId,
        example.domain,
        example.title,
        example.description,
        JSON.stringify(example.tags)
      ]);
    }
    
    // Update related concepts with correct step IDs
    for (const concept of relatedConcepts) {
      const stepId = stepIds[concept.stepId];
      console.log(`Adding related concept: ${concept.concept} for step ID ${stepId}`);
      
      const query = `
        INSERT INTO related_concepts 
        (step_id, concept) 
        VALUES ($1, $2)
      `;
      await pool.query(query, [stepId, concept.concept]);
    }
    
    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error during database seeding:", error);
  } finally {
    console.log("Closing database connection...");
    await pool.end();
  }
}

// Run the seeding process
seedDatabase();