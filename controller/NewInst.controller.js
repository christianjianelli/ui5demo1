sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("jianelli.mock01.controller.NewInst", {
            onInit: function () {

            },

            onNavBackButtonPress: function (oEvent) {
                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.navTo("RouteEquipments");
            },

            onFinishInstallation: function (oEvent) {
                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.navTo("RouteEquipmentCuts");
            }
        });
    }
);
