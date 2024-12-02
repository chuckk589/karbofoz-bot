
### Prerequisites

* docker docker-compose [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/chuckk589/karbofoz-bot
   ```
2. Create .env file
   ```sh
    BOT_TOKEN = XXX
    PORT = XXX
    DB_NAME = XXX
    DB_PASSWORD = XXX
    DB_URL= mysql://root:$DB_PASSWORD@mysqldb:3306/$DB_NAME
   ```
3. Build the docker image
   ```sh
    docker compose up -d --build
    ```
4. (First run) Seed database
   ```sh
    docker exec -it karbofoz-bot-app-1 yarn run schema:clean
    ```
