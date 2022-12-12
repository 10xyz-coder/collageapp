const SpeechRecog = window.webkitSpeechRecognition;

var recog = new SpeechRecog();
const textbox = document.getElementById("textbox")
const camera = document.getElementById("camera")
const snaps = ["take my selfie","take a photo","snap","click a picture","secret word"]

function start() {
  textbox.innerText = "";
  recog.start()
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function end(confidence) {
  if (confidence < 0.75) {
    console.log('Speech recognition has stopped due to low confidence.');
    recog.abort();
    alert("Please Try Again")
  }
}

recog.onresult = function(event) {
  console.log(event);

  var Content = event.results[0][0].transcript;
  var Confidence = event.results[0][0].confidence;
  if (Confidence >= 0.75) {
    console.log(Content);
    console.log(Confidence);
    textbox.innerText = Content;
    if (snaps.includes(Content.toLowerCase())) {
      speak();
    }
    return
  }
  end(Confidence)
}

async function speak() {
  var synth = window.speechSynthesis;
  speak_data = textbox.value;

  var utterThis = new SpeechSynthesisUtterance("Taking a selfie! in 5.");
  synth.speak(utterThis);
  Webcam.attach(camera)
  await sleep(5000);
  takeSnap()
}

Webcam.set({width:360,height:250,image_format:"png",png_quality:90})

function takeSnap() {
  Webcam.snap( function(data_uri) {
		document.getElementById('result').innerHTML = '<img id="result-img" src="'+data_uri+'"/>';
	} );
  Webcam.reset()
}

function saveSnap() {
  var link = document.getElementById("link");
  link.href = document.getElementById('result-img').src;
  link.click();
}