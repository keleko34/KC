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

  var paths = {
    "/require/":[appPath+'/src/Components',appPath+'/src/Sections',appPath+'/src/Pages'],
    "/cms/":[appPath+'/src/CMS_Components',appPath+'/src/CMS_Sections']
  }

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
    if(req.query && req.query.env && ['local','dev','qa','stage'].indexOf(req.query.env) > -1){
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

  /* Default authorizer, normally ran through login system with permissions */
  var isAuthorized = false,
      localUser = 'admin',
      localPass = 'pass';

  function init(req,res,next){
    if(req.url.indexOf('/.core/.core') === 0){
      sortQuery(req,res);
      if(req.query.edit){
        req.url = req.url.replace('.core.js','.core-cms.js');
      }
      if(req.query.env === 'qa'){
        if(req.query.debug){
          req.url = req.url.replace('.js','.build.js');
        }
        else{
          req.url = req.url.replace('.js','.min.js');
        }
      }
      if(req.query.env === 'prod' || req.query.env === 'stage'){
        req.url = req.url.replace('.js','.min.js');
      }
      fs.createReadStream(appPath+req.url).pipe(res);
    }
    else{
      next();
    }
  }

  function cms_login(req,res,next){
    if(req.url.indexOf('/cms_login') === 0){
      sortQuery(req,res);
      if(req.query.env !== 'local' && req.query.env !== 'dev'){
        res.serverError();
        return;
      }
      res.setHeader('content-type','application/x-javascript');
      if(req.query.user !== localUser || req.query.pass !== localPass){
        var respond = {err:true,message:"Failed login, wrong user or pass"};
      }
      else if(req.query.user === localUser && req.query.pass === localPass){
        isAuthorized = true;
        var respond = {success:true,type:'developer'};
      }
      res.statusCode = 200;
      res.end(JSON.stringify(respond));
    }
    else{
      next();
    }
  }

  function Route(req,res,next){

    var path_routes = Object.keys(paths);

    path_loop:for(var p=0;p<path_routes.length;p++){
      if(req.url.indexOf(path_routes[p]) === 0){
        var _type = '',
            _finished = [],
            _isCMS = (req.url.indexOf('/cms') === 0),
            _routes = paths[path_routes[p]];

        sortQuery(req,res);

        if(_isCMS){
          if(!isAuthorized){
            res.serverError();
            return;
          }
        }

        comp_loop:for(var c=0;c<_routes.length;c++){
          (function(){
            var r = _routes[c];
            fs.readdir(_routes[c],function(err,dir){
              if(!err){
                loop:for(var x=0;x<dir.length;x++){
                  if(_type.length > 0){
                    break loop;
                  }

                  if(dir[x].toLowerCase() === req.params[0].toLowerCase()){
                    _type = r.replace(appPath+'/src/','');
                    sendRequest(_type,req.params,req.query.env,req.query.debug,res);
                    break loop;
                  }
                }
                if(_type.length < 1){
                  _finished.push(true);
                }
              }
              else{
                _finished.push(true);
              }
              if(_finished.length >= _routes.length){
                res.notFound();
              }
            });
          }());
        }
        return;
      }
    }
    next();
  }

  function sortQuery(req,res){
    if(!req.query && req.url.indexOf('?') > -1){
        req.query = query.parse(req.url.substring((req.url.indexOf('?')+1),req.url.length));
        req.url = req.url.substring(0,req.url.indexOf('?'));
      }
      var _env = environment(req),
          _debug = (req.query ? req.query.debug : false);

      if(!req.params){
        req.params = [];
        req.params[0] = req.url;
        req.params[1] = '.js';

        Object.keys(paths).forEach(function(k){
          if(req.params[0].indexOf(k) === 0) req.params[0] = req.params[0].replace(k,'')
        });

        if(req.params[0].indexOf('.bp') > -1 || req.params[0].indexOf('.vm') > -1){
          _env = 'local';
          req.params[1] = req.params[0].substring(req.params[0].indexOf('.'),req.params[0].length)+'.js';
          req.params[0] = req.params[0].substring(0,req.params[0].indexOf('.'));
        }
        else if(req.params[0].indexOf('.html') > -1 || req.params[0].indexOf('.css') > -1){
          _env = 'local';
          req.params[1] = req.params[0].substring(req.params[0].indexOf('.'),req.params[0].length);
          req.params[0] = req.params[0].substring(0,req.params[0].indexOf('.'));
        }
      }
      if(!res.notFound){
        res.notFound = notFound.bind(res);
      }
      if(!res.serverError){
        res.serverError = serverError.bind(res);
      }

    if(!req.query){
      req.query = {};
    }
    req.query.env = _env;
    req.query.debug = _debug;
    req.query.edit = (req.query.edit === 'true');
  }

  function sendRequest(type, params, env, debug, res){
    var _path = (appPath+'/src/'
    +type+'/'+params[0]
    +(env === undefined ? '/prod' : (env === 'local' ? '' : '/'+env))
    +'/'+params[0]
    +(((env === undefined || env === 'prod' || env === 'stage') || (env === 'qa' && !debug)) ? '.min' : '')
    +params[1]);

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
        return [init,cms_login,Route]
      }
    })
  }

  return base.task('Server')
  .filter(filter)
  .command(command)
  .call();

}
