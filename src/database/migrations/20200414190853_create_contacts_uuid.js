
exports.up = function(knex) {
  return knex.schema.createTable('contacts', function (t) {
    t.increments('id').primary();
    t.uuid('uuid').unique().notNullable();

    t.string('first_name').notNullable();
    t.string('last_name').notNullable();
    t.string('phone').notNullable();
    t.string('email').notNullable();

    t.string('user_uuid').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('contacts');
};
