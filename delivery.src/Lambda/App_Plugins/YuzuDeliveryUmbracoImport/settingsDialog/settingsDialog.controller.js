var app = angular.module("umbraco");

function settingsDialog($scope, formHelper, yuzuImportResources) {

    var vm = this;

    vm.dialogData = $scope.model.dialogData;
    vm.item = vm.dialogData.item;
    if (vm.dialogData.storeContentAs)
        vm.storeContentAs = vm.dialogData.storeContentAs;
    else {
        vm.storeContentAs = {};
        vm.storeContentAs["$type"] = "YuzuDelivery.Umbraco.Import.InlineStoreContentAs, YuzuDelivery.Umbraco.Import";
        vm.storeContentAs.type = 0;
    }
    vm.close = $scope.model.close;

    vm.contentEditorSettings = {};
    vm.contentEditorSettings.view = 'views/propertyeditors/contentpicker/contentpicker.html';
    vm.contentEditorSettings.config = {};
    vm.contentEditorSettings.config.minNumber = 1;
    vm.contentEditorSettings.config.maxNumber = 1;

    yuzuImportResources.getContentTypes().then(function (response) {
        vm.contentTypes = response.data;
    });

    yuzuImportResources.canApplySetting(vm.item.viewmodel).then(function (response) {
        vm.validationErrors = response.data;
    });

    vm.isValidType = function (storeContentAsType) {
        if (!vm.validationErrors)
            return true;
        else
            return !(storeContentAsType in vm.validationErrors);
    };

    vm.showType = function (storeContentAsType) {
        return vm.isValidType(storeContentAsType) && vm.storeContentAs.type === storeContentAsType;
    };

    vm.change = function () {
        var newType = {};
        if (vm.storeContentAs.type === 0)
            newType["$type"] = "YuzuDelivery.Umbraco.Import.InlineStoreContentAs, YuzuDelivery.Umbraco.Import";
        else if (vm.storeContentAs.type === 1)
            newType["$type"] = "YuzuDelivery.Umbraco.Import.GlobalStoreContentAs, YuzuDelivery.Umbraco.Import";
        else if (vm.storeContentAs.type === 2)
            newType["$type"] = "YuzuDelivery.Umbraco.Import.GroupStoreContentAs, YuzuDelivery.Umbraco.Import";
        newType.type = vm.storeContentAs.type;
        vm.storeContentAs = newType;
    };

    vm.submit = function (storeContactAsForm) {

        if (formHelper.submitForm({ formCtrl: storeContactAsForm, scope: $scope })) {

            vm.buttonState = "busy";

            $scope.model.submit(vm.item, vm.storeContentAs);
        }

    };

};

angular.module("umbraco").controller("Yuzu.Delivery.UmbracoImportViewModel.SettingsDialog", settingsDialog);

