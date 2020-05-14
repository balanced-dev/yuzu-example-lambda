var app = angular.module("umbraco");

function manualMappingDialog($scope, $timeout, yuzuManualMappingResources, editorService) {

    var vm = this;

    vm.close = $scope.model.close;
    vm.buttonState = {};
    vm.buttonState.code = {};
    vm.buttonState.save = {};
    vm.data = $scope.model.dialogData;

    vm.title = 'Manual mapping for ' + vm.data.vmLabel;
    if (vm.data.propertyName)
        vm.title = vm.title + ' and '+ vm.data.propertyName;

    yuzuManualMappingResources.getViable(vm.data)
        .then(function (response) {
            vm.viableItems = response.data.items;
            vm.viable = response.data.selected;
            vm.selectedInCode = response.data.selectedInCode;
        });

    yuzuManualMappingResources.generationOptions(vm.data)
        .then(function (response) {
            vm.generationOptions = response.data;
            vm.generationOption = response.data[0];
        });

    vm.openActiveMaps = function () {
        editorService.open({
            view: '../App_Plugins/YuzuDeliveryUmbracoImport/manualMappingDialog/manualMappingAllDialog.html',
            size: 'large',
            close: function () {
                editorService.close();
            }
        });
    };

    vm.createCode = function () {
        vm.buttonState.code = "busy";
        yuzuManualMappingResources.createCode(vm.data, vm.generationOption.id)
            .then(function (response) {
                vm.generationMessage = response.data;
                vm.buttonState.code = 'success';
            });
    };

    vm.submit = function () {
        vm.buttonState.save = 'busy';
        yuzuManualMappingResources.save(vm.data, vm.viable)
            .then(function () {
                $timeout(function () {
                    yuzuManualMappingResources.poll()
                        .then(function () {
                            vm.buttonState.save = 'success';
                        });
                }, 3000);
            });
    };
}

function yuzuManualMappingResources($http) {
    return {
        getViable: function (data) {
            if(data.propertyName)
                return $http.get('/umbraco/backoffice/YuzuDeliveryUmbracoImport/ManualMapping/GetViableForMember/?dest=' + data.vmName + '&destMember=' + data.propertyName + '&ignored=' + data.ignored);
            else
                return $http.get('/umbraco/backoffice/YuzuDeliveryUmbracoImport/ManualMapping/GetViableForType/?dest=' + data.vmName);
        },
        save: function (data, mapper) {

            return $http.post('/umbraco/backoffice/YuzuDeliveryUmbracoImport/ManualMapping/Save/', { dest: data.vmName, destMember: data.propertyName, mapper: mapper, ignored: data.ignored });
        },
        poll: function () {

            return $http.get('/umbraco/backoffice/YuzuDeliveryUmbracoImport/ManualMapping/poll/');
        },
        generationOptions: function (data) {

            return $http.get('/umbraco/backoffice/YuzuDeliveryUmbracoImport/ManualMapping/GenerationOptions/?destMember=' + data.propertyName + '&ignored=' + data.ignored);
        },
        createCode: function (data, templateId) {

            return $http.post('/umbraco/backoffice/YuzuDeliveryUmbracoImport/ManualMapping/GenerateCode/', { dest: data.vmName, destMember: data.propertyName, ignored: data.ignored, templateId: templateId });
        },
        getActiveMaps: function () {

            return $http.get('/umbraco/backoffice/YuzuDeliveryUmbracoImport/ManualMapping/GetActiveMaps/');
        }
    };
}

angular.module("umbraco").controller("Yuzu.Delivery.UmbracoImportViewModel.ManualMappingDialog", manualMappingDialog);
angular.module('umbraco.resources').factory('yuzuManualMappingResources', yuzuManualMappingResources);

