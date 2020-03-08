---
[![npm version](https://badge.fury.io/js/malta-pdf-merge.svg)](http://badge.fury.io/js/malta-pdf-merge)
[![npm downloads](https://img.shields.io/npm/dt/malta-pdf-merge.svg)](https://npmjs.org/package/malta-pdf-merge)
[![npm downloads](https://img.shields.io/npm/dm/malta-pdf-merge.svg)](https://npmjs.org/package/malta-pdf-merge)  
---  

This plugin can be used on all files  

This plugin expects the template to contain some placeholders to know which file to look for, this placeholder is:  `##filepath##`  
All paths must be relative to the template folder  

Sample usage:  
```
malta app/docs/readme.txt public/docs -plugins=malta-pdf-merge
```
or in the .json file :
```
"app/docs/readme.txt" : "public/docs -plugins=malta-pdf-merge"
```
or in a script : 
``` js
var Malta = require('malta');
Malta.get().check([
    'app/docs/readme.txt',
    'public/docs',
    '-plugins=malta-pdf-merge',
    '-options=showPath:false,watchInterval:500,verbose:0'
    ]).start(function (o) {
        var s = this;
        console.log('name : ' + o.name)
        console.log("content : \n" + o.content);
        'plugin' in o && console.log("plugin : " + o.plugin);
        console.log('=========');
    });
```