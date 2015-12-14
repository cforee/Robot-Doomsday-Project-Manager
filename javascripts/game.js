$(function() {
  game.container = $('#game-container');
  game.floormap = $('#floormap');
  game.init_level('lobby');
  game.draw_level();
});









game = {

  container: $('#game-container'),
  floormap: $('#floormap'),
  level: null,
  real_map_width: null,
  real_map_height: null,

  init_level: function(level_name) {
    // set current level
    this.level = this.levels[level_name];

    // set real floormap width and height, and update DOM
    this.real_map_width = this.level.tile_diameter * this.level.cols;
    this.real_map_height = this.level.tile_diameter * this.level.rows;
    this.floormap.css('width', this.real_map_width + 'px');
    this.floormap.css('height', this.real_map_height + 'px');

    this.set_floor_position(this.level.start_position.x, this.level.start_position.y);

  },

  set_floor_position: function(x,y) {
    viewport_adjustment_x = (this.container.width() / 2) - (this.level.tile_diameter / 2);
    viewport_adjustment_y = (this.container.height() / 2) - (this.level.tile_diameter / 2);
    new_x = -(x * this.level.tile_diameter) + viewport_adjustment_x;
    new_y = -(y * this.level.tile_diameter) + viewport_adjustment_y;
    this.floormap.css('left',  new_x + 'px');
    this.floormap.css('top',  new_y + 'px');

  },

  draw_level: function() {
    for(n = 0; n < this.level.map.length; n++) {
      this.floormap.append(
        '<div class="tile"><img src="images/'
        + this.tile_types[this.level.map[n]].img_path
        + '" /></div>'
      );
    }
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
