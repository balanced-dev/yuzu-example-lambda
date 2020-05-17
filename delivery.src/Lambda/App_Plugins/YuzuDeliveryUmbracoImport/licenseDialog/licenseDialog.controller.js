var app = angular.module("umbraco");

function licenseDialog($scope, formHelper, notificationsService, yuzuImportResources) {

    var vm = this;

    vm.dialogData = $scope.model.dialogData;

    vm.submit = function (createLicenseForm) {

        if (formHelper.submitForm({ formCtrl: createLicenseForm, scope: $scope })) {

            vm.buttonState = "busy";

            yuzuImportResources.activateLicense(vm.data)
                .then(function (response) {
                    vm.licenseStatus = response.data.licenseStatus;
                    vm.licenseName = response.data.licenseName;
                    vm.licenseEmail = response.data.licenseEmail;
                    vm.licenseKey = response.data.licenseKey;

                    if (vm.licenseStatus === 2) {
                        vm.buttonState = "success";
                        notificationsService.success("License Activated");
                        $scope.model.close();
                    }
                    else {
                        vm.buttonState = "error";
                        notificationsService.error("License Activation Error", response.data.licenseMessage);
                    }

                });
        }

    };

    vm.close = $scope.model.close;

    vm.deactivateLicense = function () {

        vm.buttonState = "busy";

        yuzuImportResources.deactivateLicense()
            .then(function (response) {
                vm.licenseStatus = response.data.licenseStatus;
                vm.licenseMessage = response.data.licenseMessage;

                if (response.data.licenseStatus === 2) {
                    vm.buttonState = "success";
                    notificationsService.error("License Deactivation Error", response.data.licenseMessage);
                }
                else {
                    vm.buttonState = "success";
                    notificationsService.success("License Deactivated");
                }

            });
    };

    yuzuImportResources.isActiveLicense()
        .then(function (response) {
            vm.licenseStatus = response.data.licenseStatus;
            vm.licenseMessage = response.data.licenseMessage;
            vm.licenseName = response.data.licenseName;
            vm.licenseEmail = response.data.licenseEmail;
            vm.licenseKey = response.data.licenseKey;
        });

    vm.data = {};

}

angular.module("umbraco").controller("Yuzu.Delivery.UmbracoImportViewModel.LicenseDialog", licenseDialog);

