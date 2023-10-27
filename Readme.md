# Bot Operations

This service is responsible for all bot operation which includes 
* creation of bots.
* creation of flows.
* updating bot information like name, image & theme etc.,
* adding whatsapp api keys for a bot.
* upload files and media end points.


#### File Structure
```
    .
    ├── constants/                         # this folder contains the encryption keys along with any static data
    │   └── *                              # all the default files
    ├── src/                               # the root or main folder of project
    │   ├── helpers/                       # this folder contains all the required helper/resuable function
    │   │   └── *                          # all the default files
    │   │
    │   ├── models/                        # this folder contains the list of models
    │   │   └── *.model.js                 # all the default files
    │   │
    │   ├── routes/                        # this folder contains the list of routes
    │   │   └── *                          # all the default files
    │   │
    │   └── app.js                         # primary point of express routes.
    │  
    ├── .env                               # stores environment varaibles
    │  
    └── server.js                          # this is the entry point of server
```

