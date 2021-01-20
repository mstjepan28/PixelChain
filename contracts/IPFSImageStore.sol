// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;

contract IPFSImageStore {
  mapping(address => string[]) images;

  constructor() public {
  }

  function set(string memory _cid) public {
    images[msg.sender].push(_cid);
  }

  function get() public view returns (string[] memory){
    return images[msg.sender];
  }
}
