let WorldCanvas = function(width, height) {
  this.canvas = document.getElementById('canvas');
  this.canvas.width = width;
  this.canvas.height = height;
  this.context = this.canvas.getContext('2d');

  this.clearCanvas = function() {
    canvas.width = canvas.width;
    canvas.height = canvas.height;
  }

  this.fillRect = function(color, x, y, width, height) {
    this.context.fillStyle = color;
    this.context.fillRect(x, y, width, height);
  }
}
