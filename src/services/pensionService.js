/** @format */
import { ethers } from "ethers";
import Web3 from "web3";
import toast from "../utils/toastConfig";
import Emitter from "./emitter";
import {
  hasEthereum,
  getBeimaContract,
  getCurrentNetwork,
  getKovanUSDTContract,
  getActiveWallet,
  getWeb3BeimaContract,
  getWeb3KovanUSDTContract,
} from "./web3Service";

// In Node.js use: const Web3 = require('web3');

export async function createFlexiblePlan(
  coin,
  planIpfs,
  totalApprovedAmount,
  monthlyDeposit,
  lockTime,
  onAddPlan,
  onError
) {
  Emitter.emit("OPEN_LOADER");
  const timeDurationOfDeposit = lockTime;
  try {
    if (!hasEthereum()) return false;
    const network = await getCurrentNetwork();
    if (network && !network.includes("kovan")) return false;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const beimaContract = await getBeimaContract(signer);
    // console.log(monthlyDeposit, typeof monthlyDeposit);
    // monthlyDeposit = ethers.utils.parseEther(monthlyDeposit);
    // Emitter.emit("CLOSE_LOADER");
    await beimaContract.setPlan(
      coin,
      planIpfs,
      totalApprovedAmount,
      monthlyDeposit,
      timeDurationOfDeposit,
      lockTime
    );

    await beimaContract.on("Plan", () => {
      onAddPlan();
      toast.success("A new Flexible Pension Plan was setup successfully");
      Emitter.emit("CLOSE_LOADER");
    });
  } catch (err) {
    console.log("Something went wrong", err);
    let msg = "Something went wrong, please try again later.";
    if (err.code === 4001) msg = "This transaction was denied by you";
    Emitter.emit("CLOSE_LOADER");
    toast.error(msg);
    onError();
  }
}

export async function depositAsset(coinAddress, amount) {
  // Emitter.emit("OPEN_LOADER");
  try {
    if (!hasEthereum()) return false;
    const network = await getCurrentNetwork();
    if (network && !network.includes("kovan")) return false;
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    const address = getActiveWallet();
    const web3 = new Web3(Web3.givenProvider);

    // const KovanUSDTContract = await getKovanUSDTContract(signer);
    const KovanUSDTContract = await getWeb3KovanUSDTContract();
    // console.log(KovanUSDTContract);
    const fromMyWallet = {
      from: address,
      gasLimit: web3.utils.toHex(6000000),
      gasPrice: web3.utils.toHex(90000000000), // use ethgasstation.info (mainnet only)
    };

    const fromMyWallet2 = {
      from: address,
      gasLimit: web3.utils.toHex(500000),
      gasPrice: web3.utils.toHex(90000000000), // use ethgasstation.info (mainnet only)
    };

    const beimaContract = await getWeb3BeimaContract();
    console.log(beimaContract);
    const beimaContractAddress = beimaContract._address;
    const details = await beimaContract.methods
      .pensionServiceApplicant(address)
      .call();
    console.log(details);
    // console.log(beimaContractAddress);
    let monthlyDeposit = details.client.amountToSpend;
    // monthlyDeposit = ethers.utils.parseEther(monthlyDeposit);
    const asset = "0xb7a4F3E9097C08dA09517b5aB877F7a917224ede";
    // console.log(asset);
    console.log(KovanUSDTContract);
    const approve = await KovanUSDTContract.methods
      .approve(beimaContractAddress, monthlyDeposit)
      .send(fromMyWallet2);

    console.log({ approve });
    let options = {
      filter: {
        value: [],
      },
      fromBlock: 0,
    };
    let b = KovanUSDTContract.events
      .Approval(options)
      .on("data", async (event) => {
        console.log({ event });
        b.unsubscribe();
      });
    setTimeout(async() => {
      let bye = await beimaContract.methods
        .deposit(asset, monthlyDeposit)
        .send(fromMyWallet);
      console.log({ bye });
      beimaContract.events.Deposit(options).on("data", (event) => {
        console.log(event);
        bye.unsubscribe();
      });
    }, 15000);

    // await KovanUSDTContract.on("Approval", async (owner, spender, value) => {
    //   console.log({ owner, spender, value });
    //   toast.success("Approved!");
    // });

    // await beimaContract.on("Deposit", () => {
    //   toast.success("Deposit was successful");
    //   Emitter.emit("CLOSE_LOADER");
    // });
  } catch (err) {
    console.log("Something went wrong", err);
    let msg = "Something went wrong, please try again later.";
    if (err.code === 4001) msg = "This transaction was denied by you";
    if (err.code === -32016)
      msg = "You don't have enough funds to complete this transaction";
    Emitter.emit("CLOSE_LOADER");
    toast.error(msg);
  }
}

export async function genAddresses() {
  try {
    if (!hasEthereum()) return false;
    const network = await getCurrentNetwork();
    console.log(window.BinanceChain);
    // if (network && !network.includes("kovan")) return false;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const wallet = ethers.Wallet.createRandom();
    console.log("address:", wallet.address);
    console.log("mnemonic:", wallet.mnemonic.phrase);
    console.log("privateKey:", wallet.privateKey);
  } catch (err) {
    console.log("Something went wrong", err);
    let msg = "Something went wrong, please try again later.";
    if (err.code === 4001) msg = "This transaction was denied by you";
    toast.error(msg);
  }
}
