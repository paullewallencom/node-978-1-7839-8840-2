function init() {
  var link = document.getElementById("clickEl");

  link.addEventListener("click", function changeColor() {
    this.style.color = "red";
  });
}

init();