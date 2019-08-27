function UmbracoImportViewModelController($scope, notificationsService, editorService, yuzuImportResources) {

    var vm = this;

    vm.selectedItems = [];

    vm.anySelected = function () {
        return _.any(vm.items, function (item) { return item.selected; });
    };

    vm.page = {};
    vm.page.pageNumber = 1;
    vm.page.totalPages = 1;
    vm.page.pageSize = 10;
    vm.page.filter = '';

    vm.breadcrumbs = [];
    vm.viewmodel = '';

    yuzuImportResources.getTypes().then(function (response) {
        vm.types = response.data;
    });

    yuzuImportResources.getConfig().then(function (response) {
        vm.config =  JSON.parse(response.data);
    });

    var refreshData = function () {
        yuzuImportResources.list(vm.page.pageNumber, vm.page.pageSize, vm.page.filter).then(function (response) {
            vm.items = response.data.items;
            vm.page.totalPages = response.data.pageCount;
            if (vm.page.pageNumber > vm.page.totalPages) {
                vm.page.pageNumber = vm.page.totalPages;
                refreshData();
            }

        });
    };

    vm.editItem = function (viewmodel) {
        yuzuImportResources.get(viewmodel).then(function (response) {
            vm.propertyGroups = response.data;
            vm.viewmodel = viewmodel;
            vm.breadcrumbs.push(viewmodel);
        });
    };

    vm.nextPage = function (pageNumber) {
        vm.page.pageNumber = pageNumber;
        refreshData();
    };

    vm.goToPage = function (pageNumber) {
        vm.page.pageNumber = pageNumber;
        refreshData();
    };

    vm.prevPage = function (pageNumber) {
        vm.page.pageNumber = pageNumber;
        refreshData();
    };

    vm.enterSearch = function () {
        searchListView();
    };

    vm.updateProperty = function (property) {
        yuzuImportResources.changeDocumentTypeProperty(property).then(function () {
            notificationsService.success(property.viewmodelPropertyName + " items created");
            vm.editItem(vm.viewmodel);
            refreshData();
        });
    };

    vm.mapViewmodel = function (viewmodelName) {
        yuzuImportResources.mapViewModel(viewmodelName).then(function () {
            notificationsService.success(viewmodelName + " items created");
            refreshData();
        });
    };

    vm.mapAllViewmodels = function () {
        var viewmodels = _.map(vm.items, function (obj) {
            return _.pick(obj, "name");
        });
        yuzuImportResources.mapAllViewmodels(viewmodels).then(function () {
            notificationsService.success("All viewmodel items created");
            refreshData();
        });
    };

    vm.mappAllProperties = function () {
        yuzuImportResources.changeAll(vm.propertyGroups).then(function () {
            notificationsService.success("All property items created");
            vm.editItem(vm.viewmodel);
        });
    };

    vm.returnToListing = function () {
        vm.propertyGroups = undefined;
        vm.breadcrumbs = [];
    };

    vm.openContentDialog = function (item, property) {
        editorService.open({
            view: '../App_Plugins/YuzuDelivery.UmbracoImport/contentDialog/contentDialog.html',
            size: 'small',
            dialogData: {
                viewmodel: item.name,
                documentType: item.documentType
            },
            submit: function (data) {
                image = data.data;
            },
            close: function (model) {
                editorService.close();
            }
        });
    };

    vm.openSettingsDialog = function (viewmodel) {
        editorService.open({
            view: '../App_Plugins/YuzuDelivery.UmbracoImport/settingsDialog/settingsDialog.html',
            size: 'small',
            dialogData: {
                viewmodel: viewmodel,
                storeContentAs: vm.config.models[viewmodel] ? vm.config.models[viewmodel].storeContentAs : undefined
            },
            submit: function (storeContentAs) {
                if (storeContentAs.type > 0) {
                    if (!vm.config.models[viewmodel])
                        vm.config.models[viewmodel] = {};
                    vm.config.models[viewmodel].storeContentAs = storeContentAs;
                }
                else {
                    vm.config.models[viewmodel] = undefined;
                }
                yuzuImportResources.setConfig(vm.config);
                editorService.close();
            },
            close: function (model) {
                editorService.close();
            }
        });
    };

    var searchListView = _.debounce(function () {
        vm.$apply(function () {
            makeSearch();
        });
    }, 500);

    function makeSearch() {
        if (vm.page.filter !== null && vm.page.filter !== undefined) {
            vm.page.pageNumber = 1;
            refreshData();
        }
    }

    refreshData();

}

function UmbracoImportViewModelResources($http) {
    return {
        list: function (pageNumber, pageSize, filter) {

            return $http.get('/umbraco/backoffice/YuzuDeliveryUmbracoImport/AutomateBuild/List/?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&filter=' + filter);

        },
        get: function (viewModel) {

            return $http.get('/umbraco/backoffice/YuzuDeliveryUmbracoImport/AutomateBuild/get/?viewmodelName=' + viewModel);

        },
        getTypes: function () {

            return $http.get('/umbraco/backoffice/YuzuDeliveryUmbracoImport/AutomateBuild/GetTypes/');

        },
        getConfig: function () {

            return $http.get('/umbraco/backoffice/YuzuDeliveryUmbracoImport/AutomateBuild/GetConfig/');

        },
        mapAllViewmodels: function (viewmodelNames) {

            return $http.post('/umbraco/backoffice/YuzuDeliveryUmbracoImport/AutomateBuild/MapAllViewModels/', viewmodelNames);

        },
        mapViewModel: function (viewmodelName) {

            return $http.post('/umbraco/backoffice/YuzuDeliveryUmbracoImport/AutomateBuild/MapViewModel/', { name: viewmodelName });

        },
        changeDocumentTypeProperty: function (property) {

            return $http.post('/umbraco/backoffice/YuzuDeliveryUmbracoImport/AutomateBuild/ChangeDocumentTypeProperty/', property);

        },
        changeAll: function (properties) {

            return $http.post('/umbraco/backoffice/YuzuDeliveryUmbracoImport/AutomateBuild/changeAll/', properties);

        },
        setConfig: function (config) {

            return $http({
                method: 'POST',
                url: '/umbraco/backoffice/YuzuDeliveryUmbracoImport/AutomateBuild/SetConfig/',
                data: JSON.stringify(config, null, 4)
            });

        }
    };
}

angular.module("umbraco").controller("Yuzu.Delivery.UmbracoImportViewModel.List", UmbracoImportViewModelController);
angular.module("umbraco").factory('yuzuImportResources', UmbracoImportViewModelResources);