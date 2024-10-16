/* eslint-disable camelcase */
const video = document.getElementById('video')

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    (stream) => {
      video.srcObject = stream
    },
    (err) => {
      console.error(err)
    }
  )
}
startVideo()

video.onloadeddata = async () => {
  const { idUser } = JSON.parse(localStorage.getItem('user'))
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  context.drawImage(video, 0, 0, canvas.width, canvas.height)
  const dataURL = canvas.toDataURL('image/png')

  const response = await fetch('http://127.0.0.1:8000/biometric', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ idUser, biometric_ref: dataURL })
  })

  console.log(await response.json())
}
