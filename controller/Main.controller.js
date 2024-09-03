sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("jianelli.mock01.controller.Main", {
            
            onInit: function () {
                this.getView().addStyleClass("sapUiSizeCozy");
            },

            onLaunchInstallation: function () {

                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			    oRouter.navTo("RouteInstallationStart");

            },

            onLaunchUninstallation: function () {
                MessageToast.show("Funcionalidade ainda não implementada.");
            },

            onLaunchReplacement: function () {
                MessageToast.show("Funcionalidade ainda não implementada.");            
            }

        });
    }
);
