/**
 * Created by Daniel on 12/30/2016.
 */
import React from 'react';
import { connect } from 'react-redux';
import Graph from './Graph';
import { getWalkThrough } from '../actions/modals';
import { getInvitationModal } from '../actions/modals'
import { toggleSideBar, toggleTodos } from '../actions/viewPortActions';
import Toggle from 'react-bootstrap-toggle';
import _ from 'lodash';
import Nodes from './Nodes';

export class Mindmap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todosVisable : false
        }
        if (this.props.user.isNewUser) {
            this.props.dispatch(getWalkThrough());
        }
        if (this.props.user.invitations.length > 0) {
            this.props.dispatch(getInvitationModal());
        }
        this.getGraphData = this.getGraphData.bind(this);
        this.todoButtons = this.todoButtons.bind(this);
    }
    componentWillMount() {
        this.props.dispatch(toggleSideBar(true));
    }

    getGraphData() {
        var data;
        if(this.props.user.mindmapOption === 'sprawl') {
            data = {
                "name": this.props.user.name,
                "img": this.props.user.picture || this.props.user.gravatar,
                "children": []
            };
            if (this.props.user.nodes.length > 0) {
                var nodeData = getOptionOneData(this.props.user.nodes, this.props.todos);
                data.children = nodeData;
            }
        }
        else if(this.props.user.mindmapOption === 'tiered') {
            data = [{
                "name": this.props.user.name,
                "img": this.props.user.picture || this.props.user.gravatar,
            }];
            if(this.props.user.nodes.length > 0) {
                var nodeData = getOptionTwoData(this.props.user.nodes, this.props.todos);
                data = _.concat(data, nodeData);
            }
        }
        return data;

        function getOptionOneData(nodes, showToDos) {
            var nodeData = null;
            nodes.forEach(function (node) {
                var singleNodeData = {
                    "name": node.name,
                    "children" : []
                };
                if (node.nodes && node.nodes.length > 0) {
                    var subNodes = getOptionOneData(node.nodes, showToDos);
                    singleNodeData.children = _.concat(singleNodeData.children, subNodes);
                }
                if(showToDos && node.todos.length > 0) {
                    node.todos.forEach(function (todo) {
                        var singleToDoData = [{
                            "name": todo.name,
                            "todo" : true
                        }];
                       singleNodeData.children =  _.concat(singleNodeData.children, singleToDoData);
                    });
                }
                if(nodeData === null) {
                    nodeData = [singleNodeData];
                }
                else {
                    nodeData = _.concat(nodeData, singleNodeData);
                }
            });
            return nodeData;
        }
        function getOptionTwoData(nodes, showToDos) {
            var nodeData = null;
            nodes.forEach(function (node) {
                var singleNodeData = {
                    'name': node.name,
                    'target': [0]
                };
                if (node.nodes && node.nodes.length > 0) {
                    singleNodeData = {
                        'name': node.name,
                        'target': [0],
                        'subDocs': [{'name': node.name}]
                    };
                    var subNodes = getOptionTwoData(node.nodes, showToDos);
                    singleNodeData.subDocs = _.concat(singleNodeData, subNodes);
                }
                if(nodeData === null) {
                    nodeData = singleNodeData;
                }
                else {
                    nodeData = _.concat(nodeData, singleNodeData);
                }
            });
            return nodeData;
        }
    }

    todoButtons() {
        if(this.props.node) {
            if(this.props.todos) {
                return (<div>
                        <button className= 'todoSwitch btn-primary' onClick={() => this.props.dispatch(toggleTodos(true))} >Show ToDos</button>
                        <button className= 'todoSwitch btn-default' onClick={() => this.props.dispatch(toggleTodos(false))} >Hide ToDos</button>
                    </div>);
            }
            else {
                return (<div>
                        <button className= 'todoSwitch btn-default' onClick={() => this.props.dispatch(toggleTodos(true))} >Show ToDos</button>
                        <button className= 'todoSwitch btn-primary' onClick={() => this.props.dispatch(toggleTodos(false))} >Hide ToDos</button>
                    </div>);
            }
        }
        else return null;
    }

    getSideBar() {
        var sideBarStyle = {
            width: this.props.width * 0.25,
            float: 'right',
            paddingRight: 20,
        };
        if(this.props.sideBar) {
            return (
                <div style={sideBarStyle}>
                    {this.getStartMessage()}
                    <Nodes />
                    {this.todoButtons()}
                </div>);
        }
        else
            return null;
    }

    toggleSideBar(onOff) {
        this.props.dispatch(toggleSideBar(onOff));
        setTimeout(function(){ window.dispatchEvent(new Event('resize')); }, 10);

    }

    getChevron() {
        if(this.props.sideBar) {
            return (<div><span className="glyphicon glyphicon-chevron-right" onClick={() => this.toggleSideBar(false)} style={{float: 'right', paddingRight:'20px'}}></span></div>);
        }
        else
            return (<div><span className="glyphicon glyphicon-chevron-left" onClick={() => this.toggleSideBar(true)} style={{float: 'right', paddingRight:'20px'}}></span></div>);
    }

    getStartMessage() {
        if(!this.props.user.nodes) {
            return <p style={{alignContent: 'center'}}>Use this Toolbar to create your very first node!</p>
        }
    }

    render() {

        return (
            <div style={{display:'flex'}}>
                <div  style = {{ float: 'left', backgroundColor:this.props.user.primaryColor}}>
                    <Graph getGraphData = {this.getGraphData} data = {this.getGraphData()}/>
                </div>
                <div style={{display:'flex'}}>
                    {this.getChevron()}
                    {this.getSideBar()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        width: state.viewPort.width,
        height: state.viewPort.height,
        activeModal: state.modals.activeModal,
        sideBar : state.viewPort.sideBar,
        todos : state.viewPort.todos,
        node : state.modals.node,
    }
};

export default connect(mapStateToProps)(Mindmap);
