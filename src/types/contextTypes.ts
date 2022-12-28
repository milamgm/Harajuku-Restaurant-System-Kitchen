import { IOrder } from "./types";

export interface IAppContext {
  updateFinishedOrders: (fullOrder: IOrder, setState: React.Dispatch<React.SetStateAction<IOrder[]>>) => void;
  activeOrders: IOrder[];
  completedOrders: IOrder[];
  setCompletedOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
  deletedOrders: IOrder[];
  setDeletedOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  showAlert: boolean;
}
