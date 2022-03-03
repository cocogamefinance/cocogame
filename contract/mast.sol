// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

// File: @openzeppelin/contracts/math/SafeMath.sol

/**
 * @dev Wrappers over Solidity's arithmetic operations with added overflow
 * checks.
 *
 * Arithmetic operations in Solidity wrap on overflow. This can easily result
 * in bugs, because programmers usually assume that an overflow raises an
 * error, which is the standard behavior in high level programming languages.
 * `SafeMath` restores this intuition by reverting the transaction when an
 * operation overflows.
 *
 * Using this library instead of the unchecked operations eliminates an entire
 * class of bugs, so it's recommended to use it always.
 */
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}


/*
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with GSN meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address payable) {
        return payable(msg.sender);
    }

    function _msgData() internal view virtual returns (bytes memory) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}

// File: @openzeppelin/contracts/access/Ownable.sol

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor ()  {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(_owner == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}


// MasterChef is the master of Sushi. He can make Sushi and he is a fair guy.
//
// Note that it's ownable and the owner wields tremendous power. The ownership
// will be transferred to a governance smart contract once SUSHI is sufficiently
// distributed and the community can show to govern itself.
//
// Have fun reading it. Hopefully it's bug-free. God bless.
contract MasterChef is Ownable {
    using SafeMath for uint256;
   
    // Info of each user.
    struct UserInfo {
        uint256 amount;     // How many LP tokens the user has provided.
        uint256 rewardDebt; // Reward debt. See explanation below.
    }
    
    uint256 public rewardForEachBlock = 20000000 * 10 ** 18 ;    //Reward for each block
    uint256 public lastRewardBlock;  // Last block number that SUSHIs distribution occurs.
    uint256 public accSushiPerShare ; // Accumulated SUSHIs per share, times 1e12. See below.
    uint256 public startBlock; // Reward start block.
    uint256 public endBlock;  // Reward end block.
    uint256  private rewardDebt;
    // address public precipitation;
    
    uint256 public rewardTokenStakeTotalSupply=0;
    
    uint256 private constant ACC_SUSHI_PRECISION = 1e12;
    
    uint8 public constant ZERO = 0 ;
   
    // The SUSHI TOKEN!
    IERC20 public stakeToken;
    IERC20 public rewardToken;

    address[]  private stakers;
    
    mapping(address =>bool) public admin;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;
    mapping(address =>uint)public userReceivedRewards;
    mapping (address => UserInfo ) public usersInfo;
  
    
    event stakeMthTransfer(address indexed user,  uint256 amount);
    event unStakeMthTransfer(address indexed user,  uint256 amount);
    event EmergencyWithdraw(address indexed user,   uint256 amount);
    event ReceiveAwardTransfer(address indexed user,   uint256 amount);
    event EmergencyStop(address indexed user, address to, uint256 amount);
   
    
    constructor(
        IERC20 _rewardToken, address lock)  {
        rewardToken = _rewardToken;
        admin[lock] = true;
        admin[msg.sender]=true;
        startBlock = block.number;
        endBlock = startBlock+126144000;
        rewardForEachBlock = rewardForEachBlock.div(126144000);
    }
    
    modifier onlyAdmin {
        require (admin[msg.sender]);
        _;
    }
    
    function setAdmin(address _admin)public onlyOwner{
        admin[_admin]=true;
    }
    function delAdmin(address _admin)public onlyOwner{
        admin[_admin]=false;
    }

    // Return reward multiplier over the given _from to _to block.
    function getMultiplier(uint256 _from, uint256 _to) public pure returns (uint256) {
        if(_to > _from){
            return _to.sub(_from);
        }
        return 0;
    }
    
    
    // Update reward variables of the given pool to be up-to-date.
    function updatePool() public {
  
        if (block.number <= lastRewardBlock) {
            return;
        }
        
        if (lastRewardBlock >= endBlock){
             return;
        }
        
        uint256 multiplier;
        if (block.number > endBlock){
            multiplier = getMultiplier(lastRewardBlock, endBlock);
            lastRewardBlock = endBlock;
  
        }else{
            multiplier = getMultiplier(lastRewardBlock, block.number);
            lastRewardBlock = block.number;
        }
       
        if (rewardTokenStakeTotalSupply == ZERO) {
            return;
        }
        uint256 sushiReward = multiplier.mul(rewardForEachBlock);
        accSushiPerShare = accSushiPerShare.add(sushiReward.mul(ACC_SUSHI_PRECISION).div(rewardTokenStakeTotalSupply));
    }
    
    
    function updateRewardEachBlock(uint256 reward)external onlyAdmin{
        require(reward >0 ,"Reward must be greater than 0");
        updatePool();
        rewardForEachBlock = reward;
    }
    
    // View function to see pending SUSHIs on frontend.
    function userRewards( address _user) private view returns (uint256) {

       UserInfo storage user = usersInfo[_user];
       uint256 _accSushiPerShare = accSushiPerShare;

        if (block.number > lastRewardBlock && rewardTokenStakeTotalSupply != 0){
            uint256 multiplier = 0;
            if (block.number > endBlock){
                if(lastRewardBlock < endBlock){
                    multiplier = getMultiplier(lastRewardBlock, endBlock);
                }
            }else{
                multiplier = getMultiplier(lastRewardBlock, block.number);
            }
            uint256 sushiReward = multiplier.mul(rewardForEachBlock);
 
            _accSushiPerShare = accSushiPerShare.add(sushiReward.mul(ACC_SUSHI_PRECISION).div(rewardTokenStakeTotalSupply));
        }
        return user.amount.mul(_accSushiPerShare).div(ACC_SUSHI_PRECISION).sub(user.rewardDebt).mul(85).div(100);
    }

    // Deposit LP tokens to MasterChef for SUSHI allocation.
    function stakeTokens( address sender ,uint256 _amount) public onlyAdmin {
        require(_amount > 0, "amount cannot be 0");
        require(block.number <= endBlock,"this pool is end!");
        UserInfo storage user = usersInfo[sender];
        receiveReward(sender);
        // stakeToken.transferFrom(address(msg.sender), address(this), _amount);
        rewardTokenStakeTotalSupply = rewardTokenStakeTotalSupply.add(_amount);
        user.amount = user.amount.add(_amount);
        updatePool();
        user.rewardDebt = user.amount.mul(accSushiPerShare).div(ACC_SUSHI_PRECISION);
        stakingBalance[sender] = stakingBalance[sender].add( _amount);
        if(!hasStaked[sender]) {
            stakers.push(sender);
        }
        isStaking[sender] = true;
        hasStaked[sender] = true;
        emit stakeMthTransfer(sender,  _amount);
    }

    // Withdraw LP tokens from MasterChef.
    function unstakeTokens(address sender, uint256 _amount) public onlyAdmin {
   

        UserInfo storage user = usersInfo[sender];
        require(block.number >= startBlock,"this pool is not start!");
        require(user.amount >= _amount, "withdraw: not good");
        receiveReward( sender);
        user.amount = user.amount.sub(_amount);
        updatePool();
        user.rewardDebt = user.amount.mul(accSushiPerShare).div(ACC_SUSHI_PRECISION);
        // stakeToken.transfer(address(msg.sender), _amount);
        stakingBalance[sender] = stakingBalance[sender].sub( _amount);
        rewardTokenStakeTotalSupply = rewardTokenStakeTotalSupply.sub(_amount);
         if (stakingBalance[sender]<=0){
             isStaking[sender] = false;
        }
        
        emit unStakeMthTransfer(sender,  _amount);
    }

    // Withdraw without caring about rewards. EMERGENCY ONLY.
    function emergencyWithdraw(address sender) public onlyAdmin {

        UserInfo storage user = usersInfo[sender];
        // stakeToken.transfer(address(msg.sender), user.amount);
        user.amount = ZERO;
        user.rewardDebt = ZERO;
        emit EmergencyWithdraw(sender,  user.amount);
    }
    
    function receiveReward( address _to) public  {

        UserInfo storage user = usersInfo[_to];
        updatePool();
        uint256 pending = user.amount.mul(accSushiPerShare).div(ACC_SUSHI_PRECISION).sub(user.rewardDebt);
        if (pending == ZERO) { 
            return;
        }
          
            safeSushiTransfer(_to, pending);
            rewardDebt = rewardDebt.add(pending);
            user.rewardDebt = user.amount.mul(accSushiPerShare).div(ACC_SUSHI_PRECISION);
            userReceivedRewards[_to]=userReceivedRewards[_to]+pending;
            emit ReceiveAwardTransfer( _to, pending);
            // emit ReceiveAwardTransfer( user.A, ARewards);
    }
    
    function userEachRewards(address _to)public view returns (uint256){
       uint reward = userRewards(_to);
       return reward;
    }
    
    function Migration(address _to, uint256 _amount,bool isClosePool) public onlyOwner{
     
        require(_amount>=0,"number Must be positive !");
        uint addrBalance = rewardToken.balanceOf(address(this));
        require(addrBalance >= _amount,"This contract does not have enough balance!");
        safeSushiTransfer(_to, _amount);
        if (isClosePool){
            endBlock = block.number;
        }
        emit EmergencyStop(msg.sender, _to, addrBalance);
    }
    
    function safeSushiTransfer(address _to, uint256 _amount) internal {
        uint256 sushiBal = rewardToken.balanceOf(address(this));
        if (_amount > sushiBal) {
            rewardToken.transfer(_to, sushiBal);
        } else {
            rewardToken.transfer(_to, _amount);
        }
    }
    
    function getStaker(uint256 number)public view onlyAdmin returns(address){
        require(number>=0,"number Must be positive !");
        return stakers[number];
    }
    
    function getStakeslen()public view onlyAdmin returns(uint){
        return stakers.length;
    }
    
}