
const $registerForm = document.querySelector('#js-register-form')
const $sendNotificationForm = document.querySelector('#js-send-notification-form')

$registerForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const { token } = e.target
  fetch('http://54.237.154.126:3002/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: token.value
    })
  })
    .then(response => response.json())
    .catch(e => console.warn(e))
})

$sendNotificationForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const { message, arn } = e.target
  fetch('http://54.237.154.126:3002/arn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: message.value,
      arn: arn.value
    })
  })
    .then(response => response.json())
    .catch(e => console.warn(e))
})
