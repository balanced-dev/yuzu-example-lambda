var app = angular.module("umbraco");

function toolsDialog($scope, editorService) {

    var vm = this;
    vm.close = $scope.model.close;

    vm.openAddGroupsDialog = function () {
        editorService.open({
            view: '../App_Plugins/YuzuDeliveryUmbracoImport/addGroupsDialog/addGroupsDialog.html',
            size: 'large',
            close: function () {
                editorService.close();
            }
        });
    };

    vm.openManualMappingAllDialog = function () {
        editorService.open({
            view: '../App_Plugins/YuzuDeliveryUmbracoImport/manualMappingDialog/manualMappingAllDialog.html',
            size: 'large',
            close: function () {
                editorService.close();
            }
        });
    };

    vm.openLoggingDialog = function () {
        editorService.open({
            view: '../App_Plugins/YuzuDeliveryUmbracoImport/loggingDialog/loggingDialog.html',
            size: 'small',
            dialogData: {
            },
            close: function () {
                editorService.close();
            }
        });
    };

};

angular.module("umbraco").controller("Yuzu.Delivery.UmbracoImportViewModel.ToolsDialog", toolsDialog);

