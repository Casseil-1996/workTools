export default class PROXY_LOCAL_STORAGE {
  constructor (Prefix = 'PROXY_LOCAL_STORAGE_') {
    this.Prefix = Prefix
    this.Observe = []
    init(this)
  }

  $set (key, val) {
    if (typeof key === 'object')
      return Object.keys(key).forEach(k => { this.$set(k, key[k]) })

    localStorage[this.Prefix + key] = JSON.stringify(val)
    if (!this.Observe.includes(key)) createReflectLS(this, key)
  }

  $del (...keyArr) {
    keyArr.forEach(key => {
      localStorage.removeItem(key)
      const idx = this.Observe.indexOf(key)
      if (idx !== -1) this.Observe.splice(idx, 1)
      delete this[key]
    })
  }

  get (key) {
    return this[key]
  }

}

function init (ls) {
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(ls.Prefix)) {
      createReflectLS(ls, key.slice(ls.Prefix.length))
    }
  })
}

function createReflectLS (ls, key) {
  ls.Observe.push(key)
  Object.defineProperty(ls, key, {
    get () {
      return JSON.parse(localStorage[ls.Prefix + key])
    },
    set (val) {
      localStorage[ls.Prefix + key] = JSON.stringify(val)
    },
    configurable: true,
  })
}

