import Observable from '../src/Observable'

describe('Observable', function (done) {
  it('创建可观察属性', function (done) {
    function Data(name, age) {
      this.name = name
      this.age = age
    }

    let data = new Data('小胖子', '25')
    let observable = new Observable({
      data
    })

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
      data: {
        firstName: '小',
        lastName: '可爱'
      },
      computed: {
        fullName: function () {
          return this.firstName + this.lastName
        }
      }
    })

    expect(observable.data.fullName).to.be.equal(observable.data.firstName + observable.data.lastName)

    observable.data.fullName = '猪猪'
    expect(observable.data.fullName).to.not.equal('猪猪')

    let lastName = '胖子'

    observable.subscribe('fullName', val => {
      expect(observable.data.fullName).to.be.equal(observable.data.firstName + observable.data.lastName)
      done()
    })

    observable.data.lastName = lastName
  })

  it('创建计算属性-去除无用的依赖', function (done) {
    let observable = new Observable({
      data: {
        a: 9,
        b: 14
      },
      computed: {
        c: function () {
          if (this.a > 10) {
            return this.a
          } else {
            return this.b
          }
        }
      }
    })

    let c = observable.data.c
    observable.data.a = 11
    c = observable.data.c

    let hasDepends = false

    observable.subscribe('c', () => {
      hasDepends = true
    })

    observable.data.b = 20

    setTimeout(() => {
      expect(observable.data.c).to.be.equal(observable.data.a)
      expect(hasDepends).to.be.false
      done()
    })
  })

  it('创建计算属性-计算属性依赖计算属性', function (done) {
    let observable = new Observable({
      data: {
        a: 9,
        b: 14,
        c: 15
      },
      computed: {
        d: function () {
          return this.a + this.b
        },
        e: function () {
          return this.c + this.d
        }
      }
    })

    let e = observable.data.e

    observable.subscribe('e', () => {
      expect(observable.data.d).to.be.equal(observable.data.a + observable.data.b)
      expect(observable.data.e).to.be.equal(observable.data.c + observable.data.a + observable.data.b)
      done()
    })

    observable.data.a = 10
  })

  it('创建观察属性', function (done) {
    function Watch() {
      this.a = function () {
        this.data.b = 17
        expect(observable.data.b).to.be.equal(17)
        done()
      }

      this.a1 = function() {

      }

      this.k = 1
    }

    Watch.prototype.b = function() {

    }

    let observable = new Observable({
      data: {
        a: 9,
        b: 14
      },
      watch: new Watch()
    })

    observable.data.a = 10
  })
})