import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {PanelComponent} from './panel';
import {Network, NetworksList} from './network-list';

interface State {
    networks: Array<Network>,
    games: Array<string>,
}

/**
 * Main component for the landing page, which serves as a dashboard.
 */
class LandingPageComponent extends React.Component<{}, State> {
    networks_timer?: any;

    constructor(props, context) {
        super(props, context);

        this.state = {
            networks: [],
            games: []
        };
    }

    updateNetworkList() {
        fetch('/api/v1/networks.json').then(resp => {
            return resp.json();
        }).then(resp => {
            this.setState((_prevState, _props) => {
                return {
                    networks: resp as Array<Network>
                };
            });
        }).then(() => {
            this.networks_timer = setTimeout(() => this.updateNetworkList(), 5000);
        }, () => {
            this.networks_timer = setTimeout(() => this.updateNetworkList(), 5000);
        });
    }

    componentDidMount() {
        this.updateNetworkList();
    }

    componentWillUnmount() {
        if (this.networks_timer)
            clearTimeout(this.networks_timer);
    }

    render() {
        return (<>
            <NetworksList networks={this.state.networks} />
            <NetworksEloGraph />
            <RecentGameList />
        </>);
    }
}

class NetworksEloGraph extends React.PureComponent {
    render() {
        return <PanelComponent className='recent-network-graph'
                               title='Elo ratings'
        >
            This should be a full graph of the networks Elo rating over time
        </PanelComponent>;
    }
}

class RecentGameList extends React.PureComponent {
    render() {
        return <PanelComponent className='recent-game-list'
                               title='Recent Games'
        >
            This should be a thumbnail grid of the 100 most recently played games
        </PanelComponent>;
    }
}

// -------- Main function --------

document.addEventListener('DOMContentLoaded', () => {
    let body = document.body;
    let div = document.createElement('div');
    div.classList.add('landing-page');

    ReactDOM.render(
        <LandingPageComponent />,
        body.appendChild(div),
    )
});
