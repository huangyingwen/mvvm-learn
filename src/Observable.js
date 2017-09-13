import Depend from './Depend'

function Observable(options) {
  this._observers = []
  this._dep = new Depend()
  this.data = Object.assign({}, options.data, options.computed)
  this._observableData(this.data)
  this._subscribeWatchers(options.watch)
}

Observable.prototype._observableData = function (obj) {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) return

    if (typeof obj[key] === 'function') {
      this._makeComputed(obj, key)
    } else {
      this._makeReactive(obj, key)
    }
  }
}

Observable.prototype._makeReactive = function (obj, key) {
  let val = obj[key]
  let self = this
  let deps = []

  Object.defineProperty(obj, key, {
    get: function () {
      deps = self._dep.depend(deps, key)
      return val
    },
    set: function (newVal) {
      val = newVal
      self._nodifyObservers(key)

      self._dep.getValidDeps(deps, key).forEach(a => {
        self._nodifyObservers(a)
      })
    }
  })
}

Observable.prototype._makeComputed = function (obj, key) {
  let fun = obj[key]
  let self = this
  let val = null
  let deps = []

  self.subscribe(key, () => {
    val = null

    self._dep.getValidDeps(deps, key).forEach(a => {
      self._nodifyObservers(a)
    })
  })

  Object.defineProperty(obj, key, {
    get: function () {
      if (val) return val

      deps = self._dep.depend(deps, key)
      self._dep.setTarget(key)
      val = fun.apply(self.data)
      self._dep.setTarget(null)

      return val
    },
    set: function () {
      // Do nothing!
    }
  })
}

Observable.prototype._nodifyObservers = function (property) {
  if (!this._observers[property] || this._observers[property].length <= 0) return

  this._observers[property].forEach(handler => handler())
}

Observable.prototype._subscribeWatchers = function(watchers) {
  if (!watchers) return
  for (let key in watchers) {
    if (!this.data[key]) return
    if (watchers.hasOwnProperty(key) && typeof watchers[key] === 'function') {
      // We use Function.prototype.bind to bind our data model
      // as the new `this` context for our signal handler
      this.subscribe(key, watchers[key].bind(this))
    }
  }
}

Observable.prototype.subscribe = function (property, handler) {
  if (!this._observers[property]) this._observers[property] = []

  this._observers[property].push(handler)
}

export default Observable