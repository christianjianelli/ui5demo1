/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "jianelli/mock01/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("jianelli.mock01.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                // set the work centers model
                this.setModel(models.createWorkCentersModel(), "workcenters");

                // set the operations model
                this.setModel(models.createOperationsModel(), "operations");

                // set the equipments model
                this.setModel(models.createEquipmentsModel(), "equipments");

                // set the weldingtypes model
                this.setModel(models.createWeldingTypesModel(), "weldingtypes");

                // set the new installation model
                this.setModel(models.createNewInstModel(), "newinst");

                // set the equipment cuts model
                this.setModel(models.createEquipmentCutsModel(), "equipmentcuts");

                // set the dispositions model
                this.setModel(models.createDispositionsModel(), "dispositions");
                                
                // set the plants model
                //this.setModel(models.createPlantsModel(), "plants");

                // set the storage locations model
                //this.setModel(models.createStorageLocationsModel(), "storagelocations");

                // set the functional locations model
                //this.setModel(models.createFunctionalLocationsModel(), "functionallocations");
                
            }
        });
    }
);