exports.up = knex => knex.schema.createTable("movies_tags", table => {
    table.increments("id");
    table.integer("notes_id").references("id").inTable("movie_notes").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");
    table.text("tags_name").notNullable();
});

exports.down = knex => knex.schema.dropTable("movies_tags");