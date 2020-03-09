app.logout = controller => (a,x) => app.http(
  '/~/session',
  ( result, el  ) => {
    el.$send( 'app.unauthenticated' )
    el.$nodes = a.$$.p(
      a.h3( "Logged out" ),
      app.btn(
        app.icon( "fas fa-sign-in-alt", "Login" ),
        () => controller.load( '/login' )
      )
    )
  },
  {
    method: 'delete',
  }
)