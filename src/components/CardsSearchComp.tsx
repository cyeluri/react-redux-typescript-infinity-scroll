import React, { FormEvent, ChangeEvent } from 'react'
import { connect } from 'react-redux'

// import the cardActions for search
import {searchCardInputOnChange, searchCards} from '../redux/actions/CardsActions';

interface IProps {
    searchCardInputOnChange(searchKey:string):any;
    searchCards(cardName:string):any;  
    searchKey: string;
}
interface IState {
  state:any  
}

class CardsSearchComp extends React.Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
    }

    onSubmit = (event:FormEvent<any>) => {
        console.log("Search submit");
        event.preventDefault();
        this.props.searchCards(this.props.searchKey);
    }

    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        //this.setState({...this.state, [e.target.name]:e.target.value})
        this.props.searchCardInputOnChange(e.target.value);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}> 
                <input placeholder='Search Cards...'
                name='searchKey' 
                value={this.props.searchKey}
                onChange={this.onChange} />
                <input type='submit' value="Submit" />
            </form>
        )
    }
}

const mapStateToProps = (state: any) => ({
    searchKey: state.cardsReducer.searchKey
});

export default connect(mapStateToProps, {searchCards, searchCardInputOnChange })(CardsSearchComp);