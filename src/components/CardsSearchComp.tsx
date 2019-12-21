import React, { FormEvent, ChangeEvent } from 'react'
import { connect } from 'react-redux'


// import the cardActions for search
import {searchCardInputOnChange, searchCards, setIsLoading} from '../redux/actions/CardsActions';

interface IProps {
    searchCardInputOnChange(searchKey:string):any;
    searchCards(cardName:string):any; 
    setIsLoading(isLoading:boolean):any; 
    searchKey: string;
}
interface IState {
  state:any  
}

class CardsSearchComp extends React.Component<IProps, IState> {

    onSubmit = (event:FormEvent<any>) => {
        console.log("Search submit");
        event.preventDefault();
        this.props.setIsLoading(true);
        this.props.searchCards(this.props.searchKey);
    }

    onChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.props.searchCardInputOnChange(e.target.value);
    }

    render() {
        return (
            <div className='container'>
                <nav className="navbar navbar-light bg-light">
                    <form onSubmit={this.onSubmit} className='input-group'>
                        <input placeholder='Search Cards...' className='form-control  mr-sm-2'
                        name='searchKey'
                        value={this.props.searchKey}
                        onChange={this.onChange}
                        />
                        <input className='btn btn-outline-success my-2 my-sm-0' type='submit' value="Search" />
          </form>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    searchKey: state.cardsReducer.searchKey
});

export default connect(mapStateToProps, {searchCards, searchCardInputOnChange, setIsLoading })(CardsSearchComp);