(function () {
    'use strict';

    function dashboardController(
        $scope, $timeout, navigationService, notificationsService, YuzuDeliveryCoreResources) {

        var vm = this;
        vm.loading = false;
        vm.dashboard = {};

        vm.page = {
            title: 'Yuzu Integrate',
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
            navigationService.syncTree({ tree: "YuzuDeliveryUmbracoImport", path: "-1" });
        });

        vm.loading = false;

    }

    angular.module('umbraco').controller('YuzuImportDashboardController', dashboardController);
})();