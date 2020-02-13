cc.tree = data => (a,x) => a['div.tree'](
  a.ul( cc.tree.branch( data ) )
)

cc.tree.branch = data => (a,x) => a.li( [

  cc.button( {
    label: a['button-icon-toggler']( {
      $state: false,
      $nodes: ( el, state ) => app.icon(
        `fa fa-caret-${ state ? 'down' : 'right' }`,
        data.name
      ),
      $toggle: function() {
        this.$state = !this.$state
      },
    } ),
    onclick: (e,el) => {
      x.lib.animate.fade.toggle( el.nextSibling )
      el.$('button-icon-toggler').$toggle()
    }
  } ),

  a.ul( [
    a.li( [ data.content ] ),
    data.children.map( child => a.li( cc.tree.branch( child ) ) ),
  ], {
    style: { display: 'none' },
  } ),

] )