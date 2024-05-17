export function hexToUint8Array(hexString: string): Uint8Array {
  // Remove '0x' prefix if present and convert the remaining hex string to bytes
  const cleanedHexString = hexString.startsWith("0x")
    ? hexString.slice(2)
    : hexString;

  // Convert the cleaned hex string to a Uint8Array
  const uint8Array = new Uint8Array(cleanedHexString.length / 2);

  for (let i = 0; i < cleanedHexString.length; i += 2) {
    const byteValue = parseInt(cleanedHexString.substr(i, 2), 16);
    uint8Array[i / 2] = byteValue;
  }
  return uint8Array;
}
