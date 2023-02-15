import { createContext, useContext, useEffect, useState } from "react";
import db from "../firebase/firebaseConfig";
import {
  collection,
  deleteDoc,
  onSnapshot,
  setDoc,
  doc,
} from "firebase/firestore";
import { IItem, IOrder } from "../types/types";
import { IAppContext } from "../types/contextTypes";

type AppContextProviderProps = {
  children: JSX.Element;
};

const context = createContext({} as IAppContext);

export const useAppContext = () => {
  return useContext(context);
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [activeOrders, setActiveOrders] = useState<IOrder[]>([]);
  const [completedOrders, setCompletedOrders] = useState<IOrder[]>([]);
  const [deletedOrders, setDeletedOrders] = useState<IOrder[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  ///updates finished orders (completedOrders or canceledOrders) and removes them from activeOrders.
  const updateFinishedOrders: IAppContext["updateFinishedOrders"] = (
    fullOrder,
    setState
  ) => {
    setState((prevFinishedOrders) => {
      const exists = prevFinishedOrders.find(
        (data) => data.order_id === fullOrder.order_id
      );
      if (exists === undefined) {
        // Adds the order in case this does not exist in the list yet.
        return [...prevFinishedOrders, fullOrder];
      } else {
        // If this already exists, searchs it and updates its items quantity and price.
        const updatedOrder = prevFinishedOrders.map((finishedOrder) => {
          if (finishedOrder.order_id !== fullOrder.order_id) {
            return finishedOrder;
          } else {
            const initialValueReducer: IItem[] = [];
            const updatedItems = [
              ...finishedOrder.items,
              ...fullOrder.items,
            ].reduce((accum, curr) => {
              const repeatedItem = accum.find(
                (item: IItem) => item.id === curr.id
              );
              if (repeatedItem !== undefined) {
                repeatedItem.quantity += curr.quantity;
                repeatedItem.price += curr.price;
              } else {
                accum.push(curr);
              }
              return accum;
            }, initialValueReducer);
            return {
              ...finishedOrder,
              items: updatedItems,
            };
          }
        });
        return updatedOrder;
      }
    });
    const deleteOrderFromActive = async () => {
      await deleteDoc(doc(db, "activeOrders", fullOrder.order_id));
    };
    deleteOrderFromActive();
  };

  //Adds array of orders to the database.
  const addToDB = (array: IOrder[], collectionName: string) => {
    array.map((order) => {
      const add = async () => {
        await setDoc(doc(db, collectionName, order.order_id), {
          order_id: order.order_id,
          table_num: order.table_num,
          time: order.time,
          items: order.items,
        });
      };
      add();
    });
  };

  //Fetches active orders.
  useEffect(() => {
    onSnapshot(collection(db, "activeOrders"), (snapshot) => {
      setActiveOrders([]);
      snapshot.docs.forEach((doc) => {
        const orderFetch = doc.data() as IOrder;
        setActiveOrders((prevActiveOrders) => [
          ...prevActiveOrders,
          orderFetch,
        ]);
      });
    });
  }, []);

  //Add changes in completedOrders or deletedOrders to the database.
  useEffect(() => {
    addToDB(completedOrders, "completedOrders");
  }, [completedOrders]);
  useEffect(() => {
    addToDB(deletedOrders, "deletedOrders");
  }, [deletedOrders]);
  const values = {
    updateFinishedOrders,
    activeOrders,
    completedOrders,
    setCompletedOrders,
    deletedOrders,
    setDeletedOrders,
    setShowAlert,
    showAlert,
  };
  return <context.Provider value={values}>{children}</context.Provider>;
};
