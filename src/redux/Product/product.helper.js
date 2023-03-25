import {firestore} from "../../firebase/ultils"


export const handleAddProduct = product =>{
    return new Promise((resolve,reject)=>{
        firestore
            .collection('products')
            .doc()
            .set(product)
            .then(()=>{
                resolve();
            })

            .catch(err=>{
                reject(err);
            })
    });


}

export const handleFetchProduct = ({filterType,startAfterDoc,persistProducts=[],pageSize}) =>{
    
    return new Promise((resolve,reject)=>{
        let ref =  firestore.collection('products').orderBy('createdDate', 'desc').limit(pageSize);
        
        if(filterType) ref = ref.where('productCategory','==',filterType);
        if(startAfterDoc) ref =ref.startAfter(startAfterDoc);
           
        
        ref
            .get()
            .then(snapshot =>{
                const totalCount = snapshot.size;

                const data = [ 
                    ...persistProducts,
                    ...snapshot.docs.map(doc =>{
                    return {
                        ...doc.data(),
                        documentID : doc.id
                    }
                })];
                resolve({data,
                queryDoc : snapshot.docs[totalCount - 1],
                isLastPage : totalCount < 1
                });
            })
            .catch(err =>{
                reject(err);
            })
    })
}

export const handleDeleteProduct = documentID =>{
    return new Promise((resolve,reject)=>{
        firestore
            .collection('products')
            .doc(documentID)
            .delete()
            .then(()=>{
                resolve();
            })
            .catch(err=>{
                reject(err);
            })
    })
}

export const handleFetchAProduct =  productID =>{
    return new Promise ((resolve,reject)=>{
        firestore
            .collection('products')
            .doc(productID)
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

export const handleUpdateAProduct =  product =>{
    return new Promise((resolve,reject)=>{
        firestore
            .collection('products')
            .doc(product.documentID)
            .update(product)
            .then(()=>{
                resolve();
            })

            .catch(err=>{
                reject(err);
            })
    });
}