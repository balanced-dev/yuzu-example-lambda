var app = angular.module("umbraco");

function licenseDialog($scope, formHelper, yuzuImportResources) {

    var vm = this;

    vm.dialogData = $scope.model.dialogData;

    vm.submit = function (createLicenseForm) {

        if (formHelper.submitForm({ formCtrl: createLicenseForm, scope: $scope })) {

            vm.buttonState = "busy";

            yuzuImportResources.activateLicense(vm.data)
                .then(function (response) {
                    vm.licenseStatus = response.data.licenseStatus;
                    vm.licenseMessage = response.data.licenseMessage;
                });
        }

    };

    vm.close = $scope.model.close;

    vm.deactivateLicense = function () {
        yuzuImportResources.deactivateLicense()
            .then(function (response) {
                vm.licenseStatus = response.data.licenseStatus;
                vm.licenseMessage = response.data.licenseMessage;
            });
    };

    yuzuImportResources.isActiveLicense()
        .then(function (response) {
            vm.licenseStatus = response.data.licenseStatus;
            vm.licenseMessage = response.data.licenseMessage;
        });

    vm.data = {};

}

angular.module("umbraco").controller("Yuzu.Delivery.UmbracoImportViewModel.LicenseDialog", licenseDialog);

