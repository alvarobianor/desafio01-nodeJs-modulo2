import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    if (this.transactions.length === 0) {
      return { income: 0, outcome: 0, total: 0 };
    }
    const income = this.transactions
      .map(e => (e.type === 'income' ? e.value : 0))
      .reduce((first, next) => first + next);

    const outcome = this.transactions
      .map(e => (e.type === 'outcome' ? e.value : 0))
      .reduce((first, next) => first + next);
    return { income, outcome, total: income - outcome };
  }

  public create({ title, value, type }: Transaction): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
