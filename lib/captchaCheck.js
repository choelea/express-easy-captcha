module.exports = function (easyCaptcha) {
    return function checkCaptcha(req, res, next) {
        fetch(easyCaptcha.captchaOptions.serverUrl + '/captcha/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sCap: req.body[easyCaptcha.captchaOptions.tokenName], captchaText: req.body[easyCaptcha.captchaOptions.captchaTextName] }),
        })
            .then(response => response.json())
            .then(json => {
                if (json.success) {

                } else {
                    req.captchaError = json.err
                    next()
                }
            })
            .catch(err => {
                req.captchaError = err
                next()
            })
    }
}