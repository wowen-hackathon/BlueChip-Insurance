/**
 * Title: BlueChip on chain insurance
 * Author: Niharika Singh
 * Version: 1.0.0
 *
 * Description:
 * This contract implements the workflow of onchain insurance. The insurer has to pay a fixed amount
 * of premium each month (currently set to 0.1 WOWN). Paying this premium enables the insurer to file
 * a claim in case of fraud with their NFT. The admin (insurance company) has the possibility to review
 * the claim. They can either accept it or reject it.
 *
 * Dependencies:
 * - OpenZeppelin ERC20 library (version 3.0.0 or higher)
 *
 * Contract Structure:
 * - Structs: None
 * - Enums: None
 * - Mappings: None
 * - Events: Transfer, Approval
 * - Modifiers: None
 */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

error NotOwner();

contract Insurance {
    address[] public insurers;
    mapping(address => uint256) public addressToPremium;
    mapping(uint256 => uint256) public premiumToTimestamp;

    mapping(uint256 => Claim) public claims;
    uint public claimCounter;

    mapping(address => uint256[]) public addressToClaims;

    address public immutable i_owner;

    enum ClaimStatus {
        PENDING,
        APPROVED,
        REJECTED
    }

    struct Claim {
        uint claimNumber;
        address claimant;
        address newAddress;
        string transactionHash;
        uint amount;
        string comments;
        uint timestamp;
        ClaimStatus status;
    }

    event PremiumPaid(address payer, uint256 amount, uint256 timestamp);
    event ClaimFiled(
        uint claimNumber,
        address claimant,
        string transactionHash,
        uint amount,
        string comments,
        ClaimStatus status,
        uint256 timestamp
    );
    event ClaimApproved(uint claimNumber, address newAddress, uint amount);
    event ClaimRejected(uint claimNumber);

    constructor() {
        i_owner = msg.sender;
    }

    function payPremium() public payable {
        require(msg.value >= 0.1 * 1e18, "Premium should be 0.1 Wowen");
        insurers.push(msg.sender);
        addressToPremium[msg.sender] += msg.value;
        premiumToTimestamp[addressToPremium[msg.sender]] = block.timestamp;

        emit PremiumPaid(msg.sender, msg.value, block.timestamp);
    }

    function fileClaim(
        address _newAddress,
        string memory _transactionHash,
        uint256 _amount,
        string memory _comments
    ) public {
        require(
            addressToPremium[msg.sender] > 0.1 * 1e18,
            "Please pay the premium first"
        );
        Claim memory newClaim = Claim({
            claimNumber: claimCounter,
            claimant: msg.sender,
            newAddress: _newAddress,
            transactionHash: _transactionHash,
            amount: _amount,
            comments: _comments,
            timestamp: block.timestamp,
            status: ClaimStatus.PENDING
        });

        claims[claimCounter] = newClaim;
        claimCounter++;
        addressToClaims[msg.sender].push(newClaim.claimNumber);

        emit ClaimFiled(
            newClaim.claimNumber,
            newClaim.claimant,
            newClaim.transactionHash,
            newClaim.amount,
            newClaim.comments,
            newClaim.status,
            block.timestamp
        );
    }

    function rejectClaim(uint256 _id) public onlyOwner {
        Claim storage claim = claims[_id];
        // uint256[] ids = addressToClaims[claim.claimant];

        // updateClaim.status = ClaimStatus.REJECTED;
        claim.status = ClaimStatus.REJECTED;

        emit ClaimRejected(claim.claimNumber);
    }

    function approveClaim(uint256 _id) public payable onlyOwner {
        Claim storage claim = claims[_id];
        // Claim storage updateClaim = addressToClaims[claim.claimant][_id];
        // updateClaim.status = ClaimStatus.APPROVED;
        claim.status = ClaimStatus.APPROVED;
        address to = claim.newAddress;
        uint256 amount = claim.amount;
        (bool sent, bytes memory data) = to.call{value: amount}("");

        require(sent, "Failed to send Ether");
        emit ClaimApproved(claim.claimNumber, claim.newAddress, claim.amount);
    }

    function getClaimsByAccount(
        address _account
    ) public view returns (uint256[] memory) {
        return addressToClaims[_account];
    }

    function getClaimsById(uint256 _id) public view returns (Claim memory) {
        return claims[_id];
    }

    modifier onlyOwner() {
        // require (msg.sender == i_owner, "Only the owner can call this function");
        if (msg.sender != i_owner) {
            revert NotOwner();
        }
        _;
    }

    receive() external payable {
        payPremium();
    }

    fallback() external payable {
        payPremium();
    }
}
