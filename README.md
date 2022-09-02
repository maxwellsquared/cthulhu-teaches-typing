# cthulhu-teaches-typing

## Good to knows

Start Rails server:
```
rails server
```

Reset the db:
```
/cd into backend/typing
rails db:drop
rails db: setup
```


## Routes to know

Test if a user is in the db:

In terminal
```bash
curl POST http://localhost:3000/login -H 'Content-Type: application/json' -d '{"password":"test","email":"adamgrharvey@gmail.com"}' -v
```
> Returns the user object if the user is in the db