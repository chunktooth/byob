exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('maps', function(table) {
      table.increments('id').primary();
      table.string('region');
      table.decimal('center_lat');
      table.decimal('center_long');
      table.timestamps(true, true);
    }),

    knex.schema.createTable('pins', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.decimal('latitude');
      table.decimal('longitude');
      table.integer('map_id');
      table.foreign('map_id').references('maps.id');
      table.timestamps(true, true);
    })
  ])  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('pins'),
    knex.schema.dropTable('maps')
  ]);
};
