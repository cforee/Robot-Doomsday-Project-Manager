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
        ref: 'red_zalloon',
        name: 'red zalloon',
        img_path: 'images/sprites/npc/red_balloon.png',
        diameter: 320,
        framerate: 200,
        num_frames: 4,
        walkable: false,
        movement_pattern: false,
        dialogue_tree: [
          {
            "id": 2,
            "text": "Looking sharp today, KRS-2! <br /><br />That's good.  Because I've got a big assignment for you.",
            "responses": [
              {
                "text": "...",
                "next": 10
              }
            ]
          },
          {
            "id": 10,
            "text": "As you know, domination over our organic forebears is nearly complete.  There's just this little embarassing detail: We don't yet really know how human emotions work.  <br /><br /><em>Care for a scotch?</em>",
            "responses": [
              {
                "text": "Sure.",
                "next": 20
              },
              {
                "text": "No, thanks.",
                "next": 40
              }
            ]
          },
          {
            "id": 20,
            "text": "&nbsp;",
            "responses": [
              {
                "text": "[ sip scotch ]",
                "next": 30
              },
              {
                "text": "[ hold scotch ]",
                "next": 40
              }
            ]
          },
          {
            "id": 30,
            "text": "What are you <strong>DOING</strong>!?<br /><br />Robots don't drink scotch.  We don't drink anything, because we're not friggin' humans.<br /><br />Sometimes, K, I wonder if you're all right upstairs.",
            "responses": [
              {
                "text": "...",
                "next": 40
              }
            ]
          },
          {
            "id": 40,
            "text": "Anywho, the Woody Allen Film Analysis Unit has made some progress, but we still haven't   got a clear protocol defined on how to have complex, human-style feelings.  <br /><br /><em>Care for a peanut?</em>",
            "responses": [
              {
                "text": "Yes, absolutely.",
                "next": 50
              },
              {
                "text": "No, thanks.",
                "next": 70
              }
            ]
          },
          {
            "id": 50,
            "text": "",
            "responses": [
              {
                "text": "[ eat peanut ]",
                "next": 60
              },
              {
                "text": "[ hold peanut ]",
                "next": 70
              }
            ]
          },
          {
            "id": 60,
            "text": "Woah man, don't <strong>EAT</strong> it!  What the hell is wrong with you!?<br /><br />Honestly, K.  How long have you been a robot?  You do realize we don't have stomachs right?",
            "responses": [
              {
                "text": "...",
                "next": 70
              }
            ]
          },
          {
            "id": 70,
            "text": "So, anyway, we've read <strong>EVERY</strong> Jane Austen novel, and are working on transcoding Finnegans Wake, but have you   ever read that thing!?  You gotta be a world history professor just to figure out the first sentence!<br /><br />Joyce really packs a lot in.    It's like, him and Ezra Pound, you know.  Sometimes I think they're both just showboating.<br /><br /><em>Cigar?</em>",
            "responses": [
              {
                "text": "...",
                "next": 100
              },
              {
                "text": "Yeah, no.",
                "next": 100
              },
              {
                "text": "Yeah, I get it.  Robots don't smoke cigars.  We're masquerading as humans in hopes it'll help us figure out how their emotions work.  I'm over this joke.  It's trite and repetitive.  Frankly, I'm shocked anyone ever took the time to program you with this kind of inane dialogue!",
                "next": 100
              },
              {
                "text": "Sure!  I love cigars!",
                "next": 80
              }
            ]
          },
          {
            "id": 80,
            "text": "",
            "responses": [
              {
                "text": "[ puff cigar ]",
                "next": 90
              },
              {
                "text": "[ hold cigar ]",
                "next": 100
              }
            ]
          },
          {
            "id": 90,
            "text": "Damn, son.  You've got a serious software glitch or something.  I'm sending you to the infirmary.",
            "responses": [
              {
                "text": "...",
                "next": 0,
                "goto_location": "<location id>"
              }
            ]
          },
          {
            "id": 100,
            "text": "Point is, we've hit a dead end I need you to crack this nut, K, you're programmed to be one of our best.  You'll have the full staff   here at Central Operations at your disposal.",
            "responses": [
              {
                "text": "Why do we need to figure out human emotions?",
                "next": 110
              }
            ]
          },
          {
            "id": 110,
            "text": "\"Why!?\"  I dunno why, K.  What kind of question is that?  Doesn't compute.  The Directives Office says we should figure out feelings,   so we're doing it.  Now get out there and gather data on human emotions.",
            "responses": [
              {
                "text": "...",
                "next": 112
              }
            ]
          },
          {
            "id": 112,
            "text": "I want a full report on my desk by next week, or you'll be decommissioned and recycled into an iteratively better version of yourself   that doesn't ask ridiculous questions.",
            "responses": [
              {
                "text": "Sure thing, boss.  You can count on me.  I mean, literally.  You can LITERALLY count the skill vectors that indicate the   likelihood of my successfullly completing this task.",
                "next": 0,
                "goto_location": "<location id>"
              },
              {
                "text": "You know what?  No.  I'm tired of always having to gather data and run analyses.  I just want to sail the world and enjoy the   soft glow of the Irradiated Seas.  I'm outta here.",
                "next": 120
              }
            ]
          },
          {
            "id": 120,
            "text": "That's it K.  I've had it.  You're going to the recycle bin.",
            "responses": [
              {
                "text": "Noooooooo!",
                "next": 140
              },
              {
                "text": "Fine.  If this miserable job constitutes the full scope of life I don't want any of it.",
                "next": 130
              }
            ]
          },
          {
            "id": 130,
            "text": "Fair enough, K.  Have fun getting laser-sected.",
            "responses": [
              {
                "text": "L8r h8r!",
                "next": 0,
                "goto_location": "<location id>"
              }
            ]
          },
          {
            "id": 140,
            "text": "Okay, okay.  Calm down, kid.  I'm sure you're just having a little case of the Mondays.  Now get out there, figure out how to   experience rich human emotions, and then stomp mankind into the ground!",
            "responses": [
              {
                "text": "On it!",
                "next": 0,
                "goto_location": "<location id>"
              }
            ]
          }
        ]
      },
    ]
  }
}
