const knex = require("../database/knex")

class MoviesTagsController {
  async index(request, response) {
    const { user_id } = request.params

    const movies_tags = await knex("movies_tags")
    .where({ user_id })

    return response.json(movies_tags)
  }
}

module.exports = MoviesTagsController