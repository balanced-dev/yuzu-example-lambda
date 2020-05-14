var app = angular.module("umbraco");

function previewDialog($scope, formHelper, yuzuPreviewResources) {

    var vm = this;

    vm.dialogData = $scope.model.dialogData;
    vm.close = $scope.model.close;

    yuzuPreviewResources.get(vm.dialogData.vmName)
        .then(function (response) {
            vm.states = response.data;
            vm.previewUrl = vm.states[0].path;
        });
}

function yuzuPreviewResources($http) {
    return {
        get: function (vmName) {
            return $http.get('/umbraco/backoffice/YuzuDeliveryUmbracoImport/Previews/GetUrls/?vmName=' + vmName);
        }
    };
}

angular.module("umbraco").controller("Yuzu.Delivery.UmbracoImportViewModel.PreviewDialog", previewDialog);
angular.module('umbraco.resources').factory('yuzuPreviewResources', yuzuPreviewResources);

