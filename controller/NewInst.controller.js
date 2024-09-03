sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, MessageToast) {
        "use strict";

        return Controller.extend("jianelli.mock01.controller.NewInst", {
            onInit: function () {
                this.getView().addStyleClass("sapUiSizeCozy");
            },

            onNavBackButtonPress: function (oEvent) {
                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.navTo("RouteEquipments");
            },

            onFinishInstallation: function (oEvent) {
                
                let origSizeInput = 0;
                let newInstLengthInput = 0;

                let oOrigSizeInput = this.byId("OrigSizeInput");
                let oNewInstLengthInput = this.byId("NewInstLengthInput");

                if(oOrigSizeInput){
                    origSizeInput = oOrigSizeInput.getValue();
                }
                
                if(oNewInstLengthInput){
                    newInstLengthInput = oNewInstLengthInput.getValue();
                }
                
                if(origSizeInput != newInstLengthInput){
                    let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			        oRouter.navTo("RouteEquipmentCuts");
                }else{
                    
                    var that = this;
                
                    MessageBox.confirm(
                        "A instalação será finalizada. Deseja avançar?", {
                            onClose: function(oAction){
                                if(oAction.toString() === "OK" ){

                                    let oModelNewInst = that.getView().getModel("newinst");

                                    if(oModelNewInst){
                                        oModelNewInst.setData(that._resetNewInstModel());
                                    }

                                    MessageToast.show("Instalação finalizada com sucesso!", {
                                        onClose: function(){
                                            let oRouter = sap.ui.core.UIComponent.getRouterFor(that);
                                            oRouter.navTo("RouteMain");
                                        }
                                    });

                                }
                            }
                        }
                    );

                }
                
            },

            onRecalculateInstallationLength: function (oEvent) {

                let distMarcIni = 0;
                let distMarcFim = 0;
                let newInstLengthInput = 0;
                
                let oDistMarcIniInput = this.byId("DistMarcIniInput");

                let oDistMarcFimInput = this.byId("DistMarcFimInput");

                if(oDistMarcIniInput){
                    distMarcIni = oDistMarcIniInput.getValue();
                }

                if(oDistMarcFimInput){
                    distMarcFim = oDistMarcFimInput.getValue();
                }

                let oNewInstLengthInput = this.byId("NewInstLengthInput");

                if(oNewInstLengthInput){
                    
                    newInstLengthInput = parseFloat(distMarcFim) - parseFloat(distMarcIni);

                    oNewInstLengthInput.setValue(newInstLengthInput.toFixed(3));

                }

            },

            _resetNewInstModel: function(){

                return {
                    "NewInst":  {
                        "Order": "",
                        "Operation": "",
                        "FunctionalLocation": "",
                        "Equipment": "",
                        "OrigSize": 0,
                        "CurrentSize": 0,
                        "Uom": "",
                        "MarcIni": "",
                        "DistMarcIni": 0,
                        "MarcFim": "",
                        "DistMarcFim": 0,
                        "NewInstLength": 0,
                        "EquipmentPre": "",
                        "EquipmentSuc": "",
                        "TipoLigIni": "",
                        "TipoLigFim": ""
                    }
                }

            }
        });
    }
);
