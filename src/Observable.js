function Observable(dataObj) {
  this._observers = []
  this.data = dataObj
  this._observableData(this.data)
  this._dep = null
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
      if (this._dep && !deps.includes(this._dep)) deps.push(this._dep)
      return val
    },
    set: function (newVal) {
      val = newVal
      self._nodifyObservers(key)

      deps.forEach(a => {
        self._nodifyObservers(a)
      })
    }
  })
}

Observable.prototype._makeComputed = function (obj, key) {
  let fun = obj[key]
  let self = this
  let val

  self.subscribe(key, () => val = null)

  Object.defineProperty(obj, key, {
    get: function () {
      if (val) return val

      this._dep = key
      val = fun.apply(self.data)
      this._dep = null
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

Observable.prototype.subscribe = function (property, handler) {
  if (!this._observers[property]) this._observers[property] = []

  this._observers[property].push(handler)
}

export default Observable