
console.log(user.uid)
const taskQuery = query(collection(db, "customers"), where("uid", "==", `${user.uid}`))
const loadCheckout = async (priceId) => {
    try {
        const taskDocs = await getDoc(taskQuery)
        console.log(taskDocs)

    } catch (error) {
        console.log(error.message)
    }
}