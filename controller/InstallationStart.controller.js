sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
	"sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("jianelli.mock01.controller.InstallationStart", {
            
            onInit: function () {
                this.getView().addStyleClass("sapUiSizeCozy");
            },

            onSubmit: function () {
                
                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.navTo("RouteOperations");

            },

            onNavBackButtonPress: function (oEvent) {
                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.navTo("RouteMain");
            },

            onReset: function () {

                let oView = this.getView();

                let oWorkCenterInput = oView.byId("WorkCenterInput");

                if(oWorkCenterInput) {
                    oWorkCenterInput.setValue("");
                }

                let oDatePickerFrom = oView.byId("DatePickerFrom");

                if(oDatePickerFrom) {
                    oDatePickerFrom.setValue("");
                }

                let oDatePickerTo = oView.byId("DatePickerTo");

                if(oDatePickerTo) {
                    oDatePickerTo.setValue("");
                }

                /*

                let oPlantInput = oView.byId("PlantInput");

                if(oPlantInput) {
                    oPlantInput.setValue("");
                }

                let oStorageLocationInput = oView.byId("StorageLocationInput");

                if(oStorageLocationInput) {
                    oStorageLocationInput.setValue("");
                }

                let oFunctionalLocationInput = oView.byId("FunctionalLocationInput");

                if(oFunctionalLocationInput) {
                    oFunctionalLocationInput.setValue("");
                }
                
                */

            },

            onWorkCenterValueHelpRequest: function (oEvent) {
                
                var sInputValue = oEvent.getSource().getValue(),
				
                oView = this.getView();

                if (!this._pValueHelpDialog) {
                    this._pValueHelpDialog = Fragment.load({
                        id: oView.getId(),
                        name: "jianelli.mock01.view.WorkCenterValueHelpDialog",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this._pValueHelpDialog.then(function(oDialog) {
                    // Create a filter for the binding
                    oDialog.getBinding("items").filter([new Filter("WorkCenter", FilterOperator.Contains, sInputValue)]);
                    // Open ValueHelpDialog filtered by the input's value
                    oDialog.open(sInputValue);
                });
            },

            onPlantValueHelpRequest: function (oEvent) {
                
                var sInputValue = oEvent.getSource().getValue(),
				
                oView = this.getView();

                if (!this._pValueHelpDialog) {
                    this._pValueHelpDialog = Fragment.load({
                        id: oView.getId(),
                        name: "jianelli.mock01.view.PlantValueHelpDialog",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this._pValueHelpDialog.then(function(oDialog) {
                    // Create a filter for the binding
                    oDialog.getBinding("items").filter([new Filter("Plant", FilterOperator.Contains, sInputValue)]);
                    // Open ValueHelpDialog filtered by the input's value
                    oDialog.open(sInputValue);
                });
            },

            onStLocValueHelpRequest: function (oEvent) {
                
                var sInputValue = oEvent.getSource().getValue(),
				
                oView = this.getView();

                if (!this._pStLocValueHelpDialog) {
                    this._pStLocValueHelpDialog = Fragment.load({
                        id: oView.getId(),
                        name: "jianelli.mock01.view.StLocValueHelpDialog",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this._pStLocValueHelpDialog.then(function(oDialog) {
                    // Create a filter for the binding
                    oDialog.getBinding("items").filter([new Filter("StorageLocationId", FilterOperator.Contains, sInputValue)]);
                    // Open ValueHelpDialog filtered by the input's value
                    oDialog.open(sInputValue);
                });
            },

            onFuncLocValueHelpRequest: function (oEvent) {
                
                var sInputValue = oEvent.getSource().getValue(),
				
                oView = this.getView();

                if (!this._pFuncLocValueHelpDialog) {
                    this._pFuncLocValueHelpDialog = Fragment.load({
                        id: oView.getId(),
                        name: "jianelli.mock01.view.FuncLocValueHelpDialog",
                        controller: this
                    }).then(function (oDialog) {
                        oView.addDependent(oDialog);
                        return oDialog;
                    });
                }
                this._pFuncLocValueHelpDialog.then(function(oDialog) {
                    // Create a filter for the binding
                    oDialog.getBinding("items").filter([new Filter("FunctionalLocationId", FilterOperator.Contains, sInputValue)]);
                    // Open ValueHelpDialog filtered by the input's value
                    oDialog.open(sInputValue);
                });
            },

            onWorkCenterValueHelpSearch: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter("WorkCenter", FilterOperator.Contains, sValue);
    
                oEvent.getSource().getBinding("items").filter([oFilter]);
            },
    
            onWorkCenterValueHelpClose: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                oEvent.getSource().getBinding("items").filter([]);
    
                if (!oSelectedItem) {
                    return;
                }
    
                this.byId("WorkCenterInput").setValue(oSelectedItem.getTitle());
            },

            onPlantValueHelpSearch: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter("Plant", FilterOperator.Contains, sValue);
    
                oEvent.getSource().getBinding("items").filter([oFilter]);
            },
    
            onPlantValueHelpClose: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                oEvent.getSource().getBinding("items").filter([]);
    
                if (!oSelectedItem) {
                    return;
                }
    
                this.byId("PlantInput").setValue(oSelectedItem.getTitle());
            },

            onStLocValueHelpSearch: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter("StorageLocationId", FilterOperator.Contains, sValue);
    
                oEvent.getSource().getBinding("items").filter([oFilter]);
            },
    
            onStLocValueHelpClose: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                oEvent.getSource().getBinding("items").filter([]);
    
                if (!oSelectedItem) {
                    return;
                }
    
                this.byId("StorageLocationInput").setValue(oSelectedItem.getTitle());
            },
            
            onFuncLocValueHelpSearch: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new Filter("FunctionalLocationId", FilterOperator.Contains, sValue);
    
                oEvent.getSource().getBinding("items").filter([oFilter]);
            },
    
            onFuncLocValueHelpClose: function (oEvent) {
                var oSelectedItem = oEvent.getParameter("selectedItem");
                oEvent.getSource().getBinding("items").filter([]);
    
                if (!oSelectedItem) {
                    return;
                }
    
                this.byId("FunctionalLocationInput").setValue(oSelectedItem.getTitle());
            }
        });
    }
);
