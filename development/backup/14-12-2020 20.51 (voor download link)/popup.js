//DEFINE ALL ELEMENTS [User name], [Name without spaces, can me anything], [Identifier that can be used in JS], [Default color], [Type of element]
let elements = [
  ["Branding bar", "branding_bar", "document.getElementById('branding_bar')", "#00a6d6", "background"],
  ["Navigation header", "navigation_header", "document.getElementsByTagName('d2l-navigation-main-header')[0]", "#ffffff", "background"],
  ["Navigation footer", "navigation_footer", "document.getElementsByTagName('d2l-navigation-main-footer')[0]", "#ffffff", "background"],
  ["Widgets", "widget", "document.getElementsByClassName('d2l-widget')", "#ffffff", "background"],
  ["Body [Homepage]", "body_Homepage", "document.getElementsByClassName('d2l-page-main')[0]", "#f6f7f8", "background"],
  ["Body [Course Content]", "body_Course_Content", "document.getElementsByClassName('d2l-twopanelselector-main')[0]", "#ffffff", "background"],
  ["Body overflow", "body_overflow", "document.getElementsByTagName('body')[0]", "#f6f7f8", "background"],
  ["Content [Course Content]", "content_Course_Content", "document.getElementsByClassName('d2l-twopanelselector-side')[0]", "#f9fbff", "background"],
  ["Name header", "name_header", "document.querySelectorAll('span.d2l-navigation-s-personal-menu-text')[0]", "#494c4e", "text"],
  ["Navigation text", "navigation_text", "document.querySelectorAll('.d2l-navigation-s-item a, .d2l-navigation-s-item span.d2l-navigation-s-group-text')", "#494c4e", "text"],
  ["Widget headers", "widget_headers", "document.getElementsByTagName('h2')", "#494c4e", "text"],
  ["Header title [Course Content]", "header_title_course_content", "document.querySelectorAll('div.d2l-navigation-s-title-container a.d2l-navigation-s-link')[0]", "#494c4e", "text"],
  ["Announcement title", "widget_title", "document.getElementsByClassName('d2l-linkheading-link d2l-clickable d2l-link')", "#006fbf", "text"],
  ["Announcement date and time", "announcement_date_and_time", "document.querySelectorAll('div.homepage-col-8 div.d2l-textblock')", "#494c4e", "text"],
  ["Main text", "main_text", "document.querySelectorAll('p, p span')", "#494c4e", "text"]
];

//SUBDEVIDE THE ELEMENTS
let header_row_cross = new Array();
let background_elements = new Array();
let text_elements = new Array();
//These arrays are fulled up later when adding event listeners for the default color functionality.

//ADDS THE TABLE WITH NAME AND COLOR INPUT TO THE EXTENSION 
var number_elements = elements.length;
var cells = new Array(number_elements);
for (var h = 0; h < number_elements; h++) {
  cells[h] = new Array(2);
}
//The lines above declade the array structure that is fulled in below.

var rows = [];
//Define rows array.

for (let i = 0; i < elements.length; i++) {

  let table_to_assign;
  if (elements[i][4] == "background") {
    table_to_assign = 0;
  } else if (elements[i][4] == "text") {
    table_to_assign = 1;
  }
  //If an element is a background element, the rows must append to the first table (0 in array), if an element is a text element, the rows must append to the second table (1 in array).

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
  document.getElementsByTagName("table")[table_to_assign].appendChild(rows[i]);
  //Fills in the cells, then the rows, and appends them to the table.

  //DEFAULT COLOR FUNCTIONALITY INDIVIDUAL ELEMENT(S)
  let row_to_assign;
  if (elements[i][4] == "background") {
    row_to_assign = i + 1;
  } else if (elements[i][4] == "text") {
    row_to_assign = i + 2;
  }
  //This determines the row the event listener must me applied to, for the individual rows.

  document.getElementsByTagName("tr")[row_to_assign].getElementsByTagName("td")[2].addEventListener('click', function () {
    let element = eval("elements[i][2]");
    //Get the element from the array and makes it into a node object.

    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      chrome.tabs.executeScript(
        tabs[0].id, {
          code: 'if (' + element + ' !== "" && typeof ' + element + ' !== "undefined"){ if (' + element + '.length !== 0) { if (' + element + '.length == "" || typeof ' + element + '.length === "undefined") { if ("' + elements[i][4] + '" == "background"){ ' + element + '.style.backgroundColor = ""; } else if ("' + elements[i][4] + '" == "text"){  ' + element + '.style.color = ""; }} else { for (let j = 0; j < ' + element + '.length; j++) { if ("' + elements[i][4] + '" == "background"){' + element + '[j].style.backgroundColor = "";} else  if ("' + elements[i][4] + '" == "text"){' + element + '[j].style.color = "";}}}}}'
        });
    });
    //Sets the default colors to the element(s) in the DOM.

    chrome.storage.sync.remove([elements[i][1]]);
    //Removes the color variable from storage.

    document.getElementsByName(elements[i][1])[0].value = elements[i][3];
    //Instantly sets the color for the color input to the default.
  });

  //DEFAULT COLOR FUNCTIONALITY FOR TYPE OF ELEMENTS
  header_row_cross.push(document.querySelectorAll("tr")[i].querySelectorAll("th")[2]);
  //Adds the cells with crosses in the TH to the array.

  if (elements[i][4] == "background") {
    background_elements.push(elements[i]);
  }
  //If an element is a background element, add it to the background array.

  if (elements[i][4] == "text") {
    text_elements.push(elements[i]);
  }
  //If an element is a text element, add it to the text array.

  if (header_row_cross[i] !== "" && typeof header_row_cross[i] !== "undefined") {
    header_row_cross[i].addEventListener("click", function () {
      let style_to_apply;
      let element_type;
      //Define the variables where the type of element is going to be stored.

      if (i == 0) {
        style_to_apply = "backgroundColor";
        element_type = background_elements;
      }
      if (i !== 0) {
        style_to_apply = "color";
        element_type = text_elements;
      }
      //Sets the variables where the type of element is going to be stored.

      for (let l = 0; l < element_type.length; l++) {
        let element = eval("element_type[l][2]");
        //Element is now a Node instead of a string.

        chrome.tabs.query({
          active: true,
          currentWindow: true
        }, function (tabs) {
          chrome.tabs.executeScript(
            tabs[0].id, {
              code: 'if (' + element + ' !== "" && typeof ' + element + ' !== "undefined"){ if (' + element + '.length !== 0) {if (' + element + '.length == "" || typeof ' + element + '.length === "undefined") {' + element + '.style.' + style_to_apply + ' = ""; } else { for (let j = 0; j < ' + element + '.length; j++) {' + element + '[j].style.' + style_to_apply + ' = "";}}}}'
            });
        });
        //Removes the colors from the elements from the DOM.

        chrome.storage.sync.remove(
            [element_type[l][1]]
        );
        //Removes the colors from the elements from storage.

        document.getElementsByName(element_type[l][1])[0].value = element_type[l][3];
        //Removes the colors from the elements from the input box.
      }
      //Loops through every element of the specific type.
    });
    //Adds event listener to every element in header_row_cross.
  }
  //Check if there are even TH's.

  //GETS THE COLOR FROM STORAGE AND APPLIES IT AS THE COLOR OF THE INPUT BOX
  chrome.storage.sync.get(elements[i][1], function (data) {
    function isEmpty(data) {
      for (var prop in data) {
        if (data.hasOwnProperty(prop))
          return false;
      }

      return true;
    }
    let empty = isEmpty(data);
    //Empty is a variable that's ran from a function that is either true of false, and says if the data from storage for a particular element is empty.

    if (data !== "" && data !== null && empty !== true) {
      document.getElementsByName(elements[i][1])[0].value = data[elements[i][1]];
    }
    //Set the color from storage if it exists.
    else {
      document.getElementsByName(elements[i][1])[0].value = elements[i][3];
    }
    // Else set the default color.
  });

  //EVENT LISTENER FOR THE COLOR INPUT AND SETS THE COLOR DIRECTLY IN THE DOM
  document.getElementsByName(elements[i][1])[0].addEventListener("input", function () {
    var color = document.getElementsByName(elements[i][1])[0].value;
    //Var color gets the color directly from the input box.

    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      let style_to_apply;
      if (elements[i][4] == "background") {
        style_to_apply = "backgroundColor";
      }
      if (elements[i][4] == "text") {
        style_to_apply = "color";
      }
      //Determine if the element is a background element or a text element and sets a variable depending on that.

      chrome.tabs.executeScript(
        tabs[0].id, {
          code: 'if (' + elements[i][2] + ' !== "" && typeof ' + elements[i][2] + ' !== "undefined") {if (' + elements[i][2] + '.length !== 0) {if (' + elements[i][2] + '.length == "" || typeof ' + elements[i][2] + '.length == "undefined") {' + elements[i][2] + '.style.' + style_to_apply + ' = "' + color + '";}else {for (let j = 0; j < ' + elements[i][2] + '.length; j++) {' + elements[i][2] + '[j].style.' + style_to_apply + ' = "' + color + '";}}}}'
        });
      //Sets the colors from the input box to the element(s) in the DOM.
    });
  });

  //SAVING THE SET COLOR EVERY 0.2S TO STORAGE
  function save(elements, i, ccolor) {
    var color = document.getElementsByName(elements[i][1])[0].value;
    //Var color gets the color directly from the input box.

    if (ccolor !== color && ccolor !== elements[i][3]) {
      chrome.storage.sync.set({
        [elements[i][1]]: color
      }, function () {
        return
      });
      //Sets the variable in storage.
    }
    //Checks if the current color is not the same as the color from the input box and if it isn't the default color. (AKA Checks it the color has been changed)
    else if (ccolor == elements[i][3]) {
      chrome.storage.sync.get(elements[i][1], function (data) {
        function isEmpty(data) {
          for (var prop in data) {
            if (data.hasOwnProperty(prop))
              return false;
          }
          return true;
        }
        let empty = isEmpty(data);
        //Empty is a variable that's ran from a function that is either true of false, and says if the data from storage for a particular element is empty.

        if (empty !== true) {
          chrome.storage.sync.remove([elements[i][1]]);
          //Removes the color from storage if the color that's about to save the default is.
        }
      });
    }
    //Else, check again of the color is the default one.
  }
  //This function actually saves the color from the input to storage. It also checks if the color to save is the default color, if so, it REMOVES it from storage.

  function save_repeat(elements, i) {
    let ccolor = document.getElementsByName(elements[i][1])[0].value;
    setTimeout(function () {
      save(elements, i, ccolor);
    }, 190);
  }
  //Determine the current color and passes it on to the function above.

  setInterval(function () {
    save_repeat(elements, i);
  }, 200);
  //Interval for saving the colors to storage. Needs improvement to that it can store faster.

}

//DOWNLOAD THEME FUNCTION
//document.getElementById("download_theme").addEventListener("click", function () {
//  chrome.tabs.executeScript({
//    code: 'document.querySelectorAll("span.d2l-navigation-s-personal-menu-text")[0].innerText'
//  }, function (results) {
//    for (let i = 0; i < elements.length; i++) {
//      chrome.storage.sync.get(elements[i][1], function (data) {
//        function isEmpty(data) {
//          for (var prop in data) {
//            if (data.hasOwnProperty(prop))
//              return false;
//          }
//          return true;
//        }
//        let empty = isEmpty(data);
//        if (data !== "" && data !== null && empty == false) {
//
//
//          var data = [
//            {
//              Symbol: "AAPL",
//              Company: "Apple Inc.",
//              Price: 132.54
//            },
//            {
//              Symbol: "INTC",
//              Company: "Intel Corporation",
//              Price: 33.45
//            },
//            {
//              Symbol: "GOOG",
//              Company: "Google Inc",
//              Price: 554.52
//            },
//          ];
//
//          function convert_storage_to_theme(args) {
//            var result, ctr, keys, column_delimiter, line_delimiter;
//
//            if (data == null || !data.length) {
//              return null;
//            }
//
//            column_delimiter = ';';
//            line_delimiter = '\n';
//
//            keys = Object.keys(data[0]);
//
//            result = '';
//            result += keys.join(column_delimiter);
//            result += line_delimiter;
//
//            data.forEach(function (item) {
//              ctr = 0;
//              keys.forEach(function (key) {
//                if (ctr > 0) result += column_delimiter;
//
//                result += item[key];
//                ctr++;
//              });
//              result += line_delimiter;
//            });
//            return result;
//          }
//
//          function download_theme(filename) {
//            let data, link;
//            let theme = convert_storage_to_theme(data);
//
//            if (!theme.match(/^data:text\/csv/i)) {
//              theme = 'data:text/csv;charset=utf-8,' + theme;
//            }
//            data = encodeURI(theme);
//
//            link = document.createElement("a");
//            link.setAttribute("href", data);
//            link.setAttribute("download", filename);
//            link.click();
//          }
//          let full_name = results[0].split(" ");
//          download_theme(full_name[0] + '\'s Brightspace Customizer theme.csv');
//        } else if (empty == true) {
//          if (i == 0) {
//            chrome.tabs.query({
//              active: true,
//              currentWindow: true
//            }, function (tabs) {
//              chrome.tabs.executeScript(
//                tabs[0].id, {
//                  code: 'alert("You haven\'t changed any colors! You just have the default Brightspace theme.");'
//                });
//            });
//          }
//        }
//      });
//    }
//  });
//  event.preventDefault();
//});

//LOGS ALL COLORS FROM STORAGE FOR DEBUGGING
//setInterval(function () {
//  for (let t = 0; t < elements.length; t++) {
//
//    chrome.storage.sync.get(elements[t][1], function (data) {
//      console.log(data);
//    });
//  }
//}, 200);
