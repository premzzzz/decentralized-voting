// Ensure this script is loaded after Web3.js and your HTML is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    let web3;
    let contract;

    // Initialize Web3
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(function() {
                console.log('Web3 initialized');
                initializeContract();
            })
            .catch(function(error) {
                console.error('User denied account access', error);
            });
    } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
        console.log('Web3 initialized');
        initializeContract();
    } else {
        console.log('No Web3 provider found. Please install MetaMask!');
    }

    // Function to initialize the contract
    function initializeContract() {
        // Replace with your contract ABI and address
        const abi = [
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "candidateNames",
				"type": "string[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "candidate",
				"type": "string"
			}
		],
		"name": "vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "candidates",
		"outputs": [
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
				"name": "candidate",
				"type": "string"
			}
		],
		"name": "getVotes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
        const contractAddress = '0x5e9406C6391143e94c39a678c574a1069bFc628e'; // Replace with your contract address

        contract = new web3.eth.Contract(abi, contractAddress);

        // Add event listeners for buttons
        document.getElementById('voteButton').addEventListener('click', vote);
        document.getElementById('resultsButton').addEventListener('click', getVotes);
    }

    // Function to vote
    function vote() {
        const selectedCandidate = document.getElementById('candidate').value;
        web3.eth.getAccounts().then(function(accounts) {
            const account = accounts[0];
            contract.methods.voteForCandidate(selectedCandidate)
                .send({ from: account })
                .then(function(receipt) {
                    console.log('Vote successful', receipt);
                })
                .catch(function(error) {
                    console.error('Error voting', error);
                });
        });
    }

    // Function to get votes
    function getVotes() {
        contract.methods.getVotes().call()
            .then(function(result) {
                const voteResults = document.getElementById('voteResults');
                voteResults.innerHTML = ''; // Clear previous results
                result.forEach(function(candidate) {
                    const li = document.createElement('li');
                    li.textContent = `${candidate.name}: ${candidate.voteCount}`;
                    voteResults.appendChild(li);
                });
            })
            .catch(function(error) {
                console.error('Error getting votes', error);
            });
    }
});

