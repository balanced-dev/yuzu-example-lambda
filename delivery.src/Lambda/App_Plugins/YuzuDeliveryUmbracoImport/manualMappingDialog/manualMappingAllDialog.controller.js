var app = angular.module("umbraco");

function manualMappingAllDialog($scope, yuzuManualMappingResources) {

    var vm = this;

    vm.close = $scope.model.close;
    vm.activeMaps = [];

    vm.title = 'Active manual mappings';

    yuzuManualMappingResources.getActiveMaps()
        .then(function (response) {
            vm.activeMaps = response.data;
        }); 
}

angular.module("umbraco").controller("Yuzu.Delivery.UmbracoImportViewModel.ManualMappingAllDialog", manualMappingAllDialog);

