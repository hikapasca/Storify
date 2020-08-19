# storify

Storify is an application to read story online.

## RESTful endpoints

### GET /stories
> Get all stories

_Request Header_
```
access_token
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
    "id": 6,
    "title": "My Own Story Begins",
    "content": "JADI BEGINI GAES gua tuh kaget qr code lancar",
    "qrCode": "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=JADI BEGINI GAES gua tuh kaget qr code lancar",
    "UserId": 1,
    "updatedAt": "2020-07-09T13:18:56.447Z",
    "createdAt": "2020-07-09T13:18:56.447Z"
    }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```


### GET /stories/:id
> Get stories base on requested id.

_Request Header_
```
access_token
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "id": 6,
    "title": "My Own Story Begins",
    "content": "JADI BEGINI GAES gua tuh kaget qr code lancar",
    "qrCode": "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=JADI BEGINI GAES gua tuh kaget qr code lancar",
    "UserId": 1,
    "updatedAt": "2020-07-09T13:18:56.447Z",
    "createdAt": "2020-07-09T13:18:56.447Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```



### POST /stories
> Create new stories . this action hit API mailGun for email user, and produce QRCode url

Sample Hit API QRCode :
https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=<<stories_content>>

_Request Header_
```
access_token
```

_Request Body_
```
{
    "title": "<title to get insert into>",
    "content": "<content to get insert into>",
}
```

_Response (201)_
```
{
    "id": 6,
    "title": "My Own Story Begins",
    "content": "JADI BEGINI GAES gua tuh kaget qr code lancar",
    "qrCode": "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=JADI BEGINI GAES gua tuh kaget qr code lancar",
    "UserId": 1,
    "updatedAt": "2020-07-09T13:18:56.447Z",
    "createdAt": "2020-07-09T13:18:56.447Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "all input required"
}
```


### LOGIN /users/login
> Login User

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get login>",
  "password": "<password to get login>"
}
```

_Response (201)_
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJiaW1hMTIzQGdtYWlsLmNvbSIsImlhdCI6MTU5NDA0MDIxOX0.4ngkGDY0O8VwYbo1IjNXelY9gH9fa60YoAl_wHziKwo"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```



### REGISTER /users/register
> Register User

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get register into>",
  "password": "<password to get register into>"
}
```

_Response (201)_
```
{
    "id": 3,
    "email": "galih@gmail.com",
    "password": "$2b$08$wyr.W5B2KXpihNdU7A5IXuERvFjEm4nN43n.BPJW7fby5lv/MxI86",
    "updatedAt": "2020-07-06T13:01:52.682Z",
    "createdAt": "2020-07-06T13:01:52.682Z"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```


### LOGIN /googleSignin
> Login User with Google

_Request Header_
```
not needed
```

_Request Body_
```
{
  "id_token": "<token from google>"
}
```

_Response (201)_
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJiaW1hMTIzQGdtYWlsLmNvbSIsImlhdCI6MTU5NDA0MDIxOX0.4ngkGDY0O8VwYbo1IjNXelY9gH9fa60YoAl_wHziKwo"
}
```


