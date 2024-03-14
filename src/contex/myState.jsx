
import { useState, useEffect} from 'react';
import MyContext from '../contex/myContex';

//firebase
import { collection, onSnapshot, orderBy, query,deleteDoc,doc} from 'firebase/firestore';
import { fireDB } from '../firebase/Firebaseconfing';

function MyState({children}) {
    
    const [loding, setLoding] = useState(false)

    //getproduct
    const [getAllProduct, setGetAllProduct] = useState([])

    const getAllProductFunction = async () => {
      setLoding(true);
      try {
          const q = query(
              collection(fireDB, "products"),
              orderBy('time')
          );
          const data = onSnapshot(q, (QuerySnapshot) => {
              let productArray = [];
              QuerySnapshot.forEach((doc) => {
                  productArray.push({ ...doc.data(), id: doc.id });
              });
              setGetAllProduct(productArray);
              setLoding(false);
          });
          return () => data;
      } catch (error) {
          console.log(error);
          setLoding(false);
      }
  }
  // Order State 
  const [getAllOrder, setGetAllOrder] = useState([]);


  /**========================================================================
   *========================================================================**/

  const getAllOrderFunction = async () => {
      setLoding(true);
      try {
          const q = query(
              collection(fireDB, "order"),
              orderBy('time')
          );
          const data = onSnapshot(q, (QuerySnapshot) => {
              let orderArray = [];
              QuerySnapshot.forEach((doc) => {
                  orderArray.push({ ...doc.data(), id: doc.id });
              });
              setGetAllOrder(orderArray);
              setLoding(false);
          });
          return () => data;
      } catch (error) {
          console.log(error);
          setLoding(false);
      }
  }

      // Delete oder Function
      const deleteOrder = async (id) => {
        setLoding(true)
        try {
            await deleteDoc(doc(fireDB, 'order', id))
            toast.success('Order Deleted successfully')
            getAllOrderFunction();
            setLoding(false)
        } catch (error) {
            console.log(error)
            setLoding(false)
        }
    }

      // user State 
      const [getAllUser, setGetAllUser] = useState([]);


  
      const getAllUserFunction = async () => {
          setLoding(true);
          try {
              const q = query(
                  collection(fireDB, "user"),
                  orderBy('time')
              );
              const data = onSnapshot(q, (QuerySnapshot) => {
                  let userArray = [];
                  QuerySnapshot.forEach((doc) => {
                      userArray.push({ ...doc.data(), id: doc.id });
                  });
                  setGetAllUser(userArray);
                  setLoding(false);
              });
              return () => data;
          } catch (error) {
              console.log(error);
              setLoding(false);
          }
      }
  

  useEffect(() => {
      getAllProductFunction();
      getAllOrderFunction();
      getAllUserFunction();
  }, []);
  return (
    <MyContext.Provider value={{
        loding,
        setLoding,
        getAllProduct,
        getAllProductFunction,
        getAllOrderFunction,
        getAllOrder,
        deleteOrder,
        getAllUser
    }}>
       {children}
    </MyContext.Provider>
  )
}

export default MyState