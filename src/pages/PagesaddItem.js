import React, {Component} from 'react';
import '../scss/pagesaddItem.scss'

class PagesaddItem extends Component {
    nameRef = React.createRef();
    imagesRef = React.createRef();
    descriptionRef = React.createRef();
    priceRef = React.createRef();
    salePriceRef = React.createRef();

    state = {
        items:{},
        order:{}
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
            images: this.imagesRef.current.value,
            description: this.descriptionRef.current.value,
            price: parseFloat(this.priceRef.current.value),
            salePrice: parseFloat(this.salePriceRef.current.value),
        }
        if (this.salePriceRef.current.value.length > 0){
            items.price = parseFloat(this.priceRef.current.value * this.salePriceRef.current.value / 100)
        }else{
            items.price = parseFloat(this.priceRef.current.value)

        }
        this.addItems(items)
        e.currentTarget.reset()
    }
    render() {
        return (
            <section>
                <h2>Добавить товар</h2>
                <form action="" className={'addItems'} onSubmit={this.creatItems}>
                    <input ref={this.nameRef} type="text" name={'name'} placeholder={'Name'} autoComplete={'off'} minLength={20} maxLength={60} required/>
                    <input ref={this.imagesRef} type="images" name={'images'} placeholder={'Images'} autoComplete={'off'} required/>
                    <textarea  ref={this.descriptionRef} name={'description'} placeholder={'Description'} autoComplete={'off'} maxLength={200}/>
                    <input  ref={this.priceRef} type="number" name={'price'} placeholder={'Price'} required max={'99999999.99'} min={0}/>
                    <input ref={this.salePriceRef} type="number" name={'salePrice'} min={10} max={90} placeholder={'Sale Price %'}/>
                    <button type={"submit"}>Добавить</button>
                </form>
            </section>
        );
    }
}

export default PagesaddItem;
