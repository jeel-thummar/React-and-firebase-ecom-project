import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import myContext from '../../contex/myContex'

//firebase
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/Firebaseconfing";

import toast from 'react-hot-toast';
import Loder from '../../componets/loder/Loder';


function AddProduct() {
  const categoryList = [
    {
        name: 'fashion'
    },
    {
        name: 'shirt'
    },
    {
        name: 'jacket'
    },
    {
        name: 'mobile'
    },
    {
        name: 'laptop'
    },
    {
        name: 'shoes'
    },
    {
        name: 'home'
    },
    {
        name: 'books'
    }
]
const contex = useContext(myContext);
const {loding, setLoding} = contex;
const navigate = useNavigate();

//product state
const [product, setProduct] = useState({
  title : "",
  price : "",
  productImageUrl : "",
  category : "",
  descripition : "",
  quantity : 1,
  time : Timestamp.now(),
  date: new Date().toLocaleString(
    "en-US",
    {
        month: "short",
        day: "2-digit",
        year: "numeric",
    }
)
})

//add product function

const addProductFunction = async() => {
  if(product.title === "" || product.prise === "" || product.productImageUrl === "" || product.category === "" || product.descripition === ""){
      toast.error("all fields are required")  }
     setLoding(true);
        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, product)
            toast.success("Add product successfully");
            navigate('/admin-Dashbord')
            setLoding(false)
        } catch (error) {
            console.log(error);
            setLoding(false)
            toast.error("Add product failed");
        }
}
  return (
    <div>
    <div className='flex justify-center items-center h-screen'>
      {loding && <Loder/>}
        {/* Login Form  */}
        <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
            {/* Top Heading  */}
            <div className="mb-5">
                <h2 className='text-center text-2xl font-bold text-pink-500 '>
                </h2>
            </div>
            {/* Input One  */}
            <div className="mb-3">
                <input
                    type="text"
                    name="title"
                    placeholder='Product Title'
                    className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                    value={product.title}
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        title:e.target.value
                      })
                    }}
                />
            </div>
            {/* Input Two  */}
            <div className="mb-3">
                <input
                    type="number"
                    placeholder='Product Price'
                    className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                    value={product.price}
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        price:e.target.value
                      })
                    }}
                />
            </div>
            {/* Input Three  */}
            <div className="mb-3">
                <input
                    type="text"
                    placeholder='Product Image Url'
                    className='bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                    value={product.productImageUrl}
                    onChange={(e) => {
                      setProduct({
                        ...product,
                        productImageUrl:e.target.value
                      })
                    }}
                />
            </div>
            {/* Input Four  */}
            <div className="mb-3">
                <select className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none  "
                 value={product.category}
                 onChange={(e) => {
                       setProduct({
                         ...product,
                         category:e.target.value
                       })
                     }}>
               
                    <option disabled>Select Product Category</option>
                    {categoryList.map((value, index) => {
                        const { name } = value
                        return (
                            <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                        )
                    })}
                </select>
            </div>
            {/* Input Five  */}
            <div className="mb-3">
                <textarea name="description" placeholder="Product Description" rows="5" className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 "
                value={product.descripition}
                onChange={(e) => {
                      setProduct({
                        ...product,
                        descripition:e.target.value
                      })
                    }}>
                
                </textarea>
            </div>
            {/* Add Product Button  */}
            <div className="mb-3">
                <button
                    type='button'
                    className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                    onClick={addProductFunction}
                >Add Product
                </button>
            </div>
        </div>
    </div>
</div>  )
}

export default AddProduct