sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("jianelli.mock01.controller.App", {
        onInit() {
          this.getView().addStyleClass("sapUiSizeCozy");
        }
      });
    }
  );
  