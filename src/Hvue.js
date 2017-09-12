import Observable from './Observable'

function Hvue(options) {
  this._observableData = new Observable(options.data)
  this.data = this._observableData.data
  this.el = options.el
  this.root = document.querySelector(this.el)

  this._parseDOM(this.root, this._observableData.data)
}

Hvue.prototype._parseDOM = function (root) {
  const nodes = root.querySelectorAll('[s-text]')

  for (const node of nodes) {
    this._syncNode(node, node.attributes['s-text'].value)
  }
}

Hvue.prototype._syncNode = function (node, property) {
  node.textContent = this.data[property]
  // We remove the `Seer.` as it is now available for us in our scope.
  this._observableData.subscribe(property, value => node.textContent = this.data[property])
}

export default Hvue