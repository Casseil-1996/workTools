import Vue from 'vue'
import $utils, { PROXY_LOCAL_STORAGE } from './utils'
import * as $request from './request'
import dayjs from 'dayjs'

Vue.prototype.$utils = $utils

const ls = new PROXY_LOCAL_STORAGE()
Vue.prototype.ls = window.ls = ls

Vue.prototype.$request = $request
if (ls.token) { $request.setToken(ls.token) }

Vue.prototype.toFullScreen = (dom = window.document.querySelector('#app')) => {
    const keyArr = ['requestFullscreen', 'webkitRequestFullScreen', 'mozRequestFullScreen', 'msRequestFullscreen']
    for (let i = 0; i < keyArr.length; i++) {
        const key = keyArr[i]
        if (dom[key]) return dom[key]()
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
        eventWatcher[currentEventID],
    )
    return currentEventID++
}

Vue.prototype.stopWatchScreenStatus = (eventID) => {
    document.removeEventListener(
        'fullscreenchange',
        eventWatcher[eventID],
    )
}


Vue.filter('day', (val, format = 'YYYY/MM/DD HH:mm:ss') => {
    if (!val) return '/'
    return dayjs(val).format(format)
})
