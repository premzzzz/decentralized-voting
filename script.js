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
    } else {
        console.log('Please install MetaMask!');
    }
});

async function vote() {
    const candidate = document.getElementById('candidate').value;
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const accounts = await web3.eth.getAccounts();
    await contract.methods.vote(candidate).send({ from: accounts[0] });
}

async function getVotes() {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const candidates = ["Modi", "Rahul Gandhi", "Kejriwal", "Amit Shah", "Eknath Shinde"];
    const results = document.getElementById('voteResults');
    results.innerHTML = '';

    for (let i = 0; i < candidates.length; i++) {
        const votes = await contract.methods.getVotes(candidates[i]).call();
        const li = document.createElement('li');
        li.textContent = `${candidates[i]}: ${votes}`;
        results.appendChild(li);
    }
}
