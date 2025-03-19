// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract XocToken is ERC20, Ownable, Pausable {
    uint8 private immutable _decimals;
    uint256 public constant INITIAL_SUPPLY = 1_000_000_000 * 10**18; // 1 billion tokens

    constructor(
        string memory name,
        string memory symbol,
        uint8 tokenDecimals,
        address initialOwner
    ) ERC20(name, symbol) Ownable(initialOwner) {
        _decimals = tokenDecimals;
        _mint(initialOwner, INITIAL_SUPPLY);
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _update(
        address from,
        address to,
        uint256 value
    ) internal virtual override whenNotPaused {
        super._update(from, to, value);
    }

    function burn(uint256 amount) public virtual {
        _burn(_msgSender(), amount);
    }
}