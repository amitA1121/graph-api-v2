import { Knex } from 'knex';
import { DBConstants } from "../db_configs";

//FIX: if anything here should be an external variable, it is "node_id", which is the only thing that isnt. It MAY need an external variable only because it is repeted. 
// as for the rest - they are completely FINE left as free strings, ESPECIALLY those you use only once (columns). SQL is inherently stringly typed, no need to fight it! This is a good example of redundant abstraction.
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(DBConstants.TABLES.NODES, (table) => {
    table.increments("node_id").primary()
  })

  await knex.schema.createTable(DBConstants.TABLES.EDGES, (table) => {
    table.integer(DBConstants.COLUMNS.SOURCE_NODE_ID)
      .notNullable()
      .references("node_id")
      .inTable(DBConstants.TABLES.NODES)
      .onDelete("CASCADE")

    table.integer(DBConstants.COLUMNS.TARGET_NODE_ID)
      .notNullable()
      .references("node_id")
      .inTable(DBConstants.TABLES.NODES)
      .onDelete("CASCADE")

    table.check(`${DBConstants.COLUMNS.SOURCE_NODE_ID} < ${DBConstants.COLUMNS.TARGET_NODE_ID}`)

    table.primary([
      DBConstants.COLUMNS.SOURCE_NODE_ID,
      DBConstants.COLUMNS.TARGET_NODE_ID
    ])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(DBConstants.TABLES.EDGES)
  await knex.schema.dropTableIfExists(DBConstants.TABLES.NODES)
}