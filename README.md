# invoiceReport

##Setup Instructions

All services are dockerized. To run the project, follow these steps:
1- Navigate to the directory where the docker-compose.yaml file is located.

    2- To change the default environment variables, you can modify the .env file in the same directory.

    3- Run the following command to start the services:
    docker-compose up

    4- Once the services are up and running, you can interact with the project via the APIs on port 3000, such as creating invoices and more.

##Testing Instructions

    1- After installing the dependencies using yarn install, you can run the following commands:
        - unit Tests: Use "yarn test" to test each service, such as invoiceService and sendEmail.
        - API Tests: Use "yarn test:e2e" to run end-to-end tests for the APIs.

##Project Technologies

    - Programming Language: The project is primarily written in TypeScript.
    - API Framework: Express is used for building and handling APIs.
    - Testing Framework: Jest is utilized for writing and running unit and end-to-end tests.
