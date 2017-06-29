(function () {
  'use strict';
  var breadcrumbs = function () {
    return {
      restrict: 'E',
      templateUrl: 'components/breadcrumbs/ovBreadcrumbsDirective.html',
      scope: {
        config: '='
      },
      controller: 'BreadCrumbsCtrl',
      controllerAs: 'vm',
      bindToController: true
    };
  };
  angular.module('songApp').directive('ovBreadcrumbs', breadcrumbs);
})();
