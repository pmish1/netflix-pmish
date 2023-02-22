import {React, useState, useEffect} from 'react'
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import db from '../FB'
import './PlansScreen.css'




function PlansScreen() {
    const [products, setProducts] = useState([])


    const q = query(collection(db, "products"), where("active", "==", true), limit(3))


    
    useEffect(() => {
        const getPrices = async (path, updatedProducts) => {
            let query 
            try {
                query = collection(db, path)
                const qS = await getDocs(query)
    
                qS?.forEach((d) => {
                    updatedProducts?.forEach((product) => {
                        if (Object.keys(product)[0] === d.data().product) {
                            product[d.data().product][d.id] = d.data()
                            // console.log(product)
                        }
                   
                    })
                })
    
            } catch (error) {
                console.log(error.message)
            }
        }

        const getPlans = async () => {
            try {
                let updatedProducts = []
                const querySnapshot = await getDocs(q)
                querySnapshot?.forEach((doc) => {
                    console.log(doc.data())
                    const productsObj = {}
                    productsObj[doc.id] = doc.data()  //sets data for the plans, doesn't include prices yet 

                    // if (Object.keys(updatedProducts)[0] !== doc.id) {
                    //     return updatedProducts.push(productsObj)
                    // }
                    // console.log(updatedProducts)

                    // getPrices(`products/${doc.id}/prices`, updatedProducts)
                })
            } catch (error) {
                console.log(error.message)
            }
        }
        getPlans()

    }, [products])

    


  return (
    <div className="plansScreen">
        {Object.entries(products)?.map(([productId, productData]) => {
            console.log(productData[`${Object.keys(productData)[0]}`]['name'])
            //add some logic to check if user's subscription is active
            return (
                <div className="plansScreen_plan">
                    <div className="plansScreen__info">
                        <h1>{productData[`${Object.keys(productData)[0]}`]['name']}</h1>
                        <h6>{productData[`${Object.keys(productData)[0]}`]['description']}</h6>
                    </div>

                    <button>Subscribe</button>
                </div>
            )
        })}
    </div>
  )
}

export default PlansScreen








    // useEffect(() => {
    //     const getPlans = async () => {
    //         try {
    //             const querySnapshot = await getDocs(q)
    //             .then((querySnapshot) => {
    //                 const products = {}
    //                 querySnapshot.forEach(async (productDoc) => {
    //                     products[productDoc.id] = productDoc.data();
    //                     const priceSnap = await productDoc.ref.collection('prices').get();
    //                     priceSnap.docs.forEach((price) => {
    //                         products[productDoc.id].prices = {
    //                             priceId: price.id,
    //                             priceData: price.data()
    //                         } 
    //                     })
    //                 })                    
    //             })
    //             setProducts(products)
    //             // querySnapshot?.forEach((doc) => {
    //             //     return [...products, setProducts(doc.data())]
    //             // })
    //         } catch (error) {
    //             console.log(error.message)
    //         }
    //     }
    //     getPlans()
    // }, [])

    // useEffect(() => {
    //     const getPlans = async () => {
    //         try {
    //             const querySnapshot = await getDocs(q)
    //             const plans = querySnapshot?.docs?.map((doc) => {
    //                 return { name: doc.data().name,
    //                     price: doc.data().price,
    //                     desc: doc.data().description
    //                 }
    //             });
    //             setProducts(plans);
    //             console.log(plans);
    //         } catch (error) {
    //             console.log(error.message)
    //         }
    //     }
    //     getPlans()
    // }, [])