// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentBehaviorContract {
    struct BehaviorRecord {
        uint timestamp;
        string category;
        string behavior;
        uint score;
    }

    struct Student {
        string name;
        uint id;
        string gender;
        string className;
        string college;
        address studentAddress;
        uint age;
        mapping(string => BehaviorRecord[]) behaviorRecords; // Changed mapping key type to string
    }

    mapping(address => Student) public students;
    address public admin; // Added admin address

    constructor() {
        admin = msg.sender; // Set contract deployer as admin
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    function register(
        string memory _name,
        uint _id,
        string memory _gender,
        string memory _className,
        string memory _college
    ) public {
        require(
            students[msg.sender].studentAddress == address(0),
            "Student already registered"
        );

        Student storage newStudent = students[msg.sender];
        newStudent.name = _name;
        newStudent.id = _id;
        newStudent.gender = _gender;
        newStudent.className = _className;
        newStudent.college = _college;
        newStudent.studentAddress = msg.sender;
    }

    function recordBehavior(
        string memory _category,
        string memory _behavior,
        uint _score
    ) public {
        BehaviorRecord memory newRecord = BehaviorRecord({
            timestamp: block.timestamp,
            category: _category,
            behavior: _behavior,
            score: _score
        });

        students[msg.sender].behaviorRecords[_category].push(newRecord);
    }

    function getStudentBehavior(
        address _studentAddress,
        string memory _category
    ) public view returns (BehaviorRecord[] memory) {
        return students[_studentAddress].behaviorRecords[_category];
    }

    // Additional functions for admin
    function setAdmin(address _newAdmin) public onlyAdmin {
        admin = _newAdmin;
    }

    function updateStudentInfo(
        address _studentAddress,
        string memory _name,
        uint _id,
        string memory _gender,
        string memory _className,
        string memory _college
    ) public onlyAdmin {
        Student storage studentToUpdate = students[_studentAddress];
        studentToUpdate.name = _name;
        studentToUpdate.id = _id;
        studentToUpdate.gender = _gender;
        studentToUpdate.className = _className;
        studentToUpdate.college = _college;
    }
}
