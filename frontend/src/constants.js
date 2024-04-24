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
                internalType: "string",
                name: "studentName",
                type: "string",
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
            {
                indexed: false,
                internalType: "uint256",
                name: "allCount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "yesCount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "noCount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "finalized",
                type: "bool",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "behaviorPassed",
                type: "bool",
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
                internalType: "string",
                name: "",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "classBehaviorsMapping",
        outputs: [
            {
                internalType: "string",
                name: "studentName",
                type: "string",
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
                name: "allCount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "yesCount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "noCount",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "finalized",
                type: "bool",
            },
            {
                internalType: "bool",
                name: "behaviorPassed",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        name: "classStudentCounts",
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
        ],
        name: "deleteStudent",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_studentName",
                type: "string",
            },
            {
                internalType: "string",
                name: "_className",
                type: "string",
            },
        ],
        name: "findBehaviorIndex",
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
        inputs: [],
        name: "getAllStuCount",
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
                internalType: "string",
                name: "_className",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "_index",
                type: "uint256",
            },
        ],
        name: "getBehaviorState",
        outputs: [
            {
                internalType: "bool",
                name: "finalized",
                type: "bool",
            },
            {
                internalType: "bool",
                name: "behaviorPassed",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getBehaviors",
        outputs: [
            {
                components: [
                    {
                        internalType: "string",
                        name: "studentName",
                        type: "string",
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
                        name: "allCount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "yesCount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "noCount",
                        type: "uint256",
                    },
                    {
                        internalType: "bool",
                        name: "finalized",
                        type: "bool",
                    },
                    {
                        internalType: "bool",
                        name: "behaviorPassed",
                        type: "bool",
                    },
                ],
                internalType: "struct stuBehaviorInfoSys.Behavior[]",
                name: "",
                type: "tuple[]",
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
        name: "getStudentInfo",
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
                name: "_studentId",
                type: "uint256",
            },
        ],
        name: "getStudentInfoById",
        outputs: [
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
                internalType: "string",
                name: "",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "hasVoted",
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
                internalType: "string",
                name: "_studentName",
                type: "string",
            },
            {
                internalType: "string",
                name: "_className",
                type: "string",
            },
        ],
        name: "vote",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },
]
