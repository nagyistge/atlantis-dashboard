var directives = angular.module('atlantisApp.homeDirectives', []);

directives.directive("envDependency", function () {
  return {
    templateUrl : 'ngapp/home/templates/dependencies.html',
    controller: ['$scope', '$modal', 'appsFactory', 'deleteModal',
      function ($scope, $modal, appsFactory, deleteModal) {
        $scope.unregisterDependency = function (dep) {
          var modalInstance, templateUrl = 'ngapp/templates/deleteModal.html',
            type = 'dependency name',
            name = dep.Name,
            itemType = 'dependency';

          modalInstance = deleteModal.modalInstance(templateUrl, name, type, itemType);
          modalInstance.result.then(function (name) {
            var deps = _.filter($scope.env.Dependencies, function (dep) {
              return dep.Name !== name;
            });
            $scope.env.Dependencies = deps;
            $scope.addAlert({
              type: 'success',
              message: "Dependency '" + name + "' unregistered successfully.",
              icon: 'glyphicon glyphicon-ok'
            });
          }, function (result) {
            console.log(result);
          });
        };
      }]
  };
});
