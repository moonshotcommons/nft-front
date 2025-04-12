export const wagmiContractConfig = {
    address: '0x1055d7Cf98124621Ad25997E77662bdFE62a40D0',
    abi: [
        {
          inputs: [
            { internalType: 'string', name: 'name', type: 'string' },
            { internalType: 'string', name: 'symbol', type: 'string' }
          ],
          stateMutability: 'nonpayable',
          type: 'constructor'
        },
        {
          inputs: [
            { internalType: 'address', name: 'minter', type: 'address' },
            {
              internalType: 'address',
              name: 'contractAddr',
              type: 'address'
            }
          ],
          type: 'error',
          name: 'AlreadyMint'
        },
        {
          inputs: [
            { internalType: 'address', name: 'sender', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { internalType: 'address', name: 'owner', type: 'address' }
          ],
          type: 'error',
          name: 'ERC721IncorrectOwner'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'operator',
              type: 'address'
            },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
          ],
          type: 'error',
          name: 'ERC721InsufficientApproval'
        },
        {
          inputs: [
            { internalType: 'address', name: 'approver', type: 'address' }
          ],
          type: 'error',
          name: 'ERC721InvalidApprover'
        },
        {
          inputs: [
            { internalType: 'address', name: 'operator', type: 'address' }
          ],
          type: 'error',
          name: 'ERC721InvalidOperator'
        },
        {
          inputs: [
            { internalType: 'address', name: 'owner', type: 'address' }
          ],
          type: 'error',
          name: 'ERC721InvalidOwner'
        },
        {
          inputs: [
            { internalType: 'address', name: 'receiver', type: 'address' }
          ],
          type: 'error',
          name: 'ERC721InvalidReceiver'
        },
        {
          inputs: [
            { internalType: 'address', name: 'sender', type: 'address' }
          ],
          type: 'error',
          name: 'ERC721InvalidSender'
        },
        {
          inputs: [
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
          ],
          type: 'error',
          name: 'ERC721NonexistentToken'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'contractAddr',
              type: 'address'
            }
          ],
          type: 'error',
          name: 'NotContract'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'contractAddr',
              type: 'address'
            }
          ],
          type: 'error',
          name: 'NotNFTContract'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
              indexed: true
            },
            {
              internalType: 'address',
              name: 'approved',
              type: 'address',
              indexed: true
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
              indexed: true
            }
          ],
          type: 'event',
          name: 'Approval',
          anonymous: false
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
              indexed: true
            },
            {
              internalType: 'address',
              name: 'operator',
              type: 'address',
              indexed: true
            },
            {
              internalType: 'bool',
              name: 'approved',
              type: 'bool',
              indexed: false
            }
          ],
          type: 'event',
          name: 'ApprovalForAll',
          anonymous: false
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'from',
              type: 'address',
              indexed: true
            },
            {
              internalType: 'address',
              name: 'to',
              type: 'address',
              indexed: true
            },
            {
              internalType: 'uint256',
              name: 'tokenId',
              type: 'uint256',
              indexed: true
            }
          ],
          type: 'event',
          name: 'Transfer',
          anonymous: false
        },
        {
          inputs: [],
          stateMutability: 'view',
          type: 'function',
          name: 'allParticipantContracts',
          outputs: [
            { internalType: 'address[]', name: '', type: 'address[]' }
          ]
        },
        {
          inputs: [],
          stateMutability: 'view',
          type: 'function',
          name: 'allParticipants',
          outputs: [
            { internalType: 'address[]', name: '', type: 'address[]' }
          ]
        },
        {
          inputs: [
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
          ],
          stateMutability: 'nonpayable',
          type: 'function',
          name: 'approve'
        },
        {
          inputs: [
            { internalType: 'address', name: 'owner', type: 'address' }
          ],
          stateMutability: 'view',
          type: 'function',
          name: 'balanceOf',
          outputs: [
            { internalType: 'uint256', name: '', type: 'uint256' }
          ]
        },
        {
          inputs: [
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
          ],
          stateMutability: 'view',
          type: 'function',
          name: 'getApproved',
          outputs: [
            { internalType: 'address', name: '', type: 'address' }
          ]
        },
        {
          inputs: [
            { internalType: 'address', name: 'owner', type: 'address' },
            { internalType: 'address', name: 'operator', type: 'address' }
          ],
          stateMutability: 'view',
          type: 'function',
          name: 'isApprovedForAll',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }]
        },
        {
          inputs: [
            { internalType: 'address', name: 'yourNft', type: 'address' }
          ],
          stateMutability: 'nonpayable',
          type: 'function',
          name: 'mint',
          outputs: [
            { internalType: 'uint256', name: '', type: 'uint256' }
          ]
        },
        {
          inputs: [],
          stateMutability: 'view',
          type: 'function',
          name: 'name',
          outputs: [
            { internalType: 'string', name: '', type: 'string' }
          ]
        },
        {
          inputs: [
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
          ],
          stateMutability: 'view',
          type: 'function',
          name: 'ownerOf',
          outputs: [
            { internalType: 'address', name: '', type: 'address' }
          ]
        },
        {
          inputs: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
          ],
          stateMutability: 'nonpayable',
          type: 'function',
          name: 'safeTransferFrom'
        },
        {
          inputs: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { internalType: 'bytes', name: 'data', type: 'bytes' }
          ],
          stateMutability: 'nonpayable',
          type: 'function',
          name: 'safeTransferFrom'
        },
        {
          inputs: [
            {
              internalType: 'address',
              name: 'operator',
              type: 'address'
            },
            { internalType: 'bool', name: 'approved', type: 'bool' }
          ],
          stateMutability: 'nonpayable',
          type: 'function',
          name: 'setApprovalForAll'
        },
        {
          inputs: [
            {
              internalType: 'bytes4',
              name: 'interfaceId',
              type: 'bytes4'
            }
          ],
          stateMutability: 'view',
          type: 'function',
          name: 'supportsInterface',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }]
        },
        {
          inputs: [],
          stateMutability: 'view',
          type: 'function',
          name: 'symbol',
          outputs: [
            { internalType: 'string', name: '', type: 'string' }
          ]
        },
        {
          inputs: [
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
          ],
          stateMutability: 'view',
          type: 'function',
          name: 'tokenURI',
          outputs: [
            { internalType: 'string', name: '', type: 'string' }
          ]
        },
        {
          inputs: [
            { internalType: 'address', name: 'from', type: 'address' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'tokenId', type: 'uint256' }
          ],
          stateMutability: 'nonpayable',
          type: 'function',
          name: 'transferFrom'
        },
        {
            inputs: [],
            stateMutability: 'view',
            type: 'function',
            name: 'nftId',
            outputs: [
                { internalType: 'uint256', name: '', type: 'uint256' }
            ]
        }
    ],
  } as const