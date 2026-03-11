# Graph API

# Description:
A REST API for managing graphs with nodes and edges.
I built it while using: Koa.js, TypeScript, and PostgreSQL - Knex, Codec

# Setup if you wnat to run the project:
1. Install dependencies: `npm install`

2. Database Setup:
You need to install PostgreSQL
After that, Create a database:
`createdb graph_db`
Configure environment variables with your data in `.env`:

- DB_HOST=localhost
- DB_PORT=5432/for example
- DB_USER=postgres/or any user
- DB_PASSWORD=your password
- DB_NAME=graph_db

Then, run the migrations to create the tables with the command:
`npm run migrate`

3. After that, start server conection with the command `npm run dev`

# My Postman Collection:
https://amitaviv64-6617417.postman.co/workspace/amit's-Workspace~518ba2f5-e909-433a-812e-04a37207f67b/collection/53011425-40642287-dd7b-49c2-a8af-90232ba7d987?action=share&source=copy-link&creator=53011425

# Endpoints: 
# Nodes:
- GET /nodes
- POST /nodes
- DELETE /nodes/:node_id

# Edges:
- GET /edges
- POST /edges/:source_node_id/:target_node_id
- DELETE /edges/:source_node_id/:target_node_id

# Graph Queries:
- GET /components
- GET /cycle
- GET /degree
- GET /path/:start/:end
