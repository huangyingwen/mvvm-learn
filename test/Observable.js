import Observable from '../src/Observable'

describe('Object.defineProperty 拦截', function(done) {

  let observable

  function Data(name, age) {
    this.name = name
    this.age = age
  }

  Data.prototype.kk = 'kkk'

  let data = new Data('小胖子', '25')
  
  beforeEach(function() {
    observable = new Observable(data) 
  })

  it('observable.data.name 应该为 ‘小胖子’', function() {
    expect(observable.data.name).to.be.equal('小胖子')
  })
  
  it('修改 name 为 ‘黑胖子’，应该拦截到 name 改变成 ‘黑胖子’', function(done) {
    let name = '黑胖子'

    observable.subscribe('name', val => {
      expect(val).to.be.equal(name)
    })

    observable.subscribe('name', val => {
      expect(val).to.be.equal(name)
      done()
    })

    observable.data.name = name
    observable.data.age = 30
  })

})
