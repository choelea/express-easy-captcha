'use strict'
const fetch = require('isomorphic-fetch')
const assign = require('object-assign')
const captchaCheck = require('./captchaCheck')

const defaults = {
    tokenName: 'sCap',
    captchaTextName: 'captchaText'
}


function EasyCaptcha(options) {
    if (!options || !options.serverUrl || !options.client || !options.secret) {
        throw new Error('serverUrl,client,secret is needed for easy captcha')
    }
    this.captchaOptions = assign({}, defaults, options)
}

EasyCaptcha.prototype.checkCaptcha = function () {
    return captchaCheck(this)
}

module.exports = EasyCaptcha