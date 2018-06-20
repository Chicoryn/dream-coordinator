import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface Props {
    sgf: string
}

/**
 * Displays the summary of a single SGF game as two separate components:
 * 
 * - The final score
 * - The board state after the first 40 moves
 */
export class RecentGame extends React.Component<Props, {}> {
    static RADIUS = 7;
    static DISTANCE = 16;
    static MARGIN = 4;

    canvas: React.RefObject<HTMLCanvasElement>

    constructor(props: Props, context: any) {
        super(props, context);

        this.canvas = React.createRef();
    }

    getMoves(top_k, callback) {
        let MOVE = /;([BW])\[([^\]]*)\]/g;
        let m;

        while ((m = MOVE.exec(this.props.sgf))) {
            let color = m[1];
            let [x, y] = (() => {
                if (m[2].length == 2) {
                    return [
                        m[2].charCodeAt(0) - 97,
                        m[2].charCodeAt(1) - 97,
                    ];
                } else {
                    return [null, null];
                }
            })();

            callback(m[1], x, y);

            if (--top_k <= 0)
                break;
        }
    }

    onDownload(event) {
        event.preventDefault();

        let hash = this.props.sgf.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a&a
        }, 0);

        let sgfBlob = new Blob([this.props.sgf], {type: 'application/x-go-sgf'});
        let data = window.URL.createObjectURL(sgfBlob);
        let link = document.createElement('a');

        link.href = data;
        link.download = `${hash}.sgf`;
        link.click();
    }

    onUpdate() {
        let canvas = this.canvas.current;
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);

        // draw the grid lines at uniform distances across both the x and
        // the y axis
        context.strokeStyle = '#aaa';

        for (let i = 0; i < 19; ++i) {
            let offset = RecentGame.MARGIN + RecentGame.DISTANCE*i + RecentGame.RADIUS;
            let start = 0;
            let end = 2*RecentGame.MARGIN + 19*RecentGame.DISTANCE;

            context.beginPath();
            context.moveTo(offset, start);
            context.lineTo(offset, end);
            context.stroke();

            context.beginPath();
            context.moveTo(start, offset);
            context.lineTo(end, offset);
            context.stroke();
        }

        // draw each move with its number on-top of it
        let count = 1;

        context.font = `${2*RecentGame.RADIUS - 6}px Arial`;
        context.textAlign = 'center';
        context.textBaseline = 'middle'; 
        context.strokeStyle = '#000';

        this.getMoves(40, (color, x, y) => {
            let cx = RecentGame.MARGIN + RecentGame.DISTANCE*x + RecentGame.RADIUS;
            let cy = RecentGame.MARGIN + RecentGame.DISTANCE*y + RecentGame.RADIUS;

            context.beginPath();
            context.arc(
                cx, cy, RecentGame.RADIUS,
                0, 2.0 * Math.PI
            );
            context.fillStyle = color === 'B' ? 'black' : 'white';
            context.fill();
            context.stroke();

            context.fillStyle = color === 'B' ? 'white' : 'black';
            context.fillText('' + count, cx, cy); 
            count += 1;
        });
    }

    componentDidMount() {
        this.onUpdate();
    }

    componentDidUpdate() {
        this.onUpdate();
    }

    render() {
        let winner = /RE\[([^\]]+)\]/g.exec(this.props.sgf);

        return <div className={'recent-game'}>
            <div className={'recent-game-status'}>
                {winner[1]}
            </div>
            <canvas ref={this.canvas}
                    width={2*RecentGame.MARGIN + 19*RecentGame.DISTANCE}
                    height={2*RecentGame.MARGIN + 19*RecentGame.DISTANCE}
                    onClick={event => this.onDownload(event)}
            ></canvas>
        </div>;
    }
}
