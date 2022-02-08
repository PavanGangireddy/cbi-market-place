import { EIPProvider, Provider } from "./types";

const ZERO_ADDRESS = hexZeroPad("0x");
let rpcId = 0;

export function getCode(provider: Provider, account: string) {
  return send<string>(provider, "eth_getCode", [
    account.toLowerCase(),
    "latest",
  ]);
}

export async function isContract(provider: Provider, account: string) {
  const bytecode = await getCode(provider, account);
  return !isZeroAddress(bytecode);
}

export function hexZeroPad(hex: string) {
  if (!/^0x[0-9a-f]*$/gi.test(hex)) {
    throw new Error(`Not a valid hex string "${hex}"`);
  }

  let padded = hex.slice(2);
  while (padded.length < 40) {
    padded = "0" + padded;
  }
  return "0x" + padded;
}

export function isZeroAddress(address: string) {
  return hexZeroPad(address.toLowerCase()) === ZERO_ADDRESS;
}

async function send<T>(
  provider: Provider,
  method: string,
  params: any[]
): Promise<T> {
  let data: T | { result: T } | undefined;
  let args = {
    jsonrpc: "2.0",
    id: ++rpcId,
    method,
    params,
  };

  if (typeof provider["request"] !== "undefined") {
    data = await (provider as EIPProvider).request(args);
  } else if (typeof provider["sendAsync"] !== "undefined") {
    data = await provider.sendAsync(args);
  } else if (typeof provider["send"] !== "undefined") {
    data = await provider.send(method, params);
  }

  if (data) {
    return data["result"] || data;
  } else {
    throw new Error(
      `Could not send the transaction correcty. Either the provider does not support the method "${method}" or is missing a proper send/request.`
    );
  }
}
