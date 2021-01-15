import React, {useEffect} from 'react';
import '../scss/pagesaddItem.scss'
import base from "../firebase";
import storage from "../firebase";


const PagesaddItem  = ()=> {
    const testfile = ()=> {

    }
   let nameRef = React.createRef();
   let imagesRef = React.createRef();
   let descriptionRef = React.createRef();
   let priceRef = React.createRef();
   let salePriceRef = React.createRef();
   let saleDateRef = React.createRef();

    const creatItems = (e) => {
        e.preventDefault()
        const item = {
            name: nameRef.current.value,
            images: imagesRef.current.files[0],
            description: descriptionRef.current.value,
            price: parseFloat(priceRef.current.value),
            salePrice: parseFloat(salePriceRef.current.value),
            // saleDate: parseFloat(saleDateRef.current.value),
        }
        item.price = parseFloat(priceRef.current.value * salePriceRef.current.value / 100)

        // let date = new Date();
        // date.toLocaleDateString("en-US")
        // date.setDate(date.getDate() + parseFloat(saleDateRef.current.value))
        // item.saleDate = date.toLocaleDateString("en-US")


        let database = async ()=> {
            try {
                const dowlandStoragee = await storage.storage().ref().child('images/' + item.images.name).put(item.images)

                const linkDowlandStorage = await dowlandStoragee.ref.getDownloadURL()

                const db = await base.database().ref('items/').push()

                const pushDB =  db.set({
                            name: item.name,
                            images: item.images.name,
                            imagesLink: linkDowlandStorage,
                            description: item.description,
                            price: item.price,
                            salePrice: item.salePrice,
                            // saleDate: item.saleDate,
                            itemID: db.ref.key,
                })

            } catch (e) {
                console.log(e.message)
            }
        }
        database()
        e.currentTarget.reset()
        alert('Форма отправилась')

    }




        return (
            <section>
                <h2>Добавить товар</h2>
                <form action="" className={'addItems'} onSubmit={creatItems}>
                    <input ref={nameRef} type="text" name={'name'} placeholder={'Name'} autoComplete={'off'} minLength={20} maxLength={60} required/>
                    <input ref={imagesRef} type="file" name={'images'} placeholder={'Images'} autoComplete={'off'}  onChange={testfile} required />
                    <textarea  ref={descriptionRef} name={'description'} placeholder={'Description'} autoComplete={'off'} maxLength={200} required/>
                    <input  ref={priceRef} type="number" name={'price'} placeholder={'Price'} required max={'99999999.99'} min={0} step={'any'}/>
                    <input ref={salePriceRef} type="number" name={'salePrice'} min={10} max={90} placeholder={'Sale Price %'} id={'salePrice'} required/>
                    {/*<input ref={saleDateRef} type="number" name={'saleDate'} min={0}  placeholder={'Sale Date'} required/>*/}
                    <button type={"submit"}>Добавить</button>
                </form>
            </section>
        );
}

export default PagesaddItem;
