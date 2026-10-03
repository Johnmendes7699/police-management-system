# Police Management System

## Junior Project

A command-line Police Management System built with **Node.js** and **JavaScript**.

The system allows users to register, view, search, update, and delete police officer records.

## Features

* Register police officers
* Validate officer information
* Prevent duplicate Officer IDs
* Prevent duplicate phone numbers
* View all registered officers
* Sort officers alphabetically by first name
* Search officers by:

  * Officer ID
  * First Name
  * Last Name
  * Department
  * Phone Number
  * Gender
  * Rank
* Partial rank searching
* Update officer information
* Delete officer records
* Save officer data to a JSON file
* Load saved officer data when the program starts
* Handle invalid or nonexistent Officer IDs safely

## Technologies Used

* Node.js
* JavaScript
* JSON
* Node.js `readline` module
* Node.js `fs` module

## Project Files

### `app.js`

Contains the main Police Management System program.

### `officers.json`

Stores registered police officer information so that data remains available after the program is closed and restarted.

## How to Run

1. Open Command Prompt.
2. Navigate to the project folder:

```text
C:\Users\kioskUser0\OneDrive\Desktop\police-management-system
```

3. Start the program:

```text
node app.js
```

## Main Menu

```text
1. Register Police Officer
2. View Police Officers
3. Search Police Officer
4. Update Police Officer
5. Delete Police Officer
6. Exit
```

## Data Storage

Officer records are stored in `officers.json`.

The application automatically loads existing records when it starts and saves changes whenever officer information is added, updated, or deleted.

## Project Status

The main Police Management System functions have been implemented and tested successfully.
