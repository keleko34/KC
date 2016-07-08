# Task Configs

##### Main config

 - Base
 ** This holds the base folder structure for templates and where to look for files for each **
 
 - Tasks
 ** This holds all the individual task configs **
 
##### Task configs

 - commands
 ** This holds all commands to be run when this task is ran **
 
 
###### Command Structure

When you add a command to the `commands` property it should be structured as:

`<Name of the command>:{
   cmd:{ *optional
     short:<short cli command like '-a'>, *optional
     long:<long cli command like '--author'>,
     help:<help message to show when --options is called> *optional
   },
   prompt:{
    type:<('input'|'confirm'|'list')>,
    message:<message to user>,
    choices:<(array['option']|function(){returns array['option']})>
   },
   action:<string for next command or 'end' or 'exit' (string|function(){returns string})>,
   store:<('string'|'array')> *optional
 }`
 
 - Name of command
 ** This name is what will be used as a key when passed, as well as in create is used as the $(Name of command) for string replacement **
 
 - cmd
 * Optional *
 ** cmd can only be used with store types of string atm, these commands get auto populated into the --options list when added **
 * NOTE when something like a message is needed remember that mesages have spaces and must be wrapped in "Message" to escape spaces in the cli *
 
 - prompt
 ** prompt is all te settings for the prompt that will be shown to the user if a cli is passed based on cmd then this will not be shown **
 
   ..* type
   * Default 'input' *
   ** input require user input, confirm is basic true or false input, list requires the choices property to use as this will be the choices the user sees **
 
   ..* choices
   ** choices can either be an array of predetermined 'strings' or a function that returns an array of strings **
 - action
 * No Default *
 ** action is a string or a function that returns a string that says which 'Name of command' should be run next or if 'end' is specififed it ends the line of commands, if 'exit' is specified it exits the process **
 
 - store
 * Default 'string' *
 ** store tells how to store the values in the values object, either 'string' which then stores Key value pair eg. 'Name of command':value or 'array' which specifies and array of multiple values due to the command being run multiple times eg. 'Name of command':[value1,value2,etc...] **
 
 
 ##### Mapping in Create task
 
 ** String **
 
 Mapping in create task is relatively simple, every `$Name of command` will be replaced with whatever was entered by the user if the command had a store type of 'string' or default. File names may also have `$Name of command` in them as to have their names replaced when created.
 
 ** Array **
 
 Mapping with arrays is slightly different and is only allowed in file content. You can either map individual values as `$Name of command[0]` or if You want a repeating effect You can specify: `$Name of command[x](string to replicate with $x as value)` this will take all the text within `()` and replicate it as many times as the length of the array and replace `$x` in the text with that array positions value.
 