import {firestore} from './../../firebase/ultils'


export const handleSaveOrder = order=>{
    return new Promise((resolve,reject)=>{
        firestore
            .collection('orders')
            .doc()
            .set(order)
            .then(()=>{
                resolve();
            })
            .catch(err=>{
                reject(err);
            })
    })
}

export const handleGetOrderHistory= uid =>{
    return new Promise((resolve,reject)=>{
        let ref= firestore.collection('orders')
                            .orderBy('orderCreatedDate');
        ref = ref.where('orderUserID','==',uid);

        ref 
            .get()
            .then(
                snap=>{
                    const data=[
                        ...snap.docs.map(doc=>{
                            return{
                                ...doc.data(),
                                documentID: doc.id
                            }
                        })
                    ];

                    resolve({data});
                }
            )
            .catch(err=>{
                reject(err);
            })
    })
}

export const handleGetOrderList= () =>{
    return new Promise((resolve,reject)=>{
        let ref= firestore.collection('orders')
                            .orderBy('orderCreatedDate').get()
            .then(
                snap=>{
                    const data=[
                        ...snap.docs.map(doc=>{
                            return{
                                ...doc.data(),
                                documentID: doc.id
                            }
                        })
                    ];

                    resolve({data});
                }
            )
            .catch(err=>{
                reject(err);
            })
    })
}

export const handleGetOrderDetail = orderID=>{
    return new Promise((resolve,reject)=>{
        firestore
        .collection('orders')
        .doc(orderID)
        .get()
        .then(snapshot => {
            if(snapshot.exists){
                resolve(
                    snapshot.data()
                );
            }
        })
        .catch( err =>{
            reject(err);
        })
    })
}