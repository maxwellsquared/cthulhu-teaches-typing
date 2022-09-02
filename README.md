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

Users in the database:
```
 id |     name      |          email           | password | profile_picture |         created_at         |         updated_at
----+---------------+--------------------------+----------+-----------------+----------------------------+----------------------------
  1 | Adam Harvey   | adamgrharvey@gmail.com   | test     |                 | 2022-09-02 20:37:48.972712 | 2022-09-02 20:37:48.972712
  2 | Curtis Warcup | curtis.gwarcup@gmail.com | test     |                 | 2022-09-02 20:37:48.974932 | 2022-09-02 20:37:48.974932
  3 | Max Kuhn      | maxkuhn@gmail.com        | test     |                 | 2022-09-02 20:37:48.976708 | 2022-09-02 20:37:48.976708
```


## Routes to know

Test if a user is in the db:

In terminal
```bash
curl POST http://localhost:3000/login -H 'Content-Type: application/json' -d '{"password":"test","email":"adamgrharvey@gmail.com"}' -v
```
> Returns the user object if the user is in the db

