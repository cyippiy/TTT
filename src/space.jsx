import React from 'react';

class Space extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: "",

        }
    }

    componentDidMount(){
        let val = this.props.value === -1 ? "-1" : this.props.value;
        this.setState({
            value:val
        });
    }

    render(){

        return (
            <div className="space" onClick={this.props.handleClick}>
                {this.state.value}
            </div>
        );
    }
}

export default Space;