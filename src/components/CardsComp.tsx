import React from 'react';

// connect component to redux-store
import {connect} from 'react-redux';

// import the cardActions
import {fetchCards} from '../redux/actions/CardsActions';
import CardsSearchComp from './CardsSearchComp';
import LoadingComp from './LoadingComp';

// store will come from the applicaiton state 

interface Props {
    cardsState: Array<object>;
    totalCards: number;
    // for me I have to define the actions Method in the component prop to invoke after connecting with Redux. 
    fetchCards():any;
    onScrollEvent():any;
    isLoading:boolean;
}

interface State {
    state: any
}


class CardsComp extends React.Component<Props, State> {

    private isLoading:boolean = true;

    public componentDidMount() {
        this.props.fetchCards();
        this.isLoading =  true;
        window.addEventListener('scroll', this.onDocumentScrollHandler, false);
    }

    public componentWillReceiveProps(nextProps:any) {
        this.isLoading = nextProps.isLoading;
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
            this.isLoading = true;
            this.props.fetchCards();
            //Force component to rerender to show to loader.
            this.setState({state: this.state});
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
        let element = e.target;
        console.log('scrollHeight, scrollTop ,clientHeight = ' + element.scrollHeight +' - '+ element.scrollTop +' === '+ element.clientHeight)
    }
 
    public render() {
        const cardsList = this.props.cardsState.map(
            (card:any) => (
                  <div key={card.id} className='float-left'>
                    <div className='card'>
                        <h5 className='card-header'>{card.name}</h5>
                        <img src={card.imageUrl}  className='card-img-top' alt='React Icon'/>
                    <div className='card-body .bg-light'>
                        <h6>
                            <span className='text'>Artist :</span>
                            <span className='text-secondary'>{card.artist}</span>
                        </h6>
                        <h6>
                            <span className='text'>Set Name :</span>
                            <span className='text-secondary'>{card.setName}</span>
                        </h6>
                        <h6>
                            <span className='text'>Original-type :</span>
                            <span className='text-secondary'>{card.originalType}</span>
                        </h6>
                    </div>
                    </div>
                  </div>
            )
        );

        if(this.props.isLoading || this.isLoading) {
            return(
                <React.Fragment>
                    <LoadingComp />
                </React.Fragment>
            );
        }else if(cardsList.length === 0) {
            return(
                <React.Fragment>
                    <CardsSearchComp />
                    <h3>No Cards found</h3>
                </React.Fragment>
            );
        }
        else {
            return(      
                <React.Fragment>
                    <CardsSearchComp />
                    <div onScroll={this.cardScrollHandler}>
                        <h5 >
                            <span className='text text-primary'>Total Cards : </span>
                            <span className='text text-success'>{this.props.totalCards}</span>
                        </h5>
                    </div>
                    {cardsList}
                </React.Fragment>   
            );
        }
    }
}

const mapStateToProps = (state: any) => ({
    cardsState: state.cardsReducer.cardsPayload,
    totalCards: state.cardsReducer.totalCards,
    isLoading: state.cardsReducer.isLoading
});

//export default Cards;
//Connect will take 2 params
// 1 param - mapsState to property
// 2nd param - actionMethod
export default connect(mapStateToProps, {fetchCards})(CardsComp);
