
exports.up = function(knex) {
  return knex.schema.createTable('billings', function (t) {
    t.increments('id').primary();
    t.uuid('uuid').unique().notNullable();

    t.string('value').notNullable();
    t.string('user_uuid').notNullable();
    t.string('contact_uuid').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('billings');
};
