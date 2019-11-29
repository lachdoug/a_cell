ax.extension.report.factory.
output = function( options={} ) {

  let a = ax.a
  let x = ax.x

  let value = options.value || null
  let type = options.type || 'string'

  if ( type ) {
    value = x.lib.coerce[ type ]( value )
  }

  let outputTagOptions = {
    name: options.name,
    type: options.type,
    $text: value,
    ...options.outputTag
  }

  return a['|appkit-report-output']( outputTagOptions )

}