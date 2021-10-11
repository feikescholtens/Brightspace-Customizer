//Define all elements [User name], [Name without spaces, can me anything], [Identifier that can be used in JS], [Default color]
let elements = [
  ["Navigation header", "navigation_header", "document.getElementsByTagName('d2l-navigation-main-header')[0]", "#ffffff"],
  ["Navigation footer", "navigation_footer", "document.getElementsByTagName('d2l-navigation-main-footer')[0]", "#ffffff"],
  ["Widgets", "widget", "document.getElementsByClassName('d2l-widget')", "#ffffff"],
  ["Body [Homepage]", "body_Homepage", "document.getElementsByClassName('d2l-page-main')[0]", "#f6f7f8"],
  ["Body [Course Content]", "body_Course_Content", "document.getElementsByClassName('d2l-twopanelselector-main')[0]", "#ffffff"],
  ["Content [Course Content]", "content_Course_Content", "document.getElementsByClassName('d2l-twopanelselector-side')[0]", "#f9fbff"],
];
//Adds the table with name and color input to the extension 
var number_elements = elements.length;
var cells = new Array(number_elements);
for (var h = 0; h < number_elements; h++) {
  cells[h] = new Array(2);
}
var rows = [];

for (let i = 0; i < elements.length; i++) {
  rows[i] = document.createElement("tr");
  cells[i][0] = document.createElement("td");
  cells[i][0].innerHTML = elements[i][0];
  cells[i][1] = document.createElement("td");
  cells[i][1].innerHTML = "<input type='color' name=" + elements[i][1] +
    ">";
  cells[i][2] = document.createElement("td");
  cells[i][2].innerHTML = "x";
  rows[i].appendChild(cells[i][0]);
  rows[i].appendChild(cells[i][1]);
  rows[i].appendChild(cells[i][2]);
  document.getElementsByTagName("table")[0].appendChild(rows[i]);

  //Default color functionality
  document.getElementsByTagName("tr")[i + 1].getElementsByTagName("td")[2].addEventListener('click', function () {
    let element = eval("elements[i][2]");
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      chrome.tabs.executeScript(
        tabs[0].id, {
          code: 'if (' + element + ' !== "" && typeof ' + element + ' !== "undefined"){ if (' + element + '.length == "" || typeof ' + element + '.length === "undefined") { ' + element + '.style.backgroundColor = ""; } else { for (let j = 0; j < ' + element + '.length; j++) {' + element + '[j].style.backgroundColor = "";}}}'
        });
    });
    chrome.storage.sync.remove(
      [elements[i][1]]
    );
    document.getElementsByName(elements[i][1])[0].value = elements[i][3];
  });

  //Gets the color from storage and applies it as the color of the input box
  chrome.storage.sync.get(elements[i][1], function (data) {
    function isEmpty(data) {
      for (var prop in data) {
        if (data.hasOwnProperty(prop))
          return false;
      }

      return true;
    }
    let empty = isEmpty(data);
    if (data !== "" && data !== null && empty !== true) {
      document.getElementsByName(elements[i][1])[0].value = data[elements[i][1]];
    } else {
      document.getElementsByName(elements[i][1])[0].value = elements[i][3];
    }
  });

  //Event listener for the color input and sets the color directly in the DOM
  document.getElementsByName(elements[i][1])[0].addEventListener("input", function () {
    var color = document.getElementsByName(elements[i][1])[0].value;
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      chrome.tabs.executeScript(
        tabs[0].id, {
          code: 'if (' + elements[i][2] + ' !== "" && typeof ' + elements[i][2] + ' !== "undefined"){ if (' + elements[i][2] + '.length == "" || typeof ' + elements[i][2] + '.length === "undefined") { ' + elements[i][2] + '.style.backgroundColor = "' + color + '"; } else { for (let j = 0; j < ' + elements[i][2] + '.length; j++) {' + elements[i][2] + '[j].style.backgroundColor = "' + color + '";}}}'
        });
    });
  });

  //Saving the set color every 0.5s to storage
  function repeat1(elements, i, ccolor) {
    var color = document.getElementsByName(elements[i][1])[0].value;
    let set_storage_variable = elements[i][1];

    if (ccolor !== color) {
      chrome.storage.sync.set({
        [elements[i][1]]: color
      }, function () {
        return
      });
    }
  }

  function repeat2(elements, i) {
    let ccolor = document.getElementsByName(elements[i][1])[0].value;
    setTimeout(function () {
      repeat1(elements, i, ccolor);
    }, 400);
  }
  setInterval(function () {
    repeat2(elements, i);
  }, 500);

}
