var app = angular.module("umbraco");

function loggingDialog($scope, yuzuLoggingResource) {

    var vm = this;

    vm.submit = $scope.model.submit;
    vm.close = $scope.model.close;


    yuzuLoggingResource.get()
        .then(function (response) {
            vm.data = response.data;
            vm.templateTypes = Object.keys(response.data.templates);
        });

};

function yuzuLoggingResources($http) {
    return {
        get: function () {

            return $http.get('/umbraco/backoffice/YuzuDeliveryUmbracoImport/Logging/get/');
        }
    };
}

angular.module("umbraco").controller("Yuzu.Delivery.UmbracoImportViewModel.LoggingDialog", loggingDialog);
angular.module('umbraco.resources').factory('yuzuLoggingResource', yuzuLoggingResources);

