
The root folder contains a node.js server using express. To run the server, follow these steps:
1. Clone the repo on your system
2. cd to node-rest-api
3. Open a terminal within the /root folder
4. Run npm install to install all the depedencies
5. run npm sequelize-cli db:migrate
6. Run node index to start the server
The application should connect to the default server port (3042) automatically!

#Swagger doc route
localhost:3000/api/doc

#postman doc 
https://documenter.getpostman.com/view/23642643/2s9Y5ctLEo

#recorded video explaining the deployment on kubernetes: 
https://www.loom.com/share/721eaf5518dd4cc68c0fe9d39491189d?sid=89762ed3-3016-4858-bf55-1e839043490d 
Hint - Use nodemon instead of node to automatically restart the server on any changes.
