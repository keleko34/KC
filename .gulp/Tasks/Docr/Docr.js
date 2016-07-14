/*********************************
 *  Docr
 *  Created by Keleko34
 *  Helps to auto document templates
 ********************************/

var base = require('./../../Base'),
    insert = require('gulp-insert'),
    gulp = require('gulp');

module.exports = function(){

  /* Filter helps to filter prompt inputs after they have been entered,
     such an example of seeing if a file they entered exists etc.
  */
  function filter(res,key){
    if(res !== undefined && key === 'Element'){
      try
      {
        var exists = fs.statSync('./src/' + res.Type + '/' + res.Element + '/Readme.md');
        if(!exists || !exists.isFile()){
          console.error('\033[31mThere is no Readme in:\033[37m ',res.Type,' ',res.Element);
          process.exit(1);
        }
      }
      catch(e)
      {
        if(e.code === 'ENOENT'){
          console.error('\033[31mThere is no Readme in:\033[37m ',res.Type,' ',res.Element);
        }
        console.error(e);
        process.exit(1);
      }
    }
  }

  function compileStrings(titles, descriptions, types){
    var compiledString = [];
    for(var x=0;x<titles.length;x++){
      compiledString.push('- '+titles[x]+' *('+types[x]+')*<br />\r\n__'+descriptions[x]+'__');
    }
    return compiledString;
  }

  /* command fires when all prompts have finished,
     all prompts are passed as res
  */
  function command(res){
    var _readme = './src/'+res.Type+'/'+res.Element+'/Readme.md',
        _strings = compileStrings(res.Filtered, res.Description, res.TypeCheck);

    return gulp.src(_readme)
    .pipe(insert.transform(function(contents,file){
      if(contents.indexOf('### '+res.Regex) > -1){
        var reg = /(<!-- (End\s){0,1}Build -->)/g,
            regS = /(###)/g,
            lines = contents.split(reg)
            .filter(function(k,i){
              return (k !== undefined && k !== 'End ');
            }),
            regLines = lines[2].split(regS)
            .filter(function(k,i){
              return (k !== undefined && k.length > 0 && k !== '###' && k.indexOf(' '+res.Regex) === 0);
            })
            .map(function(k,i){
              return '###'+k;
            }),
            rulelines = regLines[0].split(/(-)/g)
            .filter(function(k,i){
              return (k.indexOf('### '+res.Regex) < 0 && k !== '-');
            })
            .map(function(k,i){
              return '-'+k.substring(0,(k.length-2));
            });
        var found = false;
        outer:for(var x=0;x<_strings.length;x++){
          found = false;
          inner:for(var i=0;i<rulelines.length;i++){
            if(rulelines[i] === _strings[x]){
              found = true;
              break inner;
            }
          }
          if(!found){
            rulelines.push(_strings[x]);
          }
        }

        lines[2] = lines[2].split(regS)
        .filter(function(k,i){
          return (k !== undefined && k.length > 2 && k !== '###');
        })
        .map(function(k,i){
          if(k.indexOf(' '+res.Regex) === 0){
            return '\r\n### '+res.Regex+'\r\n\r\n'+rulelines.join('\r\n\r\n')+'\r\n\r\n';
          }
          return '\r\n###'+k;
        }).join('');
        console.log(lines[2]);

        contents = lines.join('');
      }
      else{
        contents = contents.replace('<!-- End Build -->','### '+res.Regex+'\r\n\r\n'+_strings.join('\r\n')+'\r\n<!-- End Build -->');
      }
      return contents;
    }))
    .pipe(gulp.dest('./src/'+res.Type+'/'+res.Element))
    .on('end',function(){
      console.log('Finished Running Docr!');
    })

  }

  return base.task('Docr')
  .filter(filter)
  .command(command)
  .call();

}
