var Network = pc.createScript('network');
var self;
Network.prototype.initialize = function() {
  console.log('in initialize', this.entity);
  self = this;
  this.player = this.entity; // this.app.root.findByName('Player');
  this.other = this.app.root.findByName('Other');
<<<<<<< HEAD:public/files/assets/8716505/1/test.js

  // console.log('what is this? pc === this?', pc === this);
  // window.stupidInitializeThis = this;
};
=======
>>>>>>> 3fde3e53ad7ee6a281d0b6c3aa9da14ded965f50:public/files/assets/8699030/1/test.js

  if (window.socket === undefined) {
    window.socket = io('http://localhost:8081');
  }

  this.socket = window.socket;
  this.socket.emit('initialize', self.player.nickName);
  // var self = this;
  // self.player = player;
  // self.other = other;
  // this.player = this.app.root.findByName('Player');
  // this.other = this.app.root.findByName('Other');

  // console.log('what is this? pc === this?', pc === this);
  // window.stupidInitializeThis = this;
};


Network.prototype.smrtInitialize = function() {
  console.log('this in smrtInitialize: ', this);
  if (window.socket === undefined) {
    //window.socket = io('http://localhost:8081');
    window.socket = io('http://pond-game.herokuapp.com');
  }

  this.socket = window.socket;
<<<<<<< HEAD:public/files/assets/8716505/1/test.js

  this.socket.emit('initialize', self.player.nickName);
  // var self = this;
  // self.player = player;
  // self.other = other;
  // this.player = this.app.root.findByName('Player');
  // this.other = this.app.root.findByName('Other');
=======
>>>>>>> 3fde3e53ad7ee6a281d0b6c3aa9da14ded965f50:public/files/assets/8699030/1/test.js

  this.socket.on('playerData', function(data) {
    self.initializePlayers(data);
  });

  this.socket.on('playerJoined', function(data) {
    self.addPlayer(data);
  });

  this.socket.on ('playerMoved', function (data) {
    self.movePlayer (data);
  });
<<<<<<< HEAD:public/files/assets/8716505/1/test.js
  this.socket.on('deleteOther', function (data) { //data = id from deleteOther
    //deleting player of that id(aka data)
    //destroy logic
    console.log('deleting ', data.id);
    this.players[data.id].destroy();//
    //this.initializePlayers(data.players);
    //possibly
  });

  // this.socket.on('deleteOther', function (data) { //data = id from deleteOther
  //   //deleting player of that id(aka data)
  //   //destroy logic
  //   console.log('deleting ', data.id);
  //   this.players[data.id].destroy();//
  //   //this.initializePlayers(data.players);
  //   //possibly
  // });
=======
>>>>>>> 3fde3e53ad7ee6a281d0b6c3aa9da14ded965f50:public/files/assets/8699030/1/test.js
};

Network.prototype.smrtInitialize = function() {
  this.socket = window.socket;
  this.socket.emit('initialize', self.player.nickName);
};

Network.prototype.initializePlayers = function(data) {

    console.log('initializePlayers call');
  this.players = data.players.filter(function(cur){
    console.log('cur: ', cur, cur.id);
    return cur !== 'dead';
  });

  console.log('initializePlayers call ', data.id);
<<<<<<< HEAD:public/files/assets/8716505/1/test.js
  this.players = data.players.filter(function(cur){
    //console.log('cur: ', cur, cur.id);
    return cur !== 'dead';
  });


=======
  // this.players = data.players.filter(function(cur){
  //   //console.log('cur: ', cur, cur.id);
  //   return cur !== 'dead';
  // });
  this.players = data.players;
  window.players = this.players;
>>>>>>> 3fde3e53ad7ee6a281d0b6c3aa9da14ded965f50:public/files/assets/8699030/1/test.js
  this.id = data.id;
  this.player.id = data.id;
  console.log('players length: ', this.players.length, ' current playerId', this.player.id);

  for (var i = 0; i < this.players.length; i++) {
    if (i !== this.id && this.players[i] !== 'dead') {
      this.players[i].entity = this.createPlayerEntity (this.players[i]);
    }
  }

  this.initialized = true;
};

Network.prototype.addPlayer = function(data) {
  console.log('addPlayer call');

  this.players.push (data);
  this.players[this.players.length - 1].entity = this.createPlayerEntity (data);
};

Network.prototype.createPlayerEntity = function(data) {
  console.log('creating ball, id=', data.id, ' hopefully never true--> ', data === 'dead');
    if (data !== undefined && data !== 'dead') {
       var newPlayer = this.other.clone();

      newPlayer.enabled = true;
      newPlayer.id = data.id;
      newPlayer.nickName = data.nickName;
      newPlayer.lastCollision = null;
      if (true){
        this.other.getParent().addChild(newPlayer);
      }
      if (data) {
        console.log('createPlayerEntity, teleporting created ball');
        // console.log('data', data);
        // console.log('newPlayer', newPlayer);
        // console.log('newPLayer.rigidBody', newPlayer.rigidBody);
        // console.log(this.player);
        newPlayer.rigidbody.teleport(data.x, data.y, data.z);
      }
      return newPlayer;
    }

  // this.players[this.players.length - 1].entity = this.createPlayerEntity(data);
  data.entity = this.createPlayerEntity(data);
  this.players.push(data);

};

Network.prototype.createPlayerEntity = function(data) {

  var doesIdExist = this.players.reduce(function(accum, cur) {
    if (cur.id === data.id) {
      accum = true;
    }
    return accum;
  }, false);

  console.log('want to create ball, id=', data.id, data !== undefined, data !== 'dead', doesIdExist === false, data.entity === null);
  if (data !== undefined && data !== 'dead' && (doesIdExist === false || data.entity === null)) {
    var newPlayer = this.other.clone();

    newPlayer.enabled = true;
    newPlayer.id = data.id;
    newPlayer.nickName = data.nickName;
    newPlayer.lastCollision = null;
    this.other.getParent().addChild(newPlayer);
    if (data) {
      console.log('>>>teleporting created ball');
      // console.log('data', data);
      // console.log('newPlayer', newPlayer);
      // console.log('newPLayer.rigidBody', newPlayer.rigidBody);
      // console.log(this.player);
      newPlayer.rigidbody.teleport(data.x, data.y, data.z);
    }
    return newPlayer;
  }

};

Network.prototype.movePlayer = function (data) {
  console.log('movePlayer: ', data.id, this.initialized, this === self, this.players);//this.players[data.id], this.players[data.id].entity);
  if (this.initialized && this.players[data.id] && this.players[data.id].entity) {
    //console.log('movePlayer, actually moving: ', data.id);
    this.players[data.id].entity.rigidbody.teleport(data.x, data.y, data.z);
    this.players[data.id].entity.rigidbody.linearVelocity = new pc.Vec3(data.vx, data.vy, data.vz);
    this.players[data.id].entity.rigidbody.angularVelocity = new pc.Vec3(data.ax, data.ay, data.az);
  }
};

Network.prototype.update = function(dt) {
  this.updatePosition ();
};

Network.prototype.updatePosition = function () {
  if (this.initialized) {
    var pos = this.player.getPosition();
    var lv = this.player.rigidbody.linearVelocity;
    var av = this.player.rigidbody.angularVelocity;
    if (self.id !== this.id) {
      console.log('id disparity in updatePosition');
    }
    this.socket.emit ('positionUpdate', {
      id: this.id,
      x: pos.x,
      y: pos.y,
      z: pos.z,
      vx: lv.x,
      vy: lv.y,
      vz: lv.z,
      ax: av.x,
      ay: av.y,
      az: av.z
    });
  }
};