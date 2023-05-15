const { constants, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const { getChainId } = require('../../helpers/chainid');
<<<<<<< HEAD
const { BNsum } = require('../../helpers/math');

require('array.prototype.at/auto');
=======
const { clockFromReceipt } = require('../../helpers/time');
>>>>>>> master

const { shouldBehaveLikeVotes } = require('./Votes.behavior');

const MODES = {
  blocknumber: artifacts.require('$VotesMock'),
  timestamp: artifacts.require('$VotesTimestampMock'),
};

contract('Votes', function (accounts) {
  const [account1, account2, account3] = accounts;
<<<<<<< HEAD
  const amounts = {
    [account1]: web3.utils.toBN('10000000000000000000000000'),
    [account2]: web3.utils.toBN('10'),
    [account3]: web3.utils.toBN('20'),
  };

  beforeEach(async function () {
    this.name = 'My Vote';
    this.votes = await Votes.new(this.name, '1');
  });

  it('starts with zero votes', async function () {
    expect(await this.votes.getTotalSupply()).to.be.bignumber.equal('0');
  });

  describe('performs voting operations', function () {
    beforeEach(async function () {
      this.txs = [];
      for (const [account, amount] of Object.entries(amounts)) {
        this.txs.push(await this.votes.$_mint(account, amount));
      }
    });

    it('reverts if block number >= current block', async function () {
      await expectRevert(
        this.votes.getPastTotalSupply(this.txs.at(-1).receipt.blockNumber + 1),
        'Checkpoints: block not yet mined',
      );
    });

    it('delegates', async function () {
      expect(await this.votes.getVotes(account1)).to.be.bignumber.equal('0');
      expect(await this.votes.getVotes(account2)).to.be.bignumber.equal('0');
      expect(await this.votes.delegates(account1)).to.be.equal(constants.ZERO_ADDRESS);
      expect(await this.votes.delegates(account2)).to.be.equal(constants.ZERO_ADDRESS);

      await this.votes.delegate(account1, account1);

      expect(await this.votes.getVotes(account1)).to.be.bignumber.equal(amounts[account1]);
      expect(await this.votes.getVotes(account2)).to.be.bignumber.equal('0');
      expect(await this.votes.delegates(account1)).to.be.equal(account1);
      expect(await this.votes.delegates(account2)).to.be.equal(constants.ZERO_ADDRESS);

      await this.votes.delegate(account2, account1);

      expect(await this.votes.getVotes(account1)).to.be.bignumber.equal(amounts[account1].add(amounts[account2]));
      expect(await this.votes.getVotes(account2)).to.be.bignumber.equal('0');
      expect(await this.votes.delegates(account1)).to.be.equal(account1);
      expect(await this.votes.delegates(account2)).to.be.equal(account1);
    });

    it('cross delegates', async function () {
      await this.votes.delegate(account1, account2);
      await this.votes.delegate(account2, account1);

      expect(await this.votes.getVotes(account1)).to.be.bignumber.equal(amounts[account2]);
      expect(await this.votes.getVotes(account2)).to.be.bignumber.equal(amounts[account1]);
    });

    it('returns total amount of votes', async function () {
      const totalSupply = BNsum(...Object.values(amounts));
      expect(await this.votes.getTotalSupply()).to.be.bignumber.equal(totalSupply);
    });
  });

  describe('performs voting workflow', function () {
    beforeEach(async function () {
      this.chainId = await getChainId();
    });

    shouldBehaveLikeVotes(accounts, Object.values(amounts));
  });
=======

  for (const [mode, artifact] of Object.entries(MODES)) {
    describe(`vote with ${mode}`, function () {
      beforeEach(async function () {
        this.name = 'My Vote';
        this.votes = await artifact.new(this.name, '1');
      });

      it('starts with zero votes', async function () {
        expect(await this.votes.getTotalSupply()).to.be.bignumber.equal('0');
      });

      describe('performs voting operations', function () {
        beforeEach(async function () {
          this.tx1 = await this.votes.$_mint(account1, 1);
          this.tx2 = await this.votes.$_mint(account2, 1);
          this.tx3 = await this.votes.$_mint(account3, 1);
          this.tx1.timepoint = await clockFromReceipt[mode](this.tx1.receipt);
          this.tx2.timepoint = await clockFromReceipt[mode](this.tx2.receipt);
          this.tx3.timepoint = await clockFromReceipt[mode](this.tx3.receipt);
        });

        it('reverts if block number >= current block', async function () {
          await expectRevert(this.votes.getPastTotalSupply(this.tx3.timepoint + 1), 'Votes: future lookup');
        });

        it('delegates', async function () {
          await this.votes.delegate(account3, account2);

          expect(await this.votes.delegates(account3)).to.be.equal(account2);
        });

        it('returns total amount of votes', async function () {
          expect(await this.votes.getTotalSupply()).to.be.bignumber.equal('3');
        });
      });

      describe('performs voting workflow', function () {
        beforeEach(async function () {
          this.chainId = await getChainId();
          this.account1 = account1;
          this.account2 = account2;
          this.account1Delegatee = account2;
          this.NFT0 = new BN('10000000000000000000000000');
          this.NFT1 = new BN('10');
          this.NFT2 = new BN('20');
          this.NFT3 = new BN('30');
        });

        // includes EIP6372 behavior check
        shouldBehaveLikeVotes(mode);
      });
    });
  }
>>>>>>> master
});
