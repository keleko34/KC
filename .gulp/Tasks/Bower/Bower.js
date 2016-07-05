/*********************************
 *  Bower
 *  Created by Keleko34
 *  Bower installer and inject automation
 ********************************/

var base = require('./../../Base'),
    gulp = require('gulp'),
    child_process = require('child_process');

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

    /* add bower component to requirejs.config after install */
    console.log('\033[36mStarting to install:\033[37m',res.Library);
    child_process.exec('bower install '+res.Library+' --save',function(err,stdout,stderr){
      if (err) {
        console.error('\033[31mERR!! \033[37m',err);
        return;
      }
      console.log('\033[36mBower Logs: \033[37m ',stdout);
      console.log('\033[36mBower Errors: \033[37m ',stderr);
    });
  }

  return base.task('Bower')
  .filter(filter)
  .command(command)
  .call();

}
