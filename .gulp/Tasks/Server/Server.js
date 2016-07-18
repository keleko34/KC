/*********************************
 *  Server
 *  Created by Keleko34
 *  Starts a server for testing content
 ********************************/

var base = require('./../../Base'),
    gulp = require('gulp'),
    connect = require('gulp-connect'),
    fs = require('fs'),
    query = require('querystring'),
    appPath = process.cwd().replace(/\\/g,"/");

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

  function environment(req){
    if(req.query && req.query.env && ['dev','qa','stage'].indexOf(req.query.env) > -1){
      return req.query.env;
    }
    return 'prod';
  }

  function serverError(res){
    this.statusCode = 500;
    this.writeHead(500, {'Content-Type': 'text/html'});
    fs.createReadStream(appPath+'/500.html').pipe(this);
  }

  function notFound(res){
    this.statusCode = 404;
    this.writeHead(404, {'Content-Type': 'text/html'});
    fs.createReadStream(appPath+'/404.html').pipe(this);
  }

  function Route(req,res,next){
    if(req.url.indexOf('/require') === 0){
      if(!req.query && req.url.indexOf('?') > -1){
        req.query = query.parse(req.url.substring((req.url.indexOf('?')+1),req.url.length));
        req.url = req.url.substring(0,req.url.indexOf('?'));
      }
      var _type = '',
          _finished = [],
          _env = environment(req),
          _debug = (req.query ? req.query.debug : false);

      if(!req.params){
        req.params = [];
        req.params[0] = req.url.replace('/require/','');
      }
      if(!res.notFound){
        res.notFound = notFound.bind(res);
      }
      if(!res.serverError){
        res.serverError = serverError.bind(res);
      }

      fs.readdir(appPath+'/src/Components',function(err,dir){
        if(!err){
          loop:for(var x=0;x<dir.length;x++){
            if(_type.length > 0){
              break loop;
            }
            if(dir[x].toLowerCase() === req.params[0].toLowerCase()){
              _type = 'Components';
              sendRequest(_type,dir[x],_env,_debug,res);
            }
          }
          _finished[0] = true;
          if(_finished[0] && _finished[1] && _finished[2] && _type.length === 0){
            res.notFound();
          }
        }
      });

      fs.readdir(appPath+'/src/Sections',function(err,dir){
        if(!err){
          loop:for(var x=0;x<dir.length;x++){
            if(_type.length > 0){
              break loop;
            }
            if(dir[x].toLowerCase() === req.params[0].toLowerCase()){
              _type = 'Sections';
              sendRequest(_type,dir[x],_env,_debug,res);
            }
          }
          _finished[1] = true;
          if(_finished[0] && _finished[1] && _finished[2] && _type.length === 0){
            res.notFound();
          }
        }
      });

      fs.readdir(appPath+'/src/Pages',function(err,dir){
        if(!err){
          loop:for(var x=0;x<dir.length;x++){
            if(_type.length > 0){
              break loop;
            }
            if(dir[x].toLowerCase() === req.params[0].toLowerCase()){
              _type = 'Pages';
              sendRequest(_type,dir[x],_env,_debug,res);
            }
          }
          _finished[2] = true;
          if(_finished[0] && _finished[1] && _finished[2] && _type.length === 0){
            res.notFound();
          }
        }
      });
    }
    else{
      next();
    }

  }

  function sendRequest(type,el,env,debug,res){
    var _path = (appPath+'/src/'
    +type+'/'+el+'/'
    +(env === undefined ? 'prod' : env)
    +'/'+el
    +(((env === undefined || env === 'prod') || (env === 'qa' && !debug)) ? '.min' : '')
    +'.js');
    fs.stat(_path,function(err,stat){
      if(!err && stat.isFile()){
         fs.createReadStream(_path).pipe(res);
      }
      else{
        if(err && err.code !== 'ENOENT'){
          res.serverError();
        }
        else{
          res.notFound();
        }
      }
    });
  }

  /* command fires when all prompts have finished,
     all prompts are passed as res
  */
  function command(res){
    connect.server({
      root: process.cwd().replace(/\\/g,"/")+"/"+res.Root,
      port: parseInt(res.Port,10),
      livereload: res.Reload,
      middleware: function(connect, opt){
        return [Route]
      }
    })
  }

  return base.task('Server')
  .filter(filter)
  .command(command)
  .call();

}
