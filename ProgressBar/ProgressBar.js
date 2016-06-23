/* BUILD SECTION */
/* END BUILD SECTION */

define([],function(){
	function CreateProgressBar(){

        var _progress = 0
          , _steps = 1 //for step type eg ----1----2---3--4
          , _step = 0 //step for how much to go by each time
          , _value = 0
          , _min = 0 //for percent
          , _max = 0 // for percent
          , _onProgress = function(){}
          , _type = 'percent'
          , _typeEnum = ['percent','step','value']
          , _formatValue = function(){}

		function ProgressBar(node){
			node = (typeof node === 'string' ? document.querySelector(node) : (typeof node === 'object' ? node : null));
			if(!node)
			{
				console.error('you have passed an invalid node into ProgressBar: ',node);
				return;
			}



		}

        ProgressBar.value = function(v)
        {
          if(v === undefined)
          {
            return _value;
          }
          _value = (typeof v === 'number' || !isNaN(parseInt(v,10)) ? parseInt(v,10) : _value);
          return ProgressBar;
        }

        ProgressBar.progress = function(v)
        {
          if(v === undefined)
          {
            return _progress;
          }
          _progress = (typeof v === 'number' || !isNaN(parseInt(v,10)) ? parseInt(v,10) : _progress);
          return ProgressBar;
        }

        ProgressBar.steps = function(v)
        {
          if(v === undefined)
          {
            return _steps;
          }
          _steps = (typeof v === 'number' || !isNaN(parseInt(v,10)) ? parseInt(v,10) : _steps);
          return ProgressBar;
        }

        ProgressBar.step = function(v)
        {
          if(v === undefined)
          {
            return _step;
          }
          _step = (typeof v === 'number' || !isNaN(parseInt(v,10)) ? parseInt(v,10) : _step);
          return ProgressBar;
        }

        ProgressBar.progress = function(v)
        {
          if(v === undefined)
          {
            return _progress;
          }
          _progress = (typeof v === 'number' || !isNaN(parseInt(v,10)) ? parseInt(v,10) : _progress);
          return ProgressBar;
        }

        ProgressBar.min = function(v)
        {
          if(v === undefined)
          {
            return _min;
          }
          _min = (typeof v === 'number' || !isNaN(parseInt(v,10)) ? parseInt(v,10) : _min);
          return ProgressBar;
        }

        ProgressBar.max = function(v)
        {
          if(v === undefined)
          {
            return _max;
          }
          _max = (typeof v === 'number' || !isNaN(parseInt(v,10)) ? parseInt(v,10) : _max);
          return ProgressBar;
        }

        ProgressBar.onProgress = function(v)
        {
          if(v === undefined)
          {
            return _onProgress;
          }
          _onProgress = (typeof v === 'fuction' ? v : _onProgress);
          return ProgressBar;
        }

        ProgressBar.onProgress = function(v)
        {
          if(v === undefined)
          {
            return _onProgress;
          }
          _onProgress = (typeof v === 'fuction' ? v : _onProgress);
          return ProgressBar;
        }

        ProgressBar.type = function(v)
        {
          if(v === undefined)
          {
            return _type;
          }
          _type = (_typeEnum.indexOf(v) > -1 ? v : _type);
          return ProgressBar;
        }

        ProgressBar.formatValue = function(v)
        {
          if(v === undefined)
          {
            return _formatValue;
          }
          _formatValue = (typeof v === 'fuction' ? v : _formatValue);
          return ProgressBar;
        }


		return ProgressBar;
	}
	return CreateProgressBar;
})
