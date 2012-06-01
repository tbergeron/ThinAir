require('../config');

var should = require("should");
var Projects = require('../app/repositories/Projects.js')
var newProject = { name: "TEST_PROJECT" };

describe('Projects', function() {

  describe('#save()', function() {
    it('should save without error', function(done) {

      Projects.save(newProject, function(project, errors) {
        should.not.exist(errors);
        should.exist(project);
        project.should.have.property('_id');
        project.should.have.property('code');
        done();
      });

    });
  });

});