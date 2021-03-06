App.prototype.coderunnerRunCompleteOutputCellObject = function() {

// function appHelperCodeGuideRunCompleteOutputCellObject( coderunner ) {
  var codemirror = this.querySelector("output cellobject codemirror").$codemirror;
  var iframe = this.querySelector("output rendered iframe");
  var iframeWindow = iframe.contentWindow;
  var sourceCells = iframe.contentDocument.body.children;
  var styleCell = iframe.contentDocument.body.firstChild;
  var callbackCell = iframe.contentDocument.body.lastChild;
  var cellObjects = [];
// debugger
  // Check to see if more than one ax() function called.
  // Test is > 2 because callback cell also present.
  if ( sourceCells.length > 2 ) {
    for ( var sourceCell of sourceCells ) {
      if ( sourceCell.id === "axCoderunnerComplete" ) { break; };
      // if ( sourceCell === styleCell ) { break; };
      var cellObject = iframeWindow[ sourceCell.$cell ];
      cellObjects.push( cellObject );
    };
  } else {
    var sourceCell = sourceCells[0];
    var cellObject = iframeWindow[ sourceCell.$cell ];
    cellObjects = cellObject;
  };
  var cellObjectsJson = this._cellJson( cellObjects );

  codemirror.getDoc().setValue( cellObjectsJson );
  codemirror.setSize( "100%", "100%" );
  codemirror.refresh();

};
