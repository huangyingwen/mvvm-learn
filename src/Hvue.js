import Observable from './Observable'

function Hvue(options) {
  this._observable = new Observable(Object.assign({}, options.data, options.computed))
  this.data = this._observable.data
  this.el = options.el
  this.root = document.querySelector(this.el)

  this._parseDOM(this.root, this._observable.data)
}

Hvue.prototype._parseDOM = function (root, observableData) {
  const nodes = root.querySelectorAll('[s-text]')
  const nodesModel = root.querySelectorAll('[s-model]')

  for (const node of nodes) {
    this._syncNode(node, observableData, node.attributes['s-text'].value)
  }

  for (const node of nodesModel) {
    this._syncNodeModel(node, observableData, node.attributes['s-model'].value)
  }
}

Hvue.prototype._syncNode = function (node, observableData, property) {
  node.textContent = observableData[property]
  // We remove the `Seer.` as it is now available for us in our scope.
  this._observable.subscribe(property, () => node.textContent = observableData[property])
}

Hvue.prototype._syncNodeModel = function (node, observableData, property) {
  node.value = observableData[property]
  this._observable.subscribe(property, () => node.value = observableData[property])

  node.addEventListener('input', e => {
    observableData[property] = e.target.value
  })
}

export default Hvue