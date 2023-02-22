import {React, useState, useEffect} from 'react'
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';


import db from '../FB'
import './PlansScreen.css'




function PlansScreen() {
    const [products, setProducts] = useState([])
    const [temp, setTemp] = useState([])
    const user = useSelector(selectUser)


    const q = query(collection(db, "products"), where("active", "==", true))


    let uP = [] 
    
    useEffect(() => {
        const getPrices = async (path, updatedProducts) => {
            let query
            try {
                query = collection(db, path)
                const qS = await getDocs(query)
    
                qS?.forEach((d) => {
                    updatedProducts = updatedProducts?.forEach((product) => {
                        if (Object.keys(product)[0] === d.data().product) {
                            // product[d.data().product][d.id] = d.data()
                            product[d.data().product]['prices'] = {
                                priceId: d.id,
                                priceData: d.data()
                            }
                            uP.push(product)
                        }
                    })
                })
                setTemp(uP)
    
            } catch (error) {
                console.log(error.message)
            }
        }

        const getPlans = async () => {
            try {
                let updatedProducts = temp
                const querySnapshot = await getDocs(q)
                querySnapshot?.forEach((doc) => {
                    const productsObj = {}
                    productsObj[doc.id] = doc.data()  //sets data for the plans, doesn't include prices yet 
                    updatedProducts.push(productsObj)

                    getPrices(`products/${doc.id}/prices`, updatedProducts)
                })
            } catch (error) {
                console.log(error.message)
            }
        }
        getPlans()

        //ensures .map() doesn't run before products contains all the plans because of async 
        const assignP = () => {
            setProducts(temp)
        }
        assignP()        
    }, [])
    



    console.log(user.uid)
    const taskQuery = (collection(db, "customers"))
    const loadCheckout = async (priceId) => {
        try {
            const taskDocs = await getDocs(taskQuery)

        } catch (error) {
            console.log(error.message)
        }
    }

    // console.log(products)

  return (
    <div className="plansScreen">
        {products?.map((product) => {
            //add some logic to see which plan is active for the user 
            // console.log(product[`${Object.keys(product)[0]}`])
            // console.log(product)
            // console.log(product[`${Object.keys(product)[0]}`]['prices']['priceId'])
            return (
                <div className="plansScreen__plan" key={`${Math.random()}`}>
                    <div className="plansScreen__info">
                        <h1>{product[`${Object.keys(product)[0]}`]['name']}</h1>
                        <h6>{product[`${Object.keys(product)[0]}`]['description']}</h6>
                    </div>

                    <button 
                        onClick={() => loadCheckout(product[`${Object.keys(product)[0]}`]['prices']['priceId'])}
                    >Subscribe</button>
                </div>
            )
        })}
    </div>
  )
}

export default PlansScreen