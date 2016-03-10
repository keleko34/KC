var buttonContainer = document.querySelector('.buttonContainer')
  , RadioContainer = document.querySelector('.radioContainer');

var _button = CreateButton()
.text("Click Button")
.onClick(function(Button){console.log("yay");alert("Button Clicked");})

var _radio = CreateRadio()
.text('Toggle');


_button.call(_button,buttonContainer);
_radio.call(_radio,RadioContainer);
