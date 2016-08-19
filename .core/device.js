define([],function(){

  var _type = '',
      _typeEnum = ['desktop','tablet','phone'],
      _orientation = '',
      _orientationEnum = ['portrait','landscape'],
      _browser = '',
      _browserEnum = ['unkown','firefox','chrome','safari','opera','ie'],
      _browserX = {
        firefox:/^(?!.*Seamonkey\/).*Firefox\/.*$/,
        chrome:/^.*Chrome\/.*$/,
        safari:/^(?!.*Chrome\/).*(?!.*Chromium\/).*Safari\/.*$/,
        opera:/^.*OPR\/.*|.*Opera\/.*$/,
        ie:/^.*MSIE.*$/
      },
      _device = '',
      _deviceEnum = ['unkown','pc','mac','android','apple','microsoft'],
      _deviceX = {
        pc:/[Ww]indows NT/,
        mac:/[Mm]acintosh/,
        android:/[Aa]ndroid/,
        apple:/i[Pp]hone|i[Pp]ad/,
        microsoft:/[Ww]indowsCE|[Ww]indows[Pp]hone/
      }

  kc.Device = function(){
    var width = window.innerWidth,
        height = window.innerHeight;

    switch(true)
    {
        case  width < height && height < 769:
            kc.Device.type('phone');
            kc.Device.orientation('portrait');
            //android portrait
        break;
        case  height <  width  && width < 769:
            kc.Device.type('phone');
            kc.Device.orientation('landscape');
            //android landscape
        break;
        case  width <  height && height < 1199:
            kc.Device.type('tablet');
            kc.Device.orientation('portrait');
            //tablet portrait
        break;
        case  height <  width && width < 1199:
            kc.Device.type('tablet');
            kc.Device.orientation('landscape');
            //tablet landscape
        break;
        case  width > 1200:
            kc.Device.type('desktop');
            kc.Device.orientation('landscape');
            //laptop
        break;
        case height > 1200:
            kc.Device.type('desktop');
            kc.Device.orientation('portrait');
        break;
    }

    document.body.className = kc.Device.type()+" "+kc.Device.orientation()+" "+kc.Device.device()+" "+kc.Device.browser();

    return kc.Device;
  }

  /* runs through userAgent checking for browser and device type */
  kc.Device.getInfo = function(){
    var browserX = Object.keys(_browserX),
        deviceX = Object.keys(_deviceX);

    loopB:for(var x=0;x<browserX.length;x++){
      if(_browserX[browserX[x]].test(navigator.userAgent)){
        kc.Device.browser(browserX[x]);
        break loopB;
      }
    }
    if(kc.Device.browser().length < 1) kc.Device.browser('unkown');

    loopD:for(var x=0;x<deviceX.length;x++){
      if(_deviceX[deviceX[x]].test(navigator.userAgent)){
        kc.Device.device(deviceX[x]);
        break loopD;
      }
    }
    if(kc.Device.device().length < 1) kc.Device.device('unkown');
    return kc.Device();
  }

  kc.Device.type = function(v){
    if(v === undefined){
      return _type;
    }
    _type = (_typeEnum.indexOf(v) > -1 ? v : _type);
    return kc.Device;
  }

  kc.Device.orientation = function(v){
    if(v === undefined){
      return _orientation;
    }
    _orientation = (_orientationEnum.indexOf(v) > -1 ? v : _orientation);
    return kc.Device;
  }

  kc.Device.browser = function(v){
    if(v === undefined){
      return _browser;
    }
    _browser = (_browserEnum.indexOf(v) > -1 ? v : _browser);
    return kc.Device;
  }

  kc.Device.device = function(v){
    if(v === undefined){
      return _device;
    }
    _device = (_deviceEnum.indexOf(v) > -1 ? v : _device);
    return kc.Device;
  }

  window.addEventListener('resize',kc.Device);
  kc.Device.getInfo();
  return kc.Device;
})
