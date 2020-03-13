ax.extension.form.async.shim = function() {

  let a = ax.a
  let x = ax.x

  return {

    form:  ( f, target ) => ( options={} ) => a['|appkit-asyncform']( [
      a['div|appkit-asyncform-result'](),
      a['|appkit-asyncform-body']( target( {
        ...options,
        formTag: {
          $controls: function() {
            return x.lib.unnested( this, '|appkit-form-control' )
          },
          $buttons: function() {
            return this.$$('button').$$
          },
          $disable: function() {
            let controls = [ ...this.$controls(), ...this.$buttons() ]
            for ( let i in controls ) {
              x.lib.element.visible( controls[i] ) &&
              controls[i].$disable &&
              controls[i].$disable()
            }
          },
          $enable: function() {
            let controls = [ ...this.$controls(), ...this.$buttons() ]
            for ( let i in controls ) {
              console.log( controls[i].$enable + '' )
              x.lib.element.visible( controls[i] ) &&
              controls[i].$enable &&
              controls[i].$enable()
            }
          },
          ...options.formTag,
          $on: {
            'submit: async submit': (e,el) => {

              e.preventDefault()

              let form = el.$('^form')
              let formData = el.$data()

              let submitter = el.$('[type="submit"]:focus')
              if ( submitter && submitter.name ) {
                formData.append( submitter.name, submitter.value )
              }

              el.$disable && el.$disable()

              let resultEl = el.$('^|appkit-asyncform |appkit-asyncform-result')
              let completeFn = () => {
                el.$enable && el.$enable()
                var windowTop = $(window).scrollTop();
                var windowBottom = windowTop + $(window).height();
                var resultTop = $(resultEl).offset().top;
                var resultBottom = resultTop + $(resultEl).height();
                if ( ( resultBottom > windowBottom ) || ( resultTop < windowTop ) ) {
                  resultEl.scrollIntoView()
                }
                el.$send( 'axf.appkit.form.async.complete' )
              }

              if( ax.is.function( options.action ) ) {

                let submit = {
                  formData: formData,
                  data: ax.x.lib.form.data.objectify( formData ),
                  formEl: el,
                  resultEl: resultEl,
                  completeFn: completeFn,
                  submitter: submitter,
                }

                options.action( submit ) && completeFn()

              } else {

                resultEl.$nodes = (a,x) => x.http( {
                  url: el.getAttribute( 'action' ),
                  body: formData,
                  method: el.getAttribute( 'method' ),
                  when: options.when,
                  success: options.success,
                  error: options.error,
                  catch: options.catch,
                  complete: completeFn,
                } )

              }

              // return false

            },
            ...( options.formTag || {} ).$on
          }

        },
      } ) ),
    ], options.asyncformTag ),

  }

}
