function Observable(dataObj) {
  this._observers = []
  this.data = dataObj
  this._observableData(this.data)
}

Observable.prototype._observableData = function (obj) {
  for (let key in obj) {
    if (!obj.hasOwnProperty(key)) return

    this._makeReactive(obj, key)
  }
}

Observable.prototype._makeReactive = function (obj, key) {
  let val = obj[key]
  let self = this

  Object.defineProperty(obj, key, {
    get: function () {
      return val
    },
    set: function (newVal) {
      val = newVal
      self._nodifyObservers(key, newVal)
    }
  })
}

Observable.prototype._nodifyObservers = function (property, value) {
  if (!this._observers[property] || this._observers[property].length <= 0) return

  this._observers[property].forEach(handler => handler(value))
}

Observable.prototype.subscribe = function (property, handler) {
  if (!this._observers[property]) this._observers[property] = []

  this._observers[property].push(handler)
}

export default Observable