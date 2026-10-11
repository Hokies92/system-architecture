// Step descriptions - detailed explanations for each step
export const stepDescriptions: Record<number, string> = {
  1: "Every system exists within a Space, which represents the environment or context in which the system operates. The space encompasses all potential influences, resources, and constraints that can affect the system.",
  2: "The Boundary defines what's inside vs. outside the system. It delineates the scope and establishes a clear separation between the system and its environment.",
  3: "Forces are the external pressures and influences that act upon the system from the environment. These forces shape how the system evolves and behaves.",
  4: "The Purpose is the core reason the system exists. It defines what the system is meant to accomplish and guides all design decisions.",
  5: "Structure refers to the organization and arrangement of system elements. It defines how parts fit together to form a coherent whole.",
  6: "Mechanism describes the processes and methods by which the system performs its functions. These are the dynamic aspects that drive the system's behavior.",
  7: "Parts & Connections are the individual elements and their relationships that make up the system. These are the physical or conceptual building blocks.",
  8: "Behavior refers to the observable outcomes and actions of the system. This is what the system does and how it responds to inputs and environmental changes.",
  9: "Input & Output define what enters and exits the system across its boundaries.",
  10: "The Complete System Architecture brings together all components to form a unified whole. All elements work together to fulfill the system's purpose within its environment."
};

// Simple names for each step
export const stepNames: Record<number, string> = {
  1: "Space",
  2: "Boundary",
  3: "Forces",
  4: "Purpose",
  5: "Structure",
  6: "Mechanism",
  7: "Parts & Connections",
  8: "Behavior",
  9: "Input & Output",
  10: "Complete System"
};

// Key characteristics of each component
export const keyCharacteristics: Record<number, string[]> = {
  1: [
    "Defines the context in which the system operates",
    "Represents the broader environment surrounding the system",
    "Contains all potential resources available to the system",
    "Imposes constraints on what the system can do"
  ],
  2: [
    "Defines what is inside vs. outside the system",
    "Determines the scope of the system",
    "Controls what enters and exits the system",
    "Can be physical, conceptual, or organizational"
  ],
  3: [
    "External pressures that influence system behavior",
    "Can be environmental, market, technological, or social",
    "Drive adaptation and evolution in the system",
    "Can create opportunities or pose threats"
  ],
  4: [
    "The reason the system exists",
    "Guides all system design decisions",
    "Defines success criteria for the system",
    "Aligns all system components towards common goals"
  ],
  5: [
    "The organization of system elements",
    "Defines relationships between components",
    "Establishes hierarchies and dependencies",
    "Provides stability and coherence to the system"
  ],
  6: [
    "The processes that make the system function",
    "The 'how' of system operation",
    "Can include algorithms, workflows, or methods",
    "The dynamic aspect of system architecture"
  ],
  7: [
    "The individual elements that form the system",
    "The connections and relationships between elements",
    "The building blocks of system functionality",
    "Can be physical components or conceptual modules"
  ],
  8: [
    "How the system responds to inputs and changes",
    "Observable actions and outcomes of the system",
    "How the system fulfills its purpose",
    "Can be predicted, measured, and evaluated"
  ],
  9: [
    "What the system consumes or requires",
    "What the system produces or delivers",
    "The flow of information, energy, or materials",
    "The interface between system and environment"
  ],
  10: [
    "The integration of all system components",
    "The unified functioning of the entire system",
    "The holistic view of system design",
    "The complete blueprint of system architecture"
  ]
};

// Domain examples for each step and domain
export const domainExamples: Record<string, Record<number, { title: string; description: string; tags: string[] }>> = {
  software: {
    1: {
      title: "Cloud Computing Environment",
      description: "Cloud platforms represent the operating space for modern applications, providing computing resources, services, and infrastructure.",
      tags: ["AWS", "Azure", "Scalability", "Resources"]
    },
    2: {
      title: "API Boundaries",
      description: "APIs define the boundaries between services, specifying how components interact while hiding implementation details.",
      tags: ["REST", "GraphQL", "Interfaces", "Contracts"]
    },
    3: {
      title: "Market & Technical Forces",
      description: "Software systems face external pressures like user demands, competitive features, and emerging technologies that shape development priorities.",
      tags: ["Competition", "User Requirements", "Technology Trends"]
    },
    4: {
      title: "System Requirements & Goals",
      description: "The functional and non-functional requirements that define what the software needs to accomplish for its users.",
      tags: ["User Stories", "Acceptance Criteria", "Business Value"]
    },
    5: {
      title: "Software Architecture Patterns",
      description: "Organizational patterns that define how software components are arranged, such as microservices, layered architecture, or event-driven systems.",
      tags: ["Microservices", "MVC", "Layered Architecture"]
    },
    6: {
      title: "Algorithms & Processing Logic",
      description: "The specific processes, algorithms, and business logic that perform the system's core functions.",
      tags: ["Algorithms", "Workflows", "Business Logic"]
    },
    7: {
      title: "Services, Modules & Dependencies",
      description: "The individual components like services, libraries, and modules that make up the application and their interdependencies.",
      tags: ["Services", "Libraries", "Dependencies"]
    },
    8: {
      title: "Runtime Behavior & Performance",
      description: "How the system behaves during operation, including its performance characteristics, error handling, and response to user actions.",
      tags: ["Performance", "Error Handling", "User Experience"]
    },
    9: {
      title: "Data Flow & API Contracts",
      description: "The data that flows into and out of the system through its interfaces, including database interactions and API responses.",
      tags: ["Data Inputs", "API Responses", "Events"]
    },
    10: {
      title: "Full-Stack Application",
      description: "The complete software system incorporating all layers from UI to database, working together to deliver the intended functionality.",
      tags: ["Integration", "Deployment", "Full Solution"]
    }
  },
  hardware: {
    1: {
      title: "Physical & Electrical Environment",
      description: "The physical space and electrical environment in which hardware systems operate, including power supply, cooling, and electromagnetic conditions.",
      tags: ["Power", "Cooling", "Physical Space"]
    },
    2: {
      title: "System Enclosure & Interfaces",
      description: "The physical boundaries of hardware systems defined by enclosures, and their external interfaces like ports and connectors.",
      tags: ["Enclosure", "Ports", "Physical Interfaces"]
    },
    3: {
      title: "Physical Constraints & Requirements",
      description: "External forces like power limitations, heat dissipation requirements, and size constraints that influence hardware design.",
      tags: ["Power Constraints", "Thermal Requirements", "Size Limitations"]
    },
    4: {
      title: "Functional Requirements",
      description: "The specific functions and capabilities the hardware system must provide, such as processing speed or storage capacity.",
      tags: ["Performance Requirements", "Capabilities", "Specifications"]
    },
    5: {
      title: "Component Layout & Architecture",
      description: "The arrangement of hardware components on circuit boards or within devices, including data paths and signal routing.",
      tags: ["PCB Layout", "Component Arrangement", "Signal Paths"]
    },
    6: {
      title: "Processing Units & Data Paths",
      description: "The mechanisms that process data within hardware systems, including CPUs, GPUs, and specialized processing units.",
      tags: ["CPU", "GPU", "Processing Units"]
    },
    7: {
      title: "Electronic Components & Connections",
      description: "The individual electronic parts like processors, memory, and storage, and the buses and connections between them.",
      tags: ["Processors", "Memory", "Buses"]
    },
    8: {
      title: "Performance & Power Characteristics",
      description: "The operational behavior of hardware systems including speed, power consumption, heat generation, and reliability.",
      tags: ["Speed", "Power Consumption", "Reliability"]
    },
    9: {
      title: "Signals & Physical I/O",
      description: "The electrical signals, data, and physical interactions that enter and exit the hardware system.",
      tags: ["Signal Processing", "Data Transfer", "Physical Inputs"]
    },
    10: {
      title: "Integrated Hardware System",
      description: "The complete hardware system with all components working together to deliver the intended functionality.",
      tags: ["Integration", "System-on-Chip", "Complete Hardware"]
    }
  },
  org: {
    1: {
      title: "Market & Industry Environment",
      description: "The broader business ecosystem in which an organization operates, including market conditions, industry trends, and competitive landscape.",
      tags: ["Market", "Industry", "Business Environment"]
    },
    2: {
      title: "Organizational Boundaries",
      description: "The defined limits of an organization including legal structures, departmental divisions, and external relationships.",
      tags: ["Legal Structure", "Departments", "Organizational Limits"]
    },
    3: {
      title: "Market Pressures & Stakeholder Expectations",
      description: "External forces including market demands, regulatory requirements, and stakeholder expectations that shape organizational decisions.",
      tags: ["Competition", "Regulations", "Stakeholder Demands"]
    },
    4: {
      title: "Mission & Strategic Objectives",
      description: "The core purpose of the organization and its strategic goals that guide decision-making and resource allocation.",
      tags: ["Mission", "Vision", "Strategic Goals"]
    },
    5: {
      title: "Organizational Structure",
      description: "The arrangement of teams, departments, and hierarchies that define how the organization is structured and how authority flows.",
      tags: ["Hierarchy", "Reporting Lines", "Departments"]
    },
    6: {
      title: "Business Processes & Workflows",
      description: "The mechanisms by which work gets done in the organization, including core business processes and operational workflows.",
      tags: ["Processes", "Workflows", "Operations"]
    },
    7: {
      title: "Teams, Roles & Relationships",
      description: "The individual units and positions within the organization and the formal and informal relationships between them.",
      tags: ["Teams", "Roles", "Reporting Relationships"]
    },
    8: {
      title: "Organizational Performance & Culture",
      description: "How the organization functions in practice, including its culture, actual performance, and response to challenges.",
      tags: ["Culture", "Performance Metrics", "Behavior Patterns"]
    },
    9: {
      title: "Resources & Deliverables",
      description: "What the organization consumes (like talent and capital) and what it produces (like products and services).",
      tags: ["Resources", "Products", "Services"]
    },
    10: {
      title: "Complete Organizational System",
      description: "The holistic view of the organization as an integrated system with all components working together toward common goals.",
      tags: ["Integrated Organization", "System View", "Holistic Approach"]
    }
  },
  urban: {
    1: {
      title: "Geographic & Environmental Context",
      description: "The natural and built environment in which urban systems exist, including geography, climate, and existing infrastructure.",
      tags: ["Geography", "Climate", "Regional Context"]
    },
    2: {
      title: "City Limits & Districts",
      description: "The defined boundaries of urban areas including legal jurisdictions, neighborhoods, and zones that delineate the urban system.",
      tags: ["City Limits", "Districts", "Zoning"]
    },
    3: {
      title: "Population Growth & Environmental Factors",
      description: "External pressures on urban systems including population trends, economic factors, and environmental challenges.",
      tags: ["Population Growth", "Economic Pressures", "Environmental Challenges"]
    },
    4: {
      title: "Urban Development Goals",
      description: "The intended purpose of urban development, such as improving quality of life, economic growth, or sustainability.",
      tags: ["Quality of Life", "Economic Development", "Sustainability"]
    },
    5: {
      title: "Urban Layout & Land Use",
      description: "The structural arrangement of urban areas including street grids, land use patterns, and the distribution of buildings and spaces.",
      tags: ["Street Grid", "Land Use", "Spatial Organization"]
    },
    6: {
      title: "Transportation & Utility Systems",
      description: "The mechanisms that enable urban function, including transportation networks, utility distribution, and public services.",
      tags: ["Transportation", "Utilities", "Public Services"]
    },
    7: {
      title: "Buildings, Spaces & Infrastructure",
      description: "The individual elements of urban environments including buildings, public spaces, and infrastructure components.",
      tags: ["Buildings", "Public Spaces", "Infrastructure"]
    },
    8: {
      title: "City Dynamics & Flow Patterns",
      description: "How urban systems behave in operation, including traffic patterns, usage cycles, and responses to events.",
      tags: ["Traffic Patterns", "Usage Cycles", "Urban Dynamics"]
    },
    9: {
      title: "Resources & Urban Production",
      description: "What cities consume (like energy and resources) and what they produce (like economic output and quality of life).",
      tags: ["Resource Consumption", "Economic Output", "Livability"]
    },
    10: {
      title: "Integrated Urban System",
      description: "The complete urban system with all components working together as an integrated, functioning city.",
      tags: ["Smart Cities", "Urban Systems", "Integrated Planning"]
    }
  },
  bio: {
    1: {
      title: "Ecological Environment",
      description: "The broader ecosystem in which biological systems exist, including the physical environment and interactions with other organisms.",
      tags: ["Ecosystem", "Habitat", "Environmental Factors"]
    },
    2: {
      title: "Cellular Membranes & Tissue Boundaries",
      description: "The physical boundaries in biological systems that separate different functional areas, from cell membranes to organ systems.",
      tags: ["Cell Membranes", "Tissue Boundaries", "Biological Barriers"]
    },
    3: {
      title: "Environmental Pressures & Stimuli",
      description: "External forces that act on biological systems, including environmental pressures, competitive forces, and selection pressures.",
      tags: ["Environmental Pressures", "Selection Forces", "Stimuli"]
    },
    4: {
      title: "Biological Function & Survival",
      description: "The core purposes of biological systems, including survival, reproduction, and maintaining homeostasis.",
      tags: ["Survival", "Reproduction", "Homeostasis"]
    },
    5: {
      title: "Anatomical Structure & Organization",
      description: "The physical arrangement of biological systems, from cellular organization to body plans and anatomical structures.",
      tags: ["Anatomy", "Body Plan", "Structural Organization"]
    },
    6: {
      title: "Metabolic Processes & Physiology",
      description: "The mechanisms by which biological systems function, including metabolic pathways, physiological processes, and regulatory systems.",
      tags: ["Metabolism", "Physiology", "Regulatory Systems"]
    },
    7: {
      title: "Cells, Tissues & Organs",
      description: "The individual components of biological systems and their interconnections, from cells to tissues to organ systems.",
      tags: ["Cells", "Tissues", "Organs"]
    },
    8: {
      title: "Organism Behavior & Adaptation",
      description: "How biological systems behave and adapt, including responses to stimuli, behavioral patterns, and evolutionary adaptations.",
      tags: ["Behavior", "Adaptation", "Response Patterns"]
    },
    9: {
      title: "Nutrients, Waste & Signals",
      description: "What biological systems take in (like nutrients and oxygen) and what they output (like waste products and signals).",
      tags: ["Nutrients", "Waste Products", "Signaling"]
    },
    10: {
      title: "Complete Biological System",
      description: "The integrated view of a biological system functioning as a whole, from individual organisms to entire ecosystems.",
      tags: ["Homeostasis", "Integrated Systems", "Complex Networks"]
    }
  }
};

// Related concepts for each step
export const relatedConcepts: Record<number, string[]> = {
  1: ["Environmental Analysis", "Context Mapping", "Resource Assessment", "Constraint Identification"],
  2: ["Scope Definition", "Interface Design", "System Isolation", "Boundary Management"],
  3: ["Force Field Analysis", "Pressure Points", "Environmental Scanning", "Trend Analysis"],
  4: ["Goal Setting", "Mission Definition", "Success Criteria", "Stakeholder Analysis"],
  5: ["Organizational Design", "Pattern Recognition", "Structural Modeling", "Architecture Patterns"],
  6: ["Process Mapping", "Workflow Design", "Algorithmic Thinking", "Operational Models"],
  7: ["Component Design", "Relationship Mapping", "Dependency Analysis", "Integration Planning"],
  8: ["Behavioral Modeling", "Performance Analysis", "Response Patterns", "Feedback Systems"],
  9: ["Input/Output Analysis", "Interface Design", "Flow Mapping", "Exchange Patterns"],
  10: ["Systems Integration", "Holistic Design", "Architectural Patterns", "Complex Systems"]
};

// Explore tags for each step
export const exploreTags: Record<number, string[]> = {
  1: ["Context Analysis", "Environmental Scanning", "Situational Awareness", "Resource Mapping"],
  2: ["Boundary Definition", "Scope Management", "Interface Design", "System Delineation"],
  3: ["Force Analysis", "Pressure Points", "External Influences", "Driving Factors"],
  4: ["Purpose Definition", "Mission Setting", "Goal Alignment", "Strategic Intent"],
  5: ["Structural Design", "Pattern Application", "Organizational Forms", "Architecture Styles"],
  6: ["Process Design", "Functional Mapping", "Operational Models", "Mechanism Engineering"],
  7: ["Component Analysis", "Relationship Mapping", "Connection Design", "Part Integration"],
  8: ["Behavioral Analysis", "Response Patterns", "Action Modeling", "Performance Metrics"],
  9: ["Flow Analysis", "Exchange Patterns", "Interface Engineering", "I/O Optimization"],
  10: ["System Integration", "Holistic Design", "Architectural Synthesis", "System Verification"]
};

// Next step information
export const nextStepInfo: Record<number, { number: number; title: string }> = {
  1: { number: 2, title: "Boundary" },
  2: { number: 3, title: "Forces" },
  3: { number: 4, title: "Purpose" },
  4: { number: 5, title: "Structure" },
  5: { number: 6, title: "Mechanism" },
  6: { number: 7, title: "Parts & Connections" },
  7: { number: 8, title: "Behavior" },
  8: { number: 9, title: "Input & Output" },
  9: { number: 10, title: "Complete System" },
  10: { number: 1, title: "Start Over" }
};

// Component analysis data for each step - metrics relevant to each component
export const componentAnalysisData: Record<number, { metrics: Array<{name: string; value: number}>, caption: string }> = {
  1: {
    metrics: [
      { name: 'Context Clarity', value: 85 },
      { name: 'Environmental Factors', value: 72 },
      { name: 'External Influences', value: 64 }
    ],
    caption: 'Analysis of spatial context factors that influence system effectiveness'
  },
  2: {
    metrics: [
      { name: 'Boundary Integrity', value: 79 },
      { name: 'Permeability', value: 63 },
      { name: 'Interface Clarity', value: 82 }
    ],
    caption: 'Measurement of boundary definition and control mechanisms'
  },
  3: {
    metrics: [
      { name: 'Force Magnitude', value: 68 },
      { name: 'Directional Influence', value: 75 },
      { name: 'Constraint Impact', value: 81 }
    ],
    caption: 'Quantification of forces and their influence on system behavior'
  },
  4: {
    metrics: [
      { name: 'Goal Alignment', value: 88 },
      { name: 'Mission Clarity', value: 92 },
      { name: 'Function Definition', value: 76 }
    ],
    caption: 'Assessment of purpose definition and alignment with outcomes'
  },
  5: {
    metrics: [
      { name: 'Hierarchical Levels', value: 65 },
      { name: 'Connection Density', value: 83 },
      { name: 'Structural Integrity', value: 77 }
    ],
    caption: 'Analysis of structural arrangement and relationship patterns'
  },
  6: {
    metrics: [
      { name: 'Process Efficiency', value: 74 },
      { name: 'Method Reliability', value: 81 },
      { name: 'Operational Fluidity', value: 69 }
    ],
    caption: 'Evaluation of mechanism effectiveness and operational efficiency'
  },
  7: {
    metrics: [
      { name: 'Component Quality', value: 86 },
      { name: 'Specialization', value: 78 },
      { name: 'Redundancy', value: 62 }
    ],
    caption: 'Analysis of parts quality and functional specialization'
  },
  8: {
    metrics: [
      { name: 'Responsiveness', value: 79 },
      { name: 'Adaptability', value: 72 },
      { name: 'Consistency', value: 84 }
    ],
    caption: 'Measurement of behavioral patterns and response characteristics'
  },
  9: {
    metrics: [
      { name: 'Input Processing', value: 76 },
      { name: 'Output Quality', value: 82 },
      { name: 'Transformation Efficiency', value: 68 }
    ],
    caption: 'Analysis of I/O processing and transformation effectiveness'
  },
  10: {
    metrics: [
      { name: 'Integration Level', value: 89 },
      { name: 'Emergent Properties', value: 84 },
      { name: 'System Resilience', value: 77 }
    ],
    caption: 'Holistic assessment of system integration and emergent properties'
  }
};