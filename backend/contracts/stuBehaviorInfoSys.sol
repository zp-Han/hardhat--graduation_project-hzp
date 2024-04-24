// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract stuBehaviorInfoSys {
    address public chairman; // 合约管理员地址
    uint allStuCount = 0; //已经注册的学生数量
    struct Student {
        uint256 studentId; // 学生ID
        string name; // 学生姓名
        string className; // 班级名称
        string faculty; // 学院信息
    }

    struct Behavior {
        string studentName; // 学生姓名
        uint timestamp; // 行为时间戳
        uint studyHours; // 学习时间（小时）
        uint expenses; // 开销
        uint exerciseHours; // 运动时间（小时）
        uint sleepHours; // 睡眠时间（小时）
        uint allCount; // 总需要票数
        uint yesCount; // 赞成票数
        uint noCount; // 反对票数
        bool finalized; // 行为是否已最终确认
        bool behaviorPassed; // 行为是否通过
    }
    mapping(string => mapping(uint => mapping(address => bool)))
        public hasVoted; // 记录每个学生对于每个行为是否已经投票
    mapping(address => Student) public students; // 学生地址到学生信息的映射
    mapping(address => mapping(address => Behavior)) private studentInfos; // 学生地址到学生行为信息的映射
    mapping(uint256 => address) public studentAddresses; //学生ID到学生地址的映射
    mapping(string => Behavior[]) public classBehaviorsMapping; // 班级到行为的映射
    mapping(string => uint) public classStudentCounts; // 班级到学生数量的映射

    event StudentRegistered(
        address indexed student,
        uint studentId,
        string name,
        string className,
        string faculty
    );

    event BehaviorSubmitted(
        address indexed student,
        string studentName,
        uint timestamp,
        uint studyHours,
        uint expenses,
        uint exerciseHours,
        uint sleepHours,
        uint allCount,
        uint yesCount, // 赞成票数
        uint noCount, // 反对票数
        bool finalized,
        bool behaviorPassed
    );

    modifier onlyChairman() {
        require(msg.sender == chairman, "Only by admin");
        _;
    }

    constructor() {
        chairman = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266; // 部署合约的地址为管理员地址
    }

    // 学生注册函数
    function register(
        uint _studentId,
        string memory _name,
        string memory _className,
        string memory _faculty
    ) public {
        require(!isRegistered(), "Already registered");

        address studentAddress = msg.sender;
        students[studentAddress].studentId = _studentId;
        students[studentAddress].name = _name;
        students[studentAddress].className = _className;
        students[studentAddress].faculty = _faculty;
        studentAddresses[_studentId] = studentAddress;
        classStudentCounts[_className]++;
        allStuCount++;
        emit StudentRegistered(
            studentAddress,
            _studentId,
            _name,
            _className,
            _faculty
        );
    }

    // 判断是否已注册
    function isRegistered() public view returns (bool) {
        return students[msg.sender].studentId != 0;
    }

    // 提交行为记录函数
    function submitBehavior(
        uint _timestamp,
        uint _studyHours,
        uint _expenses,
        uint _exerciseHours,
        uint _sleepHours
    ) public {
        require(isRegistered(), "Student not registered");
        string memory _studentName = students[msg.sender].name;
        address studentAddress = msg.sender;
        Behavior memory behavior = Behavior(
            _studentName,
            _timestamp,
            _studyHours,
            _expenses,
            _exerciseHours,
            _sleepHours,
            classStudentCounts[students[studentAddress].className],
            0,
            0,
            false,
            false
        );
        studentInfos[studentAddress][studentAddress] = behavior;

        classBehaviorsMapping[students[studentAddress].className].push(
            behavior
        );
    }

    function getStudentInfo()
        public
        view
        returns (
            uint256 studentId,
            string memory name,
            string memory className,
            string memory faculty
        )
    {
        address studentAddress = msg.sender;
        students[studentAddress];
        require(
            students[studentAddress].studentId != 0,
            "You are not registered"
        );
        return (
            students[studentAddress].studentId,
            students[studentAddress].name,
            students[studentAddress].className,
            students[studentAddress].faculty
        );
    }

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
        address studentAddress = msg.sender;
        require(
            students[studentAddress].studentId != 0,
            "You are not registered"
        );
        Behavior[] memory behaviors = classBehaviorsMapping[
            students[studentAddress].className
        ];
        for (uint i = 0; i < behaviors.length; i++) {
            require(behaviors[i].behaviorPassed = true, "behavior not pass");
            if (behaviors[i].timestamp == _timestamp) {
                return (
                    behaviors[i].timestamp,
                    behaviors[i].studyHours,
                    behaviors[i].expenses,
                    behaviors[i].exerciseHours,
                    behaviors[i].sleepHours
                );
            }
        }

        revert("Behavior not found");
    }

    // 获取班级对应的行为
    function getBehaviors() public view returns (Behavior[] memory) {
        return classBehaviorsMapping[students[msg.sender].className];
    }

    // 获取行为状态
    function getBehaviorState(
        string memory _className,
        uint _index
    ) public view returns (bool finalized, bool behaviorPassed) {
        require(
            _index < classBehaviorsMapping[_className].length,
            "Invalid behavior index"
        );
        Behavior storage behavior = classBehaviorsMapping[_className][_index];
        return (behavior.finalized, behavior.behaviorPassed);
    }

    // 投票函数
    function vote(
        bool _vote,
        string memory _studentName,
        string memory _className
    ) public {
        require(isRegistered(), "Student not registered");
        uint index = findBehaviorIndex(_studentName, _className);
        require(index != type(uint).max, "Behavior not found");
        Behavior storage behavior = classBehaviorsMapping[_className][index];
        require(!behavior.finalized, "Behavior has already been finalized");
        require(
            !hasVoted[students[msg.sender].className][index][msg.sender],
            "Already voted!"
        );
        if (_vote) {
            behavior.yesCount++;
        } else {
            behavior.noCount++;
        }
        hasVoted[students[msg.sender].className][index][msg.sender] = true;
        // Check if all classmates voted
        uint totalVotes = getClassmateCount(_className);
        if (behavior.yesCount + behavior.noCount == totalVotes) {
            if (behavior.yesCount > behavior.noCount) {
                behavior.finalized = true;
                behavior.behaviorPassed = true;
            } else {
                behavior.finalized = true;
                behavior.behaviorPassed = false;
                // Remove behavior if proposal not passed
            }
        }
    }

    // 辅助函数：获取班级同学数
    function getClassmateCount(
        string memory _className
    ) internal view returns (uint) {
        return classStudentCounts[_className];
    }

    // 辅助函数：查找行为索引
    function findBehaviorIndex(
        string memory _studentName,
        string memory _className
    ) public view returns (uint) {
        Behavior[] storage behaviors = classBehaviorsMapping[_className];
        for (uint i = 0; i < behaviors.length; i++) {
            if (
                keccak256(abi.encodePacked(behaviors[i].studentName)) ==
                keccak256(abi.encodePacked(_studentName))
            ) {
                return i;
            }
        }
        return type(uint).max;
    }

    function changeChairman(address _newChairman) public onlyChairman {
        chairman = _newChairman;
    }

    function deleteStudent(uint256 _studentId) public onlyChairman {
        address studentAddress = studentAddresses[_studentId];
        string memory className = students[studentAddress].className;
        delete students[studentAddress];
        delete studentAddresses[_studentId];
        classStudentCounts[className]--;
        allStuCount--;
    }

    function getAllStuCount() public view returns (uint) {
        return allStuCount;
    }

    function getStudentInfoById(
        uint256 _studentId
    )
        public
        view
        returns (
            string memory name,
            string memory className,
            string memory faculty
        )
    {
        address studentAddress = studentAddresses[_studentId];
        return (
            students[studentAddress].name,
            students[studentAddress].className,
            students[studentAddress].faculty
        );
    }

    receive() external payable {}

    // * fallback function
    fallback() external payable {}
}
