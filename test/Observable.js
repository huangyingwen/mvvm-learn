import Observable from '../src/Observable'

describe('Observable', function (done) {
  it('创建可观察属性', function (done) {
    function Data(name, age) {
      this.name = name
      this.age = age
    }

    Data.prototype.kk = 'kkk'

    let data = new Data('小胖子', '25')
    let observable = new Observable(data)

    let name = '黑胖子'

    observable.subscribe('name', () => {
      expect(observable.data.name).to.be.equal(name)
    })

    observable.subscribe('name', val => {
      expect(observable.data.name).to.be.equal(name)
      done()
    })

    observable.data.name = name
    observable.data.age = 30
  })

  it('创建计算属性', function (done) {
    let observable = new Observable({
      firstName: '小',
      lastName: '可爱',
      fullName: function () {
        return this.firstName + this.lastName
      }
    })
    
    expect(observable.data.fullName).to.be.equal(observable.data.firstName + observable.data.lastName)
    done()

    let lastName = '胖子'

    observable.subscribe('lastName', val => {
      expect(observable.data.lastName).to.be.equal(observable.data.lastName)
    })

    observable.subscribe('fullName', val => {
      expect(observable.data.fullName).to.be.equal(observable.data.firstName + observable.data.lastName)
      done()
    })

    observable.data.lastName = lastName

    expect(observable.data.fullName).to.be.equal(observable.data.firstName + observable.data.lastName)

    observable.data.fullName = '小可爱'

    expect(observable.data.fullName).to.not.equal('小可爱')
  })
})