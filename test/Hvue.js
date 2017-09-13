import Hvue from '../src/Hvue'

describe('model binding view', function (done) {

  let root = document.createElement('div')
  let App

  before(function () {
    root.innerHTML = '\
      <div id="app">\
        <h1 s-text="title"></h1>\
        <input type="text" id="title" placeholder="Enter title" s-model="title">\
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

  it('view s-text binding model', function (done) {
    expect(document.querySelector('h1').textContent).to.be.equal(App.data.title)

    App.data.title = '黑胖子'
    setTimeout(() => {
      expect(document.querySelector('h1').textContent).to.be.equal(App.data.title)
      done()
    })
  })

  it('view s-model binding model', function(done){
    let titleInput = document.getElementById('title')
    expect(titleInput.value).to.be.equal(App.data.title)

    titleInput.value = '小可爱'
    titleInput.dispatchEvent(new Event('input'))

    expect(titleInput.value).to.be.equal(App.data.title)
    expect(App.data.title).to.be.equal('小可爱')
    done()
  })
})