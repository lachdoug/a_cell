ax.extensions.icon = function( iconClass, sometext, options = {} ) {

// Options:
// tag: tagOptions added to fontawesome tag.
// itag: tagOptions added to i.
// spanTag: tagOptions added to span.
// reverse: true to put icon after text.
// compact: true to have no space between icon and text.

  var a = ax.a;

  var components = [
    a.span( { class: iconClass } )
  ];

  if ( sometext ) {
    if ( !options.compact ) components.push( " " );
    components.push( a.span( sometext ) );
  };

  if ( options.reverse ) {
    components.reverse();
  };

  return a.icon( components, options.tag );

};
