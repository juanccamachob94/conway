const N_NEIGHBORHOOD_TO_MUTATE = 3;

let Agent = function(agentsWorld, x, y) {
  this.x = x;
  this.y = y;
  this.status = Math.floor(Math.random() * 2); // alive = 1, dead = 2
  this.nextStatus = status;
  this.agentsWorld = agentsWorld;

  this.neighborhoods = [];

   // to execute the mutation
  this.setNeighborhoods = function() {
    let i;
    let j;
    let xNeighborhood;
    let yNeighborhood;

    for(i = -1; i < N_NEIGHBORHOOD_TO_MUTATE - 1; i++)
      for(j = -1; j < N_NEIGHBORHOOD_TO_MUTATE - 1; j++) {
        xNeighborhood = (this.x + i + this.agentsWorld.numRows) % this.agentsWorld.numRows;
        yNeighborhood = (this.y + j + this.agentsWorld.numColumns) % this.agentsWorld.numColumns;

        if(i != 0 || j != 0)// ignore self agent as agent neighborhood
          this.neighborhoods.push(this.agentsWorld.grid[xNeighborhood][yNeighborhood]);
      }
  }

  this.calculateNextStatus = function() {
    let sum = 0;
    // alive neighborhood
    for(let i = 0; i < this.neighborhoods.length; i++)
      sum += this.neighborhoods[i].status;

    if(sum == N_NEIGHBORHOOD_TO_MUTATE) {
      this.nextStatus = 1; //reproduction
    } else if(sum < N_NEIGHBORHOOD_TO_MUTATE - 1 || sum > N_NEIGHBORHOOD_TO_MUTATE) {
      this.nextStatus = 0; // death
    } else
      this.nextStatus = this.status; // keep
  }

  this.mutate = function() {
    this.status = this.nextStatus;
  }
}
