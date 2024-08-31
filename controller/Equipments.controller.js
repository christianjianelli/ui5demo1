sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("jianelli.mock01.controller.Equipments", {
            onInit: function () {

            },
            onNavBackButtonPress: function (oEvent) {
                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.navTo("RouteOperations");
            },
            onItemPress: function (oEvent) {

                let oPath = oEvent.getSource().getBindingContextPath();

				let selectedItem = oEvent.getSource().getBindingContext("equipments").getProperty(oPath);

                let oModel = this.getView().getModel("newinst");

                let oData = oModel.getData();

                oData.Equipment = selectedItem.Equipment;
                oData.OrigSize = selectedItem.OrigSize;
                oData.Uom = selectedItem.Uom;
                
                oModel.setData(oData);

                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.navTo("RouteNewInst");
            }
        });
    }
);
