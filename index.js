const screenWidth = `${window.innerWidth * 0.8}px`;
const screenHeight = `${window.innerHeight * 0.8}px`;

const loader = document.getElementById("loader");
const form = document.getElementById("form");
const button = document.getElementById("button");
const message = document.getElementById("message");
const flattery = document.getElementById("flattery");
const video = document.querySelector("video");

video.style.width = screenWidth;
video.style.height = screenHeight;
video.onloadedmetadata = (e) => video.play();
flattery.style.width = screenWidth;
flattery.style.height = screenHeight;

async function onFormSubmitGorgeous(event) {
  event.preventDefault();
  button.disabled = true;
  video.classList.remove("hidden");
  flattery.classList.remove("hidden");

  const devices = await navigator.mediaDevices.enumerateDevices();

  // You'll need to specify your camera here
  // normally you'd use a drop down, but lol
  const myCamera = devices.find((device) => device.label.includes("C922"));

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: myCamera.deviceId },
    });

    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = "You look gorgeous!";
      flattery.innerHTML = utterance.text;
      window.speechSynthesis.speak(utterance);
    }, 1000);

    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = "Do you work out?";
      flattery.innerHTML = utterance.text;
      window.speechSynthesis.speak(utterance);
    }, 7000);

    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = "I love your hair.";
      flattery.innerHTML = utterance.text;
      window.speechSynthesis.speak(utterance);
    }, 17000);

    video.srcObject = stream;
    setTimeout(() => {
      video.classList.add("hidden");
      flattery.classList.add("hidden");
      flattery.innerHTML = "";
      button.disabled = false;
      stream.getTracks()[0].stop();
      message.innerHTML = "Done!";
    }, 20000);
  } catch (err) {
    console.log(err);
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  button.disabled = true;
  loader.classList.remove("hidden");
  setTimeout(() => {
    loader.classList.add("hidden");
    message.innerHTML = "Done!";
    button.disabled = false;
  }, 10000);
}

// form.addEventListener("submit", onFormSubmit);
form.addEventListener("submit", onFormSubmitGorgeous);
