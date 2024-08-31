sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("jianelli.mock01.controller.Operations", {
            onInit: function () {

            },

            onNavBackButtonPress: function (oEvent) {
                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.navTo("RouteInstallationStart");
            },

            onItemPress: function (oEvent) {
                
                let oPath = oEvent.getSource().getBindingContextPath();

				let selectedItem = oEvent.getSource().getBindingContext("operations").getProperty(oPath);

                let oModel = this.getView().getModel("newinst");

                let oData = oModel.getData();

                oData.Order = selectedItem.Order;
                oData.Operation = selectedItem.Operation;
                oData.FunctionalLocation = selectedItem.FunctionalLocation;
                oData.MarcIni = selectedItem.MarcIni;
                oData.DistMarcIni = selectedItem.DistMarcIni;
                oData.MarcFim = selectedItem.MarcFim;
                oData.DistMarcFim = selectedItem.DistMarcFim;

                oModel.setData(oData);

                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.navTo("RouteEquipments");
                
            }
        });
    }
);
