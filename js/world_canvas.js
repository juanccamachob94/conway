let WorldCanvas = function(width, height) {
  this.canvas = document.getElementById('canvas');
  this.canvas.width = width;
  this.canvas.height = height;
  this.context = this.canvas.getContext('2d');

  this.clearCanvas = function() {
    canvas.width = canvas.width;
    canvas.height = canvas.height;
  }
}
