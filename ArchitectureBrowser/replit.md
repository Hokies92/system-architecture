# Growth Enablement - System Architecture Platform

## Overview

This is a **comprehensive system architecture platform** designed to help users build, simulate, and visualize complex systems. The platform transforms linear analytical thinking into systems thinking through 7 integrated modes:

1. **Stepwise** (Core Feature) - Guided hand-holding system builder with step-by-step module progression
2. **New System** - Initialize new system architecture projects
3. **Saved Systems** - Continue work on previously created systems
4. **System Wiki** - Educational content exploring architecture fundamentals across domains (software, biology, organizations, urban planning)
5. **Encapsulator** - Create conditions for each module to generate emergent outputs
6. **Modulator** - Run simulations for each module to visualize system behavior
7. **Ingestion Engine** - Process user inputs to create conditions and data for systems

Built as a full-stack TypeScript application with React frontend, shadcn/ui components, and Express backend with PostgreSQL database storage. Supports **five user classes with hierarchical permissions**: Architect (full access, only 1 per instance, sets entitlements), Designer, Contributor, Agent, and Administrator. Each system includes **social collaboration features**: real-time chat messages and threaded message boards.

**Latest Updates (October 2025):**
- ✅ Integrated Replit Auth for secure authentication (Google, GitHub, email/password)
- ✅ Added custom dashboard for logged-in users showing systems, stats, and quick navigation
- ✅ Implemented social features: chat messages and message boards for each system
- ✅ Updated authentication routing to show dashboard for logged-in users, landing page for visitors
- ✅ Stripe integration ready (stripeCustomerId field added, awaiting API keys)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:** React 18 with TypeScript, Vite for build tooling, and Wouter for client-side routing.

**UI Framework:** Built on shadcn/ui component library with Radix UI primitives and Tailwind CSS for styling. Uses a professional theme variant with custom CSS variables for consistent theming.

**State Management:** TanStack Query (React Query) for server state management with custom query client configuration. Local component state managed with React hooks.

**Component Structure:**
- **Landing Page** (`home.tsx`) - Main hub for logged-out users presenting the 7 system modes with "What system are you building?" CTA
- **Dashboard** (`dashboard.tsx`) - Custom dashboard for logged-in users showing profile, system stats, recent systems, and quick navigation to all modes
- **Mode Pages** - Dedicated pages for each mode:
  - `wiki.tsx` - Educational architecture explorer (preserved original functionality)
  - `stepwise.tsx` - Guided system builder (core feature)
  - `new-system.tsx` - System initialization form
  - `saved-systems.tsx` - User's system project list
  - `encapsulator.tsx` - Module encapsulation interface
  - `modulator.tsx` - Simulation runner
  - `ingestion.tsx` - Data input processor
- **Social Components** - Collaboration features:
  - `ChatMessages.tsx` - Real-time chat interface for system collaboration with message sending/display
  - `MessageBoards.tsx` - Threaded discussion boards with board creation, message posting, and navigation
- **Feature Components** (`ArchitectureExplorer`, `ArchitectureDiagram`, `DomainSelector`) - Reusable UI sections for wiki
- **UI Components** - shadcn/ui component library for consistent interface
- **Custom Hooks** (`use-mobile`, `use-term-explorer`, `use-toast`, `useAuth`) - Shared functionality including authentication

**Design Approach:** Scientific/educational aesthetic with Poppins font family, subtle grid patterns, gradient text effects, and micro-interactions for technical terms. Responsive design with mobile-first considerations.

### Backend Architecture

**Server Framework:** Express.js with TypeScript running on Node.js, configured for both development (tsx) and production (esbuild bundled).

**API Design:** RESTful API structure with routes organized by resource type (architecture steps, domain examples, related concepts, saved architectures, annotations, systems, social features). All endpoints follow `/api/*` pattern and return JSON with consistent response format (`{ success: boolean, data?: any, message?: string }`). All social feature endpoints protected with authentication middleware and ownership validation.

**Data Access Layer:** Storage interface pattern (`IStorage`) abstracts database operations, making the data layer swappable. Current implementation uses Drizzle ORM for type-safe database queries.

**Request Handling:** Custom middleware for request logging, JSON parsing, and error handling. Zod schemas validate incoming data against database schema types.

**Development Setup:** Vite middleware integration in development mode enables HMR and serves the React application. Production build separates static assets from server code.

### Data Storage

**Database:** PostgreSQL via Neon serverless driver with WebSocket support for connection pooling.

**ORM:** Drizzle ORM provides type-safe query building and schema definition. Schema defined in `shared/schema.ts` ensures type consistency between frontend and backend.

**Schema Design:**
- `users` - User accounts with Replit Auth integration (replitUserId, profileImageUrl) and role-based permissions (role, entitlements), architect profile fields (firstName, lastName, email, company), and Stripe integration (stripeCustomerId)
- `sessions` - Express session storage for authentication state
- `architecture_steps` - The 10 core architecture concepts with descriptions, characteristics, and diagram data (stored as JSON)
- `domain_examples` - Domain-specific examples for each step (software, biology, urban planning, organizations)
- `related_concepts` - Linked concepts for exploration and learning paths
- `saved_architectures` - User progress tracking and saved states
- `annotations` - User-created notes and highlights
- `systems` - User-created system architecture projects with metadata, status, and current module tracking
- `module_configurations` - Per-system, per-module configurations including conditions, inputs, outputs, visualizations, and deliverables
- `invariant_rules` - Publisher-controlled rules that govern system behavior (constraints, validations, patterns)
- `encapsulations` - Module-specific emergent outputs, conditions, boundaries, and forces
- `simulations` - Module simulation runs with parameters, results, and visualization data
- `ingestion_records` - User input tracking for system creation (text, file, structured data, API inputs)
- `message_boards` - Discussion boards for each system with title, description, and creator
- `board_messages` - Threaded messages on message boards with content and optional parent message for replies
- `chat_messages` - Real-time chat messages for each system with sender and message content

**Migration Strategy:** Drizzle Kit handles schema migrations with `db:push` command. Migration files stored in `/migrations` directory.

**Data Modeling:** Uses serial IDs for primary keys, timestamps for audit trails, and JSON columns for flexible structured data (characteristics arrays, diagram configurations, tags). Foreign key relationships established through Drizzle relations API.

### Shared Types

**Type Safety:** Shared TypeScript types defined in `shared/schema.ts` using Drizzle's type inference. Zod schemas derived from Drizzle schemas using `drizzle-zod` for runtime validation.

**Import Strategy:** Path aliases configured (`@shared/*`, `@/*`, `@assets/*`) enable clean imports across client and server code. TypeScript compiler resolves these through `baseUrl` and `paths` configuration.

## External Dependencies

**Database:** PostgreSQL database (Neon serverless) accessed via `DATABASE_URL` environment variable. Uses WebSocket connections for serverless environments.

**UI Libraries:** 
- Radix UI primitives for accessible component foundations
- Recharts for data visualization and metrics display
- Lucide React for iconography
- Tailwind CSS with custom theme configuration

**Form Management:** React Hook Form with Zod resolver for type-safe form validation.

**Build Tools:** 
- Vite for frontend bundling with React plugin and custom shadcn theme plugin
- esbuild for server-side bundling in production
- tsx for TypeScript execution in development

**Development Tools:**
- Replit-specific plugins for cartographer (dependency mapping) and runtime error overlay
- Custom Vite plugins for theme JSON integration and error handling

**Runtime Validation:** Zod for schema validation on both client and server, with `zod-validation-error` for user-friendly error messages.

**Session Management:** `connect-pg-simple` for PostgreSQL-backed session storage (dependency declared but implementation details not in provided files).