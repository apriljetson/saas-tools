// APRIL Token - Complete Solidity Contract
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * April (APRIL)
 * AI assistant token for the April ecosystem
 * 
 * Total Supply: 1,000,000,000 APRIL
 */
contract April is ERC20, Ownable {
    
    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18;
    
    mapping(address => bool) public isExcludedFromFee;
    
    uint256 public buyFee = 3;
    uint256 public sellFee = 3;
    
    address public marketingWallet;
    
    event FeesUpdated(uint256 newBuyFee, uint256 newSellFee);
    
    constructor(address _marketingWallet) ERC20("April", "APRIL") Ownable(msg.sender) {
        marketingWallet = _marketingWallet;
        isExcludedFromFee[msg.sender] = true;
        isExcludedFromFee[address(this)] = true;
        
        _mint(msg.sender, MAX_SUPPLY);
    }
    
    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");
        
        bool takeFee = true;
        
        if (isExcludedFromFee[from] || isExcludedFromFee[to]) {
            takeFee = false;
        }
        
        if (takeFee) {
            uint256 buyTax = (amount * buyFee) / 100;
            uint256 sellTax = (amount * sellFee) / 100;
            
            if (from == marketingWallet || to == marketingWallet) {
                // No fee for marketing transfers
            } else {
                if (to != marketingWallet) {
                    _burn(from, sellTax);
                }
                if (from != marketingWallet) {
                    _burn(from, buyTax);
                }
            }
        }
        
        super._transfer(from, to, amount);
    }
    
    function setBuyFee(uint256 _buyFee) external onlyOwner {
        require(_buyFee <= 10, "Max 10% buy fee");
        buyFee = _buyFee;
        emit FeesUpdated(buyFee, sellFee);
    }
    
    function setSellFee(uint256 _sellFee) external onlyOwner {
        require(_sellFee <= 10, "Max 10% sell fee");
        sellFee = _sellFee;
        emit FeesUpdated(buyFee, sellFee);
    }
    
    function excludeFromFee(address account) external onlyOwner {
        isExcludedFromFee[account] = true;
    }
    
    function includeInFee(address account) external onlyOwner {
        isExcludedFromFee[account] = false;
    }
    
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Max supply exceeded");
        _mint(to, amount);
    }
    
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}