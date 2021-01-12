import React, {useEffect,useState} from 'react';
import base from "../firebase";
import {setCount} from "../reduсers/itemsStore";
import '../scss/listitems.scss'

const Listitems = ()=> {

    const [state, setState] = useState([])
    console.log(state)


    useEffect(()=> {

        upload()

    },[])
    const upload = async ()=>{

        try {
            const items = await base.database().ref('items/');
            items.on('value', (snapshot) => {
                const data = snapshot.val();

                if (data == null){
                    document.querySelector('h2').innerHTML = 'Данных нет'
                }else {
                    document.querySelector('h2').innerHTML = 'Список товаров'
                    let nameLengths = Object.values(data);
                    setState(nameLengths)
                }

            });
        }catch (e){
            console.log(e.message)
        }
    };
    const deleteItems = ()=>{
        console.log('test delete')
    }
    return (
        <div>
            <h2>Список товаров </h2>

            <div className={'container'}>
                {state.map((item,index)=>
                    <div key={index} className={'items'}>
                        <li>Название товара: <br/> {item.name}</li>
                        <img src={item.imagesLink} alt={item.images}/>
                        <li>Описание товара: <br/>{item.description}</li>
                        <li>Цена со скидкой: <br/>{item.price}</li>
                        <li>Скидка: <br/> {item.salePrice}</li>
                        <li>Действие скидки: <br/> {item.saleDate}</li>
                        <button onClick={deleteItems}>Удалить</button>
                    </div>

                )}
            </div>


        </div>
    );
}



export default Listitems ;
