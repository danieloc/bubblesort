/**
 * Created by Daniel on 16/02/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import { getAddNodeModal, setParent, setCollaborators, requestMembershipModal, maximumLimitReached} from '../actions/modals';

export class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            depth : props.depth
        };
        this.changeCurrentNode = this.changeCurrentNode.bind(this)
    }

    addNodeModal(depth, accountType) {
        if(this.props.user.nodeCount < 9 || (accountType === 'Gold' && this.props.user.nodeCount < 30)) {
            this.props.dispatch(getAddNodeModal(this.state.depth));
        }
        else if(accountType === 'Gold') {
            this.props.dispatch(maximumLimitReached());
        }
        else {
            this.props.dispatch(requestMembershipModal());
        }
    }


    getNodes(user) {
        if(this.props.nodes && this.props.nodes.length > 0 && this.props.node) {
            return this.props.nodes.map((node, i) => {
                var className = "inActive";
                var active = {};
                if(this.state.depth < this.props.indexList.length) {
                    if(this.props.indexList[this.state.depth -1] === i)
                    {
                        className = "active";
                        active = { borderBottomColor: this.props.primaryColor };
                    }
                }
                else if(this.props.node._id === node._id){
                    className = "active";
                    active = { borderBottomColor: this.props.primaryColor };
                }
                return <li key={i} value={i} onClick={() => this.changeCurrentNode(i, node)} ><Link className={className} style={active} >{node.name}</Link></li>
            });
        }
        else {
            return []
        }
    }

    changeCurrentNode(i, node) {
        var newIndexList =  this.props.indexList;
        var last = false;
        if( i === this.props.nodes.length - 1) {
            last = true;
        }
        if (this.state.depth === this.props.indexList.length) {
            newIndexList[this.state.depth -1] = i;
            this.props.dispatch(setParent(node, newIndexList, this.state.depth,last));
        }
        else if(this.state.depth > this.props.indexList.length ) {
            newIndexList.push(i);
            this.props.dispatch(setParent(node, newIndexList,this.state.depth, last));

        }
        else {
            while(newIndexList.length >= this.state.depth) {
                newIndexList.pop();
            }
            newIndexList[this.state.depth - 1] = i;
            this.props.dispatch(setParent(node, newIndexList, this.state.depth, last));
        }
        var newCollaborators = this.props.getNodeCollaborators(this.props.user.nodes, newIndexList, 0, false, [],0);
        this.props.dispatch(setCollaborators(newCollaborators));
    }


    getPlusIcon(accountType) {
        if((this.props.node && this.props.user.email === this.props.node.owner.email) || this.props.depth === 1)
            return (<li><Link onClick={() => this.addNodeModal(this.state.depth, accountType)}><span className = "glyphicon glyphicon-plus-sign"></span></Link></li>);
    }
    render() {
        return (
            <div>
                <nav className="navbar nodeNav navbar-default navbar-static-top" style={{zIndex:1}} >
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            {this.getNodes()}
                            {this.getPlusIcon(this.props.user.accountType)}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
const mapStateToProps =(state) => {
    return {
        user: state.auth.user,
        node : state.modals.node,
        indexList : state.modals.indexList
    }
};

export default connect(mapStateToProps)(NavBar)

