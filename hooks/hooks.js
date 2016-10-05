'use strict';

var tabOrder = false;

var hooks = {
  afterGetTemplate: function afterGetTemplate(text, abe) {
  	var hasEditor = text.match(/({{abe.*type=[\'|\"]editor[\'|\"].*}})/g)
  	tabOrder = false;
  	if(hasEditor){
  		for (var i = 0; i < hasEditor.length; i++) {
  			if(abe.cmsData.regex.getAttr(hasEditor[i], 'key') === 'ordertab'){
  				var rex = new RegExp(hasEditor[i].replace(/\"/g, '\\"').replace(/\'/g, "\\'").replace('[', '\\[').replace(']', '\\]'));
  				
				  text = text.replace(rex, '')
				  tabOrder = JSON.parse(abe.cmsData.regex.getAttr(hasEditor[i], 'source'))
				  break;
  			}
  		}
  	}
    
    return text;
  },
  afterEditorFormBlocks: function afterEditorFormBlocks(blocks, json, abe) {
    var orderedBlock = {}

  	if(tabOrder){
  		for (var i = 0; i < tabOrder.length; i++) {
  			orderedBlock[tabOrder[i]] = blocks[tabOrder[i]];
  		}
  		blocks = orderedBlock;
  		tabOrder = false;
  	}

    return blocks;
  }
};

exports.default = hooks;
