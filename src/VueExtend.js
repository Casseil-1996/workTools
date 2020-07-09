import Vue from 'vue'
import $utils, { ls } from './utils'
import * as $request from './request'

Vue.prototype.$utils = $utils
Vue.prototype.ls = new ls()
Vue.prototype.$request = $request

Vue.prototype.toFullScreen = (dom = window.document.querySelector('#app')) => {

    if (dom.requestFullscreen) {

        return dom.requestFullscreen()

    } else if (dom.webkitRequestFullScreen) {

        return dom.webkitRequestFullScreen()

    } else if (dom.mozRequestFullScreen) {

        return dom.mozRequestFullScreen()

    } else {

        return dom.msRequestFullscreen()

    }
}

Vue.prototype.exitFullScreen = () => {
    return window.document.exitFullscreen()
}

Vue.prototype.$toggleFullScreen = (dom = window.document.querySelector('#app')) => {
    return document.fullscreenElement ? Vue.prototype.exitFullScreen() : Vue.prototype.toFullScreen(dom)
}

const ScreenWatcher = (trueCB, falseCB) => {
    return () => {
        if (document.fullscreenElement) {
            trueCB()
        } else {
            falseCB()
        }
    }
}

let eventWatcher = {}
let currentEventID = 0

Vue.prototype.watchScreenStatus = (fn1, fn2) => {
    eventWatcher[currentEventID] = ScreenWatcher(fn1, fn2)
    document.addEventListener(
        'fullscreenchange',
        eventWatcher[currentEventID]
    )
    return currentEventID++
}

Vue.prototype.stopWatchScreenStatus = (eventID) => {
    document.removeEventListener(
        'fullscreenchange',
        eventWatcher[eventID]
    )
}

// Vue.prototype.ls = (key) => {
//     if (!localStorage[key]) return
//     return JSON.parse(localStorage[key])
// }
// Vue.prototype.ls.set = (key, val) => {
//     return new Promise((resolve, reject) => {
//         try {
//             localStorage[key] = JSON.stringify(val)
//             resolve(Vue.prototype.ls(key))
//         } catch (error) {
//             reject(error)
//         }
//     })
// }
// Vue.prototype.ls.push = (key, val) => {
//     return new Promise((resolve, reject) => {
//         try {
//             const originArr = Vue.prototype.ls(key) || []
//             originArr.push(val)
//             localStorage[key] = JSON.stringify(originArr)
//             resolve(Vue.prototype.ls(key))
//         } catch (error) {
//             reject(error)
//         }
//     })
// }
