const SpeechRecog = window.webkitSpeechRecognition;

var recog = new SpeechRecog();
const textbox = document.getElementById("textbox")

function start() {
  textbox.innerText = "";
  recog.start()
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
    return
  }
  end(Confidence)
}
