import React, { FormEvent, ChangeEvent } from 'react'
import { connect } from 'react-redux'
import Button from 'react-bootstrap/Button';

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
        this.props.searchCardInputOnChange(e.target.value);
    }

    render() {
        return (
            <div className='main'>
                <form onSubmit={this.onSubmit} className='input-group'> 
                    <input placeholder='Search Cards...' className='form-control'
                    name='searchKey' 
                    value={this.props.searchKey}
                    onChange={this.onChange} 
                    />
                    <input type='submit' value="Search" />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    searchKey: state.cardsReducer.searchKey
});

export default connect(mapStateToProps, {searchCards, searchCardInputOnChange })(CardsSearchComp);