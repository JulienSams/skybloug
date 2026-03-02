# Skyblog Backend Server

Node.js + Express + TypeScript backend with PostgreSQL database and Prisma ORM.

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+

## PostgreSQL Setup

### Option 1: Homebrew (macOS)

```bash
brew install postgresql@16
brew services start postgresql@16

# Create database
createdb skyblog
```

### Option 2: Postgres.app (macOS)

1. Download from https://postgresapp.com/
2. Install and launch Postgres.app
3. Add to PATH: `sudo mkdir -p /etc/paths.d && echo /Applications/Postgres.app/Contents/Versions/latest/bin | sudo tee /etc/paths.d/postgresapp`
4. Restart terminal
5. Create database: `createdb skyblog`

### Option 3: Docker

```bash
docker run --name skyblog-postgres \
  -e POSTGRES_DB=skyblog \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  -d postgres:16

# Update .env with: DATABASE_URL="postgresql://postgres:postgres@localhost:5432/skyblog?schema=public"
```

## Installation

```bash
npm install
```

## Database Setup

1. Copy `.env.example` to `.env` and update `DATABASE_URL`:
   ```
   DATABASE_URL="postgresql://username@localhost:5432/skyblog?schema=public"
   PORT=3000
   ```

2. Run migrations to create tables:
   ```bash
   npx prisma migrate dev --name init
   ```

3. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

## Development

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Server runs on http://localhost:3000

Health check: http://localhost:3000/api/health

## Database Commands

```bash
# Create a new migration after schema changes
npx prisma migrate dev --name description

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Open Prisma Studio (GUI for database)
npx prisma studio

# View database
npx prisma db pull
```

## Schema

The database includes:
- **Profile**: Single-user profile with bio, age, location, photo
- **Article**: Blog articles with title, HTML content, draft status
- **Tag**: Article tags with many-to-many relationship
- **Comment**: Article comments with author name

See `prisma/schema.prisma` for full schema definition.
