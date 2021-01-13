import React, {Component, useEffect, useState} from 'react';
import base from "../firebase";

const PagesEditingItem = () => {

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
    const downLoad = async ()=>{
        try {


        }catch (e){
            console.log(e.message)
        }
    }
    const deleteItems = ()=>{
        console.log('test delete')
    }
    return (
        <div>
            <h2>Список товаров </h2>

            <div className={'container'}>
                {state.map((item,index)=>
                    <div key={index} className={'items'}>
                        <form action="">
                            <input  type="text" name={'name'} defaultValue={item.name} placeholder={'Name'} autoComplete={'off'} minLength={20} maxLength={60} required/>
                        </form>
                        <button onClick={deleteItems}>отправить</button>
                    </div>

                )}
            </div>


        </div>
    );
}

export default PagesEditingItem;
