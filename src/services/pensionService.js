/** @format */
import { ethers } from "ethers";
import toast from "../utils/toastConfig";
import Emitter from "./emitter";
import {
  hasEthereum,
  getBeimaContract,
  getCurrentNetwork,
  getKovanUSDTContract,
  getActiveWallet,
} from "./web3Service";

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
  Emitter.emit("OPEN_LOADER");
  try {
    if (!hasEthereum()) return false;
    const network = await getCurrentNetwork();
    if (network && !network.includes("kovan")) return false;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = getActiveWallet();

    const KovanUSDTContract = await getKovanUSDTContract(signer);
    console.log(KovanUSDTContract);
    const beimaContract = await getBeimaContract(signer);
    const beimaContractAddress = beimaContract.address;
    const details = await beimaContract.pensionServiceApplicant(address);
    console.log(beimaContractAddress);
    let monthlyDeposit = details.client.amountToSpend.toString();
    monthlyDeposit = ethers.utils.parseEther(monthlyDeposit);
    const asset = details.client.underlyingAsset;
    console.log(asset);

    const a = await KovanUSDTContract.approve(
      beimaContractAddress,
      monthlyDeposit
    );
    console.log({ a });
    await beimaContract.deposit(asset, monthlyDeposit);

    await beimaContract.on("Deposit", () => {
      toast.success("Deposit was successful");
      Emitter.emit("CLOSE_LOADER");
    });
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
