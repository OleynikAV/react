import React, {Component} from 'react';
import '../scss/pagesaddItem.scss'
import base from "../firebase";
import storage from "../firebase";



class PagesaddItem extends Component {
    nameRef = React.createRef();
    imagesRef = React.createRef();
    descriptionRef = React.createRef();
    priceRef = React.createRef();
    salePriceRef = React.createRef();
    saleDateRef = React.createRef();

    state = {
        items:{},
    }
    componentDidMount() {
        const db = base.database();
        console.log(db)
        const ds = storage.storage();
        console.log(ds , 'storage')

    }
    // addItems = (item) =>{
    //
    //     const items = {...this.state.items}
    //
    //     items[`items${Date.now()}`] = item
    //
    //     this.setState({items});
    //
    // }


    creatItems = (e) => {
        e.preventDefault()
        const item = {
            name: this.nameRef.current.value,
            images: this.imagesRef.current.files[0],
            description: this.descriptionRef.current.value,
            price: parseFloat(this.priceRef.current.value),
            salePrice: parseFloat(this.salePriceRef.current.value),
            saleDate: parseFloat(this.saleDateRef.current.value),
        }

        if (this.priceRef.current.value.length){
            item.price = parseFloat(this.priceRef.current.value * this.salePriceRef.current.value / 100)
            console.log('rqwerqewrqewrqewr')
        }else{
            item.price = parseFloat(this.priceRef.current.value)
        }

        if (this.saleDateRef.current.value.length > 0){
            var d = new Date();
            d.toLocaleDateString("en-US")
            d.setDate(d.getDate() + parseFloat(this.saleDateRef.current.value))
            item.saleDate = d.toLocaleDateString("en-US")
        }


        // this.addItems(items)


        // storage.storage().ref('images/' + item.images.name).put(item.images)
        //     .on(storage.storage,()=>{
        //         return storage.storage().ref('images/' + item.images.name).put(item.images)
        //             .snapshot.downloadURL
        //     })

        storage.storage().ref('images/' + item.images.name).put(item.images)

        console.log(storage.storage().ref().child(item.images.name).getDownloadURL() , 'twertewr')



        base.database().ref('items/' + item.name).set({
            name: item.name,
            images: item.images.name,
            description: item.description,
            price: item.price,
            salePrice: item.salePrice,
            saleDate: item.saleDate,
        })
        e.currentTarget.reset()
        alert('Форма отправилась')
    }




    render() {
        return (
            <section>
                <h2>Добавить товар</h2>
                <form action="" className={'addItems'} onSubmit={this.creatItems}>
                    <input ref={this.nameRef} type="text" name={'name'} placeholder={'Name'} autoComplete={'off'} minLength={20} maxLength={60} required/>
                    <input ref={this.imagesRef} type="file" name={'images'} placeholder={'Images'} autoComplete={'off'}  required />
                    <textarea  ref={this.descriptionRef} name={'description'} placeholder={'Description'} autoComplete={'off'} maxLength={200} required/>
                    <input  ref={this.priceRef} type="number" name={'price'} placeholder={'Price'} required max={'99999999.99'} min={0} />
                    <input ref={this.salePriceRef} type="number" name={'salePrice'} min={10} max={90} placeholder={'Sale Price %'} id={'salePrice'} required/>
                    <input ref={this.saleDateRef} type="number" name={'saleDate'} min={0}  placeholder={'Sale Date'} required/>
                    <button type={"submit"}>Добавить</button>
                </form>
            </section>
        );
    }
}

export default PagesaddItem;
