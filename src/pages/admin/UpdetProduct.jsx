import React,{useContext, useEffect, useState} from 'react'
import myContext from '../../contex/myContex';
import { useNavigate , useParams} from 'react-router-dom';
import toast from 'react-hot-toast';

//firebase
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from '../../firebase/Firebaseconfing';


function UpdetProduct() {
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
    const {loding, setLoding, getAllProductFunction} = contex
    const navigate = useNavigate();
    
    //product id
    const {id} = useParams()
    console.log(id)

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

    //get single product function
    const getsigleProductFunction = async() => {
      setLoding(true);
      try {
        const productTemp = await getDoc(doc(fireDB, "products", id))
            //   console.log(product.data())
            const product = productTemp.data();
            setProduct({
                title: product?.title,
                price: product?.price,
                productImageUrl: product?.productImageUrl,
                category: product?.category,
                descripition: product?.descripition,
                quantity : product?.quantity,
                time: product?.time,
                date: product?.date
            })
            setLoding(false);
        
      } catch (error) {
        console.log(error)
        setLoding(false)
      }
    }
    useEffect(() => {
      getsigleProductFunction();
    },[])

    //updet product
    const updateProduct = async () => {
      setLoding(true)
      try {

          await setDoc(doc(fireDB, 'products', id), product)
          toast.success("Product Updated successfully")
          getAllProductFunction();
          setLoding(false)
          navigate('/admin-Dashbord')

      } catch (error) {
          console.log(error)
          setLoding(false)
      }
  }

  return (
    <div>
    <div className='flex justify-center items-center h-screen'>
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
                    className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                    value={product.title}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    title: e.target.value
                                })
                            }}
                />
            </div>
            {/* Input Two  */}
            <div className="mb-3">
                <input
                    type="number"
                    name="price"
                    placeholder='Product Price'
                    className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                    value={product.price}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    price: e.target.value
                                })
                            }}
                />
            </div>
            {/* Input Three  */}
            <div className="mb-3">
                <input
                    type="text"
                    name="productImageUrl"
                    placeholder='Product Image Url'
                    className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                    value={product.productImageUrl}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    productImageUrl: e.target.value
                                })
                            }}
                />
            </div>
            {/* Input Four  */}
            <div className="mb-3">
                <select
                    className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none  "
                    value={product.category}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    category: e.target.value
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
                <textarea
                    name="description" placeholder="Product Description" rows="5" className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 "
                    value={product.descripition}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    descripition: e.target.value
                                })
                            }}>
                </textarea>
            </div>
            {/* Update Product Button  */}
            <div className="mb-3">
                <button
                    onClick={updateProduct}
                    type='button'
                    className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                >Updet Product
                </button>
            </div>
        </div>
    </div>
</div>
)
}

export default UpdetProduct