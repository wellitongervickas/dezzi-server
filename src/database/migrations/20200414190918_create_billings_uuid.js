
exports.up = function(knex) {
  return knex.schema.createTable('billings', function (t) {
    t.increments('id').primary();
    t.uuid('uuid').unique().notNullable();

    t.string('value').notNullable();

    t.string('user_uuid').notNullable();
    t.foreign('user_uuid').references('uuid').inTable('users');

    t.string('contact_uuid').notNullable();
    t.foreign('contact_uuid').references('uuid').inTable('contacts');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('billings');
};
