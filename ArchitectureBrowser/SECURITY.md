# Security Policy

## 🔒 Security Overview

This document outlines the security measures implemented in the Architecture Browser platform and provides guidance for maintaining security in production deployments.

## 🛡️ Implemented Security Features

### Authentication & Authorization

#### Session Management
- **Secure session cookies** with `httpOnly`, `secure`, and `sameSite` flags
- **30-day session expiration** with automatic cleanup
- **PostgreSQL-backed sessions** for persistence and scalability
- **Strong session secrets** enforced (minimum 32 characters)

#### Password Security
- **bcrypt hashing** with 10 salt rounds
- **No password length limits** (encouraging strong passwords)
- **Email and phone verification** required before account activation
- **Verification token security**:
  - Email tokens: 32-byte cryptographically random hex strings
  - Phone codes: 6-digit random codes with 10-minute expiration

#### Access Control
- **Role-based permissions** (architect, designer, contributor, agent, administrator)
- **Route-level authentication** middleware
- **Resource ownership validation** for user-specific data
- **Automatic user verification** on each authenticated request

### Rate Limiting

Protection against brute force and DoS attacks:

| Endpoint Type | Limit | Window | Protected Routes |
|--------------|-------|--------|------------------|
| Authentication | 5 requests | 15 minutes | `/api/auth/*` |
| Sensitive Operations | 20 requests | 15 minutes | User data modifications |
| General API | 100 requests | 15 minutes | All API routes |

**Rate Limit Headers:**
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining in window
- `X-RateLimit-Reset`: When the limit resets
- `Retry-After`: Seconds until retry (when limited)

### Database Security

#### SQL Injection Prevention
- **Drizzle ORM** with parameterized queries
- **Type-safe query building** via TypeScript
- **Zod schema validation** on all inputs
- **No raw SQL queries** in application code

#### Data Protection
- **Encrypted connections** (configure `DATABASE_URL` with SSL)
- **Separate user credentials** per environment
- **No sensitive data in logs** or error messages

### Input Validation

- **Zod schemas** for runtime type validation
- **Email format validation** with RFC compliance
- **Phone number validation**
- **Strong type enforcement** with TypeScript
- **Error message sanitization** (no schema details leaked)

### Environment Security

#### Environment Variable Protection
- **Validation on startup** - app won't start with missing/invalid vars
- **No default secrets** in production
- **Type-safe env access** via validated schema
- **`.env` files excluded from git**

#### Secure Defaults
- Cookies marked `secure` in production (HTTPS only)
- `httpOnly` cookies prevent JavaScript access
- `sameSite: 'lax'` prevents CSRF
- No CORS by default (configure as needed)

## 🚨 Production Security Checklist

### Before Deployment

#### Environment Setup
- [ ] Generate strong `SESSION_SECRET` (32+ characters)
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- [ ] Set `NODE_ENV=production`
- [ ] Configure `DATABASE_URL` with SSL parameters
- [ ] Set `APP_URL` to your production domain (HTTPS)
- [ ] Never commit `.env` files to version control

#### Infrastructure
- [ ] **Enable HTTPS** - Required for secure cookies
- [ ] **Configure firewall** - Only allow necessary ports
- [ ] **Set up database backups** - Automated daily backups
- [ ] **Enable database SSL** - Encrypt data in transit
- [ ] **Use secrets manager** - AWS Secrets Manager, HashiCorp Vault, etc.
- [ ] **Restrict database access** - Whitelist application IPs only

#### Application
- [ ] **Integrate email service** (SendGrid, AWS SES, etc.)
- [ ] **Integrate SMS service** (Twilio, AWS SNS, etc.)
- [ ] **Set up logging** (structured logs to external service)
- [ ] **Configure monitoring** (Sentry, DataDog, etc.)
- [ ] **Review rate limits** - Adjust based on expected traffic
- [ ] **Test authentication flows** - All verification paths
- [ ] **Add CSRF protection** if needed for your use case

#### Security Hardening
- [ ] **Run security audit** - `npm audit`
- [ ] **Update dependencies** - Keep packages current
- [ ] **Review user permissions** - Least privilege principle
- [ ] **Disable debug mode** - No verbose errors in production
- [ ] **Configure CSP headers** - Content Security Policy
- [ ] **Add security headers** - HSTS, X-Frame-Options, etc.

### Ongoing Maintenance

#### Regular Tasks
- **Weekly:** Review authentication logs for suspicious activity
- **Weekly:** Check rate limit violations
- **Monthly:** Update dependencies and run security audits
- **Monthly:** Review user roles and access permissions
- **Quarterly:** Rotate database credentials
- **Quarterly:** Security penetration testing

## 🔍 Security Headers (Recommended)

Add these headers to your reverse proxy (nginx, cloudflare, etc.):

```nginx
# Prevent clickjacking
add_header X-Frame-Options "SAMEORIGIN" always;

# Prevent MIME type sniffing
add_header X-Content-Type-Options "nosniff" always;

# XSS Protection (legacy but still useful)
add_header X-XSS-Protection "1; mode=block" always;

# Force HTTPS
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

# Control referrer information
add_header Referrer-Policy "strict-origin-when-cross-origin" always;

# Content Security Policy (adjust based on your needs)
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;
```

## 🐛 Reporting Security Vulnerabilities

We take security seriously. If you discover a security vulnerability:

### Please DO:
1. **Email us privately** (do not open public issues)
2. **Provide detailed information**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fixes (if any)
3. **Give us reasonable time** to respond (48 hours)
4. **Allow us to fix** before public disclosure

### Please DON'T:
- Open public GitHub issues for vulnerabilities
- Exploit vulnerabilities beyond proof-of-concept
- Access or modify other users' data
- Perform DoS attacks
- Spam or social engineer

## 📚 Security Best Practices for Developers

### When Adding New Features

1. **Authentication First**
   - Always add `requireAuth` to protected routes
   - Validate resource ownership with `requireOwnership()`
   - Never trust client-provided user IDs

2. **Validate All Inputs**
   ```typescript
   // Good
   const schema = z.object({ name: z.string().min(1).max(100) });
   const data = schema.parse(req.body);

   // Bad
   const name = req.body.name; // No validation!
   ```

3. **Never Log Sensitive Data**
   ```typescript
   // Bad
   console.log('User logged in:', user.password);

   // Good
   console.log('User logged in:', user.email);
   ```

4. **Use Prepared Statements**
   ```typescript
   // Good (Drizzle ORM)
   await db.select().from(users).where(eq(users.id, userId));

   // Bad (vulnerable to SQL injection)
   await db.query(`SELECT * FROM users WHERE id = ${userId}`);
   ```

5. **Sanitize Error Messages**
   ```typescript
   // Bad - leaks implementation details
   catch (error) {
     res.json({ error: error.message });
   }

   // Good - generic message to user
   catch (error) {
     console.error(error); // Log full error
     res.json({ error: 'An error occurred' }); // Generic to user
   }
   ```

## 🔐 Password Requirements

Current requirements:
- **Minimum length:** 6 characters (bcrypt enforced)
- **No maximum length** (bcrypt truncates at 72 bytes automatically)
- **No complexity requirements** (length is more important)

Recommendations for users:
- Use a password manager
- Enable two-factor authentication (when implemented)
- Never reuse passwords across sites

## 📊 Security Monitoring

### Metrics to Track

1. **Authentication Events**
   - Failed login attempts
   - Account lockouts
   - Password reset requests
   - Verification failures

2. **Rate Limiting**
   - 429 responses by endpoint
   - Blocked IPs
   - Burst patterns

3. **Database**
   - Connection pool exhaustion
   - Slow queries
   - Failed queries

4. **Application Health**
   - Error rates
   - Response times
   - Resource usage

### Alert Thresholds (Recommended)

- **Critical:** 10+ failed logins from same IP in 5 minutes
- **Warning:** 5+ rate limit violations in 1 hour
- **Info:** New user registration
- **Critical:** Database connection failures
- **Warning:** Health check failures

## 📞 Security Contact

For security concerns, contact: [Your Security Team Email]

**PGP Key:** [If applicable]

**Bug Bounty:** [If you have a program]

## 🔄 Security Updates

This security policy is reviewed and updated quarterly.

**Last Updated:** October 2025
**Next Review:** January 2026
