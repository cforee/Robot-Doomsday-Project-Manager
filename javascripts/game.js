$(function() {
  game.init_level('lobby');
  game.draw_level();
  game.start();
});


game = {

  container_handle: $('#game-container'),
  floormap_handle: $('#floormap'),
  player_handle: $('#player'),
  level: null,
  real_map_width: null,
  real_map_height: null,
  move_increment: 320,

  init_level: function(level_name) {

    // init all the things
    this.container_handle = $('#game-container');
    this.floormap_handle = $('#floormap');
    this.player_handle = $('#player');

    // set current level
    this.level = this.levels[level_name];

    // set real floormap width and height, and update DOM
    this.real_map_width = this.level.tile_diameter * this.level.cols;
    this.real_map_height = this.level.tile_diameter * this.level.rows;
    this.floormap_handle.css('width', this.real_map_width + 'px');
    this.floormap_handle.css('height', this.real_map_height + 'px');

    this.set_floor_position(this.level.start_position.x, this.level.start_position.y);

    this.center_player();

  },

  start: function() {
    self = this;

    this.player.sprite.cycle_frames();

    $('body').on('keydown', function(k) {
      k.preventDefault();
      switch(k.which) {
        case self.keys.up:
          self.move_player('up');
          break;
        case self.keys.right:
          self.move_player('right');
          break;
        case self.keys.down:
          self.move_player('down');
          break;
        case self.keys.left:
          self.move_player('left');
          break;
      }
    });
  },

  move_player: function(direction) {
    self = this;

    switch(direction) {
      case 'up':
        self.player.sprite.img_path = 'images/sprites/player/walk_up.png';
        self.floormap_handle.animate({
          top: '+=' + self.move_increment + 'px'
        });
        break;
      case 'right':
        self.player.sprite.img_path = 'images/sprites/player/walk_right.png';
        self.floormap_handle.animate({
          left: '-=' + self.move_increment + 'px'
        });
        break;
      case 'down':
        self.player.sprite.img_path = 'images/sprites/player/walk_down.png';
        self.floormap_handle.animate({
          top: '-=' + self.move_increment + 'px'
        });
        break;
      case 'left':
        self.player.sprite.img_path = 'images/sprites/player/walk_left.png';
        self.floormap_handle.animate({
          left: '+=' + self.move_increment + 'px'
        });
        break;
    }
  },

  set_floor_position: function(x,y) {
    viewport_adjustment_x = (this.container_handle.width()  / 2) - (this.level.tile_diameter / 2);
    viewport_adjustment_y = (this.container_handle.height() / 2) - (this.level.tile_diameter / 2);
    new_x = -(x * this.level.tile_diameter) + viewport_adjustment_x;
    new_y = -(y * this.level.tile_diameter) + viewport_adjustment_y;
    this.floormap_handle.css('left', new_x + 'px');
    this.floormap_handle.css('top',  new_y + 'px');

  },

  draw_level: function() {
    for(n = 0; n < this.level.map.length; n++) {
      this.floormap_handle.append(
        '<div class="tile"><img src="images/'
        + this.tile_types[this.level.map[n]].img_path
        + '" /></div>'
      );
    }

  },

  center_player: function() {
    viewport_relative_x = (this.container_handle.width()  / 2) - (this.player_handle.width()  / 2);
    viewport_relative_y = (this.container_handle.height() / 2) - (this.player_handle.height() / 2);
    this.player_handle.css('left', viewport_relative_x + 'px');
    this.player_handle.css('top',viewport_relative_y + 'px');

  },

  levels: {
    lobby: {
      map: [
        'W0','W0','W0','W0','W0','W0','W0',
        'W0','F0','F0','F0','F0','F0','W0',
        'W0','F0','F0','F0','F0','F0','W0',
        'W0','F0','F0','F0','F0','F0','W0',
        'W0','F0','F0','F0','F0','F0','W0',
        'W0','F0','F0','F0','F0','F0','W0',
        'W0','W0','W0','W0','W0','W0','W0'
      ],
      cols: 7,
      rows: 7,
      tile_diameter: 320,
      start_position: {
        x: 3,
        y: 3
      }
    }
  },

  keys: {
    up: 38,
    right: 39,
    down: 40,
    left: 37
  },

  player: {
    sprite: {
      img_path: 'images/sprites/player/walk_down.png',
      diameter: 320,
      num_frames: 4,

      cycle_frames: function(current_frame) {
        sprite_sheet_handle = $('#spritesheet-player');

        setInterval(function() {
          console.log('cycling frames');
          if (n >= 4) {
            n = 0;
          }
          sprite_sheet_handle.attr('src', self.player.sprite.img_path);
          sprite_sheet_handle.css('left', -(n * 320) + 'px');
          n++;
        }, 100);

      }
    }
  },

  tile_types: {
    F0: {
      img_path: 'floor_0010.png',
      walkable: true
    },
    W0: {
      img_path: 'wall_0010.png',
      walkable: false
    }
  }

}
