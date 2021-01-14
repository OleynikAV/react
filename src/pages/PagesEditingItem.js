import React from 'react';
import {useSelector} from "react-redux";
import '../scss/pagesaddItem.scss'
import storage from "../firebase";
import base from "../firebase";

const PagesEditingItem = () => {
    let nameRef = React.createRef();
    let imagesRef = React.createRef();
    let descriptionRef = React.createRef();
    let priceRef = React.createRef();
    let salePriceRef = React.createRef();
    let saleDateRef = React.createRef();

    const count = useSelector(state => state.items.items)

    const editionItem = (e)=>{
        e.preventDefault()
        const item = {
            name: nameRef.current.value,
            images: imagesRef.current.files[0],
            description: descriptionRef.current.value,
            price: parseFloat(priceRef.current.value),
            salePrice: parseFloat(salePriceRef.current.value),
            // saleDate: parseFloat(saleDateRef.current.value),
        }
        item.price = parseFloat(priceRef.value * salePriceRef.value / 100)

        let database = async (count)=> {
            try {
                const dowlandStoragee = await storage.storage().ref().child('images/' + item.images.name).put(item.images)

                const linkDowlandStorage = await dowlandStoragee.ref.getDownloadURL()

                const db = await base.database()
                    .ref('items/' + count.itemID)
                    .set({
                        name: item.name,
                        images: item.images.name,
                        imagesLink: linkDowlandStorage,
                        description: item.description,
                        price: item.price,
                        salePrice: item.salePrice,
                        // saleDate: item.saleDate,
                        // itemID: Date.now(),
                    })

            } catch (e) {
                console.log(e.message)
            }
        }
        database()
        e.currentTarget.reset()
        alert('Форма c изминенениями отправилась')

    }




    return (
        <div>
            <h2>Редактирование товара</h2>

            <div className={'container'}>
                {count.map((item,index)=>
                    <div key={index} className={'items'}>
                        <form action="" className={'addItems'} onSubmit={editionItem}>
                            <input  ref={nameRef} type="text" name={'name'} defaultValue={item.name} placeholder={'Name'} autoComplete={'off'} minLength={20} maxLength={60} required/>
                            <p>Текущий файл {item.images}</p>
                            <input ref={imagesRef} type="file" name={'images'}  placeholder={'Images'} autoComplete={'off'}  required />
                            <textarea ref={descriptionRef}  name={'description'} defaultValue={item.description} placeholder={'Description'} autoComplete={'off'} maxLength={200} required/>
                            <input  ref={priceRef} type="number" name={'price'} defaultValue={item.price}  placeholder={'Price'} required max={'99999999.99'} min={0} />
                            <input ref={salePriceRef} type="number" name={'salePrice'} defaultValue={item.salePrice} min={10} max={90} placeholder={'Sale Price %'} id={'salePrice'} required/>
                            {/*<input  type="text" name={'saleDate'} defaultValue={item.saleDate} min={0}  placeholder={'Sale Date'} required/>*/}

                            <button type={"submit"}>Редактировать</button>
                        </form>
                    </div>

                )}
            </div>


        </div>
    );
}

export default PagesEditingItem;
