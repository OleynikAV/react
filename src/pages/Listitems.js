import React, {Component} from 'react';
import {connect} from 'react-redux'
import base from "../firebase";
import storage from "firebase";

class Listitems extends Component {
    state = {
        items:[]


    }
    componentDidMount() {

        const items = base.database().ref('items/');
        items.on('value', (snapshot) => {
            const data = snapshot.val();
            let nameLengths = Object.values(data);
            this.setState({items:nameLengths})
        });








    }

    render() {
        return (
            <div>
                <h2>Listitems</h2>
                {this.state.items.map((item,index)=>
                    <div key={index}>
                        <li>{item.name}</li>
                        <li>{item.description}</li>
                        <li>{item.price}</li>
                        <li>{item.salePrice}</li>
                        <li>{item.saleDate}</li>

                    </div>

                    )}

            </div>
        );
    }
}
function mapStateProps(state){
    return{
        user: state.itemsStore.user,
    }
}

export default connect(mapStateProps)(Listitems) ;
