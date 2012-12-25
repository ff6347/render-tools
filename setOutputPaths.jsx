// Copyright (c)  2012 
// Fabian "fabiantheblind" Morón Zirfas  
// Permission is hereby granted, free of charge, to any 
// person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software
// without restriction, including without limitation the rights 
// to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to  permit persons to 
// whom the Software is furnished to do so, subject to 
// the following conditions:  
// The above copyright notice and this permission notice
// shall be included in all copies or substantial portions of the Software.  
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF  CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTIO
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.  

// see also http://www.opensource.org/licenses/mit-license.php


{

#include "Debugger.jsx";
var deeBug = new Debugger(true,"setOutputPath.jsx version 0.1","This is a debug version");
 deeBug.init();
run_script_set_output_path(this);
     function run_script_set_output_path(thisObj){
if(check_security_settings() == false){
 alert ("This script requires the scripting security preference to be set.\n" +
            "Go to the \"General\" panel of your application preferences,\n" +
            "and make sure that \"Allow Scripts to Write Files and Access Network\" is checked.");
return;
};
// this is global
var SOP_meta = new Object();
    SOP_meta = {
  setting1 : false,
  setting2 : false 
};
SOP_meta.ddlStrings = ["projectName","compName","fileExtension","#####","renderSettingsName","outputModuleName","frameRate","startFrame","endFrame","durationFrames","startTimecode","endTimecode","durationTimecode","channels","projectColorDepth","outputColorDepth","compressor","fieldOrder","pulldownPhase","width","height"];
SOP_meta.outname = "[compName].[fileExtension]";

///   THIS WILL CHECK IF PANEL IS DOCKABLE OR FLAOTING WINDOW  
var win   = buildUI(thisObj);
if ((win != null) && (win instanceof Window)) {
    win.center();
    win.show();
}; // end if win  null and not a instance of window 

 function buildUI(thisObj) {
    var win = (thisObj instanceof Panel) ? thisObj :  new Window('palette', 'Set Output Path',[0,0,150,260],{resizeable: true}); 

    if (win != null) {

        var H = 25; // the height
        var W1 = 50; // the width
        var G = 5; // the gutter
        var x = G; 
        var y = G;
        win.setpath_button = win.add('button', [x ,y,x+W1*5,y + H], 'Set Output Path');
        y+=H+G;
        win.add_to_name_dropdl = win.add('dropdownlist',[x ,y,x+W1*5,y + H],SOP_meta.ddlStrings);
        y+=H+G;
        win.outname_etxt = win.add('edittext',[x ,y,x+W1*5,y + H*4],SOP_meta.outname,{multiline:true});
        win.setpath_button.onClick = function (){
        changeRenderLocations();


        };// end of setpath_button on click
        // 
    }
    return win
};// close buildUI
  function changeRenderLocations(){
    var scriptName = "Change Render Locations 2 new Folders";

    var newLocation = Folder.selectDialog("Select a render output folder...");
    
    if (newLocation != null) {

      app.beginUndoGroup(scriptName);
      
      // Process all render queue items whose status is set to Queued.
      for (var i = 1; i <= app.project.renderQueue.numItems; ++i) {
        var curItem = app.project.renderQueue.item(i);
        
        if (curItem.status == RQItemStatus.QUEUED) {
          // Change all output modules for the current render queue item.
          for (j = 1; j <= curItem.numOutputModules; ++j) {
            var curOM = curItem.outputModule(j);
            // this is the addition by fabiantheblind
            if(curItem.numOutputModules > 1){
              var targetFolder = new Folder(newLocation.fsName +"/"+curItem.comp.name + "_"+j); 
            }else{
              
              var targetFolder = new Folder(newLocation.fsName +"/"+curItem.comp.name); 
              
            }
              if(!targetFolder.exists){ 
            targetFolder.create(); 
              }
            var tF = targetFolder.fsName;
            // now there is a folder for each output module
            // from here on 
            var oldLocation = curOM.file;
            curOM.file = new File( tF + "/" + oldLocation.name);
            deeBug.addLineToInfo("RQ Item: " +i+ " OModule: " + j)
            deeBug.addLineToInfo("---- Old location: " + oldLocation.fsName);
            deeBug.addLineToInfo("---- New Location: " + curOM.file.fsName); 

            // alert("New output path:\n"+curOM.file.fsName, scriptName);
          }
        }
      }
      // alert("done");
      deeBug.write_infos();
      app.endUndoGroup();
    }
  }


function check_security_settings(){
    var safeToRunScript = false;
    // Check if we are allowed to access the network.
    var securitySetting = app.preferences.getPrefAsLong("Main Pref Section", "Pref_SCRIPTING_FILE_NETWORK_SECURITY");
    if (securitySetting != 1) {
        safeToRunScript = false;
    }else{
        safeToRunScript = true;
    };

    return safeToRunScript;
    };// end check_security_settings
};// end of run_script_set_output_path enclose all
}