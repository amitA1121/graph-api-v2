import { Knex } from 'knex';
import { NODE_TABLE_NAME, EDGE_TABLE_NAME, COLUMN_NAMES_a, COLUMN_NAMES_b} from "../db_configs";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(NODE_TABLE_NAME, (table) => {
    table.increments("id").primary();
  });

  await knex.schema.createTable(EDGE_TABLE_NAME, (table) => {
    table.integer(COLUMN_NAMES_a).notNullable().references("id").inTable(NODE_TABLE_NAME).onDelete("CASCADE");
    table.integer(COLUMN_NAMES_b).notNullable().references("id").inTable(NODE_TABLE_NAME).onDelete("CASCADE");
    
    table.check(`${COLUMN_NAMES_a} < ${COLUMN_NAMES_b}`);
   
    table.primary([COLUMN_NAMES_a, COLUMN_NAMES_b]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists(EDGE_TABLE_NAME);
  await knex.schema.dropTableIfExists(NODE_TABLE_NAME);
}