ax.extension.appkit.form.factory.
checkboxes = (f) => function(
  options={}
) {

  let a = ax.a
  let x = ax.x
  let f = this
  let lib = ax.x.appkit.lib.form

  let name = lib.collection.name( options.name )
  let value = lib.collection.value( options.value )
  let collection = lib.collection.from( options.collection )

  let checkboxes = collection.map( function( checkbox, i ) {

    let checkOptions = options.check
    if ( typeof checkOptions === "function" ) {
      checkOptions = checkOptions( checkbox, i )
    }

    return f.check( {
      name: name,
      value: lib.collection.includes( value, checkbox.value ) ? checkbox.value : "",
      disabled: checkbox.disabled,
      checked: checkbox.value,
      label: checkbox.label,
      ...checkOptions
    } )

  } )

  // Add <input> for dependent value matching
  checkboxes.unshift(
    f.input( {
      name: name,
      type: "hidden",
      disabled: true,
      inputTag: { $value: function () {
        return this.closest('appkit-form-checkboxes').$value()
      } },
    } )
  )

  let checkboxesTag = {
    $value: function() {
      let checked = Array.from( this.querySelectorAll('input:checked') )
      // debugger
      return checked.map(
        function( option ) {
          return option.value
        }
      )
    },
    $focus: function () {
      this.$('input')[0].focus()
    },
    $disable: function() {
      this.querySelectorAll('input').
        forEach( function( check ) { check.$disable() } )
    },
    $enable: function() {
      if ( !options.disabled ) this.querySelectorAll('input').
        forEach( function( check ) { check.$enable() } )
    },
    ...options.checkboxesTag
  }

  return a['appkit-form-checkboxes']( checkboxes, checkboxesTag )

}