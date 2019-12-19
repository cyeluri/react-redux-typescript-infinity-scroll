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
    onScrollEvent():any;
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
        window.addEventListener('scroll', this.onScrollHandler, false);
    }
    /**
     * This method listen to the 
     */
    protected onScrollHandler = (e:Event) => {
        console.log('scroll event type '+ e.type);
        console.log('scroll scrollTo =' + document.body.scrollTop);
        console.log('scroll height =' + window.innerHeight);
        console.log('scroll page offset Y' + window.pageYOffset);
        console.log('scroll height =' + document.body.clientHeight);
    }
    public render() {
        const cardsList = this.props.cardsState.map(
            (card:any) => (
                  <div key={card.id} className='float-left'>
                      <div className='card'>
                          <h5 className='card-title card-header'>{card.name}</h5>
                        <div className='card-body'>
                            <img src={card.imageUrl} className='card-img-top'/>
                            <p className="card-text">Artist :{card.artist}</p>
                            <p className="card-text">Set Name :{card.setName}</p>
                            <p className="card-text">Original type :{card.originalType}</p>
                        </div>
                      </div>
                </div>
            )
        );
        return (
            <React.Fragment>
                <CardsSearchComp />
                <div className="container">
                    {cardsList}
                </div>
        </React.Fragment>
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
