/*********************************
 *  Server
 *  Created by Keleko34
 *  Starts a server for testing content
 ********************************/

var base = require('./../../Base'),
    gulp = require('gulp'),
    connect = require('gulp-connect'),
    fs = require('fs');

module.exports = function(){

  /* Filter helps to filter prompt inputs after they have been entered,
     such an example of seeing if a file they entered exists etc.
  */
  function filter(res,key){
    if(key === 'Root'){
      try
      {
        var exists = fs.statSync('./' + res.Root);
        if(!exists || !exists.isDirectory()){
          console.error('\033[31mThere is no folder at \033[37m' + res.Root);
          process.exit(1);
        }
      }
      catch(e)
      {
        if(e.code === 'ENOENT'){
          console.error('\033[31mThere is no folder at \033[37m' + res.Root);
        }
        console.error(e);
        process.exit(1);
      }
    }
  }

  /* command fires when all prompts have finished,
     all prompts are passed as res
  */
  function command(res){
    connect.server({
      root: process.cwd().replace(/\\/g,"/")+"/"+res.Root,
      port: parseInt(res.Port,10),
      livereload: res.Reload
    })
  }

  return base.task('Server')
  .filter(filter)
  .command(command)
  .call();

}
