exports.up = function(knex) {
  return knex.schema.createTable('items', function(tbl) {
    tbl.increments();

    tbl
      .string('name', 128)
      .unique()
      .notNullable();
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.dropTableIfExists('items');
};
