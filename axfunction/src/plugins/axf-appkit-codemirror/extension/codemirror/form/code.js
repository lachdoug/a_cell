/**
 * Creates ax object for a CodeMirror instance.
 *
 * @example
 * f.codemirror( {
 *   name: "script",
 *   mode: "ruby",
 *   value: "[1,2,3].map &:to_s"
 * } ),
 * @param {object} options
 * @param {(string|boolean)} options.disabled The default value for the disabled= attribute. Note that the disabled attribute can be changed by the $disable method. The $enable method, when it's called, refers to options.disabled and if not set the disabled attribute is removed from the element.
 * @param {(string|object)} options.mode The CodeMirror language mode. If string, the mode will be set to the value. If object, used as options for a mode <select>.
 * @param {string} options.name The value for the name= attribute on the CodeMirror <textarea>.
 * @param {(string|boolean)} options.required The value for the required= attribute on the CodeMirror <textarea>.
 * @param {(object|array)} options.value The content of the <textarea>.
 *
 * @return {object} ax object
 */

ax.extension.codemirror.form.code = function(
  f, options={}
) {

  let a = ax.a
  let x = ax.x
  let form = x.codemirror.form

  return a['appkit-form-codemirror-code'](
    [
      form.code.toolbar( f, options ),
      form.code.editor( f, options ),
    ],
    {
      $setMode: function() {
        this.$('textarea')[0].$codemirror.setOption(
          "mode",
          this.querySelector( "appkit-form-codemirror-code-mode" ).$value()
        )
      },
      $value: function() {
        return this.$('textarea')[0].$codemirror.getValue()
      },
      $focus: function () {
        this.$('textarea')[0].$codemirror.focus()
      },
      $disable: function() {
        this.$('textarea')[0].$disable()
      },
      $enable: function() {
        if ( !options.disabled ) this.$('textarea')[0].$disable()
      },
    }
  )

}