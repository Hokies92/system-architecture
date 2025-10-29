# Architecture Browser - System Architecture Platform

A comprehensive system architecture platform that helps users build, simulate, and visualize complex systems through 7 integrated modes.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (we recommend [Neon](https://neon.tech) for serverless Postgres)
- A secure SESSION_SECRET (32+ characters)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ArchitectureBrowser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `SESSION_SECRET`: Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - `NODE_ENV`: Set to `development` or `production`

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5000`

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type check TypeScript code
- `npm run db:push` - Push database schema changes

## 🔒 Security Features

### Implemented Security Measures

✅ **Authentication & Authorization**
- Session-based authentication with secure cookies
- Role-based access control (5 user roles)
- Protected routes with authentication middleware
- Ownership validation for user resources

✅ **Rate Limiting**
- Authentication endpoints: 5 requests / 15 minutes
- General API: 100 requests / 15 minutes
- Sensitive operations: 20 requests / 15 minutes

✅ **Environment Validation**
- Required environment variables validated on startup
- No hardcoded secrets in code
- Secure session secret enforcement (min 32 characters)

✅ **Database Security**
- Parameterized queries via Drizzle ORM
- SQL injection protection
- Secure password hashing with bcrypt (10 rounds)

✅ **Production Best Practices**
- Graceful shutdown handling
- Health check endpoint at `/health`
- Secure cookie settings in production
- Error handling without information leakage

### Security Checklist Before Deployment

- [ ] Set strong `SESSION_SECRET` (32+ characters)
- [ ] Use HTTPS in production (set `NODE_ENV=production`)
- [ ] Configure database connection with SSL
- [ ] Set up email/SMS services for verification
- [ ] Review and restrict CORS settings
- [ ] Enable database backups
- [ ] Set up monitoring and logging
- [ ] Review user roles and permissions
- [ ] Test rate limiting thresholds
- [ ] Implement CSRF protection if using cookies from different domains

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- Wouter for routing
- shadcn/ui + Radix UI components
- TanStack Query for state management
- Tailwind CSS for styling

**Backend:**
- Express.js with TypeScript
- PostgreSQL with Drizzle ORM
- Session-based authentication
- Zod for validation
- bcrypt for password hashing

### Project Structure

```
ArchitectureBrowser/
├── client/
│   └── src/
│       ├── pages/          # Route pages
│       ├── components/     # Reusable components
│       ├── hooks/          # Custom React hooks
│       └── lib/            # Utilities
├── server/
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
│   ├── auth.ts             # Authentication logic
│   ├── middleware.ts       # Auth & validation middleware
│   ├── rateLimiter.ts      # Rate limiting
│   ├── validateEnv.ts      # Environment validation
│   └── storage.ts          # Database layer
└── shared/
    └── schema.ts           # Shared types & schemas
```

## 🔐 Environment Variables

See `.env.example` for all available environment variables.

### Required

- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Secure random string (min 32 chars)
- `NODE_ENV` - `development`, `production`, or `test`

### Optional

- `APP_URL` - Application base URL (for email links)
- `STRIPE_SECRET_KEY` - Stripe API key (future payment integration)
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key

## 🔧 Development

### Type Checking

```bash
npm run check
```

### Database Migrations

1. Update schema in `shared/schema.ts`
2. Run `npm run db:push` to apply changes
3. For production, use proper migrations with Drizzle Kit

### Adding New Routes

1. Add route in `server/routes.ts`
2. Add authentication middleware if needed: `requireAuth`
3. Add ownership validation if needed: `requireOwnership()`
4. Add rate limiting if sensitive: `authLimiter` or `sensitiveLimiter`

## 📊 Monitoring

### Health Check

The application exposes a health check endpoint:

```
GET /health
```

Response (healthy):
```json
{
  "status": "healthy",
  "timestamp": "2025-10-29T10:00:00.000Z",
  "uptime": 12345.67,
  "database": "connected"
}
```

### Graceful Shutdown

The server handles `SIGTERM` and `SIGINT` signals gracefully:
1. Stops accepting new connections
2. Completes in-flight requests
3. Closes database connections
4. Exits cleanly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

MIT

## 🐛 Known Issues & TODOs

### High Priority
- [ ] Integrate email service for verification emails
- [ ] Integrate SMS service for phone verification
- [ ] Add CSRF protection
- [ ] Add request logging

### Medium Priority
- [ ] Add comprehensive test suite
- [ ] Set up CI/CD pipeline
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Implement Redis for rate limiting in production
- [ ] Add input sanitization for XSS protection

### Future Enhancements
- [ ] WebSocket support for real-time collaboration
- [ ] File upload handling
- [ ] Export/import system architectures
- [ ] API versioning
- [ ] Internationalization (i18n)

## 📞 Support

For issues and questions, please open an issue on GitHub.
