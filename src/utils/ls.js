export default class PROXY_LOCALSTORAGE {
  constructor(Prefix = 'PROXY_LOCALSTORAGE_') {
    this.Prefix = Prefix
    this.Observe = []
    init(this)
  }

  $set (key, val) {
    localStorage[this.Prefix + key] = JSON.stringify(val)
    if (!this.Observe.includes(key)) createReflectLS(this, key)
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
  })
}

window.ls = new PROXY_LOCALSTORAGE()
