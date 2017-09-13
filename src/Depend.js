function Depend() {
  this._currentTarget = null
  this._targets = []
  this._subs = {}
}

Depend.prototype.depend = function (deps, dep) {
  if (!this._currentTarget) return deps

  if (!this._subs[this._currentTarget].includes(dep)) {
    this._subs[this._currentTarget].push(dep)
  }

  if (!deps.includes(this._currentTarget)) {
    deps.push(this._currentTarget)
  }

  return deps
}

Depend.prototype.getValidDeps = function (deps, key) {
  return deps.filter(dep => this._subs[dep].includes(key))
}

Depend.prototype.setTarget = function (target) {
  if (target) {
    if (this._currentTarget) {
      this._targets.push(this._currentTarget)
    }

    this._currentTarget = target
    this._subs[target] = []
  } else if (this._targets.length) {
    this._currentTarget = this._targets.pop()
  } else {
    this._currentTarget = null
  }
}

export default Depend