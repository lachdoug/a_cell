app.namespaces.show = controller => (a,x) => [

  app.http(
    `/~/namespaces/${ controller.params.namespace_id }/readme`,
    ( readme, el ) => el.$nodes = [

      a['div.clearfix']( [
        app.button( {
          label: app.icon( 'fa fa-caret-right', 'License' ),
          title: 'License',
          onclick: (e,el) => {
            controller.open( 'license' )
          }
        } ),
        app.button( {
          label: app.icon( 'fa fa-caret-right', 'Definitions' ),
          title: 'Definitions',
          onclick: (e,el) => {
            controller.open( 'definitions' )
          }
        } ),
        app.button( {
          label: app.icon( 'fa fa-caret-right', 'Workspace' ),
          title: 'Workspace',
          onclick: (e,el) => {
            controller.open( 'workspace' )
          }
        } ),
        a['div.btn-group.float-right']( [
          app.button( {
            label: app.icon( 'fas fa-file-download', 'Pull' ),
            title: 'Pull namespace',
            onclick: (e,el) => {
              controller.open( 'pull' )
            }
          } ),
          app.up( controller, 'Return to namespaces' ),

        ] ),
      ] ),

      a.p( readme.content ?
        app.md( readme.content ) :
        a['.error']( 'No readme!' ),
        { class: 'border border-light p-2' }
      ),

      a['div.clearfix']( a['div.btn-group.float-right'](
        app.button( {
          label: app.icon( 'fa fa-trash', 'Delete' ),
          class: 'btn btn-outline-danger app-btn',
          onclick: (e,el) => {
            controller.open( 'delete' )
          },
          title: 'Delete namespace',
        } ),
      ) ),
    ],
    {
      placeholder: a.p(
        app.hourglass( 'Loading namespace' )
      )
    }
  ),

]