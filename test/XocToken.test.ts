import { expect } from 'chai'
import { ethers } from 'hardhat'
import { XocToken } from '../typechain-types'
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers'

describe('XocToken', () => {
  let token: XocToken
  let owner: HardhatEthersSigner
  let addr1: HardhatEthersSigner
  let addr2: HardhatEthersSigner

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners()
    const TokenFactory = await ethers.getContractFactory('XocToken')
    token = await TokenFactory.deploy('Xoc Token', 'XOC', 18, owner.address)
  })

  describe('Deployment', () => {
    it('Should set the right owner', async () => {
      expect(await token.owner()).to.equal(owner.address)
    })

    it('Should assign the total supply of tokens to the owner', async () => {
      const ownerBalance = await token.balanceOf(owner.address)
      expect(await token.totalSupply()).to.equal(ownerBalance)
    })
  })

  describe('Transactions', () => {
    it('Should transfer tokens between accounts', async () => {
      await token.transfer(addr1.address, 50)
      const addr1Balance = await token.balanceOf(addr1.address)
      expect(addr1Balance).to.equal(50)

      await token.connect(addr1).transfer(addr2.address, 50)
      const addr2Balance = await token.balanceOf(addr2.address)
      expect(addr2Balance).to.equal(50)
    })

    it('Should fail if sender doesn\'t have enough tokens', async () => {
      const initialOwnerBalance = await token.balanceOf(owner.address)
      await expect(
        token.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWithCustomError(token, 'ERC20InsufficientBalance')
      expect(await token.balanceOf(owner.address)).to.equal(initialOwnerBalance)
    })
  })

  describe('Burning', () => {
    it('Should burn tokens correctly', async () => {
      const initialSupply = await token.totalSupply()
      await token.burn(100)
      expect(await token.totalSupply()).to.equal(initialSupply - BigInt(100))
    })
  })

  describe('Pausable', () => {
    it('Should pause and unpause', async () => {
      await token.pause()
      await expect(token.transfer(addr1.address, 100)).to.be.revertedWithCustomError(
        token,
        'EnforcedPause'
      )
      await token.unpause()
      await token.transfer(addr1.address, 100)
      expect(await token.balanceOf(addr1.address)).to.equal(100)
    })
  })
})