import { createContext, useContext, useEffect, useState } from "react";

import db from "../firebase/firebaseConfig.js";
import {
  collection,
  deleteDoc,
  onSnapshot,
  setDoc,
  doc,
} from "firebase/firestore";

type AppContextProviderProps = {
  children: ReactNode;
};

const context = createContext({});


export const useAppContext = () => {
  return useContext(context);
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [activeOrders, setActiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [deletedOrders, setDeletedOrders] = useState([]);
  const [showAlert, setShowAlert] = useState(false)

  const updateFinishedOrders = (fullOrder, setState) => {
    setState((prevFinishedOrders) => {
      if (
        !prevFinishedOrders.find((data) => data.order_id === fullOrder.order_id)
      ) {
        return [...prevFinishedOrders, fullOrder];
      } else {
        const q = prevFinishedOrders.map((finishedOrder) => {
          if (finishedOrder.order_id !== fullOrder.order_id) {
            return finishedOrder;
          } else {
            const total = [...finishedOrder.items, ...fullOrder.items];
            const updatedItems = total.reduce((accum, curr) => {
              const existsInAccum = accum.find(
                (accumItem) => accumItem.id === curr.id
              );
              if (!existsInAccum) {
                return [...accum, curr];
              } else {
                const updatedQty = accum.map((accumItem) => {
                  if (accumItem.id !== curr.id) {
                    return accumItem;
                  } else {
                    return {
                      ...curr,
                      quantity: accumItem.quantity + curr.quantity,
                    };
                  }
                });
                return updatedQty;
              }
            }, []);

            return {
              ...finishedOrder,
              items: updatedItems,
            };
          }
        });
        return q;
      }
    });
    const deleteOrderFromActive = async () => {
      await deleteDoc(doc(db, "activeOrders", fullOrder.order_id))
    }
    deleteOrderFromActive()
  };

  const add = (array, collectionName) => {
    array.map((order) => {
      const addToDB = async () => {
        await setDoc(doc(db, collectionName, order.order_id), {
          order_id: order.order_id,
          table_num: order.table_num,
          time: order.time,
          items: order.items,
        });
      };
      addToDB();
    });
  };

  useEffect(() => {
    onSnapshot(collection(db, "activeOrders"), (snapshot) => {
      setActiveOrders([]);
      snapshot.docs.forEach((doc) => {
        setActiveOrders((prevProducts) => [...prevProducts, doc.data()]);
      });
    });
  }, []);
  useEffect(() => {
    add(completedOrders, "completedOrders");
  }, [completedOrders]);
  useEffect(() => {
    add(deletedOrders, "deletedOrders");
  }, [deletedOrders]);
  return (
    <context.Provider
      value={{
        updateFinishedOrders,
        activeOrders,
        completedOrders,
        setCompletedOrders,
        deletedOrders,
        setDeletedOrders,
        setShowAlert,
        showAlert
      }}
    >
      {children}
    </context.Provider>
  );
};
