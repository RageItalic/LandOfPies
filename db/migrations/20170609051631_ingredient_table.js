
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('toppings', function(table) {
      table.increments('toppings_id').primary();
      table.string('topping_name').notNull();
      table.string('v_or_n').notNull();
    }),

    knex.schema.createTable('sauces', function(table) {
      table.increments('sauces_id').primary();
      table.string('sauce_name').notNull();
    }),

    knex.schema.createTable('cheeses', function(table) {
      table.increments('cheeses_id').primary();
      table.string('cheese_name').notNull();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('toppings'),
      knex.schema.dropTable('sauces'),
      knex.schema.dropTable('cheeses')
    ])
};
