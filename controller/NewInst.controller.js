sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/message/Message",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/library"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, MessageToast, Message, JSONModel, library) {
        "use strict";

        return Controller.extend("jianelli.mock01.controller.NewInst", {
            onInit: function () {
                
                //this.getView().addStyleClass("sapUiSizeCozy");

                var oMessageManager, oModel, oView;

                oView = this.getView();

                // set message model
                oMessageManager = sap.ui.getCore().getMessageManager();
                oView.setModel(oMessageManager.getMessageModel(), "messages");

                // or just do it for the whole view
                oMessageManager.registerObject(oView, true);



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

                var oMessage = new Message({
                    message: "My generated info message",
                    type: library.MessageType.Information,
                    target: "/Dummy",
                    processor: this.getView().getModel()
                });

                sap.ui.getCore().getMessageManager().addMessages(oMessage);

            },

            onMessagePopoverPress : function (oEvent) {
                this._getMessagePopover().openBy(oEvent.getSource());
            },

            //################ Private ###################

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

            },

            _getMessagePopover : function () {
                // create popover lazily (singleton)
                if (!this._oMessagePopover) {
                    this._oMessagePopover = sap.ui.xmlfragment(this.getView().getId(),"jianelli.mock01.view.MessagePopover", this);
                    this.getView().addDependent(this._oMessagePopover);
                }
                return this._oMessagePopover;
            }
        });
    }
);
