window.addEventListener('load', async () => {
    
    // Check if Ethereum provider (MetaMask) is installed
    if (window.ethereum) {
        // Create a Web3 instance
        const web3 = new Web3(window.ethereum);
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Smart contract ABI and address
        const contractABI = [
            {
              "inputs": [],
              "stateMutability": "nonpayable",
              "type": "constructor"
            },
            {
              "inputs": [
                {
                  "internalType": "string",
                  "name": "name",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "age",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "gender",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "diagnosis",
                  "type": "string"
                }
              ],
              "name": "addPatient",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "string",
                  "name": "name",
                  "type": "string"
                }
              ],
              "name": "getPatient",
              "outputs": [
                {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "string",
                  "name": "name",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "age",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "gender",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "diagnosis",
                  "type": "string"
                }
              ],
              "name": "updatePatient",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "string",
                  "name": "name",
                  "type": "string"
                }
              ],
              "name": "deletePatient",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          ];
        const contractAddress = '0x31cDdd213C4c8B57713608A28DcC0fc718A4b839';
        const contract = new web3.eth.Contract(contractABI, contractAddress);

        // Get the user's account
        const account = (await web3.eth.getAccounts())[0];

        // Add patient button click handler
        document.getElementById('addPatientButton').addEventListener('click', async () => {
            const name = document.getElementById('name').value;
            const age = parseInt(document.getElementById('age').value);
            const gender = document.getElementById('gender').value;
            const diagnosis = document.getElementById('diagnosis').value;

            try {
                await contract.methods.addPatient(name, age, gender, diagnosis).send({ from: account });
                alert('Patient added successfully!');
            } catch (error) {
                console.error('Error adding patient:', error);
                alert('Failed to add patient. Check console for details.');
            }
        });

        // Get patient button click handler
        document.getElementById('getPatientButton').addEventListener('click', async () => {
            const name = document.getElementById('getName').value;

            try {
                const patient = await contract.methods.getPatient(name).call();
                document.getElementById('patientInfo').innerText = `Name: ${patient[0]}, Age: ${patient[1]}, Gender: ${patient[2]}, Diagnosis: ${patient[3]}`;
            } catch (error) {
                console.error('Error retrieving patient:', error);
                alert('Failed to retrieve patient. Check console for details.');
            }
        });

        // Update patient button click handler
        document.getElementById('updatePatientButton').addEventListener('click', async () => {
            const name = document.getElementById('updateName').value;
            const age = parseInt(document.getElementById('updateAge').value);
            const gender = document.getElementById('updateGender').value;
            const diagnosis = document.getElementById('updateDiagnosis').value;

            try {
                await contract.methods.updatePatient(name, age, gender, diagnosis).send({ from: account });
                alert('Patient updated successfully!');
            } catch (error) {
                console.error('Error updating patient:', error);
                alert('Failed to update patient. Check console for details.');
            }
        });

        // Delete patient button click handler
        document.getElementById('deletePatientButton').addEventListener('click', async () => {
            const name = document.getElementById('deleteName').value;

            try {
                await contract.methods.deletePatient(name).send({ from: account });
                alert('Patient deleted successfully!');
            } catch (error) {
                console.error('Error deleting patient:', error);
                alert('Failed to delete patient. Check console for details.');
            }
        });

    } else {
        alert('Please install MetaMask!');
    }
});
