/*********************************
 *  PhotoPost
 *  Created by Keleko34
 *  Shows a photo post and its needed info
 ********************************/


/* This is Your class file, it controls the states as well as the fetching of data etc. */
define(['./PhotoPost.bp', './PhotoPost.vm', 'text!./PhotoPost.html', 'css!./PhotoPost.css'],function(blueprint, viewmodel, template){

    /* Do not remove!!! */
    /* BUILD SECTION */
    /* END BUILD SECTION */

	function CreatePhotoPost(){

      var vm = {};
      /* Add Private _variables here */

      var _liked = false;
      /* ex: private for functional property
         *
         *   var _example = '';
        */

      function PhotoPost(){
        /* 'vm' refers to the viewmodel
         * whenever you update something in code always call the constructor for updating the viewmodel */

        /* Update viewmodel properties here */

        var main_class = vm.mainclass();
        main_class = main_class.replace(' PhotoPost--liked',(_liked ? ' PhotoPost--liked' : ''));

        vm.mainclass(main_class);

        /* ex: updates the class attr with a changed state
         *
         *   vm.mainclass('PhotoPost' + (_example ? ' PhotoPost--'+_example : ''));
        */
        return PhotoPost;
      }

      PhotoPost.viewmodel = function(v){
        if(v === undefined){
          return vm;
        }
        vm = (v instanceof viewmodel ? v : vm);
        return PhotoPost;
      }

      PhotoPost.liked = function(v){
        if(v === undefined){
          return _liked;
        }
        _liked = !!v;
        return PhotoPost;
      }

      PhotoPost.getImage = function(){

      }

      /* add methods for updating and type checking viewmodel properties */

      /* ex: functional property, returns value if nothing, sets if value is string
         *
         *   PhotoPost.example = function(v){
         *     if(v === undefined){
         *        return _example;
         *     }
         *     _example = (typeof v === 'string' ? v : _example);
         *     return PhotoPost;
         *   }
        */

      return PhotoPost;
	}
    blueprint.register_PhotoPost(CreatePhotoPost,viewmodel,template);
	return CreatePhotoPost;
});
