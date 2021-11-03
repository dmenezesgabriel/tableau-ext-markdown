var control = document.querySelector("#inputFile");
control.addEventListener(
  "change",
  function (event) {
    var reader = new FileReader();
    reader.onload = function (event) {
      var contents = event.target.result;
      document.querySelector("#output").value = contents;
    };
    reader.onerror = function (event) {
      console.error("File could not be read! Code " + event.target.error.code);
    };
    console.log("Filename: " + control.files[0].name);
    reader.readAsText(control.files[0]);
  },
  false
);
