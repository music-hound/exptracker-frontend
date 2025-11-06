export interface IUser {
  id: number;
  email: string;
  token: string;
}

export interface IUserData {
  email: string;
  password: string;
}

export interface IUserResponse {
  createdAt: string;
  email: string;
  id: number;
  password: string;
  updatedAt: string;
}

export interface IRegistrationResponse {
  token: string;
  user: IUserResponse;
}

export interface ICategory {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  transactions?: [];
}

export interface IResponseTransactionLoader {
  categories: ICategory[];
  transactions: ITransaction[];
  totalIncome: number;
  totalExpense: number;
}

export interface ITransaction {
  amount: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  type: string;
  id: number;
  category: ICategory;
}
