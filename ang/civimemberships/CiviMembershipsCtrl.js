(function(angular, $, _) {

  angular.module('civimemberships').config(function($routeProvider) {
      $routeProvider.when('/memberships', {
        controller: 'CivimembershipsCiviMembershipsCtrl',
        templateUrl: '~/civimemberships/CiviMembershipsCtrl.html',
        resolve: {}
      });
    }
  );

  angular.module('civimemberships').controller('CivimembershipsCiviMembershipsCtrl', function($scope, crmApi, crmStatus, crmUiHelp) {
    // The ts() and hs() functions help load strings for this module.
    var ts = $scope.ts = CRM.ts('civimemberships');
    var hs = $scope.hs = crmUiHelp({file: 'CRM/civimemberships/CiviMembershipsCtrl'}); // See: templates/CRM/civimemberships/CiviMembershipsCtrl.hlp
    $scope.memberships = [];
    $scope.membershipFilter = {startFrom: null, startTo: null};

    $scope.search = function(){

      var startDateFrom = $scope.membershipFilter.startFrom;
      var startDateTo = $scope.membershipFilter.startTo;

      crmStatus(
        {start: ts('Searching memberships...'), success: ts('Done...')},
        crmApi('Membership', 'get', {
          'sequential': 1,
          'start_date': {'>=': startDateFrom, '<=': startDateTo},
          'api.Contact.getsingle': {return:['display_name', 'contact_type']},
          'api.MembershipType.getsingle': {}
        })
      ).then(function(result){
        $scope.memberships = result.values;
        console.log($scope.memberships);
      });
    };
  });

})(angular, CRM.$, CRM._);
