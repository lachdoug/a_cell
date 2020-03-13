ax.extension.router = ( options={} ) => ( a,x ) => {

  let config = {
    scope: options.scope || '',
    default: options.default,
    home: options.home,
    lazy: options.lazy,
    transition: options.transition
  }

  let routes = options.routes || {}

  if ( options.home ) {
    if ( window.location.pathname.match( /^$|^\/$/ ) ) {
      window.history.replaceState( {}, 'Home', options.home )
    }
  }

  let routerTag = {

    id: options.id,

    $init: (el) => {

      const pop = () => el.$go()
      window.addEventListener( 'popstate', pop )
      el.$send( 'appkit.router.load', { detail: el.$location() } )

    },

    $nodes: function() {

      let controller = x.router.controller ( {
        router: [ this ],
        ...config,
      } )( this.$location() )

      if ( ax.is.function( routes ) ) {
        return routes( controller )
      } else {
        return controller.routes( routes )
      }

    },

    $go: function() {

      let location = this.$location()
      this.$load(
        location.path, location.query, location.anchor
      )

    },

    $open: function( path, query, anchor ) {

      if ( path[0] != '/' ) {
        path = config.scope + ( path ? `/${ path }` : '' )
      }

      this.$locate( path, query, anchor )

      this.$send( 'appkit.router.open', { detail: {
        path: path,
        query: query,
        anchor: anchor
      } } )

    },

    $locate: function( path, query, anchor ) {

      path = path || '/'

      // compact double dots /../ in path
      let match = path.match( /(^\/$|(\/\b\w+\b)(?!\/\.\.)|\/$)/g ) || []
      path = match.join('')

      query = x.lib.query.from.object( query )
      path = ( path || '/' ) + ( query ? '?' + query : '' ) + ( anchor ? '#' + anchor : '' )

      history.pushState( { urlPath: path },'', path )
      let event = new PopStateEvent( 'popstate', { urlPath: path } )
      dispatchEvent( event )

    },

    $location: function() {
      let location = window.location

      return {
        path: location.pathname,
        query: x.lib.query.to.object(
          location.search.slice(1)
        ),
        anchor: location.hash.slice(1)
      }

    },

    $load: function( path, query, anchor ) {

      let routes = x.lib.unnested( this, '|appkit-router-routes' )

      routes.forEach( (r) => {
        r.$load( path, query, anchor )
      } )

      this.$send( 'appkit.router.load', { detail: {
        path: path,
        query: query,
        anchor: anchor,
      } } )

    },

    ...options.routerTag

  }

  return a['|appkit-router']( null, routerTag )

}