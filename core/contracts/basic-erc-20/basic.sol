pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract PostBoosting is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ERC20Permit, ReentrancyGuard {
    struct Post {
        uint256 totalRewards;
        uint256 rewardAmount;
        uint256 rewardGiven;
        mapping(address => uint256) responders;
        uint256 numEngage;
    }

    mapping(uint256 => Post) public posts;

    event PostRegistered(uint256 indexed postId, uint256 rewardAmount);
    event PostReplied(uint256 indexed postId, address responder);
    event RewardClaimed(uint256 indexed postId, address responder, uint256 reward);

    constructor() ERC20("PostBoosting", "BOOST") Ownable(_msgSender()) ERC20Permit("PostBoosting") { }

    function generatePostId(string memory castHash) public pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(castHash)));
    }

    function registerPost(string memory castHash, uint256 totalReward, uint256 rewardAmount) external onlyOwner {
        require(totalReward > 0, "Total reward must be greater than 0");
        require(rewardAmount > 0, "Reward amount must be greater than 0");
        require(rewardAmount <= totalReward, "Reward amount must be less than or equal to total reward");

        uint256 postId = generatePostId(castHash);
        Post storage post = posts[postId];

        require(post.totalRewards == 0, "Post already registered");

        post.totalRewards = totalReward;
        post.rewardAmount = rewardAmount;

        // Create attestation for registering the post

        // mints more token to the contract
        mint(address(this), totalReward);

        emit PostRegistered(postId, totalReward);
    }

    function engagePost(string memory castHash, address engagerAddress) external onlyOwner {
        uint256 postId = generatePostId(castHash);
        Post storage post = posts[postId];
        require(post.responders[engagerAddress] == 0, "Already replied");
        require(post.rewardGiven + post.rewardAmount <= post.totalRewards, "No more rewards");
        post.responders[engagerAddress] = 1;
        post.rewardGiven += post.rewardAmount;
        post.numEngage++;

        _transfer(address(this), engagerAddress, post.rewardAmount);

        // Create attestation for replying to the post
        // createReplyAttestation(postId, msg.sender);

        bytes[] memory recipients = new bytes[](1);
        recipients[0] = abi.encode(engagerAddress);

        // Attestation memory a = Attestation({
        //     schemaId: postSchemaId,
        //     linkedAttestationId: 0,
        //     attestTimestamp: 0,
        //     revokeTimestamp: 0,
        //     attester: address(this),
        //     validUntil: 0,
        //     dataLocation: DataLocation.ONCHAIN,
        //     revoked: false,
        //     recipients: recipients,
        //     data: abi.encode(postId, amount, block.timestamp, token)
        //  });
        // spInstance.attest(a, "", "", "");

        emit PostReplied(postId, msg.sender);
        emit RewardClaimed(postId, msg.sender, post.rewardAmount);
    }

    function hasPostBeenBoosted(string memory castHash) public view returns (bool) {
        uint256 postId = generatePostId(castHash);
        Post storage post = posts[postId];

        return post.totalRewards > 0;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
    }
}
