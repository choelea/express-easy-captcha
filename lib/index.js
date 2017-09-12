'use strict';
const fetch = require('isomorphic-fetch');
const assign = require('object-assign');

const defaults = {
    tokenName: 'sCap',
    captchaTextName: 'captchaT'
};

module.exports = easyCaptcha;

function easyCaptcha(options) {
    if (!options || !options.serverUrl) {
        throw new Error('serverUrl is needed for easy captcha')
    }
    const captchaOptions = assign({}, defaults, options);
    return function checkCaptcha(req, res, next) {
        fetch(options.serverUrl + '/captcha/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: { sCap: req.body[captchaOptions.tokenName], captchaText: req.body[captchaOptions.captchaTextName] },
        })
            .then(response => response.json())
            .then(json => {
                if (json.success) {
                    next()
                } else {
                    throw new Error(json.err)
                }
            })
            .catch(err => {
                throw new Error(err.message)
            })
    };
}