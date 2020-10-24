# empportal nagp

### Steps to start app
```
1. git clone <repo-url>
2. cd empportal
3. npm start   or  node app.js
```

### Configurations
Base Url: 
```
http://localhost:<port> 
or
http://127.0.0.1:<port> 
```

Default Port: 3000  (to set user port use process.env.PORT variable)
### Ejs Routes:
```
1.	/register
2.	/login
3.	/logout
4.	/jobs
5.	/jobs/create
6.	/jobs/update/:jobId
7.	/jobs/:jobId
```

### Apis
#### To create new user
Method: POST     
Path: /api/user/register

Request JSON: 
```
{
    "username": "manager",   // required
    "password": "manager",   // required
    "role": "MNG"	// if not mentioned default EMP role is assigned
}
```
Response: 
```
{
    "_id": "123",
    "username": "manager",
    "role": "MNG",
    "token": "token"
}
```

#### To login with current user
Method: POST     
Path: /api/user/login
Request
```
{
    "username": "manager",   // required
    "password": "manager",   // required
}
```
Response
```
{
    "_id": "123",
    "username": "manager",
    "role": "MNG",
    "token": "token"
}
```

#### To create new job
Method: POST     
Path: /api/jobs
##### Authorization header should have token
Request 
```
{
    "projectName": "project",  // required
    "clientName": "client",    // required
    "technologies": "react",    // required
    "role": "dev",    // required
    "description": "good job",    // required
    "active": false    // required
}
```
Response
```
{
    "_id": "123",
    "projectName": "project",
    "clientName": "client",
    "technologies": "react",
    "role": "dev",
    "description": "good job",
    "active": false,
    “createdBy”: “<user-id>”
}
```
#### To update current job
Method: PUT     
Path: /api/jobs
Authorization header should have token 
Request
```
{
   "projectName": "project",  // required
    "clientName": "client",    // required
    "technologies": "react",    // required
    "role": "dev",    // required
    "description": "good job",    // required
    "active": false    // required 
}
 ```

Response
```
{
   “_id”: “123123”
   "projectName": "project", 
    "clientName": "client",  
    "technologies": "react",
    "role": "dev",    
    "description": "good job",    
    "active": false,
    “createdBy”: “<user-id>”
}
```
#### To get all jobs
Method: GET    
Path: /api/jobs
Authorization header should have token
Response
```
[
    {
        "_id": "43",
        "projectName": "project",
        "technologies": "react",
        "role": "sdf"
    }
]
```
#### To get particular job
Method: GET  
Path: /api/jobs/job-id
Authorization header should have token
Response
```
{
        "_id": "123",
        "projectName": "project",
       "clientName": "cco",
       "technologies": "react",
       "role": "dddddd",
       "description": "dd",
       "active": false,
	     “createdBy”: “1d23”
}
```

#### To apply for job
Method: GET    
Path: /api/jobs/apply/job-id
Authorization header should have token
Response
```
{
        "_id": "lsdkfm",
        "jobId”: “123”,
	      “userId”: “1232”
}
```


