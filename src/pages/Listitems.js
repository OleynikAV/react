import React, {Component} from 'react';
import {connect} from 'react-redux'

class Listitems extends Component {

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
