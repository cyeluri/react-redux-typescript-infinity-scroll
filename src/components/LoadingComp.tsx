import React, { Component } from 'react'

interface Props {
    
}
interface State {
    
}

export default class LoadingComp extends Component<Props, State> {
    state = {}

    render() {
        return (
          <div className="container">

            <div className="spinner-grow text-muted"></div>
            <div className="spinner-grow text-primary"></div>
            <div className="spinner-grow text-success"></div>
            <div className="spinner-grow text-info"></div>
            <div className="spinner-grow text-warning"></div>
            <div className="spinner-grow text-danger"></div>
            <div className="spinner-grow text-secondary"></div>
            <div className="spinner-grow text-dark"></div>
            <div className="spinner-grow text-light"></div>
            Loading.....
          </div>
        )
    }
}
