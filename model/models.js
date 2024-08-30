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
            }
        };
});