"use strict";

(function () {
  const key = "code";
  let value = "";
  let editor;

  window.onload = function () {
    let content = document.querySelector("#contentPreview");
    let closeBtn = document.querySelector("#closeButton");
    initEditor();
    loadFile();
    keyListener();
    tableauExt.extensions.initializeDialogAsync().then(function (openPayload) {
      closeBtn.addEventListener("click", closeDialog);
      editor.setValue(openPayload);
      setContent();
    });
  };

  function closeDialog() {
    let code = editor.getValue();
    tableauExt.extensions.settings.set(key, code);

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
          editor.setValue(contents);
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
    let code = editor.getValue();
    content.innerHTML = marked.parse(code);
  }

  function keyListener() {
    document.addEventListener("keyup", () => {
      setContent();
    });
  }

  function initEditor() {
    let aceInstance = ace.edit("markup");
    aceInstance.setTheme("ace/theme/sqlserver");
    aceInstance.session.setMode("ace/mode/markdown");
    aceInstance.session.setUseWrapMode(true);
    editor = aceInstance;
  }
})();
