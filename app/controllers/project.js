var ProjectController = {
  // properties
  Projects: null,

  // constructor
  initialize: function(req, res) {
    this.helpers.check_if_authorized(req, res);

    this.Projects = this.repositories.Projects;
  },

  // GET: /projects
  list: function(req, res) {
    this.initialize(req, res);

    this.Projects.allByDate(function(projects) {
      if (projects) {
        res.render('projects/list', {
          title: 'List of projects',
          projects: projects
        });
      } else {
        // todo: find a way to avoid this which is fucking ugly
        require('../helpers').flash(req, 'error', 'No projects found.');
        res.redirect('/');
      }
    });
  },

  // GET: /projects/new
  new: function(req, res) {
    this.initialize(req, res);

    res.render('projects/edit', {
      title: 'Create a new project'
    });
  },

  // GET&POST: /projects/edit/:project_code
  edit: function(req, res) {
    this.initialize(req, res);

    if (this.helpers.is_post(req)) {
      // if this is POST, validates and saves the object.
      //projectRepository.save(req.body.project, function(project, errors) {
      //  if (errors) {
      //    flashErrors(req, errors)
      //  } else {
      //    req.flash('success', 'Saved with success.')
      //  }
        this.render_form(req, res, project, breadcrumbs);
      //})
    } else {
      // if this is no POST, then it's an edit form
      this.Projects.byCode(req.params.project_code, function(project) {
        if (project) {

          res.render('projects/edit', {
            title: 'Editing project: ' + project.name,
            project: project
          });

        } else {
          this.helpers.flash(req, 'error', 'Unable to find project.');
          res.redirect('/projects');
        }
      });
    }
  },

  // GET: /projects/delete
  delete: function(req, res) {
    this.initialize(req, res);
    //projectRepository.delete(req.params.project_code, function(err){
    //  if (!err) {
    //    req.flash('success', 'Project with code "'+ req.params.project_code +'" has been deleted with success.')
    //  }
    //  res.redirect('/projects')
    //})
  }

};

module.exports = ProjectController;