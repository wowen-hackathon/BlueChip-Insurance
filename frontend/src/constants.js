export const json_rpc_provider = "https://api.wowen.io/nodes/rpc";
export const contract_address = "0x210c68419CD16a1116c088A22e30C79D1bf3940b";
export const contract_owner = "0x545e3fcfcf6e34c73f881e92ebd1dd30d5cfb8ca";
export const abi = [
	{
  	"inputs": [],
  	"stateMutability": "nonpayable",
  	"type": "constructor"
	},
	{
  	"inputs": [],
  	"name": "NotOwner",
  	"type": "error"
	},
	{
  	"anonymous": false,
  	"inputs": [
    	{
      	"indexed": false,
      	"internalType": "uint256",
      	"name": "claimNumber",
      	"type": "uint256"
    	},
    	{
      	"indexed": false,
      	"internalType": "address",
      	"name": "newAddress",
      	"type": "address"
    	},
    	{
      	"indexed": false,
      	"internalType": "uint256",
      	"name": "amount",
      	"type": "uint256"
    	}
  	],
  	"name": "ClaimApproved",
  	"type": "event"
	},
	{
  	"anonymous": false,
  	"inputs": [
    	{
      	"indexed": false,
      	"internalType": "uint256",
      	"name": "claimNumber",
      	"type": "uint256"
    	},
    	{
      	"indexed": false,
      	"internalType": "address",
      	"name": "claimant",
      	"type": "address"
    	},
    	{
      	"indexed": false,
      	"internalType": "string",
      	"name": "transactionHash",
      	"type": "string"
    	},
    	{
      	"indexed": false,
      	"internalType": "uint256",
      	"name": "amount",
      	"type": "uint256"
    	},
    	{
      	"indexed": false,
      	"internalType": "string",
      	"name": "comments",
      	"type": "string"
    	},
    	{
      	"indexed": false,
      	"internalType": "enum Insurance.ClaimStatus",
      	"name": "status",
      	"type": "uint8"
    	},
    	{
      	"indexed": false,
      	"internalType": "uint256",
      	"name": "timestamp",
      	"type": "uint256"
    	}
  	],
  	"name": "ClaimFiled",
  	"type": "event"
	},
	{
  	"anonymous": false,
  	"inputs": [
    	{
      	"indexed": false,
      	"internalType": "uint256",
      	"name": "claimNumber",
      	"type": "uint256"
    	}
  	],
  	"name": "ClaimRejected",
  	"type": "event"
	},
	{
  	"anonymous": false,
  	"inputs": [
    	{
      	"indexed": false,
      	"internalType": "address",
      	"name": "payer",
      	"type": "address"
    	},
    	{
      	"indexed": false,
      	"internalType": "uint256",
      	"name": "amount",
      	"type": "uint256"
    	},
    	{
      	"indexed": false,
      	"internalType": "uint256",
      	"name": "timestamp",
      	"type": "uint256"
    	}
  	],
  	"name": "PremiumPaid",
  	"type": "event"
	},
	{
  	"stateMutability": "payable",
  	"type": "fallback"
	},
	{
  	"inputs": [
    	{
      	"internalType": "address",
      	"name": "",
      	"type": "address"
    	},
    	{
      	"internalType": "uint256",
      	"name": "",
      	"type": "uint256"
    	}
  	],
  	"name": "addressToClaims",
  	"outputs": [
    	{
      	"internalType": "uint256",
      	"name": "",
      	"type": "uint256"
    	}
  	],
  	"stateMutability": "view",
  	"type": "function"
	},
	{
  	"inputs": [
    	{
      	"internalType": "address",
      	"name": "",
      	"type": "address"
    	}
  	],
  	"name": "addressToPremium",
  	"outputs": [
    	{
      	"internalType": "uint256",
      	"name": "",
      	"type": "uint256"
    	}
  	],
  	"stateMutability": "view",
  	"type": "function"
	},
	{
  	"inputs": [
    	{
      	"internalType": "uint256",
      	"name": "_id",
      	"type": "uint256"
    	}
  	],
  	"name": "approveClaim",
  	"outputs": [],
  	"stateMutability": "payable",
  	"type": "function"
	},
	{
  	"inputs": [],
  	"name": "claimCounter",
  	"outputs": [
    	{
      	"internalType": "uint256",
      	"name": "",
      	"type": "uint256"
    	}
  	],
  	"stateMutability": "view",
  	"type": "function"
	},
	{
  	"inputs": [
    	{
      	"internalType": "uint256",
      	"name": "",
      	"type": "uint256"
    	}
  	],
  	"name": "claims",
  	"outputs": [
    	{
      	"internalType": "uint256",
      	"name": "claimNumber",
      	"type": "uint256"
    	},
    	{
      	"internalType": "address",
      	"name": "claimant",
      	"type": "address"
    	},
    	{
      	"internalType": "address",
      	"name": "newAddress",
      	"type": "address"
    	},
    	{
      	"internalType": "string",
      	"name": "transactionHash",
      	"type": "string"
    	},
    	{
      	"internalType": "uint256",
      	"name": "amount",
      	"type": "uint256"
    	},
    	{
      	"internalType": "string",
      	"name": "comments",
      	"type": "string"
    	},
    	{
      	"internalType": "uint256",
      	"name": "timestamp",
      	"type": "uint256"
    	},
    	{
      	"internalType": "enum Insurance.ClaimStatus",
      	"name": "status",
      	"type": "uint8"
    	}
  	],
  	"stateMutability": "view",
  	"type": "function"
	},
	{
  	"inputs": [
    	{
      	"internalType": "address",
      	"name": "_newAddress",
      	"type": "address"
    	},
    	{
      	"internalType": "string",
      	"name": "_transactionHash",
      	"type": "string"
    	},
    	{
      	"internalType": "uint256",
      	"name": "_amount",
      	"type": "uint256"
    	},
    	{
      	"internalType": "string",
      	"name": "_comments",
      	"type": "string"
    	}
  	],
  	"name": "fileClaim",
  	"outputs": [],
  	"stateMutability": "nonpayable",
  	"type": "function"
	},
	{
  	"inputs": [
    	{
      	"internalType": "address",
      	"name": "_account",
      	"type": "address"
    	}
  	],
  	"name": "getClaimsByAccount",
  	"outputs": [
    	{
      	"internalType": "uint256[]",
      	"name": "",
      	"type": "uint256[]"
    	}
  	],
  	"stateMutability": "view",
  	"type": "function"
	},
	{
  	"inputs": [
    	{
      	"internalType": "uint256",
      	"name": "_id",
      	"type": "uint256"
    	}
  	],
  	"name": "getClaimsById",
  	"outputs": [
    	{
      	"components": [
        	{
          	"internalType": "uint256",
          	"name": "claimNumber",
          	"type": "uint256"
        	},
        	{
          	"internalType": "address",
          	"name": "claimant",
          	"type": "address"
        	},
        	{
          	"internalType": "address",
          	"name": "newAddress",
          	"type": "address"
        	},
        	{
          	"internalType": "string",
          	"name": "transactionHash",
          	"type": "string"
        	},
        	{
          	"internalType": "uint256",
          	"name": "amount",
          	"type": "uint256"
        	},
        	{
          	"internalType": "string",
          	"name": "comments",
          	"type": "string"
        	},
        	{
          	"internalType": "uint256",
          	"name": "timestamp",
          	"type": "uint256"
        	},
        	{
          	"internalType": "enum Insurance.ClaimStatus",
          	"name": "status",
          	"type": "uint8"
        	}
      	],
      	"internalType": "struct Insurance.Claim",
      	"name": "",
      	"type": "tuple"
    	}
  	],
  	"stateMutability": "view",
  	"type": "function"
	},
	{
  	"inputs": [],
  	"name": "i_owner",
  	"outputs": [
    	{
      	"internalType": "address",
      	"name": "",
      	"type": "address"
    	}
  	],
  	"stateMutability": "view",
  	"type": "function"
	},
	{
  	"inputs": [
    	{
      	"internalType": "uint256",
      	"name": "",
      	"type": "uint256"
    	}
  	],
  	"name": "insurers",
  	"outputs": [
    	{
      	"internalType": "address",
      	"name": "",
      	"type": "address"
    	}
  	],
  	"stateMutability": "view",
  	"type": "function"
	},
	{
  	"inputs": [],
  	"name": "payPremium",
  	"outputs": [],
  	"stateMutability": "payable",
  	"type": "function"
	},
	{
  	"inputs": [
    	{
      	"internalType": "uint256",
      	"name": "",
      	"type": "uint256"
    	}
  	],
  	"name": "premiumToTimestamp",
  	"outputs": [
    	{
      	"internalType": "uint256",
      	"name": "",
      	"type": "uint256"
    	}
  	],
  	"stateMutability": "view",
  	"type": "function"
	},
	{
  	"inputs": [
    	{
      	"internalType": "uint256",
      	"name": "_id",
      	"type": "uint256"
    	}
  	],
  	"name": "rejectClaim",
  	"outputs": [],
  	"stateMutability": "nonpayable",
  	"type": "function"
	},
	{
  	"stateMutability": "payable",
  	"type": "receive"
	}
  ]
