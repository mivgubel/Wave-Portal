const main = async () => {
	//const [owner, randomPerson] = await hre.ethers.getSigners();
	const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
	//deployamos y fondeamos el contrato
	const waveContract = await waveContractFactory.deploy({
		value: hre.ethers.utils.parseEther("0.1"),
	});
	await waveContract.deployed();
	console.log("Contract Deployed to: ", waveContract.address);
	//console.log("Contract deployed by:", owner.address);
	/*
	 * Get Contract balance
	 */
	let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
	console.log("Contract Balance: ", hre.ethers.utils.formatEther(contractBalance));

	let waveCount;
	waveCount = await waveContract.getTotalWaves();
	console.log(waveCount.toNumber());

	/**
	 * Let's send a few waves!
	 */
	let waveTxn = await waveContract.wave("A message 1!");
	await waveTxn.wait(); // Wait for the transaction to be mined

	let waveTxn2 = await waveContract.wave("A message 2!");
	await waveTxn2.wait();
	/*
	 * Get Contract balance to see what happened!
	 */
	contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
	console.log("Contract Balance -- ", hre.ethers.utils.formatEther(contractBalance));
	/*
	const [_, randomPerson] = await hre.ethers.getSigners();
	waveTxn = await waveContract.connect(randomPerson).wave("Another message");
	await waveTxn.wait(); // Wait for the transaction to be mined
*/
	let allWaves = await waveContract.getAllWaves();
	console.log(allWaves);
};

const runMain = async () => {
	try {
		await main();
		process.exit(0); // exit Node process without error
	} catch (error) {
		console.log(error);
		process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
	}
};

runMain();
