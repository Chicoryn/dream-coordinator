import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface Props {
    title: string,
    className?: string
}

interface State {
    in: boolean
}

export class PanelComponent extends React.PureComponent<Props, State> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            in: true
        };
    }

    render() {
        let panelClasses = [
            this.props.className || '',
            this.state.in ? 'in' : '',
            'panel'
        ];

        return <div className={panelClasses.join(' ')}>
            <div className='title'>
                {this.props.title}
            </div>
            <div className='body'>
                {this.props.children}
            </div>
      </div>;
    }
};
