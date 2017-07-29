var Teleportable = pc.createScript('teleportable');

Teleportable.prototype.initialize = function() {
  this.lastTeleportFrom = null;
  this.lastTeleportTo = null;
  this.lastTeleport = Date.now();
  this.startPosition = this.entity.getPosition().clone();
};

Teleportable.prototype.update = function(dt) {
  var pos = this.entity.getPosition();

  // when the player falls off: game over
  if (pos.y < -4 && this.entity.name === 'Player') {
    this.teleport(this.lastTeleportFrom, this.lastTeleportTo);

    var targetDiv = document.querySelector('body > div.container');
    targetDiv.style.display = 'block';
      
    this.entity.sound.play("wilhelm");
    
      
              //!!!!!!!!!!!!!!!!!!!!!!!!!!Juancarlos & Sean Look Here!!!!
        // if this player has a last collision property then_>
          //increment a point to the player of data.id.lastcollision in database
            //elsewhere the scoreboard should see that change
              //create scoreboard render and logic....to be continued...
                
        this.app.fire('gameover');
          //delete this user from database entirely 
            // unsure if we are going to delete player by id or by username????
              //Sean thinks ID is easier, Juancarlos thinks name will have better implications long run 
                // and be relevant to in game name badges....
      
      
  } else if (pos.y < -4) {
    this.entity.sound.play("wilhelm");
  }
};

Teleportable.prototype.teleport = function(from, to) {
  if (from && (Date.now() - this.lastTeleport) < 500) {
    return;
  }

  this.lastTeleport = Date.now();

  // update object's teleport 'history' to reflect  
  // teleport about to happen
  this.lastTeleportFrom = from;
  this.lastTeleportTo = to;

  var position;

  if (to) {
    position = to.getPosition();
    position.y += 0.5;
  } else {
    // startPosition is the respawn point
    position = this.startPosition;
  }

  this.entity.rigidbody.teleport(position);
    
  // reset forces
  this.entity.rigidbody.linearVelocity = pc.Vec3.ZERO;
  this.entity.rigidbody.angularVelocity = pc.Vec3.ZERO;
};
