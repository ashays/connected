import React from 'react';
import './Profile.css';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        this.setState({name: event.target.value.trim()});
    }
  
    handleSubmit(event) {
        if (this.state.name !== '') {
            this.props.updateName(this.state.name);
        }
        event.preventDefault();
    }
  
    render() {
        return (
            <div className="profile">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Nickname
                        <input type="text" placeholder="Dr. Sesame" value={this.state.name} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Join" disabled={this.state.name === ''} />
                </form>
            </div>
        );
    }
}

export default Profile;