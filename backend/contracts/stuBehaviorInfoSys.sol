// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract stuBehaviorInfoSys {
    address public admin; // 合约管理员地址

    struct Student {
        uint studentId;
        string name;
        string className;
    }

    struct StudentInfo {
        string faculty;
        mapping(uint => Behavior) behaviors; // 学生行为记录，key为时间戳
    }

    struct Behavior {
        uint timestamp;
        uint studyHours; // 学习时长（小时）
        uint expenses; // 消费金额
        uint exerciseHours; // 运动时长（小时）
        uint sleepHours; // 睡眠时长（小时）
    }

    mapping(address => Student) public students; // 学生地址映射到学生信息
    mapping(address => StudentInfo) public studentInfos; // 学生地址映射到学生信息

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
    event BehaviorInfo(
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

    // 学生注册函数
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

    // 获取学生本人信息函数
    function getStudentInfo(
        address _student
    ) public view returns (uint, string memory, string memory, string memory) {
        require(students[_student].studentId != 0, "Student not registered");
        return (
            students[_student].studentId,
            students[_student].name,
            students[_student].className,
            studentInfos[_student].faculty
        );
    }

    // 学生提交行为记录函数
    function submitBehavior(
        uint _timestamp,
        uint _studyHours,
        uint _expenses,
        uint _exerciseHours,
        uint _sleepHours
    ) public {
        require(students[msg.sender].studentId != 0, "Student not registered");
        studentInfos[msg.sender].behaviors[_timestamp] = Behavior(
            _timestamp,
            _studyHours,
            _expenses,
            _exerciseHours,
            _sleepHours
        );
        emit BehaviorSubmitted(
            msg.sender,
            _timestamp,
            _studyHours,
            _expenses,
            _exerciseHours,
            _sleepHours
        );
    }

    // 获取学生行为信息函数（根据时间）
    function getBehaviorInfo(
        address _student,
        uint _timestamp
    ) public view returns (uint, uint, uint, uint, uint) {
        Behavior memory behavior = studentInfos[_student].behaviors[_timestamp];
        require(
            behavior.timestamp != 0,
            "Behavior info not found for the given timestamp"
        );
        return (
            behavior.timestamp,
            behavior.studyHours,
            behavior.expenses,
            behavior.exerciseHours,
            behavior.sleepHours
        );
    }

    // 修改合约管理员函数
    function changeAdmin(address _newAdmin) public onlyAdmin {
        admin = _newAdmin;
    }

    // 删除学生信息函数（仅管理员可调用）
    function deleteStudent(address _student) public onlyAdmin {
        delete students[_student];
        delete studentInfos[_student];
    }
}
