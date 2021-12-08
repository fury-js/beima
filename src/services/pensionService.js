/** @format */
import { parseEther } from "@ethersproject/units";
import { ethers } from "ethers";
import toast from "../utils/toastConfig";
import Emitter from "./emitter";
import {
  hasEthereum,
  getBeimaContract,
  getCurrentNetwork,
  getActiveWallet,
  getRinkebyUSDTContract,
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
    console.log({ totalApprovedAmount });

    const RinkebyUSDTContract = await getRinkebyUSDTContract(signer);
    await RinkebyUSDTContract.approve(
      beimaContract.address,
      parseEther(totalApprovedAmount).toString()
    );
    await RinkebyUSDTContract.on("Approval", () => {
      toast.success("Approval was successful");
    });

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

export async function depositAsset(onSuccess) {
  Emitter.emit("OPEN_LOADER");
  try {
    if (!hasEthereum()) return false;
    const network = await getCurrentNetwork();
    if (network && !network.includes("rinkeby")) return false;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await getActiveWallet();

    const beimaContract = await getBeimaContract(signer);
    const details = await beimaContract.pensionServiceApplicant(address);

    let monthlyDeposit = details.client.amountToSpend.toString();
    const cAsset = details.client.underlyingAsset;
    const asset = await beimaContract.getAssetAddress(cAsset);

    await beimaContract.depositToken(
      asset,
      parseEther(monthlyDeposit).toString()
    );

    await beimaContract.on("Deposit", () => {
      toast.success("Deposit was successful");
      Emitter.emit("CLOSE_LOADER");
      onSuccess(monthlyDeposit);
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
