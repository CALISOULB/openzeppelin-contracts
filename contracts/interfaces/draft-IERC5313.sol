// SPDX-License-Identifier: CC0-1.0
// OpenZeppelin Contracts (last updated v4.5.0) (interfaces/draft-IERC5313.sol)
pragma solidity ^0.8.0;

/**
 * @dev Interface for the Light Contract Ownership Standard.
 *
 * A standardized minimal interface required to identify an account that controls a contract
 *
 * _Available since v4.9._
 */
interface IERC5313 {
    /**
     * @dev Gets the address of the owner.
     */
    function owner() external view returns (address);
}
