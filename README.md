# Kc

## Chainable Components

D3, Require(AMD), and Common compatable

[Check Out The Demos](http://keleko34.github.io/KC/)

###### Gulp Build Tool

* gulp create
** Simply running the gulp create command willl prompt you to enter a component name and will do all the initial component structure setup for you.

* gulp build
** gulp build will prompt you for which component you would like to build, build will automatically pull in all subfiles, convert the requirejs defines to standard self instantiated methods and package them into a debug build and a closure compiled minified version as well.

###### Components
##### [Button](./Button/README.md)

##### [Radio](./Radio/README.md)

##### [Slider](./Slider/README.md)

###### Structure Analysis

Preferred Code Style: *[Functional Paradigm](https://www.smashingmagazine.com/2014/07/dont-be-scared-of-functional-programming/)*

Preferred CSS Style: *[BEM CSS](https://css-tricks.com/bem-101/)*

By using functional programming component structure and properties as states technique combined with the structure of BEM, 
components can be very easily modular and not care about what is outside themselves, all states and component structure is tied to the classname
so an easy extraction of style vs functional approach can be met. the code doesn't care about how it looks like so the designers can. 
It only cares about structure and states. Have fun, fork, use, commit, whatever :)