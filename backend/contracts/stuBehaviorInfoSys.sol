// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract stuBehaviorInfoSys {
    address public chairman; // Contract chairman address
    uint public votingEndTime;
    bool public proposalPassed;

    struct Proposal {
        address creator;
        uint timestamp;
        uint studyHours;
        uint expenses;
        uint exerciseHours;
        uint sleepHours;
        uint yesVotes;
        uint noVotes;
        mapping(address => bool) voted;
    }

    Proposal[] public proposals;

    struct Student {
        uint256 studentId;
        string name;
        string className;
        string faculty; // Faculty information
    }

    struct Behavior {
        uint timestamp;
        uint studyHours; // Study duration (hours)
        uint expenses; // Expenses amount
        uint exerciseHours; // Exercise duration (hours)
        uint sleepHours; // Sleep duration (hours)
    }

    struct StudentInfo {
        mapping(uint => bool) behaviorExists; // Mapping to track behavior existence
        mapping(uint => Behavior) behaviors; // Student behavior records, key is timestamp
        uint[] behaviorTimestamps; // An array to keep track of behavior timestamps.
    }

    mapping(address => Student) public students; // Mapping from student address to Student information
    mapping(uint256 => address) public studentAddresses; // Mapping from student ID to student address
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

    event ProposalCreated(
        uint indexed proposalId,
        address indexed creator,
        uint timestamp,
        uint studyHours,
        uint expenses,
        uint exerciseHours,
        uint sleepHours
    );

    event VotingEnded(uint indexed proposalId, bool proposalResult);

    modifier onlyChairman() {
        require(
            msg.sender == chairman,
            "Only chairman can perform this action"
        );
        _;
    }

    modifier onlyVotingTime() {
        require(block.timestamp <= votingEndTime, "Voting has ended");
        _;
    }

    constructor() {
        chairman = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    }

    // Student registration function
    function register(
        uint _studentId,
        string memory _name,
        string memory _className,
        string memory _faculty
    ) public {
        address studentAddress = msg.sender; // 获取调用者的地址
        students[studentAddress] = Student(
            _studentId,
            _name,
            _className,
            _faculty
        );
        studentAddresses[_studentId] = studentAddress; // 记录学生地址
        emit StudentRegistered(
            studentAddress,
            _studentId,
            _name,
            _className,
            _faculty
        );
    }

    function isRegistered() public view returns (bool) {
        return students[msg.sender].studentId != 0;
    }

    // Function to submit behavior records
    function submitBehavior(
        uint _timestamp,
        uint _studyHours,
        uint _expenses,
        uint _exerciseHours,
        uint _sleepHours
    ) public {
        address studentAddress = msg.sender;
        require(
            students[studentAddress].studentId != 0,
            "Student not registered"
        );
        require(
            !studentInfos[studentAddress].behaviorExists[_timestamp],
            "Behavior info already exists for the given timestamp"
        );

        studentInfos[studentAddress].behaviors[_timestamp] = Behavior(
            _timestamp,
            _studyHours,
            _expenses,
            _exerciseHours,
            _sleepHours
        );
        studentInfos[studentAddress].behaviorExists[_timestamp] = true;
        studentInfos[studentAddress].behaviorTimestamps.push(_timestamp);

        emit BehaviorSubmitted(
            studentAddress,
            _timestamp,
            _studyHours,
            _expenses,
            _exerciseHours,
            _sleepHours
        );
    }

    // Function to change contract chairman
    function changeChairman(address _newChairman) public onlyChairman {
        chairman = _newChairman;
    }

    // Function to delete student information (only callable by chairman)
    function deleteStudent(uint256 _studentId) public onlyChairman {
        address studentAddress = studentAddresses[_studentId];
        require(studentAddress != address(0), "Student not found");
        delete students[studentAddress];
        delete studentInfos[studentAddress];
    }

    // Get basic information of the caller
    function getMyBasicInfo()
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
        Student memory myInfo = students[studentAddress];
        require(myInfo.studentId != 0, "You are not registered");
        return (
            myInfo.studentId,
            myInfo.name,
            myInfo.className,
            myInfo.faculty
        );
    }

    // Get detailed information and behavior timestamps of the caller
    function getMyStudentInfo()
        public
        view
        returns (
            uint256 studentId,
            string memory name,
            string memory className,
            string memory faculty,
            uint[] memory behaviorTimestamps
        )
    {
        address studentAddress = msg.sender;
        require(
            students[studentAddress].studentId != 0,
            "You are not registered"
        );
        Student memory myInfo = students[studentAddress];
        return (
            myInfo.studentId,
            myInfo.name,
            myInfo.className,
            myInfo.faculty,
            studentInfos[studentAddress].behaviorTimestamps
        );
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
        address studentAddress = msg.sender;
        require(
            students[studentAddress].studentId != 0,
            "You are not registered"
        );
        Behavior memory behavior = studentInfos[studentAddress].behaviors[
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

    // Function to create proposal
    function createProposal(
        uint _timestamp,
        uint _studyHours,
        uint _expenses,
        uint _exerciseHours,
        uint _sleepHours
    ) public {
        Proposal storage newProposal = proposals.push();
        newProposal.creator = msg.sender;
        newProposal.timestamp = _timestamp;
        newProposal.studyHours = _studyHours;
        newProposal.expenses = _expenses;
        newProposal.exerciseHours = _exerciseHours;
        newProposal.sleepHours = _sleepHours;
        newProposal.yesVotes = 0;
        newProposal.noVotes = 0;

        emit ProposalCreated(
            proposals.length - 1,
            msg.sender,
            _timestamp,
            _studyHours,
            _expenses,
            _exerciseHours,
            _sleepHours
        );
    }

    // Function to vote on a proposal
    function vote(bool _vote, uint _proposalId) public onlyVotingTime {
        require(
            !proposals[_proposalId].voted[msg.sender],
            "You have already voted for this proposal"
        );
        require(_proposalId < proposals.length, "Invalid proposal ID");

        if (_vote) {
            proposals[_proposalId].yesVotes++;
        } else {
            proposals[_proposalId].noVotes++;
        }

        proposals[_proposalId].voted[msg.sender] = true;
    }

    function proposalsCount() public view returns (uint) {
        return proposals.length;
    }

    // * receive function
    receive() external payable {}

    // * fallback function
    fallback() external payable {}

    // Function to end voting on a proposal
    function endVoting(uint _proposalId) public onlyChairman {
        require(block.timestamp > votingEndTime, "Voting has not ended yet");
        require(_proposalId < proposals.length, "Invalid proposal ID");

        Proposal storage proposal = proposals[_proposalId];
        uint totalVotes = proposal.yesVotes + proposal.noVotes;

        if (totalVotes > 0) {
            if (proposal.yesVotes > proposal.noVotes) {
                proposalPassed = true;
            } else {
                proposalPassed = false;
            }
        }

        emit VotingEnded(_proposalId, proposalPassed);
    }
}
