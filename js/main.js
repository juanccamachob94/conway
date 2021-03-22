function init() {
  _this = this
  agentsWorld = new AgentsWorld(250, 250, 500, 500);
  agentsWorld.initGrid();
  setInterval(function() { _this.agentsWorld.update(); }, 100 / 3);
}
