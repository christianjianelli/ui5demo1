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
                this.getView().addStyleClass("sapUiSizeCozy");
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

                oData.NewInst.Equipment = selectedItem.Equipment;
                oData.NewInst.OrigSize = selectedItem.OrigSize;
                oData.NewInst.CurrentSize = selectedItem.OrigSize;
                oData.NewInst.Uom = selectedItem.Uom;
                oData.NewInst.EquipmentPre = selectedItem.EquipmentPre;
                oData.NewInst.EquipmentSuc = selectedItem.EquipmentSuc;
                
                oModel.setData(oData);

                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.navTo("RouteNewInst");
            }
        });
    }
);
