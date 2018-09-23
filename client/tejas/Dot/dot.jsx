
import {
  calcTransition,
  selectComponent
} from '../calc.js';

export const Dot = React.createClass({
    getInitialState(){
        return {
            cy:null,
            cx:null,
            r: null
        }
    },
    getDefaultProps() {

    },
    componentDidMount(){
        this.setState({
            cy: this.props.cy,
            cx: this.props.cx,
            color: this.props.color,
            r: this.props.r
        })
    },
    componentWillReceiveProps( nextProps ){

        const {
          cx,
          cy,
          r
        } = nextProps;

        const node = selectComponent( this );
        //Transition the bars
        return node.transition( calcTransition() )
            .attr( 'cy', cy )
            .attr( 'cx', cx )
            .attr( 'r', r )
            .on('end', () => this.setState({
                "cy": cy,
                "cx": cx,
                "r": r
            }) );
    },
    render() {
      return (
        <circle
            cy={ this.state.cy }
            cx={ this.state.cx }
            r={ this.state.r }
            fill={ this.state.color }
            stroke="#FFFFFF"
            strokeWidth="2px"
        ></circle>
      );
    }

});

export default Dot;