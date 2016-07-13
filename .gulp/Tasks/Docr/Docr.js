/*********************************
 *  Docr
 *  Created by Keleko34
 *  Helps to auto document templates
 ********************************/

var base = require('./../../Base'),
    gulp = require('gulp');

module.exports = function(){

  /* Filter helps to filter prompt inputs after they have been entered,
     such an example of seeing if a file they entered exists etc.
  */
  function filter(res,key){

  }

  /* command fires when all prompts have finished,
     all prompts are passed as res
  */
  function command(res){

  }

  return base.task('Docr')
  .filter(filter)
  .command(command)
  .call();

}
