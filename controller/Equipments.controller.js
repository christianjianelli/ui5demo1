sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator) {
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
            },

            onSetFilter: function (oEvent) {

                let oView = this.getView();

                let oTable = oView.byId("idEquipTable");

                if(oTable){

                    let sQueryEquipment = "";
                    let sQuerySplit = "";

                    let oEquipmentFilter = oView.byId("idEquipmentFilter");

                    if(oEquipmentFilter){
                        sQueryEquipment = oEquipmentFilter.getValue();
                    }
                    
                    let oSplitFilter = oView.byId("idSplitFilter");
                    
                    if(oSplitFilter){
                        sQuerySplit = oSplitFilter.getValue();
                    }

                    // build filter array
                    const aFilter = [];
                    
                    aFilter.push(new Filter("Equipment", FilterOperator.Contains, sQueryEquipment));
                    aFilter.push(new Filter("Split", FilterOperator.Contains, sQuerySplit));

                    // filter binding
			        const oBinding = oTable.getBinding("items");
			        oBinding.filter(aFilter);

                }
            },

            onClearFilters: function (oEvent) {

                let oView = this.getView();

                let oEquipmentFilter = oView.byId("idEquipmentFilter");

                if(oEquipmentFilter){
                    oEquipmentFilter.setValue("");
                }
                
                let oSplitFilter = oView.byId("idSplitFilter");

                if(oSplitFilter){
                    oSplitFilter.setValue("");
                }

                this.onSetFilter(oEvent);

            }
        });
    }
);
