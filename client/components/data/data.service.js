'use strict';

var cache = {
  date: null,
  data: []
};

angular.module('hackathonCitoyenApp')
  .service('projectData', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.loadProjectList = function() {
      var now = new Date().getTime();
      if (cache.date && cache.date + (1000*60*60) > now) {
        console.log("Using cached project data");
        return Promise.resolve(cache.data);
      }


      return new Promise(function(resolve, reject) {

        var Projects = Parse.Object.extend("Projects");
        var query = new Parse.Query(Projects);

        query.equalTo("active", true).ascending('createdAt').find()
          .then(function(res) {
            console.log("Loaded project data");
            console.log("promise results:", res);
            var projects = res.map(function(pobj) {
              var obj = {id: pobj.id};
              ['name', 'subTitle', 'project', 'activity', 'lead', 'gain',  'usage','createdAt', 'updatedAt',
                'active', 'logoUrl', 'developers', 'designers', 'abstract']
                .forEach(function (key) {
                  obj[key] = pobj.get(key);
                });
              return obj;
            });
            cache.date = new Date().getTime();
            resolve(cache.data = projects);
          })
          .fail(function() {
            reject("Impossible de charger la liste des projets.");
          });
      });
    };

    this.getProject = function(id) {
      return this.loadProjectList().then(function(projects) {
        return projects.reduce(function(prev, cur) {
          return prev ? prev : (cur.id===id?cur:undefined);
        }, undefined);
      });
    };

  });
