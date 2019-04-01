import React from 'react'; 
import { connect } from 'react-redux';


class UserHeader extends React.Component {
    // gets the userID whenever the page loads


    render(){
        const { user } = this.props; 

        if(!user){
            return null; 
        }

        return <div className="header">{user.name}</div>
    }
}

// ownProps is how mapStateToProps accesses the props in the component above
// this FIND uses to be in the render method, but we want to extract anything that does computations on redux state to the mapStateToProps function
const mapStateToProps = (state, ownProps) => {
    return  { user: state.users.find(user => user.id === ownProps.userId) }
}

export default connect(mapStateToProps)(UserHeader);