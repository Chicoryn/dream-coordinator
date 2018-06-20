import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {PanelComponent} from './panel';
import {RecentGame} from './recent-game';

export interface Game {
    id: number,
    data: string,
    created_at: string,
    updated_at: string
}

interface Props {
    games: Array<Game>
}

export class RecentGameList extends React.PureComponent<Props> {
    render() {
        return <PanelComponent className='recent-game-list'
                               title='Recent Games'
        >
            {this.props.games.map(game => <RecentGame key={game.id} sgf={game.data} />)}
        </PanelComponent>;
    }
}