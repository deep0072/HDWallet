export default function TruncateEthAddressFromMid(
  walletAddress,
  visibleLength = 3,
) {
  // Ensure address has a valid length
  console.log(walletAddress);
  

  if (typeof walletAddress == "string") {
    if (walletAddress.length <43) {
    return walletAddress; // Return the original walletAddress if invalid
    }

  // Calculate middle section length
  console.log(walletAddress, "walletAddress")
  const middleLength = walletAddress.length - 2 * visibleLength;
  console.log(middleLength, middleLength)
  

  // Extract first and last parts
  const firstPart = walletAddress.slice(0, visibleLength);
  const lastPart = walletAddress.slice(middleLength,-visibleLength);

  // Construct the truncated address
  const truncatedAddress = `${firstPart}...${lastPart}`;
  console.log(truncatedAddress, "truncateAddress")

  return truncatedAddress;
  }
  
}