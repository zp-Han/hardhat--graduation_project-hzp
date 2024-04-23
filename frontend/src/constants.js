export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
export const abi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "student",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "studyHours",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "expenses",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "exerciseHours",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "sleepHours",
                type: "uint256",
            },
        ],
        name: "BehaviorSubmitted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "proposalId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "creator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "studyHours",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "expenses",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "exerciseHours",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "sleepHours",
                type: "uint256",
            },
        ],
        name: "ProposalCreated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "student",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "studentId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                indexed: false,
                internalType: "string",
                name: "className",
                type: "string",
            },
            {
                indexed: false,
                internalType: "string",
                name: "faculty",
                type: "string",
            },
        ],
        name: "StudentRegistered",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "proposalId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "proposalResult",
                type: "bool",
            },
        ],
        name: "VotingEnded",
        type: "event",
    },
    {
        stateMutability: "payable",
        type: "fallback",
    },
    {
        inputs: [],
        name: "chairman",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_newChairman",
                type: "address",
            },
        ],
        name: "changeChairman",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_timestamp",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_studyHours",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_expenses",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_exerciseHours",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_sleepHours",
                type: "uint256",
            },
        ],
        name: "createProposal",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_studentId",
                type: "uint256",
            },
        ],
        name: "deleteStudent",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_proposalId",
                type: "uint256",
            },
        ],
        name: "endVoting",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "getMyBasicInfo",
        outputs: [
            {
                internalType: "uint256",
                name: "studentId",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "string",
                name: "className",
                type: "string",
            },
            {
                internalType: "string",
                name: "faculty",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_timestamp",
                type: "uint256",
            },
        ],
        name: "getMyBehavior",
        outputs: [
            {
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "studyHours",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "expenses",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "exerciseHours",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "sleepHours",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getMyStudentInfo",
        outputs: [
            {
                internalType: "uint256",
                name: "studentId",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "string",
                name: "className",
                type: "string",
            },
            {
                internalType: "string",
                name: "faculty",
                type: "string",
            },
            {
                internalType: "uint256[]",
                name: "behaviorTimestamps",
                type: "uint256[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "isRegistered",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "proposalPassed",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "proposals",
        outputs: [
            {
                internalType: "address",
                name: "creator",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "studyHours",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "expenses",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "exerciseHours",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "sleepHours",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "yesVotes",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "noVotes",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "proposalsCount",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_studentId",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "_name",
                type: "string",
            },
            {
                internalType: "string",
                name: "_className",
                type: "string",
            },
            {
                internalType: "string",
                name: "_faculty",
                type: "string",
            },
        ],
        name: "register",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "studentAddresses",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "students",
        outputs: [
            {
                internalType: "uint256",
                name: "studentId",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "string",
                name: "className",
                type: "string",
            },
            {
                internalType: "string",
                name: "faculty",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_timestamp",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_studyHours",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_expenses",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_exerciseHours",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_sleepHours",
                type: "uint256",
            },
        ],
        name: "submitBehavior",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bool",
                name: "_vote",
                type: "bool",
            },
            {
                internalType: "uint256",
                name: "_proposalId",
                type: "uint256",
            },
        ],
        name: "vote",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "votingEndTime",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },
]
