app.coderunner.html = function( script ) {

  return `

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Ax Run</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="favicon.png" type="image/png">

  <link rel="stylesheet" href="/vendor/font-awesome-4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="/vendor/codemirror-5.28.0/codemirror.css">
  <link rel="stylesheet" href="/vendor/codemirror-5.28.0/theme/neo.css">
  <link rel="stylesheet" href="/vendor/simplemde-1.11.2/simplemde.min.css">
  <link rel="stylesheet" href="/vendor/quilljs-1.3.6/quill.snow.css">
  <link rel="stylesheet" href="/vendor/text-security-0.0.0/dist/text-security.css">

  <link rel="stylesheet" href="/vendor/bootstrap-4.1.0-dist/css/bootstrap.min.css">

  <script src="/vendor/codemirror-5.28.0/codemirror.min.js"></script>
  <script src="/vendor/codemirror-5.28.0/addons/display/placeholder.js"></script>
  <script src="/vendor/codemirror-5.28.0/mode/shell/shell.js"></script>
  <script src="/vendor/codemirror-5.28.0/mode/javascript/javascript.js"></script>
  <script src="/vendor/codemirror-5.28.0/mode/ruby/ruby.js"></script>
  <script src="/vendor/codemirror-5.28.0/mode/xml/xml.js"></script>
  <script src="/vendor/simplemde-1.11.2/simplemde.min.js"></script>
  <script src="/vendor/quilljs-1.3.6/quill.js"></script>
  <!-- <script src="/vendor/js-beautify-1.7.5/beautify.js"></script> -->
  <!-- <script src="/vendor/js-beautify-1.7.5/beautify-css.js"></script> -->
  <!-- <script src="/vendor/js-beautify-1.7.5/beautify-html.js"></script> -->
  <script src="/vendor/marked-0.3.6.min.js"></script>
  <!-- <script src="/vendor/sketchjs-0.0.0.js"></script> -->
  <script src="/vendor/chartjs-2.7.2.bundle.min.js"></script>


  <!-- <script src="/vendor/jquery-3.3.1.slim.min.js"></script> -->


  <!-- <script src="https://component.kitchen/polyfill/webcomponents-bundle.js"></script> -->
  <!-- <script type="module" src="https://component.kitchen/modules/AutosizeTextarea.js"></script> -->

  <script type="application/javascript" src="/assets/axfunction/axf.js" ></script>
  <script type="application/javascript" src="/assets/axfunction/axf-plugins.js" ></script>
  <!-- <script type="application/javascript" src="/assets/axf/themes/basic.js" ></script> -->
  <script type="application/javascript" src="/assets/client.js" ></script>

</head>

<body>
  <script>${ script }</script>

  <script>
    ax( {
      $init: function() {
        var iframeWindow = this.ownerDocument.defaultView
        if ( iframeWindow.frameElement ) {
          iframeWindow.frameElement.closest("app-coderunner").$enable()
        }
      }
    } )
  </script>

</body>

</html>

`

}
