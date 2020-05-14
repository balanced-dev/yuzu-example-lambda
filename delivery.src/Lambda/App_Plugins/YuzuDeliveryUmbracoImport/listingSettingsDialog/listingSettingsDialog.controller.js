var app = angular.module("umbraco");

function contentDialog($scope) {

    var vm = this;

    vm.dialogData = $scope.model.dialogData;
 
    vm.filters = $scope.model.dialogData.filters;
    vm.close = $scope.model.close;
    vm.pageSizes = [10, 20, 50, 100];

    vm.submit = function () {
        $scope.model.submit(vm.dialogData.pageSize, vm.filters);
    };

    vm.toggle = function (key) {
        vm.filters[key] = !vm.filters[key];
    };

};

angular.module("umbraco").controller("Yuzu.Delivery.UmbracoImportViewModel.ListingSettingsDialog", contentDialog);