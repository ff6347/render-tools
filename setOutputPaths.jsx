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

run_script_set_output_path(this);
	 function run_script_set_output_path(thisObj){

// this is global
SOP_meta = new Object();
SOP_meta = {
  setting1 : false,
  setting2 : false 
};

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
        var W1 = 30; // the width
        var G = 5; // the gutter
        var x = G; 
        var y = G;
        win.setpath_button = win.add('button', [x ,y,x+W1*5,y + H], 'Set Output Path');

        // var yuioff = G; // and some offset
        // 
    }
    return win
};// close buildUI


};// end of run_script_set_output_path
}