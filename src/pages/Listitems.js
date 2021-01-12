import React, {Component} from 'react';
import base from "../firebase";


class Listitems extends Component {
    state = {
        items:[]


    }
    componentDidMount() {

        const upload = async ()=>{

            try {
                const items = await base.database().ref('items/');
                items.on('value', (snapshot) => {
                    const data = snapshot.val();

                    if (data == null){
                        document.querySelector('h2').innerHTML = 'Данных нет'
                    }else {
                        let nameLengths = Object.values(data);
                        this.setState({items:nameLengths})
                    }

                });
            }catch (e){
                console.log(e.message)
            }
        }
        upload()

    }
    deleteItem  = (e) => {

        console.log('delete element')
    }

    render() {
        return (
            <div>
                <h2>Список товаров </h2>

                {this.state.items.map((item,index)=>
                    <div key={index} >
                        <li>{item.name}</li>
                        <img src={item.imagesLink} alt={item.images}/>
                        <li>{item.description}</li>
                        <li>{item.price}</li>
                        <li>{item.salePrice}</li>
                        <li>{item.saleDate}</li>
                        <button onClick={this.deleteItem } key={index}>Удалить</button>

                    </div>

                    )}


            </div>
        );
    }
}
// function mapStateProps(state){
//     return{
//         user: state.items.user,
//     }
// }

export default Listitems ;
