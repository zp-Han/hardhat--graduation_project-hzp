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
        inputs: [],
        name: "admin",
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
                name: "_newAdmin",
                type: "address",
            },
        ],
        name: "changeAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_student",
                type: "address",
            },
        ],
        name: "deleteStudent",
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
<<<<<<< HEAD
            },
            {
                internalType: "string",
                name: "faculty",
                type: "string",
=======
>>>>>>> 11a5e52abbae51ae09e845e7a5ba250548766eee
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
]
