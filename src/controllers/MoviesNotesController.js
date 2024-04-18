const knex = require("../database/knex");

class MoviesNotesController {
    async create(request, response) {
        const { title_film, description, movie_tags } = request.body;
        const { user_id } = request.params;
        
        const [ note_id ] = await knex("movie_notes").insert({
            title_film,
            description,
            user_id
        });

        const tagsInsert = movie_tags.map(name => {
            return {
                note_id,
                user_id,
                name
            }
        });

        await knex("movie_tags").insert(tagsInsert);

        response.json();
    };
};

module.exports = MoviesNotesController;