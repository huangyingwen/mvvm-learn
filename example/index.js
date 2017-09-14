let App = new Hvue({
  el: '#app',
  data: {
    title: '小胖子',
    firstName: '猪',
    lastName: '三胖',
    age: 25
  },
  computed: {
    fullName: function() {
      if (this.firstName.length > 5) {
        return this.firstName
      }
      return this.firstName + ' ' + this.lastName
    },
    fullNameLength: function() {
      return this.fullName.length + this.title.length
    }
  }
})

function resetTitle() {
  App.data.title = "小胖子"
}