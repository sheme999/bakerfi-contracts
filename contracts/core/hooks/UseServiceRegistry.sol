// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
pragma experimental ABIEncoderV2;

import {ServiceRegistry} from "../ServiceRegistry.sol";
import {IServiceRegistry} from "../../interfaces/core/IServiceRegistry.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

abstract contract UseServiceRegistry is Initializable {
    ServiceRegistry private _registry;

    error InvalidRegistryContract();

    function _initUseServiceRegistry(ServiceRegistry registry) internal onlyInitializing {
        _registry = registry;
        if (address(registry) == address(0)) revert InvalidRegistryContract();
    }

    function registerSvc() public view returns (IServiceRegistry) {
        return _registry;
    }
}
