helpers = require("../../libs/helpers")
createRepository = require("../../libs/repository").createRepository
Projects = createRepository("projects",
  allByDate: (callback) ->
    @find().sort(date_created: 1).toArray (err, projects) ->
      console.log err  if err
      if projects
        callback projects
      else
        callback null

  byCode: (code, callback) ->
    @findOne
      code: code
    , (err, project) ->
      console.log err  if err
      if project
        callback project
      else
        callback null

  save: (project, callback) ->
    project.code = helpers.slugify(project.name)
    @baseSave project, (savedProject, errors) ->
      callback savedProject, errors

  delete: (code, callback) ->
    @remove
      code: code
    , (err) ->
      callback err  if err
)
module.exports = Projects