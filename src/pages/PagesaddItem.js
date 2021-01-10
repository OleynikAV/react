import React, {Component} from 'react';
import '../scss/pagesaddItem.scss'
import base from "../firebase";
import storage from "../firebase";
import itemsStore from "../redusers/itemsStore";


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
    addItems = (item) =>{

        const items = {...this.state.items}

        items[`items${Date.now()}`] = item

        this.setState({items});

    }

    creatItems = (e) => {
        e.preventDefault()
        const items = {
            name: this.nameRef.current.value,
            images: this.imagesRef.current.files[0],
            description: this.descriptionRef.current.value,
            price: parseFloat(this.priceRef.current.value),
            salePrice: parseFloat(this.salePriceRef.current.value),
            saleDate: parseFloat(this.saleDateRef.current.value),
        }

        if (this.salePriceRef.current.value.length > 0){
            items.price = parseFloat(this.priceRef.current.value * this.salePriceRef.current.value / 100)
        }else{
            items.price = parseFloat(this.priceRef.current.value)
        }

        if (this.saleDateRef.current.value.length > 0){
            var d = new Date();
            d.toLocaleDateString("en-US")
            d.setDate(d.getDate() + parseFloat(this.saleDateRef.current.value))
            items.saleDate = d.toLocaleDateString("en-US")
        }


        this.addItems(items)

        storage.storage().ref('images/' + items.images.name).put(items.images)
            .on(storage.storage.STATE_CHANGED,()=>{
                return storage.storage().ref('images/' + items.images.name).put(items.images)
                    .snapshot.downloadURL
            })



        base.database().ref('items/' + items.name).set({
            name: items.name,
            images: items.images.name,
            description: items.description,
            price: items.price,
            salePrice: items.salePrice,
            saleDate: items.saleDate,
        })
        e.currentTarget.reset()
        alert('Форма отправилась')
    }


    componentDidMount() {
        const db = base.database();
        console.log(db)
        const ds = storage.storage();
        console.log(ds , 'storage')

    }

    render() {
        return (
            <section>
                <h2>Добавить товар</h2>
                <form action="" className={'addItems'} onSubmit={this.creatItems}>
                    <input ref={this.nameRef} type="text" name={'name'} placeholder={'Name'} autoComplete={'off'} minLength={20} maxLength={60} required/>
                    <input ref={this.imagesRef} type="file" name={'images'} placeholder={'Images'} autoComplete={'off'} required  onChange={this.handleChange}/>
                    <textarea  ref={this.descriptionRef} name={'description'} placeholder={'Description'} autoComplete={'off'} maxLength={200}/>
                    <input  ref={this.priceRef} type="number" name={'price'} placeholder={'Price'} required max={'99999999.99'} min={0}/>
                    <input ref={this.salePriceRef} type="number" name={'salePrice'} min={10} max={90} placeholder={'Sale Price %'} id={'salePrice'}/>
                    <input ref={this.saleDateRef} type="number" name={'saleDate'} min={0}  placeholder={'Sale Date'}/>
                    <button type={"submit"}>Добавить</button>
                </form>
            </section>
        );
    }
}

export default PagesaddItem;
