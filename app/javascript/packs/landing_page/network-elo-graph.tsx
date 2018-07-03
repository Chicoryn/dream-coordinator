import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {PanelComponent} from './panel';
import {Network} from './models';

interface Props {
    networks: Array<Network>
}

/**
 * Wrapper around a Recharts, which plots the networks ELO rating over the
 * number of features.
 */
export class NetworksEloGraph extends React.PureComponent<Props> {
    renderTooltip(external: any) {
        if (external.active && external.payload && external.payload.length > 0) {
            let payload: Network = external.payload[0].payload;

            return <div className="network-elo-tooltip">
                <div className="name">{payload.name}</div>
                <table>
                    <tr>
                        <td>elo</td>
                        <td>{payload.elo.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>features</td>
                        <td>{payload.number_of_preceding.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>id</td>
                        <td>{payload.id.toLocaleString()}</td>
                    </tr>
                </table>
            </div>
        } else {
            return null;
        }
    }

    render() {
        let data: Array<Network> = this.props.networks.reverse().map(network => {
            let other = Object.assign({}, network);
            other.elo = other.elo != null ? other.elo : NaN;

            return other;
        });

        return <PanelComponent className='recent-network-graph no-padding'
                               title='Elo ratings'
        >
            <div className="fixed-container">
                <ResponsiveContainer>
                    <AreaChart data={data}>
                        <XAxis dataKey="number_of_preceding" type="number" domain={[0, 'dataMax']} />
                        <YAxis type="number" />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip content={(external) => this.renderTooltip(external)} />
                        <Area type="monotone" dataKey="elo" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </PanelComponent>;
    }
}