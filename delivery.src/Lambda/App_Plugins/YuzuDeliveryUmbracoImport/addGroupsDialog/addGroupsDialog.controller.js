var app = angular.module("umbraco");

function addGroupsDialog($scope, yuzuImportResources) {

    var vm = this;

    vm.close = $scope.model.close;
    vm.possibleGroups = [];

    vm.changeStatus = function (group) {
        if (!group.exists) {
            group.toAdd = !group.toAdd; 
        }
    };

    vm.selectGroup = function (group) {
        group.toAdd = true;
    };

    vm.noop = function ($event) {
        $event.stopPropagation();
    };

    vm.submit = function () {
        vm.buttonState = 'busy';
        yuzuImportResources.applyMultipleGroups(vm.possibleGroups)
            .then(function () {
                vm.buttonState = 'success';
                vm.refreshData();
                vm.refreshContentTypes();
            });
    };

    vm.refreshData = function () {
        yuzuImportResources.getPossibleGroups()
            .then(function (response) {
                vm.possibleGroups = response.data;
            });
    };

    vm.refreshContentTypes = function () {
        yuzuImportResources.getContentTypes().then(function (response) {
            vm.contentTypes = response.data;
        });
    };

    vm.refreshContentTypes();
    vm.refreshData();
}

angular.module("umbraco").controller("Yuzu.Delivery.UmbracoImportViewModel.AddGroupsDialog", addGroupsDialog);