function start() {
  console.log("before timeout call");
  setTimeout(timeOut, 0);
  console.log("after timeout call");
  end();
}

function timeOut() {
  console.log("in timeout!");
}

function end() {
  console.log("end?");
}


start();