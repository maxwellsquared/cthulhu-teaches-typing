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
Submission.create({
                    wpm: 25,
                    user_id: 1,
                    accuracy: 88
                  })
Submission.create({
                    wpm: 32,
                    user_id: 1,
                    accuracy: 95
                  })
Submission.create({
                    wpm: 56,
                    user_id: 1,
                    accuracy: 90
                  })
Submission.create({
                    wpm: 43,
                    user_id: 1,
                    accuracy: 75
                  })
Submission.create({
                    wpm: 55,
                    user_id: 1,
                    accuracy: 99
                  })
Submission.create({
                    wpm: 25,
                    user_id: 1,
                    accuracy: 100
                  })
Submission.create({
                    wpm: 32,
                    user_id: 1,
                    accuracy: 92
                  })
Submission.create({
                    wpm: 56,
                    user_id: 1,
                    accuracy: 88
                  })
Submission.create({
                    wpm: 43,
                    user_id: 1,
                    accuracy: 65
                  })
Submission.create({
                    wpm: 55,
                    user_id: 1,
                    accuracy: 97
                  })
Submission.create({
                    wpm: 15,
                    user_id: 2,
                    accuracy: 100
                  })
Submission.create({
                    wpm: 45,
                    user_id: 2,
                    accuracy: 87
                  })
Submission.create({
                    wpm: 61,
                    user_id: 2,
                    accuracy: 99
                  })
Submission.create({
                    wpm: 52,
                    user_id: 2,
                    accuracy: 90
                  })
Submission.create({
                    wpm: 38,
                    user_id: 2,
                    accuracy: 100
                  })
Submission.create({
                    wpm: 15,
                    user_id: 2,
                    accuracy: 100
                  })
Submission.create({
                    wpm: 45,
                    user_id: 2,
                    accuracy: 76
                  })
Submission.create({
                    wpm: 61,
                    user_id: 2,
                    accuracy: 98
                  })
Submission.create({
                    wpm: 52,
                    user_id: 2,
                    accuracy: 89
                  })
Submission.create({
                    wpm: 38,
                    user_id: 2,
                    accuracy: 100
                  })
Submission.create({
                    wpm: 62,
                    user_id: 3,
                    accuracy: 82
                  })
Submission.create({
                    wpm: 50,
                    user_id: 3,
                    accuracy: 76
                  })
Submission.create({
                    wpm: 34,
                    user_id: 3,
                    accuracy: 100
                  })
Submission.create({
                    wpm: 57,
                    user_id: 3,
                    accuracy: 98
                  })
Submission.create({
                    wpm: 43,
                    user_id: 3,
                    accuracy: 92
                  })
Submission.create({
                    wpm: 49,
                    user_id: 3,
                    accuracy: 94
                  })
Submission.create({
                    wpm: 62,
                    user_id: 3,
                    accuracy: 82
                  })
Submission.create({
                    wpm: 50,
                    user_id: 3,
                    accuracy: 76
                  })
Submission.create({
                    wpm: 34,
                    user_id: 3,
                    accuracy: 100
                  })
Submission.create({
                    wpm: 57,
                    user_id: 3,
                    accuracy: 100
                  })
Submission.create({
                    wpm: 43,
                    user_id: 3,
                    accuracy: 76
                  })
Submission.create({
                    wpm: 49,
                    user_id: 3,
                    accuracy: 94
                  })

#  seeds for keyboards table
Keyboard.create({
                  name: 'GMMK Pro',
                  user_id: 1
                })
Keyboard.create({
                  name: 'Keychron Q1',
                  user_id: 1
                })
Keyboard.create({
                  name: 'Owlab Mr Suit',
                  user_id: 1
                })
Keyboard.create({
                  name: 'QK65',
                  user_id: 2
                })
Keyboard.create({
                  name: 'Zoom 65',
                  user_id: 2
                })
Keyboard.create({
                  name: 'GMMK Pro',
                  user_id: 2
                })
Keyboard.create({
                  name: 'Portico 75',
                  user_id: 2
                })
Keyboard.create({
                  name: 'Apple Butterfly Keyboard',
                  user_id: 3
                })
Keyboard.create({
                  name: 'Mode Sonnet',
                  user_id: 3
                })
Keyboard.create({
                  name: 'Keycult No. 2/65',
                  user_id: 3
                })
puts 'Done'
