// Ensure Web3 is loaded
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
}

// Initialize Web3
const Web3 = require('web3');
const web3 = new Web3(window.ethereum);

// Contract ABI and Address
const contractABI = [ /* ABI from your compiled contract */];
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address

const healthRecordsContract = new web3.eth.Contract(contractABI, contractAddress);

window.addRecord = async function () {
    const accounts = await web3.eth.requestAccounts();
    const patientName = document.getElementById('addPatientName').value;
    const diagnosis = document.getElementById('addDiagnosis').value;
    const age = document.getElementById('addAge').value;
    const gender = document.getElementById('addGender').value;
    const staffId = document.getElementById('addStaffId').value;

    await healthRecordsContract.methods.addRecord(patientName, diagnosis, age, gender, staffId)
        .send({ from: accounts[0] });
};

window.getRecord = async function () {
    const accounts = await web3.eth.requestAccounts();
    const patientName = document.getElementById('retrievePatientName').value;
    const staffId = document.getElementById('retrieveStaffId').value;

    const record = await healthRecordsContract.methods.getRecord(patientName, staffId).call();
    document.getElementById('recordDetails').innerText =
        `Name: ${record.name}, Diagnosis: ${record.diagnosis}, Age: ${record.age}, Gender: ${record.gender}`;
};

window.deleteRecord = async function () {
    const accounts = await web3.eth.requestAccounts();
    const patientName = document.getElementById('deletePatientName').value;
    const staffId = document.getElementById('deleteStaffId').value;

    await healthRecordsContract.methods.deleteRecord(patientName, staffId)
        .send({ from: accounts[0] });
};
