//Define all elements [User name], [Name without spaces, can me anything], [Identifier that can be used in JS], [Default color]
let elements = [
  ["Navigation header", "navigation_header", "document.getElementsByTagName('d2l-navigation-main-header')[0]", "#ffffff"],
  ["Navigation footer", "navigation_footer", "document.getElementsByTagName('d2l-navigation-main-footer')[0]", "#ffffff"],
  ["Widgets", "widget", "document.getElementsByClassName('d2l-widget')", "#ffffff"],
  ["Body [Homepage]", "body_Homepage", "document.getElementsByClassName('d2l-page-main')[0]", "#f6f7f8"],
  ["Body [Course Content]", "body_Course_Content", "document.getElementsByClassName('d2l-twopanelselector-main')[0]", "#ffffff"],
  ["Content [Course Content]", "content_Course_Content", "document.getElementsByClassName('d2l-twopanelselector-side')[0]", "#f9fbff"],
];


//Gets the color from storage and applies it as the color of the corresponding element in the DOM
for (let i = 0; i < elements.length; i++) {
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
      let element = eval(elements[i][2]);
      if (element.length == "" || typeof element.length === "undefined") {
        element.style.backgroundColor = data[elements[i][1]];
      } else {
        for (let j = 0; j < element.length; j++) {
          element[j].style.backgroundColor = data[elements[i][1]];
        }
      }


    }

  });
}
