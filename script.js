const contractAddress = 0x5e9406C6391143e94c39a678c574a1069bFc628e; // Replace with your contract address
const contractABI = [
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

document.addEventListener('DOMContentLoaded', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        console.log('MetaMask connected');
    } else {
        console.log('Please install MetaMask!');
    }

    document.getElementById('voteButton').addEventListener('click', vote);
    document.getElementById('resultsButton').addEventListener('click', getVotes);
});

async function vote() {
    const candidate = document.getElementById('candidate').value;
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const accounts = await web3.eth.getAccounts();
    console.log(`Voting for ${candidate} from account ${accounts[0]}`);

    try {
        await contract.methods.vote(candidate).send({ from: accounts[0] });
        alert('Vote cast successfully!');
    } catch (error) {
        console.error('Error casting vote:', error);
        alert('There was an error casting your vote.');
    }
}

async function getVotes() {
    console.log('Get Votes button clicked');
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const candidates = ["Modi", "Rahul Gandhi", "Kejriwal", "Amit Shah", "Eknath Shinde"];
    const results = document.getElementById('voteResults');
    results.innerHTML = '';

    for (let i = 0; i < candidates.length; i++) {
        try {
            const votes = await contract.methods.getVotes(candidates[i]).call();
            console.log(`${candidates[i]} has ${votes} votes`);
            const li = document.createElement('li');
            li.textContent = `${candidates[i]}: ${votes}`;
            results.appendChild(li);
        } catch (error) {
            console.error(`Error fetching votes for ${candidates[i]}:`, error);
        }
    }
}


