import { IAsset, IDepartment, IManager, ISupplier } from "./category";

export interface IPlans {
  id: number;
  implemention_date: string;
  petition_date: string;
  description_plan: string;
  type: string;
  status: string;
  evaluation: string;
  quantity: number;
  department_id?: number;
  user_id?: number;

  Department: IDepartment;
  User: IManager;
  PlanAsset: IPlanAsset;
}

export interface IPlanAsset {
  id: number;
  plan_id: number;
  asset_name: string;
  supplier_id: number;
  status: string;

  Supplier: ISupplier;
}

export interface IRecommendPlans {
  id: number;
  implemention_date: string;
  petition_date: string;
  description_plan: string;
  type: string;
  status: string;
  evaluation: string;
  quantity: number;
  department_id: number;
  user_id?: number;

  User: IManager;
  RecommendPlanAsset: IRecommendPlanAsset;
  Department: IDepartment;
}

export interface IRecommendPlanAsset {
  id: number;
  plan_id: number;
  asset_name: string;
  supplier_id: number;
  status: string;

  Supplier: ISupplier;
}

export interface ISpecialAsset {
  id: number;
  name: string;
  quantity: number;
  type_of_vehicle: string;
  purpose_use: string;
  status: string;
  car_manufacturer: string;
  manufacture_country: string;

  user_id?: number;

  User?: IManager;
}

export interface ILiquidationAsset {
  id: number;
  implemention_date: string;
  petition_date: string;
  description_plan: string;
  type: string;
  status: string;
  evaluation: string;
  quantity: number;
  original_price: number;
  liquidation_price: number;
  asset_purchasing_unit: string;

  user_id?: number;
  asset_id?: number;

  User?: IManager;
  Asset: IAsset;
}

export interface IBuildingRental {
  id: number;
  name: string;
  location_room: string;
  size_room: string;
  renter_information: string;
  rental_date_start: string;
  rental_date_end: string;
  rental_price: string;

  department_id: number;
  Department: IDepartment;
}
