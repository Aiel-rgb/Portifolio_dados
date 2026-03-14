# 💎 B.L.A.S.T. Data Schema - Persistence

## 📊 Database Schema (PostgreSQL/Supabase)
Table: `projects`

| Column | Type | Constraints |
| :--- | :--- | :--- |
| `id` | `UUID` | Primary Key, Default `gen_random_uuid()` |
| `name` | `TEXT` | Not Null |
| `description` | `TEXT` | Not Null |
| `github_link` | `TEXT` | Not Null |
| `site_link` | `TEXT` | Optional |
| `stacks` | `TEXT` | Not Null (Comma separated or Array) |
| `created_at` | `TIMESTAMP` | Default `now()` |
| `display_order` | `INTEGER` | Default `0` |

## 📊 API Interface
The API will maintain the same JSON structure for the frontend, but map to the DB.

### GET `/api/projects`
- **Output**: `Project[]` sorted by `display_order`.

### POST `/api/projects`
- **Input**: `{ name, link, siteLink, description, stacks }`
- **Action**: Insert into `projects` table.

### PUT `/api/projects`
- **Input**: Partial `Project` or `{ reorder: true, projects: Project[] }`
- **Action**: Update specific row or batch update `display_order`.

### DELETE `/api/projects?id=...`
- **Action**: Delete row by id.
