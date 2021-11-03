"use strict";

(function () {
  const key = "code";
  let value = "";

  window.onload = function () {
    let content = document.querySelector("#contentPreview");
    let markup = document.querySelector("#markup");
    let closeBtn = document.querySelector("#closeButton");

    loadFile();
    keyListener();
    tableauExt.extensions.initializeDialogAsync().then(function (openPayload) {
      closeBtn.addEventListener("click", closeDialog);
      markup.value = openPayload;
      setContent();
    });
  };

  function closeDialog() {
    let markup = document.querySelector("#markup");
    tableauExt.extensions.settings.set(key, markup.value);

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
          document.querySelector("#markup").value = contents;
          setContent();
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

  function setContent() {
    let content = document.querySelector("#contentPreview");
    let markup = document.querySelector("#markup");
    content.innerHTML = marked.parse(markup.value);
  }

  function keyListener() {
    document.addEventListener("keyup", () => {
      setContent();
    });
  }
})();
