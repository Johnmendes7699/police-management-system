// ========================================
// POLICE MANAGEMENT SYSTEM
// Junior Project
// ========================================

const readline = require("readline");
const fs = require("fs");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const dataFile = "officers.json";

let officers = [];
function saveOfficers() {
    fs.writeFileSync(dataFile, JSON.stringify(officers, null, 4));
}
if (fs.existsSync(dataFile)) {
    const data = fs.readFileSync(dataFile, "utf8");

    if (data.trim() !== "") {
        officers = JSON.parse(data);
    }
}
function showMenu() {
    console.log("");
    console.log("========================================");
    console.log("       POLICE MANAGEMENT SYSTEM");
    console.log("========================================");
    console.log("");
   console.log("1. Register Police Officer");
console.log("2. View Police Officers");
console.log("3. Search Police Officer");
console.log("4. Update Police Officer");
console.log("5. Delete Police Officer");
console.log("6. Exit");
    console.log("");

    rl.question("Enter your choice: ", handleMenu);
}

function handleMenu(choice) {

    if (choice === "1") {
        registerOfficer();
    }
    else if (choice === "2") {
        viewOfficers();
    }
    else if (choice === "3") {
        searchOfficer();
    }
  else if (choice === "4") {
    updateOfficer();
}
else if (choice === "5") {
    deleteOfficer();
}
else if (choice === "6") {
    console.log("Goodbye!");
    rl.close();
}
    else {
        console.log("Invalid choice. Please try again.");
        showMenu();
    }
}

function registerOfficer() {

    console.log("");
    console.log("========================================");
    console.log("       REGISTER POLICE OFFICER");
    console.log("========================================");

   rl.question("Enter Officer ID: ", function(id) {

    // Check for an empty Officer ID
    if (id.trim() === "") {
        console.log("Error: Officer ID cannot be empty!");
        showMenu();
        return;
    }
if (!/^[A-Za-z0-9]+$/.test(id)) {
    console.log("Officer ID must contain letters and numbers only.");
    showMenu();
    return;
}
if (id.length < 3) {
    console.log("Officer ID must be at least 3 characters.");
    showMenu();
    return;
}

if (id.length > 10) {
    console.log("Officer ID cannot be more than 10 characters.");
    showMenu();
    return;
}

    // Check for duplicate Officer ID
    const existingOfficer = officers.find(function(officer) {
        return officer.id.toLowerCase() === id.trim().toLowerCase();
    });

    if (existingOfficer) {
        console.log("Error: Officer ID already exists!");
        showMenu();
        return;
    }

    id = id.trim();

    rl.question("Enter First Name: ", function(firstName) {
if (firstName.trim() === "") {
    console.log("First name cannot be empty.");
    showMenu();
    return;
}
if (!/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(firstName.trim())) {
    console.log("First name must contain letters only.");
    showMenu();
    return;
}

            rl.question("Enter Last Name: ", function(lastName) {
if (lastName.trim() === "") {
    console.log("Last name cannot be empty.");
    showMenu();
    return;
}
if (!/^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(lastName.trim())) {
    console.log("Last name must contain letters only.");
    showMenu();
    return;
}

                rl.question("Enter Date of Birth: ", function(dateOfBirth) {
if (dateOfBirth.trim() === "") {
    console.log("Date of birth cannot be empty.");
    showMenu();
    return;
}
if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth.trim())) {
    console.log("Date of birth must use YYYY-MM-DD format.");
    showMenu();
    return;
}
const birthDate = new Date(dateOfBirth.trim());

if (isNaN(birthDate.getTime())) {
    console.log("Please enter a valid date of birth.");
    showMenu();
    return;
}
const today = new Date();

if (birthDate > today) {
    console.log("Date of birth cannot be in the future.");
    showMenu();
    return;
}
const minimumBirthDate = new Date();
minimumBirthDate.setFullYear(minimumBirthDate.getFullYear() - 18);

if (birthDate > minimumBirthDate) {
    console.log("Officer must be at least 18 years old.");
    showMenu();
    return;
}

                    rl.question("Enter Gender: ", function(gender) {
if (gender.trim() === "") {
    console.log("Gender cannot be empty.");
    showMenu();
    return;
}
if (gender.trim().toLowerCase() !== "male" &&
    gender.trim().toLowerCase() !== "female") {
    console.log("Gender must be Male or Female.");
    showMenu();
    return;
}

                        rl.question("Enter Rank: ", function(rank) {
if (rank.trim() === "") {
    console.log("Rank cannot be empty.");
    showMenu();
    return;
}
const validRanks = [
    "constable",
    "first class constable",
    "corporal",
    "sergeant",
    "sub-inspector",
    "inspector",
    "cadet asp",
    "superintendent",
    "commissioner"
];

if (!validRanks.includes(rank.trim().toLowerCase())) {
    console.log("Invalid rank. Please enter a valid police rank.");
    showMenu();
    return;
}
                            rl.question("Enter Department: ", function(department) {
if (department.trim() === "") {
    console.log("Department cannot be empty.");
    showMenu();
    return;
}
const validDepartments = [
    "criminal investigations",
    "traffic",
    "operations",
    "community policing",
    "administration"
];

if (!validDepartments.includes(department.trim().toLowerCase())) {
    console.log("Invalid department. Please enter a valid department.");
    showMenu();
    return;
}

                                rl.question("Enter Phone Number: ", function(phoneNumber) {
if (phoneNumber.trim() === "") {
    console.log("Phone number cannot be empty.");
    showMenu();
    return;
}
if (!/^[0-9]+$/.test(phoneNumber.trim())) {
    console.log("Phone number must contain numbers only.");
    showMenu();
    return;
}
if (phoneNumber.trim().length < 7) {
    console.log("Phone number must contain at least 7 digits.");
    showMenu();
    return;
}
if (phoneNumber.trim().length > 15) {
    console.log("Phone number cannot contain more than 15 digits.");
    showMenu();
    return;
}
const duplicatePhone = officers.find(function(officer) {
    return officer.phoneNumber.trim() === phoneNumber.trim();
});

if (duplicatePhone) {
    console.log("An officer with this phone number already exists.");
    showMenu();
    return;
}
const duplicateOfficer = officers.find(function(officer) {
    return officer.firstName.trim().toLowerCase() === firstName.trim().toLowerCase() &&
           officer.lastName.trim().toLowerCase() === lastName.trim().toLowerCase() &&
           officer.dateOfBirth.trim() === dateOfBirth.trim();
});

if (duplicateOfficer) {
    console.log("An officer with the same name and date of birth already exists.");
    showMenu();
    return;
}
                                    rl.question("Enter Years of Service: ", function(yearsOfService) {
		if (yearsOfService.trim() === "") {
    console.log("Years of service cannot be empty.");
    showMenu();
    return;
}
if (isNaN(yearsOfService.trim())) {
    console.log("Years of service must be a number.");
    showMenu();
    return;
}
if (!Number.isInteger(Number(yearsOfService.trim()))) {
    console.log("Years of service must be a whole number.");
    showMenu();
    return;
}
if (Number(yearsOfService.trim()) < 0) {
    console.log("Years of service cannot be negative.");
    showMenu();
    return;
}
if (Number(yearsOfService.trim()) > 60) {
    console.log("Years of service cannot be more than 60.");
    showMenu();
    return;
}
const currentDate = new Date();

let age = currentDate.getFullYear() - birthDate.getFullYear();

const monthDifference = currentDate.getMonth() - birthDate.getMonth();

if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
     currentDate.getDate() < birthDate.getDate())
) {
    age--;
}

if (Number(yearsOfService.trim()) > age - 18) {
    console.log("Years of service is not valid for the officer's age.");
    showMenu();
    return;
}

                                        const officer = {
                                            id: id,
                                            firstName: firstName,
                                            lastName: lastName,
                                            dateOfBirth: dateOfBirth,
                                            gender: gender,
                                            rank: rank,
                                            department: department,
                                            phoneNumber: phoneNumber,
                                            yearsOfService: yearsOfService
                                        };

                                       officers.push(officer);
saveOfficers();

console.log("");
console.log("Officer registered successfully!");
                                        console.log("");

                                        showMenu();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

function viewOfficers() {

    console.log("");
    console.log("========================================");
    console.log("        POLICE OFFICER LIST");
    console.log("========================================");

   if (officers.length === 0) {
    console.log("");
    console.log("No officers registered yet.");
} else {

    console.log("");
    console.log("Total Officers: " + officers.length);

      [...officers]
  .sort(function(a, b) {
      return a.firstName.localeCompare(b.firstName);
  })
  .forEach(function(officer, index) {
      console.log(`\nOfficer #${index + 1}`);
      console.log("----------------------------");
      console.log("Officer ID: " + officer.id);
      console.log("Name: " + officer.firstName + " " + officer.lastName);
      console.log("Date of Birth: " + officer.dateOfBirth);
      console.log("Gender: " + officer.gender);
      console.log("Rank: " + officer.rank);
      console.log("Department: " + officer.department);
      console.log("Phone: " + officer.phoneNumber);
      console.log("Years of Service: " + officer.yearsOfService);
  });
    }

    showMenu();
}

function searchOfficer() {
    console.log("");
    console.log("========================================");
    console.log("          SEARCH OFFICER");
    console.log("========================================");
    console.log("1. Search by Officer ID");
    console.log("2. Search by First Name");
    console.log("3. Search by Last Name");
    console.log("4. Search by Department");
    console.log("5. Search by phone Number");
    console.log("6. Search by Gender");
    console.log("7. Search by Rank");
    rl.question("Enter your search choice: ", function(choice) {

        if (choice === "1") {

            rl.question("Enter Officer ID: ", function(id) {

               const officer = officers.find(function(officer) {
    return officer.id.trim().toLowerCase() === id.trim().toLowerCase();

                });

           if (officer) {
    console.log("");
    console.log("========================================");
    console.log("          SEARCH RESULT");
    console.log("========================================");

    console.log("");
    console.log("Officer ID: " + officer.id);
    console.log("Name: " + officer.firstName + " " + officer.lastName);
    console.log("Date of Birth: " + officer.dateOfBirth);
    console.log("Gender: " + officer.gender);
    console.log("Rank: " + officer.rank);
    console.log("Department: " + officer.department);
    console.log("Phone: " + officer.phoneNumber);
    console.log("Years of Service: " + officer.yearsOfService);

} else {
    console.log("");
    console.log("========================================");
    console.log("          SEARCH RESULT");
    console.log("========================================");

    console.log("");
    console.log("No officer found with ID: " + id);
}

                showMenu();
            });

        } else if (choice === "2") {

            rl.question("Enter First Name: ", function(firstName) {
if (firstName.trim() === "") {
    console.log("First name cannot be empty.");
    showMenu();
    return;
}

                const results = officers.filter(function(officer) {
                   return officer.firstName.toLowerCase().includes(firstName.trim().toLowerCase());
                });

if (results.length > 0) {
    console.log("");
    console.log("========================================");
    console.log("          SEARCH RESULTS");
    console.log("========================================");
results.forEach(function(officer, index) {
console.log(`\nResult #${index + 1}`);
console.log("----------------------------");
        console.log("");
        console.log("Officer ID: " + officer.id);
        console.log("Name: " + officer.firstName + " " + officer.lastName);
        console.log("Rank: " + officer.rank);
        console.log("Department: " + officer.department);
        console.log("Phone: " + officer.phoneNumber);        console.log("Years of Service: " + officer.yearsOfService);
        console.log("----------------------------------------");
    });
} else {
    console.log("No officers found.");
}

                showMenu();
            });

        } else if (choice === "3") {

            rl.question("Enter Last Name: ", function(lastName) {
if (lastName.trim() === "") {
    console.log("Last name cannot be empty.");
    showMenu();
    return;
}

                const results = officers.filter(function(officer) {
                    return officer.lastName.toLowerCase().includes(lastName.trim().toLowerCase());
                });

        if (results.length > 0) {
    console.log("");
    console.log("========================================");
    console.log("          SEARCH RESULTS");
    console.log("========================================");
results.forEach(function(officer, index) {
console.log(`\nResult #${index + 1}`);
console.log("----------------------------");
        console.log("");
        console.log("Officer ID: " + officer.id);
        console.log("Name: " + officer.firstName + " " + officer.lastName);
        console.log("Rank: " + officer.rank);
        console.log("Department: " + officer.department);
        console.log("Phone: " + officer.phoneNumber);
        console.log("Years of Service: " + officer.yearsOfService);
        console.log("----------------------------------------");
    });
} else {
    console.log("No officers found.");
}

                showMenu();
            });

        } else if (choice === "4") {

            rl.question("Enter Department: ", function(department) {
if (department.trim() === "") {
    console.log("Department cannot be empty.");
    showMenu();
    return;
}

                const results = officers.filter(function(officer) {
                   return officer.department.toLowerCase().includes(department.trim().toLowerCase());
                });

               if (results.length > 0) {
    console.log("");
    console.log("========================================");
    console.log("          SEARCH RESULTS");
    console.log("========================================");
results.forEach(function(officer, index) {
console.log(`\nResult #${index + 1}`);
console.log("----------------------------");
        console.log("");
        console.log("Officer ID: " + officer.id);
        console.log("Name: " + officer.firstName + " " + officer.lastName);
        console.log("Rank: " + officer.rank);
        console.log("Department: " + officer.department);
        console.log("Phone: " + officer.phoneNumber);
        console.log("Years of Service: " + officer.yearsOfService);
        console.log("----------------------------------------");
    });
} else {
    console.log("No officers found.");
}

                showMenu();
            });

             } else if (choice === "5") {

            rl.question("Enter Phone Number: ", function(phoneNumber) {

                if (phoneNumber.trim() === "") {
                    console.log("Phone number cannot be empty.");
                    showMenu();
                    return;
                }

                const results = officers.filter(function(officer) {
                    return officer.phoneNumber.trim() === phoneNumber.trim();
                });

                if (results.length > 0) {
                    console.log("");
                    console.log("========================================");
                    console.log("          SEARCH RESULTS");
                    console.log("========================================");

                    results.forEach(function(officer, index) {
                        console.log(`\nResult #${index + 1}`);
                        console.log("----------------------------");
                        console.log("Officer ID: " + officer.id);
                        console.log("Name: " + officer.firstName + " " + officer.lastName);
                        console.log("Rank: " + officer.rank);
                        console.log("Department: " + officer.department);
                        console.log("Phone: " + officer.phoneNumber);
                        console.log("Years of Service: " + officer.yearsOfService);
                        console.log("----------------------------------------");
                    });

                } else {
                    console.log("No officer found with phone number: " + phoneNumber);
                }

                showMenu();
            });

               } else if (choice === "6") {

            rl.question("Enter Gender: ", function(gender) {

                if (gender.trim() === "") {
                    console.log("Gender cannot be empty.");
                    showMenu();
                    return;
                }

                const results = officers.filter(function(officer) {
                    return officer.gender.trim().toLowerCase() === gender.trim().toLowerCase();
                });

                if (results.length > 0) {
                    console.log("");
                    console.log("========================================");
                    console.log("          SEARCH RESULTS");
                    console.log("========================================");

                    results.forEach(function(officer, index) {
                        console.log(`\nResult #${index + 1}`);
                        console.log("----------------------------");
                        console.log("Officer ID: " + officer.id);
                        console.log("Name: " + officer.firstName + " " + officer.lastName);
                        console.log("Gender: " + officer.gender);
                        console.log("Rank: " + officer.rank);
                        console.log("Department: " + officer.department);
                        console.log("Phone: " + officer.phoneNumber);
                        console.log("Years of Service: " + officer.yearsOfService);
                        console.log("----------------------------------------");
                    });

                } else {
                    console.log("No officers found with gender: " + gender);
                }
                showMenu();
            });
        } else if (choice === "7") {

            rl.question("Enter Rank: ", function(rank) {

                if (rank.trim() === "") {
                    console.log("Rank cannot be empty.");
                    showMenu();
                    return;
                }

                const results = officers.filter(function(officer) {
                    return officer.rank.toLowerCase().includes(rank.trim().toLowerCase());
                });

                if (results.length > 0) {
                    console.log("");
                    console.log("========================================");
                    console.log("          SEARCH RESULTS");
                    console.log("========================================");

                    results.forEach(function(officer, index) {
                        console.log(`\nResult #${index + 1}`);
                        console.log("----------------------------");
                        console.log("Officer ID: " + officer.id);
                        console.log("Name: " + officer.firstName + " " + officer.lastName);
                        console.log("Gender: " + officer.gender);
                        console.log("Rank: " + officer.rank);
                        console.log("Department: " + officer.department);
                        console.log("Phone: " + officer.phoneNumber);
                        console.log("Years of Service: " + officer.yearsOfService);
                        console.log("----------------------------------------");
                    });

                } else {
                    console.log("No officers found with rank: " + rank);
                }

                showMenu();
            });

        } else {

            console.log("Invalid search choice.");
            showMenu();

        }
    });
}
function updateOfficer() {

    console.log("");
    console.log("========================================");
    console.log("          UPDATE OFFICER");
    console.log("========================================");

    rl.question("Enter Officer ID: ", function(id) {

       const officerIndex = officers.findIndex(function(officer) {
    return officer.id.trim().toLowerCase() === id.trim().toLowerCase();

        });

     if (officerIndex === -1) {
    console.log("Officer not found.");
    showMenu();
    return;
}
const officer = officers[officerIndex];

        rl.question("Enter new Department: ", function(department) {
department = department.trim();

const validDepartments = [
    "criminal investigations",
    "traffic",
    "operations",
    "community policing",
    "administration"
];

if (!validDepartments.includes(department.toLowerCase())) {
    console.log("Invalid department. Please enter a valid department.");
    showMenu();
    return;
}

            rl.question("Enter new Rank: ", function(rank) {
rank = rank.trim();

const validRanks = [
    "constable",
    "first class constable",
    "corporal",
    "sergeant",
    "sub-inspector",
    "inspector",
    "cadet asp",
    "superintendent",
    "commissioner"
];
if (!validRanks.includes(rank.toLowerCase())) {
    console.log("Invalid rank. Please enter a valid police rank.");
    showMenu();
    return;
}

               rl.question("Enter new Phone Number: ", function(phoneNumber) {

    phoneNumber = phoneNumber.trim();

    if (!/^[0-9]+$/.test(phoneNumber)) {
        console.log("Phone number must contain numbers only.");
        showMenu();
        return;
    }

    if (phoneNumber.length < 7) {
        console.log("Phone number must contain at least 7 digits.");
        showMenu();
        return;
    }

    if (phoneNumber.length > 15) {
        console.log("Phone number cannot contain more than 15 digits.");
        showMenu();
        return;
    }
const duplicatePhone = officers.find(function(existingOfficer) {
    return existingOfficer.phoneNumber.trim() === phoneNumber &&
           existingOfficer.id.trim().toLowerCase() !== officer.id.trim().toLowerCase();
});

if (duplicatePhone) {
    console.log("An officer with this phone number already exists.");
    showMenu();
    return;
}

    officer.department = department;
    officer.rank = rank;
    officer.phoneNumber = phoneNumber;
		saveOfficers();
console.log("");
console.log("Officer information updated successfully.");
console.log("Officer ID: " + officer.id);
console.log("Name: " + officer.firstName + " " + officer.lastName);
console.log("Rank: " + officer.rank);
console.log("Department: " + officer.department);
console.log("Phone: " + officer.phoneNumber);

                    console.log("");
                    console.log("Officer updated successfully!");

                    showMenu();
                });
            });
        });
    });
}
function deleteOfficer() {

    console.log("");
    console.log("========================================");
    console.log("          DELETE OFFICER");
    console.log("========================================");

    rl.question("Enter Officer ID: ", function(id) {

        const officerIndex = officers.findIndex(function(officer) {
            return officer.id.trim().toLowerCase() === id.trim().toLowerCase();
        });

        if (officerIndex === -1) {
            console.log("Officer not found.");
            showMenu();
            return;
        }

        const officer = officers[officerIndex];

        console.log("");
        console.log("Officer selected for deletion:");
        console.log("Name: " + officer.firstName + " " + officer.lastName);
        console.log("Rank: " + officer.rank);
        console.log("Department: " + officer.department);

        officers.splice(officerIndex, 1);
        saveOfficers();

        console.log("");
        console.log("Officer deleted successfully!");

        showMenu();
    });
}
showMenu();