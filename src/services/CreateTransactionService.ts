import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: RequestDTO): Transaction | string {
    const { total } = this.transactionsRepository.getBalance();
    const transaction = (): Transaction =>
      this.transactionsRepository.create(
        new Transaction({
          title,
          value,
          type,
        }),
      );
    if (type === 'income') {
      return transaction();
    }
    if (type === 'outcome' && total > value) {
      return transaction();
    }
    throw Error('The value costs more than total or the type is wrong');
  }
}

export default CreateTransactionService;
