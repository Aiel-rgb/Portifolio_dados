# 🚀 Portfolio Persistence & Deployment Migration

## 🛡️ Data Schemas
- **Project Schema**: (To be defined in `gemini.md`)
    - id: number/uuid
    - name: string
    - description: string
    - stacks: string[]
    - githubLink: string
    - siteLink: string (optional)
    - order: number

## 📜 Behavioral Rules
- **Data Integrity**: Never overwrite the database without a safety check.
- **Feedback**: Every CRUD operation must return clear success/error payloads.
- **Premium UI**: Admin actions should feel smooth and premium.

## 🏗️ Architectural Invariants
- **Layered Structure**: Separate API logic from database connection.
- **Environment Safety**: Use `.env` for all database credentials.
- **Migration**: Ensure existing "initial" projects are seeded into the new database.
