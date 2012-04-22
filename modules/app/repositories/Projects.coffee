helpers          = require("../../libs/helpers")
createRepository = require("../../libs/repositories").createRepository

Projects = createRepository("projects",
  allByDate: (callback) ->
    @find().sort(date_created: 1).toArray (err, projects) ->
      if err then console.log err
      callback if projects then projects else null

  byCode: (code, callback) ->
    @findOne code: code, (err, project) ->
      if err then console.log err
      callback if project then project else null

  save: (project, callback) ->
    project.code = helpers.slugify(project.name)
    @baseSave project, (savedProject, errors) ->
      callback savedProject, errors

  delete: (code, callback) ->
    @remove code: code, (err) ->
      if err then callback err
)

module.exports = Projects