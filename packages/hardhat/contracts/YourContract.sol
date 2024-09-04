//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;


import "@openzeppelin/contracts/access/Ownable.sol";

contract YourContract is Ownable{

	uint256 public PRIZE = 0.001 * 10**18;

	uint256 private qId; //make private

	constructor() payable{}
	

	mapping(uint256 => mapping(uint256 => uint256)) public responses;

	mapping (address => bool) isAnswered;

	mapping (address => bool) isBlackListed;

	event QuestionAdded(uint256 indexed qId,string questions,string answer1,string answer2);
	

	function addQuestion(string memory questionText,string memory answer1,string memory answer2) public onlyOwner {
		
		emit QuestionAdded(qId,questionText,answer1,answer2);
		qId++;
	}

	function addAnswer(uint256[] memory answers) public {
        require(answers.length == qId, "Answers length mismatch");
		require(isAnswered[msg.sender] == false,"You have already send it!");
		require(isBlackListed[msg.sender] == false,"You are blacklisted");

		if (answers[0] == 0) {
			addBlacklist(msg.sender);
			require(isBlackListed[msg.sender] == false,"You are blacklisted");
		}

        for (uint256 i = 0; i < answers.length; i++) {
            uint256 answer = answers[i];
            require(answer == 0 || answer == 1, "Invalid answer");

            responses[i][answer]++;
        }
		isAnswered[msg.sender] = true;

		sendPrize(payable(msg.sender));
		
    }

	function getResponses(uint256 questionId) public view returns (uint256 answer1Count, uint256 answer2Count) {
        return (responses[questionId][0], responses[questionId][1]);
    }

	function addBlacklist(address suspect) private {
		isBlackListed[suspect] = true;
	}

	function sendPrize(address payable _to) private {
        // Call returns a boolean value indicating success or failure.
        // This is the current recommended method to use.
        (bool sent,) = _to.call{value: PRIZE}("");
        require(sent, "Failed to send Ether");
    }
	

	
    

    

	
	receive() external payable {}
	fallback() external payable{}
}
