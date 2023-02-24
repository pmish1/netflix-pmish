import {React, useState, useEffect} from 'react'
import { collection, query, where, getDocs, getDoc, setDoc, addDoc, doc, onSnapshot } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';


import db from '../FB'
import './PlansScreen.css'




function PlansScreen() {
    const [products, setProducts] = useState([])
    const [temp, setTemp] = useState([])
    const user = useSelector(selectUser)
    const [subscription, setSubscription] = useState(null)


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

    useEffect(() => {
        const getSubscriptions = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, `customers/${user.uid}/subscriptions`))
                querySnapshot.forEach((doc) => {
                    setSubscription({
                        role: doc.data().role,
                        current_period_start: doc.data().current_period_start.seconds,
                        current_period_end: doc.data().current_period_end.seconds,
                    })
                })


            } catch (error) {
                console.log(error.message)
            }
        }
        getSubscriptions()
    }, [user.uid])


    const loadCheckout = async (priceId) => {
        try {
            const docRef = await addDoc(collection(doc(db, "customers", user.uid), "checkout_sessions"), {
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin
            });


            onSnapshot(docRef, (snap) => {
                const {error, url} = snap.data()
                if (error) {
                    console.log(`error occured: ${error.message}`)
                }
                if (url) {
                    window.location.assign(url)
                }
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    // console.log(products)

  return (
    <div className="plansScreen">
        <br />
        {subscription && 
           <p>Renewal Date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>
        }

        {products?.map((product) => {

            const isCurrentPackage = product[`${Object.keys(product)[0]}`]['name']?.toLowerCase() === subscription?.role          

            return (
                <div 
                    className={`${isCurrentPackage && 'plansScreen__plan--disabled'} plansScreen__plan`}
                    key={`${Object.keys(product)[0]}`}
                >
                    <div className="plansScreen__info">
                        <h1>{product[`${Object.keys(product)[0]}`]['name']}</h1>
                        <h6>{product[`${Object.keys(product)[0]}`]['description']}</h6>
                    </div>

                    <button 
                        onClick={() => !isCurrentPackage && loadCheckout(product[`${Object.keys(product)[0]}`]['prices']['priceId'])}
                    >{isCurrentPackage ? 'Current package' : 'Subscribe'}</button>
                </div>
            )
        })}
    </div>
  )
}

export default PlansScreen