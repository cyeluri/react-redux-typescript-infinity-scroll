import * as React from 'react';

// connect component to redux-store
import {connect} from 'react-redux';

// import the cardActions
import {fetchCards} from '../redux/actions/CardsActions';
import CardsSearchComp from './CardsSearchComp';

// store will come from the applicaiton state 

interface Props {
    cardsState: Array<object>;
    // for me I have to define the actions Method in the component prop to invoke after connecting with Redux. 
    fetchCards():any;
}

interface State {
    state: any
}


class CardsComp extends React.Component<Props, State> {

    constructor(props:Props) {
        super(props);
    }

    public componentDidMount() {
        console.log(this.props.fetchCards());
    }

    public render() {
        const cardsList = this.props.cardsState.map(
            (card:any) => (
                <div key={card.id}>
                    <p>
                        <h3>Name :{card.name}</h3>
                        <h3>Artist :{card.artist}</h3>
                        <h3>Set Name :{card.setName}</h3>
                        <h3>Original type :{card.originalType}</h3>
                    </p>
                    <img src={card.imageUrl}/>
                </div>
            )
        );
        return (
        <div>
            <CardsSearchComp />
            <h1>Cards</h1>
            {cardsList}
        </div>
        
        );
    }
}

const mapStateToProps = (state: any) => ({
    cardsState: state.cardsReducer.cardsPayload
});

//export default Cards;
//Connect will take 2 params
// 1 param - mapsState to property
// 2nd param - actionMethod
export default connect(mapStateToProps, {fetchCards})(CardsComp);
