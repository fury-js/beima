import Web3 from "web3";

import { ethers } from "ethers";
import { BeimaAbi, KovanUSDTAbi } from "../contracts/abis";
import { BeimaContractAddress, KovanUSDTContractAddress } from "../utils";

export const connectToMetaMask = async (setError) => {
  try {
    if (!hasEthereum()) return false;

    await window.ethereum.request({ method: "eth_requestAccounts" });

    return true;
  } catch (error) {
    console.log(error);
    if (setError) setError(error.message ?? error.toString());
    return { error };
  }
};

export function getActiveWallet() {
  if (!hasEthereum()) return false;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = signer.provider.provider.selectedAddress;
  return address;
}

export function hasEthereum() {
  return window.ethereum ? true : false;
}

export async function getCurrentNetwork() {
  if (!hasEthereum()) return false;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const network = (await signer.provider._networkPromise).name;
  return network;
}

/**
 * Web3 Service function to listen to and detect account changes
 * @param {*} handler
 * @returns
 */
export function listenToAccountChanges(handler) {
  if (!hasEthereum()) return false;

  window.ethereum.on("accountsChanged", async (accounts) => {
    handler(accounts[0]);
  });
}

/**
 * Web3 Service function to unmount ETH listeners from browser
 * @returns {Promise<void>}
 */
export async function unmountEthListeners() {
  window.ethereum.removeListener("accountsChanged", () => {});
  window.ethereum.removeListener("message", () => {});
}

/**
 * Web3 Service function to load contract
 * @param {*} signer
 * @returns
 */
export async function getBeimaContract(signer) {
  try {
    if (!hasEthereum()) return false;

    return new ethers.Contract(BeimaContractAddress, BeimaAbi.abi, signer);
  } catch (err) {
    console.log("failed to load contract", err);
  }
}

export async function getWeb3BeimaContract() {
  try {
    if (!hasEthereum()) return false;
    const web3 = new Web3(Web3.givenProvider)

    return new web3.eth.Contract(BeimaAbi.abi, BeimaContractAddress)

  } catch (err) {
    console.log("failed to load contract", err);
  }
}

export async function getKovanUSDTContract(signer) {
  try {
    if (!hasEthereum()) return false;

    return new ethers.Contract(KovanUSDTContractAddress, KovanUSDTAbi, signer);
  } catch (err) {
    console.log("failed to load contract", err);
  }
}

export async function getWeb3KovanUSDTContract() {
  try {
    if (!hasEthereum()) return false;
    const web3 = new Web3(Web3.givenProvider)

    return new web3.eth.Contract(KovanUSDTAbi, KovanUSDTContractAddress)
  } catch (err) {
    console.log("failed to load contract", err);
  }
}
