const uc = require("./usersCtrl");

const express = require("express");

const app = express();
app.use(express.json());

const SERVER_PORT = 3000

//get endpoints
app.get('/api/user', uc.getUser)
app.get('/api/user/:userId', uc.getUserId)
app.get('/api/admin', uc.isAdmin)
app.get('/api/nonadmin', uc.notAdmin)
app.get('/api/type/:userType', uc.userType)

//put endpoints
app.put('/api/user/:userId', uc.editUsers)

//delete endpoints
app.delete('/api/user/:userId', uc.deleteUser)

//post endpoints
app.post('/api/user', uc.postUser)

app.listen(SERVER_PORT, () =>
  console.log(`this server... it's over ${SERVER_PORT}`)
);
