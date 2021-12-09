import { ethers } from "ethers";
import { BeimaAbi } from "../contracts/abis";
import { BeimaContractAddress, RinkebyUSDTContractAddress } from "../utils";

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

export function listenToAccountChanges(handler) {
  if (!hasEthereum()) return false;

  window.ethereum.on("accountsChanged", async (accounts) => {
    handler(accounts[0]);
  });
}

export async function unmountEthListeners() {
  window.ethereum.removeListener("accountsChanged", () => {});
  window.ethereum.removeListener("message", () => {});
}

export async function getBeimaContract(signer) {
  try {
    if (!hasEthereum()) return false;

    return new ethers.Contract(BeimaContractAddress, BeimaAbi.abi, signer);
  } catch (err) {
    console.log("failed to load contract", err);
  }
}

export async function getRinkebyUSDTContract(signer) {
  try {
    if (!hasEthereum()) return false;
    const USDTAbi = await fetch(
      "https://api.rinkeby.etherscan.io/api?module=contract&action=getabi&address=0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02"
    ).then((r) => r.json());
    return new ethers.Contract(
      RinkebyUSDTContractAddress,
      USDTAbi.result,
      signer
    );
  } catch (err) {
    console.log("failed to load contract", err);
  }
}
