levels = {
  lobby: {
    map: [
      'W40','W40','W40','W40','W40','W40','W40',
      'W40','W40','W41','W41','W41','W40','W40',
      'W40','W43','F00','F00','F00','W42','W40',
      'W40','W44','W10','F00','W10','W45','W40',
      'W40','W44','F00','F00','F00','W45','W40',
      'W40','W44','W10','F00','W10','W45','W40',
      'W40','W44','F00','F00','F00','W45','W40',
      'W40','W44','W10','F00','W10','W45','W40',
      'W40','W44','F00','F00','F00','W45','W40',
      'W40','W44','W10','F00','W10','W45','W40',
      'W40','W44','F00','F00','F00','W45','W40',
      'W40','W44','W10','F00','W10','W45','W40',
      'W40','W44','F00','F00','F00','W45','W40',
      'W40','W44','W10','F00','W10','W45','W40',
      'W40','W44','F00','F00','F00','W45','W40',
      'W40','W44','W10','F00','W10','W45','W40',
      'W40','W44','F00','F00','F00','W45','W40',
      'W40','W44','W10','F00','W10','W45','W40',
      'W40','W47','W46','F00','W46','W48','W40',
      'W40','W40','W40','F00','W40','W40','W40',
      'NIL','NIL','NIL','DOR','NIL','NIL','NIL',
    ],
    occupied_tiles: [],
    cols: 7,
    rows: 19,
    tile_diameter: 320,
    start_position: {
      x: 3,
      y: 10
    },
    start_direction: 'up',
    items: [

    ],
    npcs: [
      {
        position: {
          x: 3,
          y: 2
        },
        ref: 'red_balloon',
        name: 'red balloon',
        img_path: 'assets/sprites/npc/red_balloon.png',
        dialogue_path: 'assets/data/dialogue/red_balloon.json',
        diameter: 320,
        framerate: 200,
        num_frames: 4,
        walkable: false,
        movement_pattern: false,
      },
    ]
  }
}