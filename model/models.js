sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], 
    /**
     * provide app-view type models (as in the first "V" in MVVC)
     * 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.Device} Device
     * 
     * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
     */
    function (JSONModel, Device) {
        "use strict";

        return {
            createDeviceModel: function () {
                var oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
            },
            createWorkCentersModel: function () {
                var oModel = new JSONModel();
                oModel.setDefaultBindingMode("OneWay");
                oModel.loadData("model/workcenters.json");
                return oModel;
            },
            createOperationsModel: function () {
                var oModel = new JSONModel();
                oModel.setDefaultBindingMode("OneWay");
                oModel.loadData("model/operations.json");
                return oModel;
            },
            createEquipmentsModel: function () {
                var oModel = new JSONModel();
                oModel.setDefaultBindingMode("OneWay");
                oModel.loadData("model/equipments.json");
                return oModel;
            },
            createPlantsModel: function () {
                var oModel = new JSONModel();
                oModel.setDefaultBindingMode("OneWay");
                oModel.loadData("model/plants.json");
                return oModel;
            },
            createStorageLocationsModel: function () {
                var oModel = new JSONModel();
                oModel.setDefaultBindingMode("OneWay");
                oModel.loadData("model/storagelocations.json");
                return oModel;
            },
            createFunctionalLocationsModel: function () {
                var oModel = new JSONModel();
                oModel.setDefaultBindingMode("OneWay");
                oModel.loadData("model/functionallocations.json");
                return oModel;
            },
            createNewInstModel: function () {
                var oModel = new JSONModel();
                oModel.setDefaultBindingMode("TwoWay");
                oModel.loadData("model/newinst.json");
                return oModel;
            },
            createWeldingTypesModel: function () {
                var oModel = new JSONModel();
                oModel.setDefaultBindingMode("TwoWay");
                oModel.loadData("model/weldingtypes.json");
                return oModel;
            },
            createDispositionsModel: function () {
                var oModel = new JSONModel();
                oModel.setDefaultBindingMode("TwoWay");
                oModel.loadData("model/dispositions.json");
                return oModel;
            },
            createEquipmentCutsModel: function () {
                var oModel = new JSONModel();
                oModel.setDefaultBindingMode("TwoWay");
                oModel.loadData("model/equipmentcuts.json");
                return oModel;
            }
        };
});