import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {PanelComponent} from './panel';
import {NetworksEloGraph} from './network-elo-graph';
import {NetworksList} from './network-list';
import {RecentGameList} from './recent-game-list';
import {Network, Game} from './models';

interface State {
    networks: Array<Network>,
    games: Array<Game>,
}

/**
 * Main component for the landing page, which serves as a dashboard.
 */
class LandingPageComponent extends React.Component<{}, State> {
    networks_timer?: any;
    games_timer?: any;

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
                    networks: resp as Array<Network> || []
                };
            });
        }).then(() => {
            this.networks_timer = setTimeout(() => this.updateNetworkList(), 15000);
        }, () => {
            this.networks_timer = setTimeout(() => this.updateNetworkList(), 15000);
        });
    }

    updateGameList() {
        fetch('/api/v1/games.json?limit=50').then(resp => {
            return resp.json();
        }).then(resp => {
            this.setState((_prevState, _props) => {
                return {
                    games: resp as Array<Game> || []
                };
            });
        }).then(() => {
            this.games_timer = setTimeout(() => this.updateGameList(), 30000);
        }, () => {
            this.games_timer = setTimeout(() => this.updateGameList(), 30000);
        });
    }

    componentDidMount() {
        this.updateNetworkList();
        this.updateGameList();
    }

    componentWillUnmount() {
        if (this.networks_timer)
            clearTimeout(this.networks_timer);
        if (this.games_timer)
            clearTimeout(this.games_timer);
    }

    render() {
        return (<>
            <NetworksList networks={this.state.networks} />
            <NetworksEloGraph networks={this.state.networks} />
            <RecentGameList games={this.state.games} />
        </>);
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
