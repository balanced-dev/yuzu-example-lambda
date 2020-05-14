function UmbracoImportViewModelController($scope, $timeout, notificationsService, editorService, yuzuImportResources, yuzuContentImportResources, viewModelButtonPermissions, propertyButtonPermissions) {

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
    vm.page.filters = {
        page: true,
        block: true,
        subVm: false,
        active: true,
        ignored: false
    };
    vm.page.showIgnored = false;

    vm.breadcrumbs = [];
    vm.viewmodel = '';
    vm.isLoading = true;
    vm.buttonState = {};
    vm.buttonState.update = {};

    vm.vButtons = viewModelButtonPermissions;
    vm.pButtons = propertyButtonPermissions;

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

    yuzuImportResources.getConfig().then(function (response) {
        vm.config =  JSON.parse(response.data);
    });

    vm.refreshData = function () {

        vm.buttonState.refresh = 'busy';
        yuzuImportResources.list(vm.page.pageNumber, vm.page.pageSize, vm.page.filter, vm.page.filters).then(function (response) {
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

    vm.refreshDataTypes = function () {

        yuzuImportResources.getTypes().then(function (response) {
            vm.types = response.data;
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

    vm.search = function() {
        if (vm.page.filter !== null && vm.page.filter !== undefined) {
            vm.page.pageNumber = 1;
            vm.refreshData();
        }
    }

    vm.viewmodelLabelClass = function(item) {
        if (item.isPage)
            return 'isPage';
        else if (item.isSubBlock)
            return 'isSubBlock';
        else
            return 'isBlock';
    };

    vm.changeDocumentType = function (item) {
        vm.buttonState.update[item.viewmodel] = 'busy';
        yuzuImportResources.changeDocumentType(item)
            .then(function () {
                vm.buttonState.update[item.viewmodel] = 'success';
                vm.refreshData();
                vm.refreshDataTypes();
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
                vm.refreshDataTypes();
            },
            updateAllError);
    };

    vm.changeProperty = function (property) {
        vm.buttonState.update[property.viewmodelPropertyName] = 'busy';
        yuzuImportResources.changeProperty(property)
            .then(function () {
                vm.buttonState.update[property.viewmodelPropertyName] = 'success';
                vm.refreshDataTypes();
                vm.editItem(vm.item.viewmodel);
            },
            function (response) { updateItemError(response, property.viewmodelPropertyName); });
    };

    vm.changeDocumentTypeLocal = function () {
        vm.buttonState.updateAll = 'busy';
        yuzuImportResources.changeDocumentType(vm.item)
            .then(function () {
                vm.buttonState.updateAll = 'success';
                vm.refreshDataTypes();
                vm.editItem(vm.item.viewmodel);
            },
            updateAllError);
    };

    vm.changeIgnore = function (add, viewmodel, property) {
        vm.buttonState.updateAll = 'busy';
        if (property) {
            yuzuImportResources.changeIgnoreProperty(add, viewmodel, property)
                .then(function () {
                    vm.buttonState.updateAll = 'success';
                    vm.editItem(viewmodel);
                }, updateAllError);
        }
        else {
            yuzuImportResources.changeIgnoreType(add, viewmodel)
                .then(function () {
                    vm.buttonState.updateAll = 'success';
                    vm.refreshData();
                }, updateAllError);
        }
    };

    vm.deleteMapping = function (viewmodel, propertyTypeAlias) {
        yuzuImportResources.deleteMapping(viewmodel, propertyTypeAlias)
            .then(function () {
                vm.buttonState.updateAll = 'success';
                if (propertyTypeAlias)
                    vm.editItem(viewmodel);
                else
                    vm.refreshData();
            }, updateAllError);
    };

    vm.returnToListing = function () {
        vm.propertyGroups = undefined;
        vm.breadcrumbs = [];
        vm.refreshData();
    };

    vm.openLicenseDialog = function () {
        editorService.open({
            view: '../App_Plugins/YuzuDeliveryUmbracoImport/licenseDialog/licenseDialog.html',
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

    vm.openListSettingsDialog = function () {
        editorService.open({
            view: '../App_Plugins/YuzuDeliveryUmbracoImport/listingSettingsDialog/listingSettingsDialog.html',
            size: 'small',
            dialogData: {
                filters: angular.copy(vm.page.filters),
                pageSize: vm.page.pageSize
            },
            submit: function (pageSize, filters) {
                vm.page.filters = filters;
                vm.page.pageSize = pageSize;
                vm.refreshData();
                editorService.close();
            },
            close: function () {
                editorService.close();
            }
        });
    };

    vm.openToolsDialog = function () {
        editorService.open({
            view: '../App_Plugins/YuzuDeliveryUmbracoImport/toolsDialog/toolsDialog.html',
            size: 'small',
            close: function () {
                editorService.close();
                vm.refreshData();
            }
        });
    };

    vm.openContentDialog = function (item) {
        editorService.open({
            view: '../App_Plugins/YuzuDeliveryUmbracoImport/contentDialog/contentDialog.html',
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
            view: '../App_Plugins/YuzuDeliveryUmbracoImport/settingsDialog/settingsDialog.html',
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

    vm.openManualMappingsDialog = function (item, property) {

        var vmName, propertyName, ignored;
        if (item) {
            vmName = item.viewmodel;
            vmLabel = item.viewmodelLabel;
            propertyName = '';
            ignored = item.ignored;
        }
        else {
            vmName = property.viewmodelName;
            vmLabel = property.viewmodelName;
            propertyName = property.viewmodelPropertyName;
            ignored = property.ignored;
        }

        editorService.open({
            view: '../App_Plugins/YuzuDeliveryUmbracoImport/manualMappingDialog/manualMappingDialog.html',
            size: 'medium',
            dialogData: {
                vmName: vmName,
                vmLabel: vmLabel,
                propertyName: propertyName,
                ignored: ignored
            },
            close: function () {
                editorService.close();
                if (propertyName)
                    vm.editItem(vmName);
                else
                    vm.refreshData();
            }
        });
    };

    vm.openPreviewDialog = function (item) {

        editorService.open({
            view: '../App_Plugins/YuzuDeliveryUmbracoImport/previewDialog/previewDialog.html',
            size: 'large',
            dialogData: {
                vmLabel: item.viewmodelLabel,
                vmName: item.viewmodel,
            },
            close: function () {
                editorService.close();
            }
        });
    };

    vm.openAddGroupsDialog = function () {
        editorService.open({
            view: '../App_Plugins/YuzuDeliveryUmbracoImport/addGroupsDialog/addGroupsDialog.html',
            size: 'large',
            close: function () {
                editorService.close();
                vm.refreshData();
            }
        });
    };

    vm.refreshData();
    vm.refreshDataTypes();

}

function UmbracoImportViewModelResources($http, $timeout) {
    return {
        list: function (pageNumber, pageSize, filter, filters) {

            var data = angular.copy(filters);
            data.filter = filter;
            data.pageNumber = pageNumber;
            data.pageSize = pageSize;

            return $http.post('/umbraco/backoffice/YuzuDeliveryUmbracoImport/SchemaMappings/List/', data);

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
        getPossibleGroups: function () {

            return $http.get('/umbraco/backoffice/YuzuDeliveryUmbracoImport/SchemaMappings/GetPossibleGroupedInstances/');

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
        changeIgnoreType: function (add, type) {

            return $http.post('/umbraco/backoffice/YuzuDeliveryUmbracoImport/SchemaChange/ChangeIgnoreType', { add: add, type: type});

        },
        changeIgnoreProperty: function (add, type, property) {

            return $http.post('/umbraco/backoffice/YuzuDeliveryUmbracoImport/SchemaChange/ChangeIgnoreProperty/', { add: add, type: type, property: property });

        },
        deleteMapping: function (viewmodelName, propertyTypeAlias) {

            return $http.post('/umbraco/backoffice/YuzuDeliveryUmbracoImport/SchemaChange/DeleteMapping/', { viewmodelName: viewmodelName, propertyTypeAlias: propertyTypeAlias });

        },
        applySettings: function (viewmodel, documentTypeName, storeContentAs) {

            return $http.post('/umbraco/backoffice/YuzuDeliveryUmbracoImport/SchemaChange/ApplySettings/', {
                viewmodel: viewmodel,
                documentTypeName: documentTypeName,
                storeContentAs: JSON.stringify(storeContentAs, null, 2)
            });
        },
        canApplySetting: function (viewmodel) {

            return $http.post('/umbraco/backoffice/YuzuDeliveryUmbracoImport/SchemaChange/CanApplySetting/', {
                viewmodel: viewmodel
            });
        },
        applyMultipleGroups: function (data) {

            return $http.post('/umbraco/backoffice/YuzuDeliveryUmbracoImport/SchemaChange/ApplyMultipleGroups/', data);
        },
        getConfig: function () {

            return $http.get('/umbraco/backoffice/YuzuDeliveryUmbracoImport/Config/Get/');

        },
        isValidTrialKey: function (key) {
            return $http.get('http://balanceddev.hifi.agency/umbraco/api/activation/isvalid', { key: key});
        },
        setTrialKey: function (key, trialKey) {
            return $http.get('http://balanceddev.hifi.agency/umbraco/api/activation/set', { key: key, trialKey: trialKey });
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

function ViewModelButtonPermissions() {
    return {
        canDelete: function (vm) {
            // Can delete when mapped to CMS but not ignored
            return vm.documentTypeAlias && !vm.hasManualMap;
        },
        canIgnore: function (vm) {
            // Can ignore if not ignored and not mapped
            return !vm.ignored && !vm.documentTypeAlias;
        },
        canRemoveIgnore: function (vm) {
            // Can make active if ignored and is ignore is added via Umbraco
            return vm.ignored && vm.isConfigIgnore && !vm.hasManualMap;
        },
        isMakeActiveBlocked: function (vm) {
            // Making active is block because ignore has been added by a mapping or manually in code
            return (vm.ignored && !vm.isConfigIgnore) || vm.hasManualMap;
        },
        canAddManualMapping: function (vm) {
            // Can fill manually if ignored and a 
            // or can apply after maps if mapped
            // but can't if just unmapped
            return vm.ignored || vm.documentTypeAlias;
        }
    };
}

function PropertyButtonPermissions() {
    return {
        canDelete: function (property) {
            // Can delete when mapped to CMS but not merged
            return !property.ignored && !property.isMerged && property.config && property.isMapped;
        },
        canIgnore: function (property) {
            // Can ignore if not ignored and not mapped
            return !property.ignored && !property.isMerged && property.config && !property.isMapped;
        },
        canRemoveIgnore: function (property) {
            // Can make active if ignored and is ignore is added via Umbraco
            return property.ignored && property.isConfigIgnore && !property.hasManualMap;
        },
        isMakeActiveBlocked: function (property) {
            // Making active is block because ignore has been added by a mapping or manually in code
            return (property.ignored && !property.isConfigIgnore) || property.hasManualMap;
        },
        canAddManualMapping: function (property) {
            // Can fill manually if ignore
            // or can apply after maps if mapped
            // but can't if just unmapped
            return !property.isMerged && (property.isMapped || property.ignored);
        }
    };
}

angular.module("umbraco").factory('viewModelButtonPermissions', ViewModelButtonPermissions); 
angular.module("umbraco").factory('propertyButtonPermissions', PropertyButtonPermissions); 
angular.module("umbraco").controller("Yuzu.Delivery.UmbracoImportViewModel.List", UmbracoImportViewModelController);
angular.module("umbraco").factory('yuzuImportResources', UmbracoImportViewModelResources);