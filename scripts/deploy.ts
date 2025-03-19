import { ethers } from 'hardhat'

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log('Deploying contracts with the account:', deployer.address)

  const token = await ethers.deployContract('XocToken', [
    'Xoc Token',
    'XOC',
    18,
    deployer.address
  ])

  await token.waitForDeployment()
  console.log('Token deployed to:', await token.getAddress())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })