import React from 'react';

// connect component to redux-store
import {connect} from 'react-redux';

// import the cardActions
import {fetchCards} from '../redux/actions/CardsActions';
import CardsSearchComp from './CardsSearchComp';

// store will come from the applicaiton state 

interface Props {
    cardsState: Array<object>;
    totalCards: number;
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
        this.props.fetchCards();
        window.addEventListener('scroll', this.onDocumentScrollHandler, false);
    }

    public componentWillUnmount() {
        window.removeEventListener('scroll', this.onDocumentScrollHandler);
    }
    /** This is the scrollHandler having the logic to find if its reached the bottom of page or not.
     * Once It reaches we will make API call based on the number of pages left and the cards count.
     */
    protected scrollHandler = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            // RAISE FETCH event incrementing the page number 
            this.props.fetchCards();
        }
    };


    /**
     * This method listen to the global scroll event. I will read the first value and start timmer and read the next scroll value
     * this gives me how much distance it covered. If the distance is more than half of the cards DIV I will fetch more cards 
     * and append it to the existing collections.
     */
    protected onDocumentScrollHandler = (e:Event) => {
        this.scrollHandler();
    }

    /**
     * This method supposed to work and do the caliculation but having some issues. I will fix this in version 2 if time permits
     */
    protected cardScrollHandler = (e:any) => {
        this.scrollHandler();
        let element = e.target
        console.log('scrollHeight, scrollTop ,clientHeight = ' + element.scrollHeight +' - '+ element.scrollTop +' === '+ element.clientHeight)
    }
 
    public render() {
        const cardsList = this.props.cardsState.map(
            (card:any) => (
                <div key={card.id} className='content-container'>
                  <div key={card.id} className='float-left'>
                      <div className='card'>
                          <h5 className='card-title card-header'>{card.name}</h5>
                        <div className='card-body'>
                            <div className="spinner-grow text-secondary" role="status">
                            </div>
                            <img src={card.imageUrl}  className='card-img-top'/>
                            <p className="card-text">Artist :{card.artist}</p>
                            <p className="card-text">Set Name :{card.setName}</p>
                            <p className="card-text">Original type :{card.originalType}</p>
                        </div>
                      </div>
                    </div>
                </div>    
            )
        );
        return (
            <React.Fragment>
                <CardsSearchComp />
                <div className="container"  onScroll={this.cardScrollHandler}>
                    <h5>
                        <span className='text text-primary'>Total Cards : </span>
                        <span className='text text-success'>{this.props.totalCards}</span>
                    </h5>
                    {cardsList}
                </div>
        </React.Fragment>
        );
    }
}

const mapStateToProps = (state: any) => ({
    cardsState: state.cardsReducer.cardsPayload,
    totalCards: state.cardsReducer.totalCards
});

//export default Cards;
//Connect will take 2 params
// 1 param - mapsState to property
// 2nd param - actionMethod
export default connect(mapStateToProps, {fetchCards})(CardsComp);
