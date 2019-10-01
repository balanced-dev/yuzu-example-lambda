function UmbracoImportViewModelController($scope, notificationsService, editorService, yuzuImportResources, yuzuContentImportResources) {

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
    vm.isLoading = true;
    vm.buttonState = {};
    vm.buttonState.update = {};


    //ysod 
    vm.ysodOverlay = {
        title: 'An error ocurred',
        hideSubmitButton: true,
        closeButtonLabel: 'close',
        view: "ysod"
    };

    var updateAllError = function (response) {
        vm.buttonState.updateAll = 'error';
        vm.ysodOverlay.error = response;
        vm.ysodOverlay.show = true;
    };

    var updateItemError = function (response, name) {
        vm.buttonState.update[name] = 'success';
        vm.ysodOverlay.error = response;
        vm.ysodOverlay.show = true;
    };

    yuzuImportResources.getTypes().then(function (response) {
        vm.types = response.data;
    });

    yuzuImportResources.getConfig().then(function (response) {
        vm.config =  JSON.parse(response.data);
    });

    vm.refreshData = function () {

        vm.buttonState.refresh = 'busy';
        yuzuImportResources.list(vm.page.pageNumber, vm.page.pageSize, vm.page.filter).then(function (response) {
            vm.items = response.data.items;
            vm.isActive = response.data.isActive;
            vm.licenseStatus = response.data.licenseStatus;
            vm.licenseMessage = response.data.licenseMessage;
            vm.page.totalPages = response.data.pageCount;
            if (vm.page.pageNumber > vm.page.totalPages) {
                vm.page.pageNumber = vm.page.totalPages;
                vm.refreshData();
            }
            vm.isLoading = false; 
            vm.buttonState.refresh = 'success';
        });
    };

    vm.editItem = function (viewmodel) {

        vm.buttonState.refresh = 'busy';
        yuzuImportResources.get(viewmodel).then(function (response) {
            vm.item = {
                viewmodel: viewmodel,
                documentTypeName: response.data.contentTypeName,
                documentTypeAlias: response.data.contentTypeAlias
            };
            vm.propertyGroups = response.data.propertyGroups;
            if (!vm.breadcrumbs.includes(viewmodel)) {
                vm.breadcrumbs.push(viewmodel);
            }
            vm.buttonState.refresh = 'success';
        });
    };

    vm.nextPage = function (pageNumber) {
        vm.isLoading = true; 
        vm.page.pageNumber = pageNumber;
        vm.refreshData();
    };

    vm.goToPage = function (pageNumber) {
        vm.isLoading = true; 
        vm.page.pageNumber = pageNumber;
        vm.refreshData();
    };

    vm.prevPage = function (pageNumber) {
        vm.isLoading = true; 
        vm.page.pageNumber = pageNumber;
        vm.refreshData();
    };

    vm.enterSearch = function () {
        searchListView();
    };

    vm.changeDocumentType = function (item) {
        vm.buttonState.update[item.viewmodel] = 'busy';
        yuzuImportResources.changeDocumentType(item)
            .then(function () {
                vm.buttonState.update[item.viewmodel] = 'success';
                vm.refreshData();
            },
            function (response) { updateItemError(response, item.viewmodel); });
    };

    vm.changeDocumentTypes = function ($event) {
        var viewmodels = _.map(vm.items, function (obj) {
            return _.pick(obj, "name");
        });
        vm.buttonState.updateAll = 'busy';
        yuzuImportResources.changeDocumentTypes(viewmodels)
            .then(function () {
                vm.buttonState.updateAll = 'success';
                vm.refreshData();
            },
            updateAllError);
    };

    vm.changeProperty = function (property) {
        vm.buttonState.update[property.viewmodelPropertyName] = 'busy';
        yuzuImportResources.changeProperty(property)
            .then(function () {
                vm.buttonState.update[property.viewmodelPropertyName] = 'success';
                vm.editItem(vm.item.viewmodel);
            },
            function (response) { updateItemError(response, property.viewmodelPropertyName); });
    };

    vm.changeDocumentTypeLocal = function () {
        vm.buttonState.updateAll = 'busy';
        yuzuImportResources.changeDocumentType(vm.item)
            .then(function () {
                vm.buttonState.updateAll = 'success';
                vm.editItem(vm.item.viewmodel);
            },
            updateAllError);
    };

    vm.returnToListing = function () {
        vm.propertyGroups = undefined;
        vm.breadcrumbs = [];
        vm.refreshData();
    };

    vm.openLicenseDialog = function () {
        editorService.open({
            view: '../App_Plugins/YuzuDelivery.Umbraco.Import/licenseDialog/licenseDialog.html',
            size: 'small',
            dialogData: {
                licenseStatus: vm.licenseStatus
            },
            close: function () {
                vm.refreshData();
                editorService.close();
            }
        });
    };

    vm.openContentDialog = function (item) {
        editorService.open({
            view: '../App_Plugins/YuzuDelivery.Umbraco.Import/contentDialog/contentDialog.html',
            size: 'small',
            dialogData: {
                viewmodel: item.viewmodel,
                documentTypeName: item.documentTypeName
            },
            submit: function (toImport) {

                yuzuContentImportResources.import(toImport)
                    .then(
                    function () {
                        notificationsService.success("Content imported sucessfully");
                        editorService.close();
                    }, function (response) { editorService.close(); updateItemError(response, item.viewmodel); });
            },
            close: function () {
                editorService.close();
            }
        });
    };

    vm.openSettingsDialog = function (item) {
        editorService.open({
            view: '../App_Plugins/YuzuDelivery.Umbraco.Import/settingsDialog/settingsDialog.html',
            size: 'small',
            dialogData: {
                item: item,
                storeContentAs: vm.config.models[item.viewmodel] ? vm.config.models[item.viewmodel].storeContentAs : undefined
            },
            submit: function (item, storeContentAs) {
                if (storeContentAs.type > 0) {
                    if (!vm.config.models[item.viewmodel])
                        vm.config.models[item.viewmodel] = {};
                    vm.config.models[item.viewmodel].storeContentAs = storeContentAs;
                }
                else {
                    vm.config.models[item.viewmodel] = undefined;
                }

                yuzuImportResources.applySettings(item.viewmodel, item.documentTypeAlias, storeContentAs)
                    .then(function () {
                        editorService.close();
                        vm.editItem(item.viewmodel);

                        yuzuImportResources.getConfig().then(function (response) {
                            vm.config = JSON.parse(response.data);
                        });

                    }, function (response) { editorService.close(); updateItemError(response, item.viewmodel); });
            },
            close: function () {
                editorService.close();
            }
        });
    };

    vm.openLoggingDialog = function () {
        editorService.open({
            view: '../App_Plugins/YuzuDelivery.Umbraco.Import/loggingDialog/loggingDialog.html',
            size: 'small',
            dialogData: {
            },
            close: function () {
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
            vm.refreshData();
        }
    }

    vm.refreshData();

}

function UmbracoImportViewModelResources($http, $timeout) {
    return {
        list: function (pageNumber, pageSize, filter) {

            return $http.get('/umbraco/backoffice/YuzuDeliveryUmbracoImport/SchemaMappings/List/?pageNumber=' + pageNumber + '&pageSize=' + pageSize + '&filter=' + filter);

        },
        get: function (viewModel) {

            return $http.get('/umbraco/backoffice/YuzuDeliveryUmbracoImport/SchemaMappings/get/?viewmodelName=' + viewModel);

        },
        getTypes: function () {

            return $http.get('/umbraco/backoffice/YuzuDeliveryUmbracoImport/SchemaMappings/GetTypes/');

        },
        getContentTypes: function () {

            return $http.get('/umbraco/backoffice/YuzuDeliveryUmbracoImport/SchemaMappings/GetContentTypes/');

        },
        changeDocumentType: function (item) {

            return $http.post('/umbraco/backoffice/YuzuDeliveryUmbracoImport/SchemaChange/ChangeDocumentType/', { viewModelName: item.viewmodel, documentTypeName: item.documentType });

        },
        changeDocumentTypes: function (items) {

            return $http.post('/umbraco/backoffice/YuzuDeliveryUmbracoImport/SchemaChange/ChangeDocumentTypes/', items);

        },
        changeProperty: function (property) {

            return $http.post('/umbraco/backoffice/YuzuDeliveryUmbracoImport/SchemaChange/ChangeProperty/', property);

        },
        applySettings: function (viewmodel, documentTypeName, storeContentAs) {

            return $http.post('/umbraco/backoffice/YuzuDeliveryUmbracoImport/SchemaChange/ApplySettings/', {
                viewmodel: viewmodel,
                documentTypeName: documentTypeName,
                storeContentAs: JSON.stringify(storeContentAs, null, 2)
            });
        },
        getConfig: function () {

            return $http.get('/umbraco/backoffice/YuzuDeliveryUmbracoImport/Config/Get/');

        },
        isActiveLicense: function (data) {

            return $http.get('/umbraco/backoffice/YuzuDeliveryUmbracoImport/License/IsActive/');
        },
        activateLicense: function (data) {

            return $http.post('/umbraco/backoffice/YuzuDeliveryUmbracoImport/License/Activate/', data);
        },
        deactivateLicense: function (data) {

            return $http.post('/umbraco/backoffice/YuzuDeliveryUmbracoImport/License/Deactivate/');
        }
    };
}

angular.module("umbraco").controller("Yuzu.Delivery.UmbracoImportViewModel.List", UmbracoImportViewModelController);
angular.module("umbraco").factory('yuzuImportResources', UmbracoImportViewModelResources);