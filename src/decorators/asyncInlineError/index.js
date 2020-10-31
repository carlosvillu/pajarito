export const asyncInlineError = () =>
  function(Target, name, descriptor) {
    const {value: fn} = descriptor

    return Object.assign(
      {},
      {
        set(value) {
          Object.defineProperty(this, name, {value}) // eslint-disable-line
          return value
        },
        get() {
          const self = this
          async function _inlineError() {
            let response
            try {
              response = await fn.apply(self, arguments)
              return [null, response]
            } catch (error) {
              return [error, null]
            }
          }

          Object.defineProperty(this, name, {value: _inlineError}) // eslint-disable-line

          return _inlineError
        }
      }
    )
  }
