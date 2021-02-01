// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;

contract IPFSImageStore {

  string[] allImages;
  Report[] reports;
  uint idx;
  uint reportId;

  struct Report{
    uint ID;
    string original_cid;
    string reported_cid;
    int votes;
  }

  struct User {
    string name;
    string lastname;
    string username;
    uint[] indexs;
    uint[] votedReports;
  }

  mapping(address => User) users;

  constructor() public {
    idx = 0;
    reportId = 0;
  }

  function addReport(string memory _original, string memory _reported) public {
    reports.push(Report(reportId, _original, _reported, 1));
    users[msg.sender].votedReports.push(reportId);
    reportId++;
  }
  
  function getReports() public view returns(Report[] memory) {
      return reports;
  }
  
  function voteReport(uint _id, bool vote) public returns(bool) {
      for(uint i = 0; i < users[msg.sender].votedReports.length; i++){
          uint id = users[msg.sender].votedReports[i];
          if(id == _id){
              return false;
          }
      }
      if(vote){
          reports[_id].votes++;
          users[msg.sender].votedReports.push(_id);
          checkReports();
          return true;
      }else{
          reports[_id].votes--;
          users[msg.sender].votedReports.push(_id);
          checkReports();
          return true;
      }
      
  }

  function checkReports() private {
    for(uint i = 0; i < reports.length;i++){
      if(reports[i].votes >= 2){
        deleteImage(reports[i].reported_cid);
        delete reports[i];
      }
    }
  }
  
  
  function deleteImage(string memory _cid) private{
    string memory mem;
    for(uint i = 0; i < allImages.length; i++){
      mem = allImages[i];
      if(keccak256(bytes(mem)) == keccak256(bytes(_cid))){
        allImages[i] = "CopyRight";
      }
    }
  }
  
  function checkImage(string memory _cid) private view returns(bool){
      string memory mem;
      for(uint i = 0; i < allImages.length;i++){
        mem = allImages[i];
        if(keccak256(bytes(mem)) == keccak256(bytes(_cid))){
            return false;
        }
      }
      return true;
  }

  function set(string memory _cid) public returns(bool){
     if(checkImage(_cid)){
         allImages.push(_cid);
         users[msg.sender].indexs.push(idx);
        idx++;
        return true;
     }
     return false;
  }

  function get() public view returns (string[] memory){
    string[] memory temp = new string[](idx);
    uint idxLength = users[msg.sender].indexs.length;
    uint mem;
    for(uint i = 0; i < idxLength; i++){
      mem = users[msg.sender].indexs[i];
      temp[i] = allImages[mem];
    }
    return temp;
  }

  function getAllImages() public view returns (string[] memory) {
    return allImages;
  }

  function getUser() public view returns (User memory){
    return users[msg.sender];
  }

  function setUser(string memory _name, string memory _lastname, string memory _username) public {
    users[msg.sender].name = _name;
    users[msg.sender].lastname = _lastname;
    users[msg.sender].username = _username;
  }
}
