Graph API

# Description:
A REST API for managing graphs with nodes and edges.
I built it while using: Koa.js, TypeScript, and PostgreSQL - Knex, Codec

# Setup if you wnat to run the project:
1. Install dependencies: 'npm install'
2. Run migrations: 'npm run migrate'
3. Start server conection: 'npm run dev'

# Postman Collection:
https://amitaviv64-6617417.postman.co/workspace/amit's-Workspace~518ba2f5-e909-433a-812e-04a37207f67b/collection/53011425-40642287-dd7b-49c2-a8af-90232ba7d987?action=share&source=copy-link&creator=53011425

# Endpoints: 
# Nodes:
- GET /nodes
- POST /nodes
- DELETE /nodes/:id

# Edges:
- GET /edges
- POST /edges/:a_id/:b_id
- DELETE /edges/:a_id/:b_id

# Graph Queries:
- GET /components
- GET /cycle
- GET /degree
- GET /path/:start/:end
