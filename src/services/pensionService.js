import { parseEther, formatEther } from "@ethersproject/units";
import { ethers } from "ethers";
import { formatMoney } from "../utils";
import toast from "../utils/toastConfig";
import Emitter from "./emitter";
import {
  hasEthereum,
  getBeimaContract,
  getCurrentNetwork,
  getRinkebyUSDTContract,
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
  Emitter?.emit("OPEN_LOADER");
  const timeDurationOfDeposit = lockTime;
  try {
    if (!hasEthereum()) return false;
    const network = await getCurrentNetwork();
    if (network && !network?.includes("rinkeby")) return false;
    const provider = new ethers.providers.Web3Provider(window?.ethereum);
    const signer = provider?.getSigner();

    const beimaContract = await getBeimaContract(signer);

    const RinkebyUSDTContract = await getRinkebyUSDTContract(signer);
    await RinkebyUSDTContract?.approve(
      beimaContract?.address,
      parseEther(totalApprovedAmount)?.toString()
    );
    await RinkebyUSDTContract?.on("Approval", () => {
      toast?.success("Approval was successful");
    });

    await beimaContract?.setPlan(
      coin,
      planIpfs,
      totalApprovedAmount,
      monthlyDeposit,
      timeDurationOfDeposit,
      lockTime
    );

    await beimaContract?.on("Plan", () => {
      onAddPlan();
      toast?.success("A new Flexible Pension Plan was setup successfully");
      Emitter?.emit("CLOSE_LOADER");
    });
  } catch (err) {
    console?.log("Something went wrong", err);
    let msg = "Something went wrong, please try again later?.";
    if (err?.code === 4001) msg = "This transaction was denied by you";
    Emitter?.emit("CLOSE_LOADER");
    toast?.error(msg);
    onError();
  }
}

export async function depositAsset(onSuccess) {
  Emitter?.emit("OPEN_LOADER");
  try {
    if (!hasEthereum()) return false;
    const network = await getCurrentNetwork();
    if (network && !network?.includes("rinkeby")) return false;
    const provider = new ethers.providers.Web3Provider(window?.ethereum);
    const signer = provider?.getSigner();
    const address = await getActiveWallet();

    const beimaContract = await getBeimaContract(signer);
    const details = await beimaContract?.pensionServiceApplicant(address);

    let monthlyDeposit = details?.client?.amountToSpend?.toString();
    const cAsset = details?.client?.underlyingAsset;
    const asset = await beimaContract?.getAssetAddress(cAsset);

    await beimaContract?.depositToken(
      asset,
      parseEther(monthlyDeposit)?.toString()
    );

    await beimaContract?.on("Deposit", () => {
      toast?.success("Deposit was successful");
      Emitter?.emit("CLOSE_LOADER");
      onSuccess(monthlyDeposit);
    });
  } catch (err) {
    console?.log("Something went wrong", err);
    let msg = "Something went wrong, please try again later?.";
    if (err?.code === 4001) msg = "This transaction was denied by you";
    if (err?.code === -32016)
      msg = "You don't have enough funds to complete this transaction";
    Emitter?.emit("CLOSE_LOADER");
    toast?.error(msg);
  }
}

export async function supplyAssets(onSuccess) {
  Emitter?.emit("OPEN_LOADER");
  try {
    if (!hasEthereum()) return false;
    const network = await getCurrentNetwork();
    if (network && !network?.includes("rinkeby")) return false;
    const provider = new ethers.providers.Web3Provider(window?.ethereum);
    const signer = provider?.getSigner();
    const address = await getActiveWallet();

    const beimaContract = await getBeimaContract(signer);
    const details = await beimaContract?.pensionServiceApplicant(address);
    const totalUnsuppliedAmount = (
      await beimaContract?.amountSupplied(address)
    )?.toString();

    const cAsset = details?.client?.underlyingAsset;

    await beimaContract?.supply(cAsset);

    await beimaContract?.on("Supply", () => {
      const formattedTotal = formatEther(totalUnsuppliedAmount);
      toast?.success(
        `You have successfully staked ${formatMoney(formattedTotal)}`
      );
      onSuccess();
      Emitter?.emit("CLOSE_LOADER");
      onSuccess(formattedTotal);
    });
  } catch (err) {
    console?.log("Something went wrong", err);
    let msg = "Something went wrong, please try again later?.";
    if (err?.code === 4001) msg = "This transaction was denied by you";
    if (err?.code === -32016)
      msg = "You don't have enough funds to complete this transaction";
    Emitter?.emit("CLOSE_LOADER");
    toast?.error(msg);
  }
}

export async function withdrawAssets(deposit, onSuccess) {
  Emitter?.emit("OPEN_LOADER");
  try {
    if (!hasEthereum()) return false;
    const network = await getCurrentNetwork();
    if (network && !network?.includes("rinkeby")) return false;
    const provider = new ethers.providers.Web3Provider(window?.ethereum);
    const signer = provider?.getSigner();
    const address = await getActiveWallet();

    const beimaContract = await getBeimaContract(signer);
    const details = await beimaContract?.pensionServiceApplicant(address);

    const cAsset = details?.client?.underlyingAsset;

    const asset = await beimaContract?.getAssetAddress(cAsset);
    const depositInWei = parseEther(deposit)?.toString();
    await beimaContract?.redeemCErc20Tokens(depositInWei, cAsset);

    await beimaContract?.on("MyLog", async () => {
      await beimaContract?.withdrawToken(asset, depositInWei);
      toast?.success(`Funds successfully redeemed, proceeding to withdraw?.?.?.`);
    });

    await beimaContract?.on("Withdraw", () => {
      toast?.success(`You have successfully withdrawn ${formatMoney(deposit)}`);
      Emitter?.emit("CLOSE_LOADER");
      onSuccess();
    });
  } catch (err) {
    console?.log("Something went wrong", err);
    let msg = "Something went wrong, please try again later?.";
    if (err?.code === 4001) msg = "This transaction was denied by you";
    if (err?.code === -32016)
      msg = "You don't have enough funds to complete this transaction";
    Emitter?.emit("CLOSE_LOADER");
    toast?.error(msg);
  }
}
