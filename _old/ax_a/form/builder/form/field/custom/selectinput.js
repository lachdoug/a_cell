// options.collection
// options.value
// options.placeholder
// options.required

AxFunctionExtensionsFormBuilderCustomFields.prototype.selectinput = function(
  name,
  options={}
) {

  var a = this.axFunction.tags;
  var x = this.axFunction.extensions;
  var f = this.formBuilder;

  options.collection = f.lib.fieldCollectionFrom( options.collection || { 0: "Off", 1: "On" } );
  options.collection.push( "—————" );
  options.collection.push( [ "__USE_INPUT__", "Enter value" ]);

  // options.id = options.id + "_selectinput";

  var selectValue;
  var inputValue;

  if ( options.value ) {
    var valueInCollection = options.collection.some( option => option[0] == options.value );
    selectValue = valueInCollection ? options.value : "__USE_INPUT__";
    inputValue = valueInCollection ? null : options.value;
  } else {
     // show the input if no placeholder on select
    selectValue = options.placeholder === undefined ? "__USE_INPUT__" : "";
  };

  var inputAttributes = Object.assign(
    {
      style: "display: none;",
      value: inputValue,
      oninput: function () {
        this.previousSibling.previousSibling.value = this.value;
        this.previousSibling.previousSibling.oninput();
      }
    },
    options.secondaryInput || {}
  );
// debugger
  var hiddenInputAttributes = Object.assign(
    {
      type: "hidden",
      $dependentValue: function() {
        return this.value;
      },
    },
    options.hiddenInput || {}
  );

  var selectAttributes = Object.assign(
    {
      $init: function() { this.$checkSelection(); },
      onchange: function () {
        this.$checkSelection();
        this.previousSibling.oninput();
      },
      $checkSelection () {
        if ( this.value === "__USE_INPUT__" ) {
          if ( options.required ) {
            this.nextSibling.required = true;
          };
          this.removeAttribute("required");
          this.nextSibling.style.display = "";
          this.nextSibling.focus();
          this.previousSibling.value = this.nextSibling.value;
        } else {
          if ( options.required ) {
            this.required = true;
          };
          this.nextSibling.removeAttribute("required");
          this.nextSibling.style.display = "none";
          this.previousSibling.value = this.value;
        };
      }
    },
    options.input || {},
  );
// debugger
  return a.selectinput(
    [
      f.input(
        name,
        {
          value: options.value,
          attributes: hiddenInputAttributes
        }
      ),
      f.select( "", {
        collection: options.collection,
        placeholder: options.placeholder,
        // id: options.id,
        // required: options.collection.length > 2 ? options.required : false,
        value: selectValue,
        attributes: selectAttributes,
      } ),
      f.input( "", {
        attributes: inputAttributes
      } )
    ]
  );

};
