ax.extension.form.field.shim.
control = function( f, options={} ) {

  let a = ax.a
  let x = ax.x

  let as = ( options.as || '' ).split( '/' )
  let control = options.control || as[0] || 'input'
  let type = options.type || as[1]

  let controlFn = f.controls[control]
  if ( !controlFn ) ax.throw( `Form field factory does not support control '${ control }'.` )

  let key = options.key || ''

  options.name = options.name || ( f.scope ?
    `${ f.scope }[${ key }]` :
    key )

  let object = f.object || {}
  if ( ax.is.not.undefined( object[key] ) ) {
    options.value = object[key]
  }

  let controlOptions = {
    ...options,
    type: type,
    ...options[control]
  }

  if ( options.collection ) {
    return x.form.field.shim.field.collection( f, controlFn, controlOptions )
  } else {
    return controlFn( controlOptions )
  }

}