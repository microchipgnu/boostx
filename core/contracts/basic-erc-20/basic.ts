export const abi = [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "symbol",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "DOMAIN_SEPARATOR",
        "inputs": [

        ],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "allowance",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "spender",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "approve",
        "inputs": [
            {
                "name": "spender",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "value",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "balanceOf",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "burn",
        "inputs": [
            {
                "name": "value",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [

        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "burnFrom",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "value",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [

        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "decimals",
        "inputs": [

        ],
        "outputs": [
            {
                "name": "",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "eip712Domain",
        "inputs": [

        ],
        "outputs": [
            {
                "name": "fields",
                "type": "bytes1",
                "internalType": "bytes1"
            },
            {
                "name": "name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "version",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "chainId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "verifyingContract",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "salt",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "extensions",
                "type": "uint256[]",
                "internalType": "uint256[]"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "mint",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [

        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "name",
        "inputs": [

        ],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "nonces",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "owner",
        "inputs": [

        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "pause",
        "inputs": [

        ],
        "outputs": [

        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "paused",
        "inputs": [

        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "permit",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "spender",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "value",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "deadline",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "v",
                "type": "uint8",
                "internalType": "uint8"
            },
            {
                "name": "r",
                "type": "bytes32",
                "internalType": "bytes32"
            },
            {
                "name": "s",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "outputs": [

        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "renounceOwnership",
        "inputs": [

        ],
        "outputs": [

        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "symbol",
        "inputs": [

        ],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "totalSupply",
        "inputs": [

        ],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "transfer",
        "inputs": [
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "value",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "transferFrom",
        "inputs": [
            {
                "name": "from",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "value",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "bool",
                "internalType": "bool"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "transferOwnership",
        "inputs": [
            {
                "name": "newOwner",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [

        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "unpause",
        "inputs": [

        ],
        "outputs": [

        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "Approval",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "spender",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "value",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "EIP712DomainChanged",
        "inputs": [

        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "OwnershipTransferred",
        "inputs": [
            {
                "name": "previousOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "newOwner",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Paused",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Transfer",
        "inputs": [
            {
                "name": "from",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "to",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "value",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "Unpaused",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "ECDSAInvalidSignature",
        "inputs": [

        ]
    },
    {
        "type": "error",
        "name": "ECDSAInvalidSignatureLength",
        "inputs": [
            {
                "name": "length",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "ECDSAInvalidSignatureS",
        "inputs": [
            {
                "name": "s",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC20InsufficientAllowance",
        "inputs": [
            {
                "name": "spender",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "allowance",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "needed",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC20InsufficientBalance",
        "inputs": [
            {
                "name": "sender",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "balance",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "needed",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC20InvalidApprover",
        "inputs": [
            {
                "name": "approver",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC20InvalidReceiver",
        "inputs": [
            {
                "name": "receiver",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC20InvalidSender",
        "inputs": [
            {
                "name": "sender",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC20InvalidSpender",
        "inputs": [
            {
                "name": "spender",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC2612ExpiredSignature",
        "inputs": [
            {
                "name": "deadline",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "ERC2612InvalidSigner",
        "inputs": [
            {
                "name": "signer",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "EnforcedPause",
        "inputs": [

        ]
    },
    {
        "type": "error",
        "name": "ExpectedPause",
        "inputs": [

        ]
    },
    {
        "type": "error",
        "name": "InvalidAccountNonce",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "currentNonce",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "InvalidShortString",
        "inputs": [

        ]
    },
    {
        "type": "error",
        "name": "OwnableInvalidOwner",
        "inputs": [
            {
                "name": "owner",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "OwnableUnauthorizedAccount",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ]
    },
    {
        "type": "error",
        "name": "ReentrancyGuardReentrantCall",
        "inputs": [

        ]
    },
    {
        "type": "error",
        "name": "StringTooLong",
        "inputs": [
            {
                "name": "str",
                "type": "string",
                "internalType": "string"
            }
        ]
    }
]

export const bytecode = "0x6101606040523480156200001257600080fd5b506040516200183938038062001839833981016040819052620000359162000333565b8180604051806040016040528060018152602001603160f81b815250620000616200018c60201b60201c565b858560036200007183826200042e565b5060046200008082826200042e565b50506005805460ff19169055506001600160a01b038116620000bd57604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b620000c88162000190565b50620000d6826006620001ea565b61012052620000e7816007620001ea565b61014052815160208084019190912060e052815190820120610100524660a0526200017560e05161010051604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201529081019290925260608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b60805250503060c052505060016009555062000554565b3390565b600580546001600160a01b03838116610100818102610100600160a81b031985161790945560405193909204169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60006020835110156200020a57620002028362000223565b90506200021d565b816200021784826200042e565b5060ff90505b92915050565b600080829050601f8151111562000251578260405163305a27a960e01b8152600401620000b49190620004fa565b80516200025e826200052f565b179392505050565b634e487b7160e01b600052604160045260246000fd5b60005b83811015620002995781810151838201526020016200027f565b50506000910152565b600082601f830112620002b457600080fd5b81516001600160401b0380821115620002d157620002d162000266565b604051601f8301601f19908116603f01168101908282118183101715620002fc57620002fc62000266565b816040528381528660208588010111156200031657600080fd5b620003298460208301602089016200027c565b9695505050505050565b600080604083850312156200034757600080fd5b82516001600160401b03808211156200035f57600080fd5b6200036d86838701620002a2565b935060208501519150808211156200038457600080fd5b506200039385828601620002a2565b9150509250929050565b600181811c90821680620003b257607f821691505b602082108103620003d357634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111562000429576000816000526020600020601f850160051c81016020861015620004045750805b601f850160051c820191505b81811015620004255782815560010162000410565b5050505b505050565b81516001600160401b038111156200044a576200044a62000266565b62000462816200045b84546200039d565b84620003d9565b602080601f8311600181146200049a5760008415620004815750858301515b600019600386901b1c1916600185901b17855562000425565b600085815260208120601f198616915b82811015620004cb57888601518255948401946001909101908401620004aa565b5085821015620004ea5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60208152600082518060208401526200051b8160408501602087016200027c565b601f01601f19169190910160400192915050565b80516020808301519190811015620003d35760001960209190910360031b1b16919050565b60805160a05160c05160e05161010051610120516101405161128a620005af6000396000610a3801526000610a0b0152600061082b015260006108030152600061075e01526000610788015260006107b2015261128a6000f3fe608060405234801561001057600080fd5b50600436106101425760003560e01c8063715018a6116100b85780638da5cb5b1161007c5780638da5cb5b1461027957806395d89b41146102a2578063a9059cbb146102aa578063d505accf146102bd578063dd62ed3e146102d0578063f2fde38b1461030957600080fd5b8063715018a61461022857806379cc6790146102305780637ecebe00146102435780638456cb591461025657806384b0196e1461025e57600080fd5b80633644e5151161010a5780633644e515146101bc5780633f4ba83a146101c457806340c10f19146101ce57806342966c68146101e15780635c975abb146101f457806370a08231146101ff57600080fd5b806306fdde0314610147578063095ea7b31461016557806318160ddd1461018857806323b872dd1461019a578063313ce567146101ad575b600080fd5b61014f61031c565b60405161015c9190610ffd565b60405180910390f35b610178610173366004611033565b6103ae565b604051901515815260200161015c565b6002545b60405190815260200161015c565b6101786101a836600461105d565b6103c8565b6040516012815260200161015c565b61018c6103ec565b6101cc6103fb565b005b6101cc6101dc366004611033565b61040d565b6101cc6101ef366004611099565b610423565b60055460ff16610178565b61018c61020d3660046110b2565b6001600160a01b031660009081526020819052604090205490565b6101cc610430565b6101cc61023e366004611033565b610442565b61018c6102513660046110b2565b610457565b6101cc610475565b610266610485565b60405161015c97969594939291906110cd565b60055461010090046001600160a01b03166040516001600160a01b03909116815260200161015c565b61014f6104cb565b6101786102b8366004611033565b6104da565b6101cc6102cb366004611166565b6104e8565b61018c6102de3660046111d9565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6101cc6103173660046110b2565b610627565b60606003805461032b9061120c565b80601f01602080910402602001604051908101604052809291908181526020018280546103579061120c565b80156103a45780601f10610379576101008083540402835291602001916103a4565b820191906000526020600020905b81548152906001019060200180831161038757829003601f168201915b5050505050905090565b6000336103bc818585610662565b60019150505b92915050565b6000336103d6858285610674565b6103e18585856106f2565b506001949350505050565b60006103f6610751565b905090565b61040361087c565b61040b6108af565b565b61041561087c565b61041f8282610901565b5050565b61042d3382610937565b50565b61043861087c565b61040b600061096d565b61044d823383610674565b61041f8282610937565b6001600160a01b0381166000908152600860205260408120546103c2565b61047d61087c565b61040b6109c7565b600060608060008060006060610499610a04565b6104a1610a31565b60408051600080825260208201909252600f60f81b9b939a50919850469750309650945092509050565b60606004805461032b9061120c565b6000336103bc8185856106f2565b834211156105115760405163313c898160e11b8152600481018590526024015b60405180910390fd5b60007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c988888861055e8c6001600160a01b0316600090815260086020526040902080546001810190915590565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e00160405160208183030381529060405280519060200120905060006105b982610a5e565b905060006105c982878787610a8b565b9050896001600160a01b0316816001600160a01b031614610610576040516325c0072360e11b81526001600160a01b0380831660048301528b166024820152604401610508565b61061b8a8a8a610662565b50505050505050505050565b61062f61087c565b6001600160a01b03811661065957604051631e4fbdf760e01b815260006004820152602401610508565b61042d8161096d565b61066f8383836001610ab9565b505050565b6001600160a01b0383811660009081526001602090815260408083209386168352929052205460001981146106ec57818110156106dd57604051637dc7a0d960e11b81526001600160a01b03841660048201526024810182905260448101839052606401610508565b6106ec84848484036000610ab9565b50505050565b6001600160a01b03831661071c57604051634b637e8f60e11b815260006004820152602401610508565b6001600160a01b0382166107465760405163ec442f0560e01b815260006004820152602401610508565b61066f838383610b8e565b6000306001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161480156107aa57507f000000000000000000000000000000000000000000000000000000000000000046145b156107d457507f000000000000000000000000000000000000000000000000000000000000000090565b6103f6604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201527f0000000000000000000000000000000000000000000000000000000000000000918101919091527f000000000000000000000000000000000000000000000000000000000000000060608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b6005546001600160a01b0361010090910416331461040b5760405163118cdaa760e01b8152336004820152602401610508565b6108b7610b99565b6005805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b6001600160a01b03821661092b5760405163ec442f0560e01b815260006004820152602401610508565b61041f60008383610b8e565b6001600160a01b03821661096157604051634b637e8f60e11b815260006004820152602401610508565b61041f82600083610b8e565b600580546001600160a01b03838116610100818102610100600160a81b031985161790945560405193909204169182907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6109cf610bbc565b6005805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586108e43390565b60606103f67f00000000000000000000000000000000000000000000000000000000000000006006610be0565b60606103f67f00000000000000000000000000000000000000000000000000000000000000006007610be0565b60006103c2610a6b610751565b8360405161190160f01b8152600281019290925260228201526042902090565b600080600080610a9d88888888610c8b565b925092509250610aad8282610d5a565b50909695505050505050565b6001600160a01b038416610ae35760405163e602df0560e01b815260006004820152602401610508565b6001600160a01b038316610b0d57604051634a1406b160e11b815260006004820152602401610508565b6001600160a01b03808516600090815260016020908152604080832093871683529290522082905580156106ec57826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610b8091815260200190565b60405180910390a350505050565b61066f838383610e13565b60055460ff1661040b57604051638dfc202b60e01b815260040160405180910390fd5b60055460ff161561040b5760405163d93c066560e01b815260040160405180910390fd5b606060ff8314610bfa57610bf383610e26565b90506103c2565b818054610c069061120c565b80601f0160208091040260200160405190810160405280929190818152602001828054610c329061120c565b8015610c7f5780601f10610c5457610100808354040283529160200191610c7f565b820191906000526020600020905b815481529060010190602001808311610c6257829003601f168201915b505050505090506103c2565b600080807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0841115610cc65750600091506003905082610d50565b604080516000808252602082018084528a905260ff891692820192909252606081018790526080810186905260019060a0016020604051602081039080840390855afa158015610d1a573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610d4657506000925060019150829050610d50565b9250600091508190505b9450945094915050565b6000826003811115610d6e57610d6e611246565b03610d77575050565b6001826003811115610d8b57610d8b611246565b03610da95760405163f645eedf60e01b815260040160405180910390fd5b6002826003811115610dbd57610dbd611246565b03610dde5760405163fce698f760e01b815260048101829052602401610508565b6003826003811115610df257610df2611246565b0361041f576040516335e2f38360e21b815260048101829052602401610508565b610e1b610bbc565b61066f838383610e65565b60606000610e3383610f8f565b604080516020808252818301909252919250600091906020820181803683375050509182525060208101929092525090565b6001600160a01b038316610e90578060026000828254610e85919061125c565b90915550610f029050565b6001600160a01b03831660009081526020819052604090205481811015610ee35760405163391434e360e21b81526001600160a01b03851660048201526024810182905260448101839052606401610508565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b038216610f1e57600280548290039055610f3d565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610f8291815260200190565b60405180910390a3505050565b600060ff8216601f8111156103c257604051632cd44ac360e21b815260040160405180910390fd5b6000815180845260005b81811015610fdd57602081850181015186830182015201610fc1565b506000602082860101526020601f19601f83011685010191505092915050565b6020815260006110106020830184610fb7565b9392505050565b80356001600160a01b038116811461102e57600080fd5b919050565b6000806040838503121561104657600080fd5b61104f83611017565b946020939093013593505050565b60008060006060848603121561107257600080fd5b61107b84611017565b925061108960208501611017565b9150604084013590509250925092565b6000602082840312156110ab57600080fd5b5035919050565b6000602082840312156110c457600080fd5b61101082611017565b60ff60f81b881681526000602060e060208401526110ee60e084018a610fb7565b8381036040850152611100818a610fb7565b606085018990526001600160a01b038816608086015260a0850187905284810360c08601528551808252602080880193509091019060005b8181101561115457835183529284019291840191600101611138565b50909c9b505050505050505050505050565b600080600080600080600060e0888a03121561118157600080fd5b61118a88611017565b965061119860208901611017565b95506040880135945060608801359350608088013560ff811681146111bc57600080fd5b9699959850939692959460a0840135945060c09093013592915050565b600080604083850312156111ec57600080fd5b6111f583611017565b915061120360208401611017565b90509250929050565b600181811c9082168061122057607f821691505b60208210810361124057634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052602160045260246000fd5b808201808211156103c257634e487b7160e01b600052601160045260246000fdfea164736f6c6343000818000a"
