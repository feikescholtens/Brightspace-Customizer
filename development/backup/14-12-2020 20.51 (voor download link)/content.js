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

//ADDS THE EDITABLE BRANDING BAR TO THE PAGE
let branding_bar_html = new DOMParser().parseFromString("<div id='branding_bar' style='background-color: #00a6d6; height: 4px; width: 100vw; position: absolute; top:0;'></div>", "text/html");
//Create the branding bar.
let branding_bar = branding_bar_html.body.firstChild;
//Convert the branding bar from a string to a Node object.

document.getElementsByTagName("d2l-navigation")[0].appendChild(branding_bar);

//GETS THE COLOR FROM STORAGE AND APPLIES IT AS THE COLOR OF THE CORRESPONDING ELEMENT IN THE DOM
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
    //Empty is a variable that's ran from a function that is either true of false, and says if the data from storage for a particular element is empty.

    if (data !== "" && data !== null && empty !== true) {
      let element = eval(elements[i][2]);
      //Evaluate the element as a Node object.

      if (element !== "" && typeof element !== "undefined") {
        if (element.length !== 0) {
          if (element.length == "" || typeof element.length == "undefined") {
            if (elements[i][4] == "background") {
              element.style.backgroundColor = data[elements[i][1]];
            }
            //If the element is of the background type, set the backgroundColor in the DOM to the value from storage.
            if (elements[i][4] == "text") {
              element.style.color = data[elements[i][1]];
            }
            //If the element is of the text type, set the color in the DOM to the value from storage.
          }
          // Check if the element is an array, here it is true.
          else {
            for (let j = 0; j < element.length; j++) {
              if (elements[i][4] == "background") {
                element[j].style.backgroundColor = data[elements[i][1]];
              }
              //If the element is of the background type, set the backgroundColor in the DOM to the value from storage.
              if (elements[i][4] == "text") {
                element[j].style.color = data[elements[i][1]];
              }
              //If the element is of the background type, set the backgroundColor in the DOM to the value from storage.
            }
            //Loop through every element.
          }
          //The element is an array (there are multiple elements in the DOM).
        }
        //Check if (if the elements are an array) the elements do exist.
      }
      //Check if the elements exists in the DOM at all.
    }
    //Check if there's any data at all.
  });
  //Gets the set color from storage.
}
//Loop through every element.
