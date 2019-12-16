import * as React from 'react';

// connect component to redux-store
import {connect} from 'react-redux';

// import the postActions
import {fetchCards} from '../redux/actions/CardsActions';

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
                    <h3>{card.name}</h3>
                </div>
            )
        );
        return (
        <div>
            <h1>Cards</h1>
            {cardsList}
        </div>
        
        );
    }
}

const mapStateToProps = (state: any) => ({
    cardsState: state.cardsReducer.payload
});

//export default Cards;
//Connect will take 2 params
// 1 param - mapsState to property
// 2nd param - actionMethod
export default connect(mapStateToProps, {fetchCards})(CardsComp);
