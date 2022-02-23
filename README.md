# LMS-Dashboard
Build a dashboard for student, instructor and Admin roles and can be suitably used by the institue
#### Sign-up :
- user can signup by visiting at http://localhost:3000/signin url, using the following Schema 
```js
    "name": "abcd",
    "email": "abc@mail.com",
    "password": "abcd1234",
    "profile_photo_url": "ilmage url",
    "roles" : ["student","admin","instructor"]
```
- user can signin on the http://localhost:3000/signin url by making a post request of the following data
```js
    "email" : "abc@mail.com",
    "password" : "abcd1234"
```
- The above sign in will generate the token copy that token and paste it into the Header as value of key "authorization"
```js
  authorixation : Bearer token
```
- NOTE : The above operation will authenticate the user to access the all users data and perform any operation if he is authorized for that paricular operation

- User can create students  by makeing a post request at http://localhost:3000/students with the following schema
```js
  "roll_number" : "put_title_name_here",
  "user" : "put author_id that you recieved while signing in here"
  "batch" : "put_batch_name_here"
```

- User can create lectures  by makeing a post request at http://localhost:3000/lectures with the following schema
```js
  "title" : "put_title_name_here",
  "author_id" : "put author_id that you recieved while signing in here"
  "batch" : "put_batch_name_here"
```
- User can update lectures  by making a patch request at http://localhost:3000/lectures/:lecture_id with the following schema
```js
  "title" : "put_updated_title_here",
  "author_id" : "put author_id here you recieved while signing in",
  "batch" : "put the updated batch_name here"
```
- User can delete lectures  by making a delete request at http://localhost:3000/lectures/:lecture_id with the following schema, if he is able to pass the authorization then lecture will be delted else it will display that you doesn't have the right permission 
```
    "author_id" : "put author_id here you recieved while signing in"
```
- User can view lectures by id by making a get request at http://localhost:3000/lectures/:lecture_id
