export default function TruncateEthAddressFromMid(walletAddress, visibleLength = 3) {
  // Ensure address has a valid length
  console.log(walletAddress)

  if (typeof walletAddress == 'string') {
    if (walletAddress.length < 42) {
      return walletAddress // Return the original walletAddress if invalid
    }

    // Calculate middle section length

    const middleLength = walletAddress.length - 2 * visibleLength

    // Extract first and last parts
    const firstPart = walletAddress.slice(0, visibleLength)
    const lastPart = walletAddress.slice(middleLength, -visibleLength)

    // Construct the truncated address
    const truncatedAddress = `${firstPart}...${lastPart}`

    return truncatedAddress
  }
}
