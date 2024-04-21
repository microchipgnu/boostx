pragma solidity ^0.8.20;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Burnable } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import { ERC20Pausable } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import { ERC20Permit } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import { ISP } from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import { Attestation } from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import { DataLocation } from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
pragma solidity ^0.8.20;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Burnable } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import { ERC20Pausable } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import { ERC20Permit } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import { ISP } from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import { Attestation } from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import { DataLocation } from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract BoostProtocol is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ERC20Permit, ReentrancyGuard {
    ISP public spInstance;
    uint64 public schemaId;

    mapping(address => uint64) public attestations;
    mapping(address => uint256) public totalClaimedAmount;
    mapping(uint64 => bool) public attestationClaimed;
    mapping(uint256 => bool) public usedEpochId;

    uint256 public epochId;

    event NewAttestation(address to, uint64 attestationId);
    event Claim(address claimant, uint256 amount);

    constructor(string memory name, string memory symbol) ERC20(name, symbol) Ownable(_msgSender()) ERC20Permit(name) {
        epochId = 1;
        usedEpochId[epochId] = true;
    }

    function setSPInstance(address instance) external onlyOwner {
        spInstance = ISP(instance);
    }

    function setSchemaID(uint64 schemaId_) external onlyOwner {
        schemaId = schemaId_;
    }

    function setEpochId(uint256 epochId_) external onlyOwner {
        require(usedEpochId[epochId_] == false, "Epoch ID already used");
        epochId = epochId_;
    }

    function setAttestation(address to, uint256 totalEarned) external onlyOwner {
        bytes memory data = abi.encode(to, totalEarned);
        bytes[] memory recipients = new bytes[](1);

        recipients[0] = abi.encode(to);
        Attestation memory a = Attestation({
            schemaId: schemaId,
            linkedAttestationId: attestations[to],
            attestTimestamp: 0,
            revokeTimestamp: 0,
            attester: address(this),
            validUntil: 0,
            dataLocation: DataLocation.ONCHAIN,
            revoked: false,
            recipients: recipients,
            data: data
        });

        uint64 attestationId = spInstance.attest(a, "", "", "");

        attestations[to] = attestationId;
        attestationClaimed[attestationId] = false;

        emit NewAttestation(to, attestationId);
    }

    function claim(address claimant) public nonReentrant {
        uint64 attestationId = attestations[claimant];

        require(attestationId != 0, "Attestation does not exist");
        require(attestationClaimed[attestationId] == false, "Attestation already claimed");

        Attestation memory a = spInstance.getAttestation(attestationId);

        (address userAddress, uint256 totalEarned) = abi.decode(a.data, (address, uint256));

        uint256 claimedSoFar = totalClaimedAmount[userAddress];
        require(totalEarned >= claimedSoFar, "Invalid earned amount calculation");

        uint256 amount = totalEarned - claimedSoFar;
        totalClaimedAmount[userAddress] += amount;
        attestationClaimed[attestationId] = true;

        _mint(userAddress, amount);

        emit Claim(claimant, amount);
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

    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Pausable) {
        super._update(from, to, value);
    }
}
