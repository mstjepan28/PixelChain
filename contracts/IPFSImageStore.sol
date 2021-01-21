// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;

contract IPFSImageStore {
  struct User {
    string name;
    string lastname;
    string username;
  }
  mapping(address => string[]) images;
  mapping(address => User) users;

  constructor() public {
  }

  function set(string memory _cid) public {
    images[msg.sender].push(_cid);
  }

  function get() public view returns (string[] memory){
    return images[msg.sender];
  }

  function getUser() public view returns (User memory){
    return users[msg.sender];
  }

  function setUser(string memory _name, string memory _lastname, string memory _username) public {
    users[msg.sender] = User(_name, _lastname, _username);
  }
}
