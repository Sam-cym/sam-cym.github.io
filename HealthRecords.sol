// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthRecords {
    // Structure to store patient records
    struct PatientRecord {
        string name;
        string diagnosis;
        uint age;
        string gender;
    }

    // Mapping to store patient records
    mapping(string => PatientRecord) private records;

    // Mapping to track authorized staff
    mapping(string => bool) private authorizedStaff;

    // Define staff IDs
    string private constant STAFF_ID_RIHANNA_ASAP = "RihannaAsap";
    string private constant STAFF_ID_BROWN_SKIN = "BrownSkin";
    string private constant STAFF_ID_COOL_APACHE = "CoolApache";
    string private constant STAFF_ID_RED_ROSES = "RedRoses";

    constructor() {
        // Initialize with authorized staff IDs
        authorizedStaff[STAFF_ID_RIHANNA_ASAP] = true;
        authorizedStaff[STAFF_ID_BROWN_SKIN] = true;
        authorizedStaff[STAFF_ID_COOL_APACHE] = true;
        authorizedStaff[STAFF_ID_RED_ROSES] = true;
    }

    // Modifier to check if caller is authorized
    modifier onlyAuthorized(string memory staffId) {
        require(authorizedStaff[staffId], "Not authorized");
        _;
    }

    // Function to add a new patient record
    function addRecord(
        string memory patientName,
        string memory diagnosis,
        uint age,
        string memory gender,
        string memory staffId
    ) public onlyAuthorized(staffId) {
        records[patientName] = PatientRecord(
            patientName,
            diagnosis,
            age,
            gender
        );
    }

    // Function to retrieve a patient record
    function getRecord(
        string memory patientName,
        string memory staffId
    ) public view onlyAuthorized(staffId) returns (PatientRecord memory) {
        return records[patientName];
    }

    // Function to delete a patient record
    function deleteRecord(
        string memory patientName,
        string memory staffId
    ) public onlyAuthorized(staffId) {
        delete records[patientName];
    }
}
