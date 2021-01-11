import React, {Component} from 'react';
import {connect} from 'react-redux'
import base from "../firebase";
import storage from "firebase";

class Listitems extends Component {
    stateTest = {
        itemss:{

        }
    }
    componentDidMount() {

        let items = base.database().ref('items/' + postId);
        items.on('value', (snapshot) => {
            const data = snapshot.val();
            console.log(data)
            console.log({userName : snapshot.val().name})
            console.log({userName : snapshot.val().images})
            let img = {images : snapshot.val().images}
        });
//         var allstorage = storage.storage();
//         var pathReference = allstorage.ref('images/stars.jpg');
//
// // Create a reference from a Google Cloud Storage URI
//         var gsReference = storage.refFromURL('gs://bucket/images/stars.jpg')


    }

    render() {
        return (
            <div>
                <h2>Listitems</h2>

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
