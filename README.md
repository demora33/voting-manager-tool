# Voting Manager Tool

## Description
Voting Manager Tool is a voting management application that leverages a Solidity smart contract, a back-end service, and a front-end application.

## Features

### Smart Contract
The smart contract, developed in Solidity and deployed on the Ethereum network, implements a voting mechanism. This contract allows for the creation of votes, casting of votes, and conclusion of voting. Additionally, it emits events for each of these actions.

### Back-end Service
The back-end service is responsible for listening to the events emitted by the smart contract. It also provides RESTful APIs that serve the event data to the front-end.

### TheGraph Subgraph
The application integrates a subgraph using TheGraph for indexing blockchain data. This allows for efficient querying of blockchain events and data, enhancing the performance and user experience of the application.

### Front-end Application
The front-end application is responsible for displaying the events from the smart contract. This application has been modified to fetch event data from the back-end API instead of directly from the blockchain. The user interface is user-friendly and displays real-time updates.

### Testing and Documentation
Unit tests have been written for the smart contract and for the API endpoints. Comprehensive documentation is provided, including setup instructions for the smart contract, back-end service, and front-end application.

## Evaluation Criteria

- **Correctness:** Functionality of the smart contract, back-end service, and front-end application as per requirements.
- **Code Quality:** Cleanliness, readability, and documentation of the code.
- **Security:** Implementation of smart contract security best practices.
- **API Design:** Clarity and ease of use of the RESTful API.
- **User Interface:** Simplicity and effectiveness of the front-end UI.

## Installation and Running Guide
1. Clone the GitHub repository.
2. Follow the setup and running instructions for the smart contract, back-end service, and front-end application provided in the documentation.

## Contribution
To contribute to this project, please fork the repository and propose your changes via a pull request.

## License
This project is licensed under the terms of the MIT license.