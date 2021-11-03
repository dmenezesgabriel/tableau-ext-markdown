"use strict";

(function () {
  window.onload = function () {
    tableauExt.extensions
      .initializeAsync({ configure: configure })
      .then(
        function () {
          // First, check for any saved settings and populate our UI based on them.
          checkForSettings(tableauExt.extensions.settings.getAll());
        },
        function (err) {
          // Something went wrong in initialization
          console.log("Error while Initializing: " + err.toString());
        }
      )
      .then(function () {
        tableauExt.extensions.settings.addEventListener(
          tableauExt.TableauEventType.SettingsChanged,
          (settingsEvent) => {
            updateExtensionBasedOnSettings(settingsEvent.newSettings);
          }
        );
      });
  };

  function checkForSettings(settings) {
    if (Object.keys(settings).length > 0) {
      updateExtensionBasedOnSettings(settings);
      document.querySelector("#inactive").style.display = "none";
      document.querySelector("#active").style.display = "block";
    }
  }

  function configure() {
    // This should be dynamic
    const popupUrl = `${window.origin}/appConfigure.html`;

    tableauExt.extensions.ui
      .displayDialogAsync(
        popupUrl,
        tableauExt.extensions.settings.get("code"),
        {
          height: 600,
          width: 1200,
        }
      )
      .then((closePayload) => {
        document.querySelector("#inactive").style.display = "none";
        document.querySelector("#active").style.display = "block";
        document.querySelector("#content").innerHTML =
          marked.parse(closePayload);
      })
      .catch((error) => {
        switch (error.errorCode) {
          case tableauExt.ErrorCodes.DialogClosedByUser:
            console.log("Dialog was closed by user");
            break;
          default:
            console.error(error.message);
        }
      });
  }

  function updateExtensionBasedOnSettings(settings) {
    if (settings) {
      document.querySelector("#content").innerHTML = marked.parse(
        settings["code"]
      );
    }
  }

  function setWindowSize() {
    var initialWidth = window.innerWidth;

    window.addEventListener("resize", function () {
      // Do something with 'initialWidth'
      initialWidth = window.innerWidth;
    });
  }
})();
