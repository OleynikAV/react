import React, {useEffect} from 'react';
import base from "../firebase";
import '../scss/listitems.scss'
import storage from "../firebase";
import {useDispatch, useSelector} from "react-redux";


const Listitems = ()=> {

    const dispatch = useDispatch()
    const count = useSelector(state => state.items.items)

    useEffect(()=>{


    },[])
    const deleteItems = async (itemID,images)=>{

        try {
            const deleteItemDb = await base.database().ref('items/'+ itemID).remove()
            const deleteItemStorage = await storage.storage().ref().child('images/' + images).delete()


        }catch (e){
            console.log(e.message)
        }


    }
    return (
        <div>
            <h2>Список товаров </h2>

            <div className={'container'}>
                {count.map((item, index)=>
                    <div key={index} className={'items'}>
                        <li>Название товара: <br/> {item.name}</li>
                        <img src={item.imagesLink} alt={item.images}/>
                        <li>Описание товара: <br/>{item.description}</li>
                        <li>Цена со скидкой: <br/>{item.price}</li>
                        <li>Скидка: <br/> {item.salePrice}</li>
                        <li>Действие скидки: <br/> {item.saleDate}</li>
                        <button onClick={()=> deleteItems(item.itemID,item.images)}>Удалить</button>
                    </div>

                )}
            </div>


        </div>
    );
}



export default Listitems ;
