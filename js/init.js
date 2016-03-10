var buttonContainer = document.querySelector('.buttonContainer')
  , RadioContainer = document.querySelector('.radioContainer')
  , SliderContainer = document.querySelector('.sliderContainer');

var _button = CreateButton()
.text("Click Button")
.onClick(function(Button){console.log("yay");alert("Button Clicked");})

var _radio = CreateRadio()
.text('Toggle');

var _slider = CreateSlider()
.min(100)
.max(10000)
.direction("horizontal")
.step(100)
.ticks(4);

_button.call(_button,buttonContainer);
_radio.call(_radio,RadioContainer);
_slider.call(_slider,SliderContainer);
