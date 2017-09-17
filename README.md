# express-easy-captcha
This is an express adapter for [easy-captcha-server](https://github.com/choelea/easy-captcha-server). 

# Installation
This is a [Node.js](https://nodejs.org/en/ "Node.js") module available through the [npm registry](https://www.npmjs.com/). Installation is done using the [npm install command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

    $ npm install express-easy-captcha

# Usage
## Simple Usage
    
If there isn't much place to check the captcha, below simple Usage is enough.

``` javascript
const express = require('express')

const router = express.Router()
const EasyCaptcha = require('express-easy-captcha')

const easyCaptcha = new EasyCaptcha({ serverUrl: 'http://localhost:4000' })
const easyCaptchaRequired = easyCaptcha.checkCaptcha()

router.post('/form', easyCaptchaRequired, (req, res) => {
  if (req.captchaError) {
    console.log(req.captchaError)
    return res.render('demo/form', { errCode: req.captchaError })
  }
  return res.redirect('/instant-quote/demo/success')
})

```

Only when something wrong happen, req.captchaError has below value:

- sysErr something should never happen
- codeWrong captcha text user typed is wrong
- codeExpired the given captcha is expired,  reminder user to refresh it

## Encapsulate and Reuse
Usually, there isn't just one request that needs to check captcha, and in case of this, it's better to create your own captcha utils/config to reuse the code.

#### Try to create an js file such as easyCaptchaClient.js

``` javascript
const EasyCaptcha = require('express-easy-captcha')

const easyCaptcha = new EasyCaptcha({ serverUrl: 'http://localhost:4000' })

easyCaptcha.captchaRequired = easyCaptcha.checkCaptcha()
module.exports = easyCaptcha

```
#### In your router js 

``` javascript
const easyCaptcha = require('../utils/easyCaptchaClient')
router.post('/form', easyCaptcha.captchaRequired, (req, res) => {
  if (req.captchaError) {
    console.log(req.captchaError)
    return res.render('demo/form', { errCode: req.captchaError })
  }
  return res.redirect('/instant-quote/demo/success')
})

```




    
