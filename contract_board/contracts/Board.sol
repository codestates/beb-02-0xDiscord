// SPDX-License-Identifier: MIT
pragma solidity >=0.5.6;

import "./ownerShip/Ownable.sol";
import "./drafts/Counters.sol";

contract Board is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _msgIds;

    constructor() public {}

    struct BoardMsg {
        string user_msg;
        address user_addr;
    }

    BoardMsg[] boardMsgs;
    mapping(address => uint256[]) user_write_content;

    function write(string memory _input) public {
        _msgIds.increment();

        BoardMsg memory ums;
        ums = BoardMsg(_input, msg.sender);
        user_write_content[msg.sender].push(_msgIds.current());
        boardMsgs.push(ums);
    }

    function getMsgById(uint256 _msg_id)
        public
        view
        returns (string memory, address)
    {
        BoardMsg storage boardMsg = boardMsgs[_msg_id];
        return (boardMsg.user_msg, boardMsg.user_addr);
    }

    function getMsgNumberByUser(address _addr)
        public
        view
        returns (uint256[] memory)
    {
        return (user_write_content[_addr]);
    }
    // function readMsgByUser(address _addr) public view returns (uint256) {
    //     uint256[] memory user_msgIds = user_write_content[_addr];
    //     return (user_msgIds.length);
    // }
}

// i = await Board.deployed()
// i.write("test1");
// i.write("test2");
// i.getMsgNumberByUser('0xcbd23a08c3e91b6aaccdee650b3b29cd34bf6fac')
