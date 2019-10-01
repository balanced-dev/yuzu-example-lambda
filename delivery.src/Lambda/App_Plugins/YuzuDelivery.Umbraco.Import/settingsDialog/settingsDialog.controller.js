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

    vm.toggle = function () {
        vm.storeContentAs.addAreaNode = !vm.storeContentAs.addAreaNode;
    };
};

angular.module("umbraco").controller("Yuzu.Delivery.UmbracoImportViewModel.SettingsDialog", settingsDialog);

