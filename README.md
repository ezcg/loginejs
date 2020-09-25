- Set up google credentials for project. In the Credentials section of the Google Developer Console, create an OAuth Client ID credential of type Web Application. 
https://console.developers.google.com/apis/credentials

- Update configs in /app/config/ directory. For each .config.example.js file, create a new file but without the '.example' part in the file name. Eg. db.config.example.js becomes db.config.js. 

- Update the new files with your config values and do not commit to your repo. db.config.example.js should work without modification but for the file name change.

- Open your terminal, cd to the root directory of /login/ and run:
docker-compose up

- When it's done building, in a new terminal window, run:
docker exec -it db bash -c "bash /mysql/docker_init_mysql.sh"


