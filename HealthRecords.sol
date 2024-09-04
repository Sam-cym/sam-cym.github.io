// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract HealthDataManagement {
    struct Patient {
        string name;
        uint age;
        string gender;
        string diagnosis;
    }

    mapping(string => Patient) private patients;
    mapping(address => bool) private authorizedIDs;

    // Constructor to initialize authorized addresses
    constructor() {
        authorizedIDs [0x31cDdd213C4c8B57713608A28DcC0fc718A4b839] = true; // Metamask address
        
     
    }

    // Modifier to check if the sender is authorized
    modifier onlyAuthorized() {
        require(authorizedIDs[msg.sender], "Unauthorized access");
        _;
    }

    // Add a new patient record
    function addPatient(string memory name, uint age, string memory gender, string memory diagnosis) public onlyAuthorized {
        patients[name] = Patient(name, age, gender, diagnosis);
    }

    // Retrieve a patient record
    function getPatient(string memory name) public view returns (string memory, uint, string memory, string memory) {
        Patient memory patient = patients[name];
        return (patient.name, patient.age, patient.gender, patient.diagnosis);
    }

    // Update a patient record
    function updatePatient(string memory name, uint age, string memory gender, string memory diagnosis) public onlyAuthorized {
        require(bytes(patients[name].name).length != 0, "Patient record does not exist");
        patients[name] = Patient(name, age, gender, diagnosis);
    }

    // Delete a patient record
    function deletePatient(string memory name) public onlyAuthorized {
        require(bytes(patients[name].name).length != 0, "Patient record does not exist");
        delete patients[name];
    }
}
