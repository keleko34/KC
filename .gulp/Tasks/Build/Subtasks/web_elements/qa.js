
var gulp = require('gulp'),
    fs = require('fs'),
    inject = require('gulp-inject'),
    closureCompiler = require('gulp-closure-compiler'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    config = global.gulp.config;

module.exports = function(res,cb){
    console.log('\033[36mStarting Qa Build\033[37m');
    var _env = config.Tasks.Build.subtasks[res.SubTask],
        _components = fs.readdirSync('./src/Components/'),
        _componentsLow = _components.map(function(c){return c.toLowerCase();}),
        _sections = fs.readdirSync('./src/Sections/'),
        _sectionsLow = _sections.map(function(c){return c.toLowerCase();}),
        _file = './src/' + res.Type + '/'+res.Name+'/'+_env[(res.currentrule-1)]+'/'+res.Name+'.js',
        _htmlFile = './src/' + res.Type + '/' + res.Name + '/' + res.Name + '.html',
        _cssFile = './src/' + res.Type + '/'+res.Name+'/' + res.Name + '.css',
        _currentRule = _env[res.currentrule];

    function minify(packed){
      return gulp.src(_cssFile)
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./src/' + res.Type + '/' + res.Name))
      .on('end',function(){
        console.log('\033[36mStarting compiler for:\033[37m',res.Name);
        if(!packed){
          gulp.src(_file)
          .pipe(replace(/(\/\*CSS Include \*\/)(.*?)(\/\* End Css Include \*\/)/,'\r\nvar css = "'+fs.readFileSync(_cssFile.replace('.css','.min.css'))+'";\r\n'))
          .pipe(gulp.dest('./src/' + res.Type + '/' + res.Name + '/'  + _currentRule))
          .pipe(closureCompiler({
            compilerPath:"./compiler.jar",
            fileName:res.Name+".min.js",
            warning_level: 'QUIET'
          }))
          .pipe(gulp.dest('./src/' + res.Type + '/' + res.Name + '/'  + _currentRule))
          .on('end',cb);
        }
        else{
          gulp.src('./src/' + res.Type + '/' + res.Name + '/'  + _currentRule+'/'+res.Name+'.js')
          .pipe(replace(/(\/\*CSS Include \*\/)(.*?)(\/\* End Css Include \*\/)/,'\r\nvar css = "'+fs.readFileSync(_cssFile.replace('.css','.min.css'))+'";\r\n'))
          .pipe(gulp.dest('./src/' + res.Type + '/' + res.Name + '/'  + _currentRule))
          .pipe(closureCompiler({
            compilerPath:"./compiler.jar",
            fileName:res.Name+".min.js",
            warning_level: 'QUIET'
          }))
          .pipe(gulp.dest('./src/' + res.Type + '/' + res.Name + '/'  + _currentRule))
          .on('end',cb);
        }

      });
    }

  function parseHTML(template){
    var reg = /(<\/(.*?)>)/g,
        matched = (template.match(reg) ? template.match(reg) : []);

    return matched.map(function(k,i){
      return k.substring(2,k.length-1).toLowerCase();
    })
    .filter(function(k,i){
      return (matched.indexOf(k,(i+1)) < 0);
    });
  }

    if(res.Type === 'Sections'){
      var matched = parseHTML(fs.readFileSync(_htmlFile,{encoding:'utf8'})),
          modules = [];
      for(var x=0;x<matched.length;x++){
        if(_componentsLow.indexOf(matched[x]) !== -1){
          try{
            var mod = _components[_componentsLow.indexOf(matched[x])];
            var stats = fs.statSync('./src/Components/'+mod+'/' + _currentRule + '/'+mod+'.js');
            if(stats && stats.isFile()){
              modules.push(mod);
            }
          }
          catch(e){
            console.error("Unable to include component ",matched[x],' cause it has not been built to qa yet');
          }
        }
      }

      function pipeInject(mods){
        mods = mods.map(function(v){
          return './src/Components/'+v+'/' + _currentRule + '/'+v+'.js';
        });
         return gulp.src(_file).pipe(inject(gulp.src(mods),{
            relative:true,
            starttag: '/* COMPONENT BUILD SECTION */',
            endtag: '/* END COMPONENT BUILD SECTION */',
            transform: function(filepath,file,i,len){
              console.log('\033[36mInjecting Component:\033[37m',filepath.substring(filepath.lastIndexOf('/')+1,filepath.lastIndexOf('.')));
              var __contents = file.contents.toString('utf8');
              __contents = __contents.replace(/\n/g,'\n'+Array(13).join(' '));
              return __contents;
            }
        }))
        .pipe(gulp.dest('./src/' + res.Type + '/' + res.Name + '/'  + _currentRule))
        .on('end',function(){
            return minify(true);
         })
      }
      return (modules.length > 0 ? pipeInject(modules) : minify());
    }
    else if(res.Type === 'Pages'){
      var matched = parseHTML(fs.readFileSync(_htmlFile,{encoding:'utf8'})),
          modules = [],
          sections = [];
      for(var x=0;x<matched.length;x++){
        if(_componentsLow.indexOf(matched[x]) !== -1){
          try{
            var mod = _components[_componentsLow.indexOf(matched[x])];
            var stats = fs.statSync('./src/Components/'+mod+'/' + _currentRule + '/'+mod+'.js');
            if(stats && stats.isFile()){
              modules.push(mod);
            }
          }
          catch(e){
            console.error("Unable to include component ",matched[x],' cause it has not been built to qa yet');
          }
        }
        else if(_sectionsLow.indexOf(matched[x]) !== -1){
          try{
            var mod = _sections[_sectionsLow.indexOf(matched[x])];
            var stats = fs.statSync('./src/Sections/'+mod+'/' + _currentRule + '/'+mod+'.js');
            if(stats && stats.isFile()){
              sections.push(mod);
            }
          }
          catch(e){
            console.error("Unable to include section ",matched[x],' cause it has not been built to qa yet');
          }
        }
      }

      function pipeInject(mods,sects){
        mods = mods.map(function(v){
          return './src/Components/'+v+'/' + _currentRule + '/'+v+'.js';
        });
        sects =  sects.map(function(v){
          return './src/Sections/'+v+'/' + _currentRule + '/'+v+'.js';
        });

        function injectComponents(){
          return gulp.src(_file).pipe(inject(gulp.src(mods),{
              relative:true,
              starttag: '/* COMPONENT BUILD SECTION */',
              endtag: '/* END COMPONENT BUILD SECTION */',
              transform: function(filepath,file,i,len){
                console.log('\033[36mInjecting Component:\033[37m',filepath.substring(filepath.lastIndexOf('/')+1,filepath.lastIndexOf('.')));
                var __contents = file.contents.toString('utf8');
                __contents = __contents.replace(/\n/g,'\n'+Array(13).join(' '));
                return __contents;
              }
          }))
          .pipe(gulp.dest('./src/' + res.Type + '/' + res.Name + '/'  + _currentRule))
          .on('end',function(){
            if(sects.length > 0){
              return injectSections(false);
            }
            else{
              return minify();
            }
          });
        }

        function injectSections(isBase){
          var src = (isBase ? _file : './src/' + res.Type + '/' + res.Name + '/'  + _currentRule + '/'+res.Name+'.js');
          return gulp.src(src).pipe(inject(gulp.src(sects),{
              relative:true,
              starttag: '/* SECTION BUILD SECTION */',
              endtag: '/* END SECTION BUILD SECTION */',
              transform: function(filepath,file,i,len){
                console.log('\033[36mInjecting Section:\033[37m',filepath.substring(filepath.lastIndexOf('/')+1,filepath.lastIndexOf('.')));
                var __contents = file.contents.toString('utf8');
                __contents = __contents.replace(/\n/g,'\n'+Array(13).join(' '));
                return __contents;
              }
          }))
          .pipe(gulp.dest('./src/' + res.Type + '/' + res.Name + '/'  + _currentRule))
          .on('end',function(){
              return minify(true);
           })
        }

        if(mods.length > 0){
          return injectComponents();
        }
        else{
          return injectSections(true);
        }
      }
      return ((modules.length > 0 || sections.length > 0) ? pipeInject(modules,sections) : minify());
    }
    else{
      return minify();
    }
}
