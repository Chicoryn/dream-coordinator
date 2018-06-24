import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {PanelComponent} from './panel';
import {Network} from './models';

interface Props {
    networks: Array<Network>
}

interface NetworkGraph extends Network {
    number_of_cumulative_features: number
}

/**
 * Wrapper around a Recharts, which plots the networks ELO rating over the
 * number of features.
 */
export class NetworksEloGraph extends React.PureComponent<Props> {
    renderTooltip(external: any) {
        if (external.active) {
            let payload = external.payload && external.payload[0].payload;

            return <div>
                {payload.name}: {payload.elo}
            </div>
        } else {
            return null;
        }
    }

    render() {
        let data: Array<NetworkGraph> = this.props.networks.reverse().reduce((acc, network) => {
            let other = network as NetworkGraph;

            other.number_of_cumulative_features = acc.number_of_cumulative_features;

            acc.number_of_cumulative_features += other.number_of_features;
            acc.result.push(other);

            return acc;
        }, {
            number_of_cumulative_features: 0,
            result: []
        }).result;

        return <PanelComponent className='recent-network-graph no-padding'
                               title='Elo ratings'
        >
            <div className="fixed-container">
                <ResponsiveContainer>
                    <AreaChart data={data}>
                        <XAxis dataKey="number_of_cumulative_features" type="number" />
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