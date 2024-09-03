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

        return Controller.extend("jianelli.mock01.controller.EquipmentCuts", {
            onInit: function () {
                this.getView().addStyleClass("sapUiSizeCozy");
            },

            onNavBackButtonPress: function (oEvent) {
                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.navTo("RouteNewInst");
            },

            onFinishInstallation: function (oEvent) {

                var that = this;
                
                MessageBox.confirm(
                    "A instalação será finalizada. Deseja avançar?", {
                        onClose: function(oAction){
                            if(oAction.toString() === "OK" ){

                                let oModelNewInst = that.getView().getModel("newinst");

                                if(oModelNewInst){
                                    oModelNewInst.setData(that._resetNewInstModel());
                                }

                                let oModelEquipmentCuts = that.getView().getModel("equipmentcuts");

                                if(oModelEquipmentCuts){
                                    oModelEquipmentCuts.setData(that._resetEquipmentCutsModel());
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

            },

            onDeleteCut: function (oEvent) {

                let oParent = oEvent.getSource().getParent();

                let oPath = oParent.getBindingContextPath();

				let oSelectedItem = oParent.getBindingContext("equipmentcuts").getProperty(oPath);

                let oModel = this.getView().getModel("equipmentcuts");

                let oData = oModel.getData();

                const aEquipmentCuts = oData.EquipmentCuts.filter(element => element.Equipment !== oSelectedItem.Equipment);

                oData.EquipmentCuts = aEquipmentCuts;

                oModel.setData(oData);

                this._recalculateCurrentSize();

            },

            onAddEquipmentCut: function (oEvent) {
                
                let oModel = this.getView().getModel("equipmentcuts");

                let oModelNewInst = this.getView().getModel("newinst");

                let oData = oModel.getData();

                //let oDataNewInst = oModelNewInst.getData();

                if(oData.EquipmentCuts) {

                    let oNewCut = {
                        "Equipment": "",
                        "EquipmentSize": 0,
                        "Disposition": ""
                    };

                    let oCutLengthInput = this.byId("CutLengthInput");
                    
                    if(oCutLengthInput){
                        oNewCut.EquipmentSize = parseFloat(oCutLengthInput.getValue());
                        oCutLengthInput.setValue("");
                    }

                    let oDispositionCombo = this.byId("DispositionCombo");

                    if(oDispositionCombo){
                        oNewCut.Disposition = oDispositionCombo.getValue();
                        oDispositionCombo.setValue("");
                    }

                    let aData = oData.EquipmentCuts;

                    oNewCut.Equipment = this._getNextClone();

                    oData.EquipmentCuts = [];

                    aData.forEach((element) => {
                        if(element.Equipment !== "") {
                            oData.EquipmentCuts.push(element);
                        }
                    });

                    oData.EquipmentCuts.push(oNewCut);

                    oModel.setData(oData);

                    this._recalculateCurrentSize();

                }

            },

            _getNextClone: function() {

                const aAlphabetUppercase = [...Array(26)].map((_, i) => String.fromCharCode(i + 65));   
                
                var aAssignedSuffixes = [];

                var sSuffix = "";
                
                let oModelNewInst = this.getView().getModel("newinst");

                let oModelEquipmentCuts = this.getView().getModel("equipmentcuts");

                if(oModelNewInst){

                    let oNewInst = oModelNewInst.getData();

                    if(oModelEquipmentCuts){

                        let oEquipmentCuts = oModelEquipmentCuts.getData();

                        let aEquipmentCuts = oEquipmentCuts.EquipmentCuts;

                        aEquipmentCuts.forEach((element) => {

                            let sSuffix = element.Equipment[element.Equipment.length - 1];

                            aAssignedSuffixes.push(sSuffix);
                            
                        });

                    }

                    let shouldBreak = false;

                    aAlphabetUppercase.forEach((letter) => {

                        if (shouldBreak){
                            return;
                        } 

                        const index = aAssignedSuffixes.findIndex(element => element === letter);

                        if(index === -1){
                            sSuffix = letter;
                            shouldBreak = true;
                        }
                                            
                    });

                    sSuffix = oNewInst.NewInst.Equipment + sSuffix;

                }

                return sSuffix;
                
            },

            _recalculateCurrentSize: function() {

                let currentSize = 0;

                let oModelEquipmentCuts = this.getView().getModel("equipmentcuts");

                if(oModelEquipmentCuts){

                    let oEquipmentCuts = oModelEquipmentCuts.getData();

                    let aEquipmentCuts = oEquipmentCuts.EquipmentCuts;

                    aEquipmentCuts.forEach((element) => {

                        currentSize = currentSize + parseFloat(element.EquipmentSize);
                        
                    });

                    currentSize = currentSize.toFixed(3);

                }

                let oModelNewInst = this.getView().getModel("newinst");

                if(oModelNewInst){

                    let oDataNewInst = oModelNewInst.getData();

                    oDataNewInst.NewInst.CurrentSize = parseFloat(oDataNewInst.NewInst.OrigSize) - currentSize;

                    oDataNewInst.NewInst.CurrentSize = oDataNewInst.NewInst.CurrentSize.toFixed(3);

                    oModelNewInst.setData(oDataNewInst);

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
                };

            },

            _resetEquipmentCutsModel: function(){

                return {
                    "EquipmentCuts": [
                        {
                            "Equipment": "",
                            "EquipmentSize": 0,
                            "Disposition": ""
                        }
                    ]
                };

            }

        });
    }
);
