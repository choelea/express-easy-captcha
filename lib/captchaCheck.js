module.exports = function (easyCaptcha) {
    return function checkCaptcha(req, res, next) {
        const opt = easyCaptcha.captchaOptions
        fetch(`${opt.serverUrl}/captcha/verify?client=${opt.client}&secret=${opt.secret}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sCap: req.body[easyCaptcha.captchaOptions.tokenName], captchaText: req.body[easyCaptcha.captchaOptions.captchaTextName] }),
        })
            .then(response => response.json())
            .then(json => {
                if (json.err)
                    req.captchaError = json.err
                next()
            })
            .catch(err => {
                req.captchaError = 'sysErr'
                next()
            })
    }
}