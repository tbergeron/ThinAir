var ProjectController = {
  // properties
  Projects: null,
  
  // constructor
  initialize: function(req, res) {
    check_if_authorized(req, res)
    
    this.Projects = this.repositories.Projects
    
    var breadcrumbs = [];
      breadcrumbs[0] = 'Projects|/projects';
    // todo: this is kinda weird, you know?

    return breadcrumbs
  },
  
  render_form: function(req, res, project, breadcrumbs) {
    // breadcrumbs
    breadcrumbs[1] = ((project) ? project.name : 'Create a new project') + '|/projects'
  
    res.render('projects/edit', {
      title: (project) ? 'Editing project: ' + project.name : 'Create a new project',
      project: project,
      breadcrumbs: breadcrumbs
    })
  },
  
  // GET: /projects
  list: function(req, res) {
    var breadcrumbs = this.initialize(req, res)

  //projectRepository.allByDate(function(projects) {
  //  if (projects) {
  //    res.render('projects/list', {
  //      title: 'List of projects',
  //      projects: projects,
  //      breadcrumbs: breadcrumbs
  //    })
  //  } else {
  //    req.flash('error', 'No projects found.')
  //    res.redirect('/')
  //  }
  //})
  },
  
  new: function(req, res) {
    this.initialize(req, res)
    render_form(req, res)
  },
  
  // GET&POST: /projects/edit/:project_code
  edit: function(req, res) {
    var breadcrumbs = this.initialize(req, res)
    if (is_post(req)) {
      // if this is POST, validates and saves the object.
      //projectRepository.save(req.body.project, function(project, errors) {
      //  if (errors) {
      //    flashErrors(req, errors)
      //  } else {
      //    req.flash('success', 'Saved with success.')
      //  }
        render_form(req, res, project, breadcrumbs)
      //})
    } else {
      // if this is no POST, then it's an edit form
      //projectRepository.byCode(req.params.project_code, function(project) {
      //  if (project) {
      //    render_form(req, res, project, breadcrumbs)
      //  } else {
      //    req.flash('error', 'Unable to find project.')
      //    res.redirect('/projects')
      //  }
      //})
    }
  },
  
  // GET: /projects/delete
  delete: function(req, res) {
    this.initialize(req, res)
    //projectRepository.delete(req.params.project_code, function(err){
    //  if (!err) {
    //    req.flash('success', 'Project with code "'+ req.params.project_code +'" has been deleted with success.')
    //  }
    //  res.redirect('/projects')
    //})
  }

}

module.exports = ProjectController