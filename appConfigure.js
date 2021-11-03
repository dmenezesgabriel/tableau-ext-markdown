"use strict";

(function () {
  const key = "code";
  let value = "";

  window.onload = function () {
    loadFile();
    keyListener();
    tableauExt.extensions.initializeDialogAsync().then(function (openPayload) {
      let closeBtn = document.querySelector("#closeButton");
      let output = document.querySelector("#output");
      closeBtn.addEventListener("click", closeDialog);
      output.value = openPayload;
    });
  };

  function closeDialog() {
    let output = document.querySelector("#output");
    tableauExt.extensions.settings.set(key, output.value);

    tableauExt.extensions.settings.saveAsync().then((newSavedSettings) => {
      tableauExt.extensions.ui.closeDialog(
        tableauExt.extensions.settings.get("code")
      );
    });
  }

  function loadFile() {
    let control = document.getElementById("inputFile");
    control.addEventListener(
      "change",
      function (event) {
        var reader = new FileReader();
        reader.onload = function (event) {
          var contents = event.target.result;
          document.querySelector("#output").value = contents;
        };
        reader.onerror = function (event) {
          console.error(
            "File could not be read! Code " + event.target.error.code
          );
        };
        console.log("Filename: " + control.files[0].name);
        reader.readAsText(control.files[0]);
      },
      false
    );
  }

  function keyListener() {
    let content = document.querySelector("#content");
    let output = document.querySelector("#output");

    document.addEventListener("keyup", () => {
      content.innerHTML = marked.parse(output.value);
    });
  }
})();
