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
                this.getView().addStyleClass("sapUiSizeCozy");
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

                oData.NewInst.Order = selectedItem.Order;
                oData.NewInst.Operation = selectedItem.Operation;
                oData.NewInst.FunctionalLocation = selectedItem.FunctionalLocation;
                oData.NewInst.MarcIni = selectedItem.MarcIni;
                oData.NewInst.DistMarcIni = selectedItem.DistMarcIni;
                oData.NewInst.MarcFim = selectedItem.MarcFim;
                oData.NewInst.DistMarcFim = selectedItem.DistMarcFim;

                let nLen = parseFloat(parseFloat(oData.NewInst.DistMarcFim) - parseFloat(oData.NewInst.DistMarcIni));

                oData.NewInst.NewInstLength = nLen.toFixed(2).toString();

                oModel.setData(oData);

                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.navTo("RouteEquipments");
                
            }
        });
    }
);
