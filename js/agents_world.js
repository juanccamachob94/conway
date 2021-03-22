let AgentsWorld = function(numRows, numColumns, canvasWidth, canvasHeight) {
  this.worldCanvas = new WorldCanvas(canvasWidth, canvasHeight);
  this.numRows = numRows;
  this.numColumns = numColumns;
  this.cellXWidth = Math.floor(canvasWidth / numColumns);
  this.cellYWidth = Math.floor(canvasWidth / numRows);

  this.initGrid = function() {
    let i;
    let j;
    this.grid = new Array(this.numRows);
    for(i = 0; i < this.numRows; i++) {
      this.grid[i] = new Array(this.numColumns);
      for(j = 0; j < this.numColumns; j++)
        this.grid[i][j] = new Agent(this, i, j);
    }

    for(i = 0; i < this.numRows; i++)
      for(j = 0; j < this.numColumns; j++)
        this.grid[i][j].setNeighborhoods();
  }

  this.drawGrid = function() {
    let i;
    let j;

    // draw agents
    for(i = 0; i < numRows; i++)
      for(j = 0; j < numColumns; j++) {
        this.drawAgent(this.grid[i][j]);
      }

    // prepare the mutation on the next step
    for(i = 0; i < numRows; i++)
      for(j = 0; j < numColumns; j++)
        this.grid[i][j].calculateNextStatus();

    // mutate agents
    for(i = 0; i < numRows; i++)
      for(j = 0; j < numColumns; j++)
        this.grid[i][j].mutate();
  }

  this.update = function() {
    this.worldCanvas.clearCanvas();
    this.drawGrid();
  }

  this.drawAgent = function(agent) {
    this.worldCanvas.fillRect(
      agent.status == 1 ? '#FFF' : '#000',
      agent.x * this.cellXWidth,
      agent.y * this.cellYWidth,
      this.cellXWidth,
      this.cellYWidth
    )
  }
}
