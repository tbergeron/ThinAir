var Projects = require('../modules/app/repositories/Projects')

describe('Projects', function(){
  describe('#save()', function(){
    it('should save without error', function(done){
      var project = { name: "TEST_PROJECT" };
      Projects.save(project, function(project, errors) {
        if (errors) return done(errors);
        done();
      });
    });
  });
});