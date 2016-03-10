# Button Component

### Purpose
User interaction, submit, click event, href linking

###### Commands

*___.text({*type* **String**} || {*type* **Array**})___ **this is the text that is shown inside the button itself, if button type toggle is being used an array of two strings can also be passed in.

*___.onClick(*type* **Function**)___ **This is a function that will fire once the button is clicked, the entire Button object itself will be passed in to the function with current state when ran.

*___.type(*type* **String**)___ **This is the state of the button type that will be used, whether a simple 'click' or a 'toggle' or a primitive 'text' button

*___.disabled(*type* **Boolean**)___ **This is the state saying whether the button should be displayed disabled, if disabled the onclick event will never fire.

*___.link(*type* **String**)___ **This is the href link that will be fired when the button is clicked.

*___.extend(*type* **Function**)___ **This function is ran whenever the constructor is called and it precedes any subcomponent creation, the method is ran in the button scope and the button node is passed in so that an extension of the properties may be altered or added.

*___.addType(*type* **String**)___ **This method allows for adding more types to the type enum for toggling.

*___.btnInput(*type* **Button Input SubComponent**)___ **This is the location of the subcomponent input, this may be overwritten with another fresh Button Input Subcomponent