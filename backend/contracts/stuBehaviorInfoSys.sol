// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract stuBehaviorInfoSys {
    address public admin; // Contract administrator address

    struct Student {
        uint256 studentId;
        string name;
        string className;
    }

    struct Behavior {
        uint timestamp;
        uint studyHours; // Study duration (hours)
        uint expenses; // Expenses amount
        uint exerciseHours; // Exercise duration (hours)
        uint sleepHours; // Sleep duration (hours)
    }

    struct StudentInfo {
        string faculty;
        uint[] behaviorTimestamps; // An array to keep track of behavior timestamps.
        mapping(uint => Behavior) behaviors; // Student behavior records, key is timestamp
    }

    mapping(address => Student) public students; // Mapping from student address to Student information
    mapping(address => StudentInfo) private studentInfos; // Mapping from student address to StudentInfo

    event StudentRegistered(
        address indexed student,
        uint studentId,
        string name,
        string className,
        string faculty
    );

    event BehaviorSubmitted(
        address indexed student,
        uint timestamp,
        uint studyHours,
        uint expenses,
        uint exerciseHours,
        uint sleepHours
    );

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    // Student registration function
    function register(
        uint _studentId,
        string memory _name,
        string memory _className,
        string memory _faculty
    ) public {
        students[msg.sender] = Student(_studentId, _name, _className);
        studentInfos[msg.sender].faculty = _faculty;
        emit StudentRegistered(
            msg.sender,
            _studentId,
            _name,
            _className,
            _faculty
        );
    }

    // Function to submit behavior records
    function submitBehavior(
        uint _timestamp,
        uint _studyHours,
        uint _expenses,
        uint _exerciseHours,
        uint _sleepHours
    ) public {
        require(students[msg.sender].studentId != 0, "Student not registered");

        StudentInfo storage info = studentInfos[msg.sender];
        for (uint i = 0; i < info.behaviorTimestamps.length; i++) {
            require(
                info.behaviorTimestamps[i] != _timestamp,
                "Behavior info already exists for the given timestamp"
            );
        }

        info.behaviors[_timestamp] = Behavior(
            _timestamp,
            _studyHours,
            _expenses,
            _exerciseHours,
            _sleepHours
        );
        info.behaviorTimestamps.push(_timestamp);

        emit BehaviorSubmitted(
            msg.sender,
            _timestamp,
            _studyHours,
            _expenses,
            _exerciseHours,
            _sleepHours
        );
    }

    // Function to change contract administrator
    function changeAdmin(address _newAdmin) public onlyAdmin {
        admin = _newAdmin;
    }

    // Function to delete student information (only callable by admin)
    function deleteStudent(address _student) public onlyAdmin {
        delete students[_student];
        delete studentInfos[_student];
    }

    // Get basic information of the caller
    function getMyBasicInfo()
        public
        view
<<<<<<< HEAD
        returns (
            uint256 studentId,
            string memory name,
            string memory className,
            string memory faculty
        )
    {
        Student memory myInfo = students[msg.sender];
        StudentInfo storage info = studentInfos[msg.sender];
        require(myInfo.studentId != 0, "You are not registered");
        return (myInfo.studentId, myInfo.name, myInfo.className, info.faculty);
=======
        returns (uint256 studentId, string memory name, string memory className)
    {
        Student memory myInfo = students[msg.sender];
        require(myInfo.studentId != 0, "You are not registered");
        return (myInfo.studentId, myInfo.name, myInfo.className);
>>>>>>> 11a5e52abbae51ae09e845e7a5ba250548766eee
    }

    function isRegistered() public view returns (bool) {
        return students[msg.sender].studentId != 0;
    }

    // Get detailed information and behavior timestamps of the caller
    function getMyStudentInfo()
        public
        view
        returns (string memory faculty, uint[] memory behaviorTimestamps)
    {
        require(students[msg.sender].studentId != 0, "You are not registered");
        StudentInfo storage info = studentInfos[msg.sender];
        return (info.faculty, info.behaviorTimestamps);
    }

    // Get a specific behavior record of the caller by timestamp
    function getMyBehavior(
        uint _timestamp
    )
        public
        view
        returns (
            uint timestamp,
            uint studyHours,
            uint expenses,
            uint exerciseHours,
            uint sleepHours
        )
    {
        require(students[msg.sender].studentId != 0, "You are not registered");
        Behavior storage behavior = studentInfos[msg.sender].behaviors[
            _timestamp
        ];
        require(behavior.timestamp != 0, "Behavior not found");
        return (
            behavior.timestamp,
            behavior.studyHours,
            behavior.expenses,
            behavior.exerciseHours,
            behavior.sleepHours
        );
    }
}
