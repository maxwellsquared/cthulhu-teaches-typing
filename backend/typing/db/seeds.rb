# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts 'Seeding'
User.create({
              name: 'Adam Harvey',
              email: 'adamgrharvey@gmail.com',
              password: 'test'
            })
User.create({
              name: 'Curtis Warcup',
              email: 'curtis.gwarcup@gmail.com',
              password: 'test'
            })
User.create({
              name: 'Max Kuhn',
              email: 'maxkuhn@gmail.com',
              password: 'test'
            })

#  seeds for keyboards table
Keyboard.create({
                  name: 'GMMK Pro',
                  user_id: 1,
                  keyboard_type: '75%',
                  color1: '#383838',
                  color2: '#191919'
                })
Keyboard.create({
                  name: 'Keychron Q1',
                  user_id: 1,
                  keyboard_type: '75%',
                  color1: '#0e4eb5',
                  color2: '#5086de'
                })
Keyboard.create({
                  name: 'Owlab Mr Suit',
                  user_id: 1,
                  keyboard_type: 'tenkeyless',
                  color1: '#124c8a',
                  color2: '#b9bbbd'
                })
Keyboard.create({
                  name: 'QK65',
                  user_id: 2,
                  keyboard_type: '65%',
                  color1: '#989a9c',
                  color2: '#c4e5f2'
                })
Keyboard.create({
                  name: 'Zoom 65',
                  user_id: 2,
                  color1: '#e5e8e3',
                  color2: '#caccc8'
                })
Keyboard.create({
                  name: 'GMMK Pro',
                  user_id: 2,
                  keyboard_type: '75%',
                  color1: '#383838',
                  color2: '#191919'
                })
Keyboard.create({
                  name: 'Portico 75',
                  user_id: 2,
                  keyboard_type: '75%',
                  color1: '#9c8b7c',
                  color2: '#615e5c'
                })
Keyboard.create({
                  name: 'Apple Butterfly Keyboard',
                  user_id: 3,
                  keyboard_type: 'laptop',
                  color1: '#575757',
                  color2: '#141414'
                })
Keyboard.create({
                  name: 'Mode Sonnet',
                  user_id: 3,
                  keyboard_type: '75%',
                  color1: '#262626',
                  color2: '#121212'
                })
Keyboard.create({
                  name: 'Keycult No. 2/65',
                  user_id: 3,
                  keyboard_type: '65%',
                  color1: '#495c55',
                  color2: '#c3a9c9'
                })

Submission.create({
                    wpm: 25,
                    user_id: 1,
                    accuracy: 88,
                    keyboard_id: 1
                  })
Submission.create({
                    wpm: 32,
                    user_id: 1,
                    accuracy: 95,
                    keyboard_id: 1
                  })
Submission.create({
                    wpm: 56,
                    user_id: 1,
                    accuracy: 90,
                    keyboard_id: 1
                  })
Submission.create({
                    wpm: 43,
                    user_id: 1,
                    accuracy: 75,
                    keyboard_id: 1
                  })
Submission.create({
                    wpm: 55,
                    user_id: 1,
                    accuracy: 99,
                    keyboard_id: 2
                  })
Submission.create({
                    wpm: 25,
                    user_id: 1,
                    accuracy: 100,
                    keyboard_id: 2
                  })
Submission.create({
                    wpm: 32,
                    user_id: 1,
                    accuracy: 92,
                    keyboard_id: 2
                  })
Submission.create({
                    wpm: 56,
                    user_id: 1,
                    accuracy: 88,
                    keyboard_id: 3
                  })
Submission.create({
                    wpm: 43,
                    user_id: 1,
                    accuracy: 65,
                    keyboard_id: 3
                  })
Submission.create({
                    wpm: 56,
                    user_id: 1,
                    accuracy: 88,
                    keyboard_id: 3
                  })
Submission.create({
                    wpm: 43,
                    user_id: 1,
                    accuracy: 65,
                    keyboard_id: 3
                  })
Submission.create({
                    wpm: 55,
                    user_id: 1,
                    accuracy: 97,
                    keyboard_id: 2
                  })
Submission.create({
                    wpm: 15,
                    user_id: 2,
                    accuracy: 100,
                    keyboard_id: 4
                  })
Submission.create({
                    wpm: 45,
                    user_id: 2,
                    accuracy: 87,
                    keyboard_id: 4
                  })
Submission.create({
                    wpm: 61,
                    user_id: 2,
                    accuracy: 99,
                    keyboard_id: 4
                  })
Submission.create({
                    wpm: 52,
                    user_id: 2,
                    accuracy: 90,
                    keyboard_id: 4
                  })
Submission.create({
                    wpm: 38,
                    user_id: 2,
                    accuracy: 100,
                    keyboard_id: 5
                  })
Submission.create({
                    wpm: 15,
                    user_id: 2,
                    accuracy: 100,
                    keyboard_id: 5
                  })
Submission.create({
                    wpm: 45,
                    user_id: 2,
                    accuracy: 76,
                    keyboard_id: 5
                  })
Submission.create({
                    wpm: 38,
                    user_id: 2,
                    accuracy: 100,
                    keyboard_id: 5
                  })
Submission.create({
                    wpm: 15,
                    user_id: 2,
                    accuracy: 100,
                    keyboard_id: 5
                  })
Submission.create({
                    wpm: 45,
                    user_id: 2,
                    accuracy: 76,
                    keyboard_id: 5
                  })
Submission.create({
                    wpm: 61,
                    user_id: 2,
                    accuracy: 98,
                    keyboard_id: 6
                  })
Submission.create({
                    wpm: 52,
                    user_id: 2,
                    accuracy: 89,
                    keyboard_id: 6
                  })
Submission.create({
                    wpm: 61,
                    user_id: 2,
                    accuracy: 98,
                    keyboard_id: 6
                  })
Submission.create({
                    wpm: 52,
                    user_id: 2,
                    accuracy: 89,
                    keyboard_id: 6
                  })
Submission.create({
                    wpm: 38,
                    user_id: 2,
                    accuracy: 100,
                    keyboard_id: 7
                  })
Submission.create({
                    wpm: 61,
                    user_id: 2,
                    accuracy: 99,
                    keyboard_id: 7
                  })
Submission.create({
                    wpm: 38,
                    user_id: 2,
                    accuracy: 100,
                    keyboard_id: 7
                  })
Submission.create({
                    wpm: 61,
                    user_id: 2,
                    accuracy: 99,
                    keyboard_id: 7
                  })
Submission.create({
                    wpm: 52,
                    user_id: 2,
                    accuracy: 90,
                    keyboard_id: 4
                  })
Submission.create({
                    wpm: 38,
                    user_id: 2,
                    accuracy: 100,
                    keyboard_id: 4
                  })
Submission.create({
                    wpm: 15,
                    user_id: 2,
                    accuracy: 100,
                    keyboard_id: 4
                  })
Submission.create({
                    wpm: 45,
                    user_id: 2,
                    accuracy: 76,
                    keyboard_id: 4
                  })
Submission.create({
                    wpm: 61,
                    user_id: 2,
                    accuracy: 98,
                    keyboard_id: 4
                  })
Submission.create({
                    wpm: 52,
                    user_id: 2,
                    accuracy: 89,
                    keyboard_id: 4
                  })
Submission.create({
                    wpm: 38,
                    user_id: 2,
                    accuracy: 100,
                    keyboard_id: 4
                  })
Submission.create({
                    wpm: 62,
                    user_id: 3,
                    accuracy: 82,
                    keyboard_id: 1
                  })
Submission.create({
                    wpm: 50,
                    user_id: 3,
                    accuracy: 76,
                    keyboard_id: 8
                  })
Submission.create({
                    wpm: 34,
                    user_id: 3,
                    accuracy: 100,
                    keyboard_id: 8
                  })
Submission.create({
                    wpm: 50,
                    user_id: 3,
                    accuracy: 76,
                    keyboard_id: 8
                  })
Submission.create({
                    wpm: 34,
                    user_id: 3,
                    accuracy: 100,
                    keyboard_id: 8
                  })
Submission.create({
                    wpm: 50,
                    user_id: 3,
                    accuracy: 76,
                    keyboard_id: 8
                  })
Submission.create({
                    wpm: 34,
                    user_id: 3,
                    accuracy: 100,
                    keyboard_id: 8
                  })
Submission.create({
                    wpm: 57,
                    user_id: 3,
                    accuracy: 98,
                    keyboard_id: 9
                  })
Submission.create({
                    wpm: 43,
                    user_id: 3,
                    accuracy: 92,
                    keyboard_id: 9
                  })
Submission.create({
                    wpm: 49,
                    user_id: 3,
                    accuracy: 94,
                    keyboard_id: 9
                  })
Submission.create({
                    wpm: 62,
                    user_id: 3,
                    accuracy: 82,
                    keyboard_id: 9
                  })
Submission.create({
                    wpm: 57,
                    user_id: 3,
                    accuracy: 98,
                    keyboard_id: 9
                  })
Submission.create({
                    wpm: 43,
                    user_id: 3,
                    accuracy: 92,
                    keyboard_id: 9
                  })
Submission.create({
                    wpm: 49,
                    user_id: 3,
                    accuracy: 94,
                    keyboard_id: 9
                  })
Submission.create({
                    wpm: 62,
                    user_id: 3,
                    accuracy: 82,
                    keyboard_id: 9
                  })
Submission.create({
                    wpm: 50,
                    user_id: 3,
                    accuracy: 76,
                    keyboard_id: 10
                  })
Submission.create({
                    wpm: 80,
                    user_id: 3,
                    accuracy: 96,
                    keyboard_id: 10
                  })
Submission.create({
                    wpm: 50,
                    user_id: 3,
                    accuracy: 76,
                    keyboard_id: 10
                  })
Submission.create({
                    wpm: 80,
                    user_id: 3,
                    accuracy: 96,
                    keyboard_id: 10
                  })

puts 'Done'
