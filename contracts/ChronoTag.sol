// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract ChronoTag {
    struct ResearchIP {
        string title;
        string authors;
        string description;
        string designation;
        string place;
        string ipfsHash;
        uint256 timestamp;
        uint256 chronoTag;
        address owner;
    }

    mapping(uint256 => ResearchIP) public registeredIPs;
    mapping(address => uint256[]) public userIPs;
    uint256 public accessFee = 0.02 ether;
    address payable public owner;
    
    event IPRegistered(address indexed researcher, uint256 chronoTag, string ipfsHash);
    event IPAccessed(address indexed viewer, uint256 chronoTag);
    
    constructor() {
        owner = payable(msg.sender);
    }

    function registerIP(
        string memory _authors,
        string memory _designation,
        string memory _place,
        string memory _title,
        string memory _description,
        string memory _ipfsHash
    ) public returns (uint256) {
        uint256 chronoTag = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, block.number))) % 1e12;
        ResearchIP memory newIP = ResearchIP(_authors, _designation, _place, _title, _description, _ipfsHash, block.timestamp, chronoTag, msg.sender);
        
        registeredIPs[chronoTag] = newIP;
        userIPs[msg.sender].push(chronoTag);
        
        emit IPRegistered(msg.sender, chronoTag, _ipfsHash);
        return chronoTag;
    }

    function accessIP(uint256 _chronoTag) public payable returns (string memory) {
        require(msg.value >= accessFee, "Insufficient fee to access IP document");
        require(registeredIPs[_chronoTag].owner != address(0), "Invalid Chrono Tag");
        
        owner.transfer(msg.value);
        emit IPAccessed(msg.sender, _chronoTag);
        
        return registeredIPs[_chronoTag].ipfsHash;
    }

    function getResearchDetails(uint256 _chronoTag) public view returns (
        string memory, string memory, string memory, string memory, string memory, string memory, uint256
    ) {
        require(registeredIPs[_chronoTag].owner != address(0), "Invalid Chrono Tag");
        ResearchIP memory ip = registeredIPs[_chronoTag];
        return (ip.authors, ip.designation, ip.place, ip.title, ip.description, ip.ipfsHash, ip.timestamp);
    }

    function getUserIPs(address _user) public view returns (uint256[] memory) {
        return userIPs[_user];
    }

    function searchResearchByChronoTag(uint256 _chronoTag) public view returns (
        string memory, string memory, string memory, string memory, string memory, uint256
    ) {
        require(registeredIPs[_chronoTag].owner != address(0), "Invalid Chrono Tag");
        ResearchIP memory ip = registeredIPs[_chronoTag];
        return (ip.authors, ip.designation, ip.place, ip.title, ip.description, ip.timestamp);
    }
}
