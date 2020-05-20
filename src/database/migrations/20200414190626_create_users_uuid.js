
exports.up = function(knex) {
  return knex.schema.createTable('users', function (t) {
    t.increments('id').primary();
    t.uuid('uuid').unique().notNullable();

    t.string('first_name').notNullable();
    t.string('last_name').notNullable();
    t.string('password').notNullable();
    t.string('email').unique().notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
