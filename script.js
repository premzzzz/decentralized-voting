window.addEventListener('load', function() {
    // Check if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use the browser's ethereum provider
        web3 = new Web3(web3.currentProvider);
    } else {
        console.log('No web3? You should consider trying MetaMask!');
        // Fallback to localhost; use dev console port by default...
        web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }

    // Your smart contract address and ABI
    const contractAddress = 'YOUR_SMART_CONTRACT_ADDRESS';
    const abi = [
        // Your ABI array here
    ];

    const contract = new web3.eth.Contract(abi, contractAddress);

    // Event listener for vote button
    document.getElementById('voteButton').addEventListener('click', async function() {
        const candidate = document.getElementById('candidate').value;
        const accounts = await web3.eth.getAccounts();
        contract.methods.vote(candidate).send({ from: accounts[0] })
            .on('receipt', function(receipt) {
                console.log('Vote successful!', receipt);
            })
            .on('error', function(error) {
                console.error('Vote failed!', error);
            });
    });

    // Event listener for results button
    document.getElementById('resultsButton').addEventListener('click', async function() {
        const votes = await contract.methods.getVotes().call();
        const resultsElement = document.getElementById('voteResults');
        resultsElement.innerHTML = '';
        for (const candidate in votes) {
            const listItem = document.createElement('li');
            listItem.textContent = `${candidate}: ${votes[candidate]} votes`;
            resultsElement.appendChild(listItem);
        }
    });
});

