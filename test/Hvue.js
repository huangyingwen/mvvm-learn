import Hvue from '../src/Hvue'

describe('model binding view', function (done) {

  let root = document.createElement('div')
  let App

  before(function () {
    root.innerHTML = '\
      <div id="app">\
        <h1 s-text="title"></h1>\
      </div>'

    document.body.appendChild(root)
  })

  beforeEach(function () {
    App = new Hvue({
      el: '#app',
      data: {
        title: '小胖子'
      }
    })
  })

  it('修改 model title 为 ‘黑胖子’，view h1 text 应该为 ‘黑胖子’', function (done) {
    expect(document.querySelector('h1').textContent).to.be.equal(App.data.title)

    App.data.title = '黑胖子'
    setTimeout(() => {
      expect(document.querySelector('h1').textContent).to.be.equal(App.data.title)
      done()
    })
  })
})