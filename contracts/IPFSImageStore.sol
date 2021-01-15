// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract IPFSImageStore {
  mapping(address => string) images;

  constructor() public {
  }

  function set(string memory _cid) public {
    images[msg.sender] = _cid;
  }

  function get() public view returns (string memory){
    return images[msg.sender];
  }
}
