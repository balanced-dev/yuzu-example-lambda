﻿var app = angular.module("umbraco");

function contentDialog($scope, notificationsService, yuzuContentImportResources) {

    var vm = this;

    vm.dialogData = $scope.model.dialogData;
    vm.submit = $scope.model.submit;
    vm.close = $scope.model.close;

    vm.toImport = {};
    vm.toImport.viewmodel = vm.dialogData.viewmodel;
    vm.toImport.documentType = vm.dialogData.documentType;

    vm.contentEditorSettings = {};
    vm.contentEditorSettings.view = 'views/propertyeditors/contentpicker/contentpicker.html';
    vm.contentEditorSettings.config = {};
    vm.contentEditorSettings.config.minNumber = 1;
    vm.contentEditorSettings.config.maxNumber = 1;

    yuzuContentImportResources.getAllContent(vm.dialogData.viewmodel).then(function (response) {
        vm.toImport.file = response.data[0];
        vm.contentFiles = response.data;
    });

    vm.import = function () {
        vm.invalidForm = false;
        if (vm.toImport.filename)
            vm.toImport.file = _.findWhere(vm.contentFiles, { filename: vm.toImport.filename });

        if (vm.toImport.content) {
            yuzuContentImportResources.import(vm.toImport)
                .then(
                function () {
                    notificationsService.success("Content imported sucessfully");
                    vm.close();
                },
                function () {
                    notificationsService.error("Error ocurred when adding content");
                });
        }
        else {
            vm.invalidForm = true;
        }
    };
};

function YuzuContentImportResources($http) {
    return {
        getAllContent: function (viewmodelName) {

            return $http.get('/umbraco/backoffice/YuzuDeliveryUmbracoImport/YuzuContentImport/GetContentFiles/?viewmodelName=' + viewmodelName);
        },
        import: function (toImport) {

            return $http.post('/umbraco/backoffice/YuzuDeliveryUmbracoImport/YuzuContentImport/Import/', toImport);
        }
    };
}

function YuzuContentImportPicker() {
    return {
        restrict: 'E',
        template: "<div ng-include='propertyEditorView'></div>",
        link: function (scope, element, attr) {

            scope.model = {};
            scope.model.config = scope.settings.config;
            scope.model.value = scope.value;
            scope.propertyEditorView = scope.settings.view;

            scope.$watch('model.value', function () {
                scope.value = scope.model.value;
            });

        },
        scope: {
            value: '=',
            settings: '='
        }
    };
}

angular.module("umbraco").controller("Yuzu.Delivery.UmbracoImportViewModel.ContentDialog", contentDialog);
angular.module('umbraco.resources').factory('yuzuContentImportResources', YuzuContentImportResources);
angular.module("umbraco").directive('yuzuContentImportPicker', YuzuContentImportPicker);

