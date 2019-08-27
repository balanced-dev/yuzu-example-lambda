var app = angular.module("umbraco");

function settingsDialog($scope) {

    var vm = this;

    vm.dialogData = $scope.model.dialogData;
    if (vm.dialogData.storeContentAs)
        vm.storeContentAs = vm.dialogData.storeContentAs;
    else {
        vm.storeContentAs = {};
        vm.storeContentAs["$type"] = "";
        vm.storeContentAs.type = 0;
    }
    vm.submit = $scope.model.submit;
    vm.close = $scope.model.close;

    vm.contentEditorSettings = {};
    vm.contentEditorSettings.view = 'views/propertyeditors/contentpicker/contentpicker.html';
    vm.contentEditorSettings.config = {};
    vm.contentEditorSettings.config.minNumber = 1;
    vm.contentEditorSettings.config.maxNumber = 1;

    vm.change = function () {
        var newType = {};
        if (vm.storeContentAs.type === 1)
            newType["$type"] = "YuzuDelivery.Import.GlobalStoreContentAs, yuzu-del-umb-import";
        else if (vm.storeContentAs.type === 2)
            newType["$type"] = "YuzuDelivery.Import.GroupStoreContentAs, yuzu-del-umb-import";
        newType.type = vm.storeContentAs.type;
        vm.storeContentAs = newType;
    };

    vm.toggle = function () {
        vm.storeContentAs.addAreaNode = !vm.storeContentAs.addAreaNode;
    };
};

angular.module("umbraco").controller("Yuzu.Delivery.UmbracoImportViewModel.SettingsDialog", settingsDialog);

