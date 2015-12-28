game = {

  init: function(level_name, start_x, start_y, start_direction) {
    self = this;

    // init all the things
    this.container_handle                   = $('#map-container');
    this.floormap_handle                    = $('#floormap');
    this.npcmap_handle                      = $('#npcmap');
    this.player_handle                      = $('#player');
    this.itemmap_handle                     = $('#itemmap');
    this.dialogue_overlay_handle            = $('#dialogue-overlay');
    this.move_increment                     = 320;
    this.ghost_mode                         = false;
    this.room_transition_slowness           = 500;

    $.getJSON( "assets/levels/" + level_name + ".json", function( data ) {
      self.level = data;

    }).done(function() {
      // set start_x and start_y position overrides (if not null)
      if (start_x) { self.player.location.x = self.level.start_position.x = parseInt(start_x); }
      if (start_y) { self.player.location.y = self.level.start_position.y = parseInt(start_y); }
      if (start_direction) {
        self.player.direction = self.level.start_direction = start_direction;
        self.face_player(start_direction);
      }

      // get real floormap width and height
      self.real_map_width = self.level.tile_diameter * self.level.cols;
      self.real_map_height = self.level.tile_diameter * self.level.rows;

      // set floor map h/w
      self.floormap_handle.css('width', self.real_map_width + 'px');
      self.floormap_handle.css('height', self.real_map_height + 'px');

      // set npc map h/w
      self.npcmap_handle.css('width', self.real_map_width + 'px');
      self.npcmap_handle.css('height', self.real_map_height + 'px');

      self.set_floor_position(self.level.start_position.x, self.level.start_position.y);
      self.player.location.x = self.level.start_position.x;
      self.player.location.y = self.level.start_position.y;

      self.player.direction = self.level.start_direction;

      self.center_player();
      self.draw_level();
      self.start();

    });

  },

  start: function() {
    self = this;

    // "get things moving"
    $.each(self.level.npcs, function(i,obj) {
      self.cycle_frames(obj)
    });
    this.cycle_frames(this.player.sprite);

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
        case self.keys.interact:
          $.each(self.level.npcs, function(i, obj) {
            if (self.player.is_facing(obj)) {
              self.draw_dialogue(0, obj);
            }
          });
          break;
        case self.keys.attack:
          // TODO: add attack handlers
          break;
      }
    });

  },

  face_player: function(direction) {
    this.player.sprite.img_path = 'assets/sprites/player/walk_' + direction + '.png';
    return true;
  },

  move_player: function(direction) {
    self = this;

    // hide dialogue box on attempted move
    self.hide_dialogue();

    // track which direction the player is facing
    self.player.direction = direction

    switch(direction) {
      case 'up':
        self.player.sprite.img_path = 'assets/sprites/player/walk_up.png';
        if (self.player.can_move('up')) {
          self.floormap_handle.filter(':not(:animated)').animate({
            top: '+=' + self.move_increment + 'px'
          }, self.player.gait_slowness, self.player.gait_animation_curve, function() { self.player.location.y--; });
        }
        break;
      case 'right':
        self.player.sprite.img_path = 'assets/sprites/player/walk_right.png';
        if (self.player.can_move('right')) {
          self.floormap_handle.filter(':not(:animated)').animate({
            left: '-=' + self.move_increment + 'px'
          }, self.player.gait_slowness, self.player.gait_animation_curve, function() { self.player.location.x++; });
        }
        break;
      case 'down':
        self.player.sprite.img_path = 'assets/sprites/player/walk_down.png';
        if (self.player.can_move('down')) {
          self.floormap_handle.filter(':not(:animated)').animate({
            top: '-=' + self.move_increment + 'px'
          }, self.player.gait_slowness, self.player.gait_animation_curve, function() { self.player.location.y++; });
        }
        break;
      case 'left':
        self.player.sprite.img_path = 'assets/sprites/player/walk_left.png';
        if (self.player.can_move('left')) {
          self.floormap_handle.filter(':not(:animated)').animate({
            left: '+=' + self.move_increment + 'px'
          }, self.player.gait_slowness, self.player.gait_animation_curve, function() { self.player.location.x--; });
        }
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
    self = this;

    this.container_handle.hide();

    for(n = 0; n < this.level.map.length; n++) {
      this.floormap_handle.append('<div class="tile"><img src="assets/' +  this.tile_types[this.level.map[n]].img_path    + '" /></div>');
    }
    $.each(this.level.npcs, function(i,obj) {
      self.npcmap_handle.append('<div class="mtile" id="' + obj.ref + '"><img id="' + 'spritesheet-' + obj.ref + '" src="' + obj.img_path + '" /></div>');

      // position mtiles
      relative_x = obj.position.x * obj.diameter;
      relative_y = obj.position.y * obj.diameter;
      this_npc_handle = $('#'+obj.ref);
      this_npc_handle.css({
        'left': relative_x + 'px',
        'top':  relative_y + 'px'
      });

      // set the tile occupied if walkable == false
      if (!obj.walkable) {
        self.level.occupied_tiles.push(
          self.get_tile(
            {
              x: obj.position.x,
              y: obj.position.y
            }
          )
        );
      }
    });
    this.container_handle.fadeIn(this.room_transition_slowness);

  },

  center_player: function() {
    viewport_relative_x = (this.container_handle.width()  / 2) - (this.player_handle.width()  / 2);
    viewport_relative_y = (this.container_handle.height() / 2) - (this.player_handle.height() / 2) - this.player.sprite.adjust_y;
    this.player_handle.css('left', viewport_relative_x + 'px');
    this.player_handle.css('top',viewport_relative_y + 'px');
  },

  cycle_frames: function(obj) {
    var sprite_sheet_handle = $('#spritesheet-' + obj.ref);
    var n = 0;
    window.frame_interval = setInterval(function() {
      if (n >= obj.num_frames) {
        n = 0;
      }
      sprite_sheet_handle.attr('src', obj.img_path);
      sprite_sheet_handle.css('left', -(n * obj.diameter) + 'px');
      n++;
    }, obj.framerate);
  },

  get_tile: function(coords) {
    self = this
    cell_num = (coords.y * self.level.cols) + coords.x;

    // handle special tiles
    if ((this.tile_types[this.level.map[cell_num]]) && (this.tile_types[this.level.map[cell_num]].is_portal)) {
      last_cell = this.tile_types[self.level.map[cell_num]]
      self.container_handle.fadeOut(self.room_transition_slowness, function() {
        var portal = (
          location.protocol
          + '//'
          + location.host
          + '/?level='
          + last_cell.destination.ref
          + '&x='
          + last_cell.destination.start_position.x
          + '&y='
          + last_cell.destination.start_position.y
          + '&start_direction='
          + last_cell.destination.start_direction
        );
        window.location.href = portal;
      });
    }
    return cell_num;
  },

  keys: {
    up: 38,
    right: 39,
    down: 40,
    left: 37,
    interact: 69
  },

  hide_dialogue: function() {
    this.dialogue_overlay_handle.fadeOut(300);
  },

  draw_dialogue: function(current, interlocutor) {
    self = this;
    this.dialogue_overlay_handle.fadeIn(300);

    var dialogue_file = 'assets/dialogue_' + interlocutor.ref + '.json';
    $.get(dialogue_file, function(data) {
      var dialogues = data['dialogue_tree']
      $('#interlocutor').html('<h2>' + interlocutor.name + '</h2>');

      if (dialogues[current].text.length > 1) {
        $('#dialogue').html('');
        $('#dialogue').html(dialogues[current].text);
      }
      var response_set = []
      $.each(dialogues[current].responses, function() {
        if (parseInt(this.next) === 0) {
          response_set.push('<a class="response" href="http://www.google.com">' + this.text + '</a>');
        } else {
          response_set.push('<a class="response">' + this.text + '</a>');
        }
      });
      $('#options').html(response_set);
      $('.response').on('click keydown', function() {
        self.dialogue_overlay_handle.hide();
        choice = $('.response').index(this);
        $.map(dialogues, function(obj) {
          if (obj.id === parseInt(dialogues[current].responses[choice].next)) {
            var next = $(dialogues).index(obj);
            setTimeout(self.draw_dialogue(next, interlocutor), 150);
            self.dialogue_overlay_handle.fadeIn(100);
          }
        });
      });
    });

  },




  // player object

  player: {
    gait_slowness: 230,
    gait_animation_curve: 'linear',
    direction: 'up',
    location: {
      x: 0,
      y: 0,
    },
    sprite: {
      ref: 'player',
      img_path: 'assets/sprites/player/walk_down.png',
      diameter: 320,
      adjust_y: 20,
      framerate: 100,
      num_frames: 4
    },

    can_move: function(direction) {
      // walk through walls if we're in ghost mode
      if (self.ghost_mode) { return true; }

      prospective_tile = null;

      switch(direction) {
        case 'up':
          prospective_tile = self.get_tile({
              x: self.player.location.x,
              y: self.player.location.y - 1
            })
          break;
        case 'right':
          prospective_tile = self.get_tile({
              x: self.player.location.x + 1,
              y: self.player.location.y
            })
          break;
        case 'down':
          prospective_tile = self.get_tile({
              x: self.player.location.x,
              y: self.player.location.y + 1
            })
          break;
        case 'left':
          prospective_tile = self.get_tile({
              x: self.player.location.x - 1,
              y: self.player.location.y
            })
          break;
      }
      return this.tile_walkable(prospective_tile);
    },

    tile_walkable: function(cell) {
      if (self.tile_types[self.level.map[prospective_tile]]) {
        return(
          self.tile_types[self.level.map[prospective_tile]].walkable &&
          ($.inArray(prospective_tile, self.level.occupied_tiles) === -1)
        );
      } else {
        return false
      }
    },

    is_facing: function(target_obj) {
      switch(self.player.direction) {
        case 'up':
          prospective_tile = self.get_tile({
              x: self.player.location.x,
              y: self.player.location.y - 1
            })
          break;
        case 'right':
          prospective_tile = self.get_tile({
              x: self.player.location.x + 1,
              y: self.player.location.y
            })
          break;
        case 'down':
          prospective_tile = self.get_tile({
              x: self.player.location.x,
              y: self.player.location.y + 1
            })
          break;
        case 'left':
          prospective_tile = self.get_tile({
              x: self.player.location.x - 1,
              y: self.player.location.y
            })
          break;
      }
      target_tile = self.get_tile({ x: target_obj.position.x, y: target_obj.position.y })
      console.log(self.tile_types[target_tile])
      return (prospective_tile == target_tile)
    }
  },




  // tile types

  tile_types: {
    NIL: {
      img_path: 'empty.png',
      walkable: true
    },
    P01: {
      img_path: 'empty.png',
      walkable: true,
      is_portal: true,
      destination: {
        ref: '0020_lobby',
        start_direction: 'up',
        start_position: {
          x: 3,
          y: 10
        }
      }
    },
    P02: {
      img_path: 'empty.png',
      walkable: true,
      is_portal: true,
      destination: {
        ref: '0020_lobby',
        start_direction: 'up',
        start_position: {
          x: 4,
          y: 10
        }
      }
    },
    E01: {
      img_path: 'empty.png',
      walkable: true,
      is_portal: true,
      destination: {
        ref: '0010_opening',
        start_direction: 'down',
        start_position: {
          x: 25,
          y: 1
        }
      }
    },
    E02: {
      img_path: 'empty.png',
      walkable: true,
      is_portal: true,
      destination: {
        ref: '0010_opening',
        start_direction: 'down',
        start_position: {
          x: 26,
          y: 1
        }
      }
    },
    F00: {
      img_path: 'tiles/floor_0030.png',
      walkable: true
    },
    W10: {
      img_path: 'tiles/floor_and_plant_0010.png',
      walkable: false
    },
    W40: {
      img_path: 'tiles/wall_0040.png',
      walkable: false
    },
    W41: {
      img_path: 'tiles/wall_0041.png',
      walkable: true
    },
    W42: {
      img_path: 'tiles/wall_0042.png',
      walkable: true
    },
    W43: {
      img_path: 'tiles/wall_0043.png',
      walkable: true
    },
    W44: {
      img_path: 'tiles/wall_0044.png',
      walkable: true
    },
    W45: {
      img_path: 'tiles/wall_0045.png',
      walkable: true
    },
    W46: {
      img_path: 'tiles/wall_0046.png',
      walkable: true
    },
    W47: {
      img_path: 'tiles/wall_0047.png',
      walkable: true
    },
    W48: {
      img_path: 'tiles/wall_0048.png',
      walkable: true
    },
    W00: {
      img_path: 'tiles/wall_0030.png',
      walkable: false
    }
  },

}
