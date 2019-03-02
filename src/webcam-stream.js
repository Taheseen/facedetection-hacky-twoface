/*
const WebSocket = require('isomorphic-ws')

const ws = new WebSocket('ws://localhost:9090/');

ws.onopen = function open() {
    console.log('connected');
    ws.send(Date.now());
  };
  
  ws.onclose = function close() {
    console.log('disconnected');
  };
  
  ws.onmessage = function incoming(data) {
    console.log(`Roundtrip time: ${Date.now() - data} ms`);
  
    setTimeout(function timeout() {
      ws.send(Date.now());
    }, 500);
  };
*/
const Http = new XMLHttpRequest();
const url = "https://6rf5looa86.execute-api.eu-west-1.amazonaws.com/prod/twoface?key=key&value=value";

Http.open("GET", url);
Http.send();

Http.onreadystatechange = function() {
  if (this.readyState==4 && this.status==200) {
    console.log(Http.responseText);
  } else {
    console.error("NOOOOOOO");
  }
}

var video = document.querySelector("#videoElement");
 
if (navigator.mediaDevices.getUserMedia) {       
    navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false})
  .then(function(stream) {
    video.srcObject = stream;
  })
  .catch(function(error) {
    console.log("Something went wrong!");
  });
}

