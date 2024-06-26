const video = document.createElement("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const captureBtn = document.getElementById("capture");
const stopBtn = document.getElementById("stop");
const downloadBtn = document.getElementById("dl");
let stream = null;

captureBtn.onclick = async function() {
  if (stream == null || video.srcObject.active == false) {
    stream = await navigator.mediaDevices.getUserMedia({
      video: true
    });
    video.srcObject = stream;
    await video.play();
  }

  canvas.style.border = '2px solid black';
  canvas.height = video.videoHeight;
  canvas.width = video.videoWidth;
  ctx.drawImage(video, 0, 0);
  stopBtn.removeAttribute("disabled");
  downloadBtn.removeAttribute("disabled");
}

stopBtn.onclick = function() {
  stream.getTracks().forEach(track => track.stop());
  stopBtn.setAttribute("disabled", "");
}

downloadBtn.onclick = function() {
  const link = document.createElement('a');
  link.download = 'selfy.png';
  link.href = document.getElementById('canvas').toDataURL()
  link.click();
}
