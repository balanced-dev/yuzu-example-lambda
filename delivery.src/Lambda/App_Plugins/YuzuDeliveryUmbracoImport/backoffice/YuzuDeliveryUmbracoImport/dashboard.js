(function () {
    'use strict';

    function dashboardController(
        $scope, $timeout, navigationService, notificationsService, YuzuDeliveryCoreResources) {

        var vm = this;
        vm.loading = false;
        vm.dashboard = {};

        vm.page = {
            title: 'Yuzu Delivery Viewmodel Import',
            navigation: [
                {
                    'name': 'import',
                    'alias': 'import',
                    'icon': 'icon-heart',
                    'view': Umbraco.Sys.ServerVariables.umbracoSettings.appPluginsPath + '/YuzuDeliveryUmbracoImport/UmbracoImportViewModelList.html',
                    'active': true
                }
            ]
        };

        $timeout(function () {
            navigationService.syncTree({ tree: "YuzuDeliveryUmbracoImport", path: "0" });
        });

        vm.loading = false;

    }

    angular.module('umbraco').controller('YuzuImportDashboardController', dashboardController);
})();