# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Seeding"
User.create({
  name: "Adam Harvey",
  email: "adamgrharvey@gmail.com",
  password: "test"
})
User.create({
  name: "Curtis Warcup",
  email: "curtis.gwarcup@gmail.com",
  password: "test"
})
User.create({
  name: "Max Kuhn",
  email: "maxkuhn@gmail.com",
  password: "test"
})
Submission.create({
  wpm: 200,
  user_id: 1
})
Submission.create({
  wpm: 150,
  user_id: 2
})
Submission.create({
  wpm: 100,
  user_id: 3
})
puts "Done"