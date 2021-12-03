/** @format */
import { ethers } from "ethers";
import {
  getActiveWallet,
  hasEthereum,
  getBeimaContract,
  getCurrentNetwork,
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
  const timeDurationOfDeposit = lockTime;
  try {
    if (!hasEthereum()) return false;
    const network = await getCurrentNetwork();
    if (network && !network.includes("Kovan")) return false;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const beimaContract = await getBeimaContract(signer);
    const address = getActiveWallet();
    console.log(address);

    await beimaContract.setPlan(
      coin,
      planIpfs,
      totalApprovedAmount,
      monthlyDeposit,
      timeDurationOfDeposit,
      lockTime
    );

    await beimaContract.on("Plan", onAddPlan);
  } catch (err) {
    console.log("Something went wrong", err);
    onError();
  }
}