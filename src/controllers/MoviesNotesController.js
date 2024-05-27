const knex = require("../database/knex");

class MoviesNotesController {
    async create(request, response) {
        const { title, description, rating, moviesTags } = request.body;
        const { user_id } = request.params;

        const [ moviesNotes_id ] = await knex("moviesNotes").insert({
            title,
            description,
            rating,
            user_id
        });

        const moviesTagsInsert = moviesTags.map(name => {
            return {
                moviesNotes_id,
                user_id,
                name
            }
        });

        await knex("moviesTags").insert(moviesTagsInsert);

        response.json();
    }

    async show(request, response) {
        const { id } = request.params;
        
        const note =  await knex("moviesNotes").where({ id }).first();
        const tags = await knex("moviesTags").where({ moviesNotes_id: id }).orderBy("name");

        return response.json({
            ...note,
            tags
        });
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("moviesNotes").where({ id }).delete();

        return response.json("Nota deletada");
    }

    async index(request, response) {
        const { title, user_id, moviesTags } = request.query;

        let notes;
        
        if(moviesTags) {
            const filterTags = moviesTags.split(',').map(tag => tag.trim());

            notes = await knex("moviesTags")
            .select([
                "moviesNotes.id",
                "moviesNotes.title",
                "moviesNotes.user_id",
            ])
            .where("moviesNotes.user_id", user_id)
            .whereLike("moviesNotes.title", `%${title}%`)
            .whereIn("name", filterTags)
            .innerJoin("moviesNotes", "moviesNotes.id", "moviesTags.moviesNotes_id")
            .orderBy("moviesNotes.title")
        } else {
            notes = await knex("moviesNotes")
            .where({ user_id })
            .whereLike( "title", `%${title}%`)
            .orderBy("title");
        }

        const userTags = await knex("moviesTags").where({ user_id });

        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.moviesNotes_id === note.id);
            console.dir()

            return {
                ...note,
                moviesTags: noteTags
            }
        });
        

        return response.json(notesWithTags);
    }
}

module.exports = MoviesNotesController;