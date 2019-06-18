
function isRealNumber(num, max=Infinity) {
  return (
    num >= 0 &&
    num <= max &&
    parseInt(num) === num
  )
}

class WatchedArray {

  constructor(arr) {
    this.arr = arr
    this.record = []

    this.proxy = new Proxy(this.arr, {
      get: (target, property) => {
        if (isRealNumber(property, this.arr.length))
          this.record.push([property, 'get'])
        return target[property]
      },

      set: (target, property, value, receiver) => {
        target[property] = value
        if (isRealNumber(property, this.arr.length))
          this.record.push([property, 'set'])
        return true
      }
    })

    return this
  }

}

