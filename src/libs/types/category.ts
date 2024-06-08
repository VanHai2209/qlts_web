import { IBaseMaster } from "./common";
import { IBuildingRental } from "./plan";

export interface IAsset {
  id: number;
  name: string;
  asset_code: string;
  entry_time: string;
  entry_price: number;
  supplier_id: number;
  department_id: number;
  user_id: number;
  depreciation_rate: number;
  condition: string;
  status: string;

  Supplier: ISupplier;
  Department: IDepartment;
  User: UserType;

  createdAt: string;
  updatedAt: string;
}

export interface ISupplier {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  address: string;

  Asset: IAsset[];

  createdAt: string;
  updatedAt: string;
}

export interface IDepartment {
  id: number;
  name: string;
  address: string;
  status: string;

  Asset: IAsset[];
  User: IWorker[] | IManager[];

  BuidingRental: IBuildingRental[];

  createdAt: string;
  updatedAt: string;
}

export type UserType = IWorker | IManager;

export interface IWorker {
  id: number;
  name: string;
  address: string;
  email: string;
  phone_number: string;
  department_id: number;
  role: "WORKER";

  Department: IDepartment;
  Asset: IAsset[];

  createdAt: string;
  updatedAt: string;
}

export interface IManager {
  id: number;
  name: string;
  address: string;
  email: string;
  phone_number: string;
  department_id: number;
  role: "MANAGER";

  Department: IDepartment;
  Asset: IAsset[];

  username: string;
  password: string;

  createdAt: string;
  updatedAt: string;
}

export interface ICategory extends IBaseMaster {
  Asset: IAsset[];
}
