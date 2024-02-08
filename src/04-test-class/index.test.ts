import lodash from 'lodash';
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 10000;
    const bankAccount = getBankAccount(balance);

    expect(bankAccount.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 10000;
    const bankAccount = getBankAccount(balance);
    const amountOfMoneyForWindrow = 15000;

    expect(() => bankAccount.withdraw(amountOfMoneyForWindrow)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const senderBalance = 10000;
    const recipientBalance = 5000;
    const senderAccount = getBankAccount(senderBalance);
    const recipientAccount = getBankAccount(recipientBalance);
    const amountOfMoney = 15000;

    expect(() =>
      senderAccount.transfer(amountOfMoney, recipientAccount),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const senderBalance = 10000;
    const senderAccount = getBankAccount(senderBalance);
    const amountOfMoney = 15000;

    expect(() => senderAccount.transfer(amountOfMoney, senderAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const balance = 10000;
    const bankAccount = getBankAccount(balance);
    const amount = 30000;

    expect(bankAccount.deposit(amount).getBalance()).toBe(balance + amount);
  });

  test('should withdraw money', () => {
    const balance = 10000;
    const bankAccount = getBankAccount(balance);
    const amount = 5000;

    expect(bankAccount.withdraw(amount).getBalance()).toBe(5000);
  });

  test('should transfer money', () => {
    const senderBalance = 10000;
    const recipientBalance = 5000;
    const senderAccount = getBankAccount(senderBalance);
    const recipientAccount = getBankAccount(recipientBalance);
    const amountOfMoney = 2500;

    expect(
      senderAccount.transfer(amountOfMoney, recipientAccount).getBalance(),
    ).toBe(senderBalance - amountOfMoney);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 50;
    const bankAccount = getBankAccount(balance);

    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(balance)
      .mockReturnValueOnce(1);

    const result = await bankAccount.fetchBalance();
    expect(result).toBe(balance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 50;
    const bankAccount = getBankAccount(balance);

    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(balance);

    const result = await bankAccount.fetchBalance();
    expect(result).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 50;
    const bankAccount = getBankAccount(balance);

    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(null);

    const result = bankAccount.synchronizeBalance();
    expect(result).rejects.toThrowError(SynchronizationFailedError);
  });
});
