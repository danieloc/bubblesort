/**
 * Created by Daniel on 3/20/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import SingleArchivedToDo from './SingleArchivedToDo';

export class Archived extends React.Component {
    constructor(props) {
        super(props);
        this.displayArchiveToDos = this.displayArchiveToDos.bind(this);
    }


    displayArchiveToDosOrNothing() {
        var achivedToDos = this.displayArchiveToDos(this.props.user, null);
        function ColorLuminance(hex, lum) {

            // validate hex string
            hex = String(hex).replace(/[^0-9a-f]/gi, '');
            if (hex.length < 6) {
                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
            }
            lum = lum || 0;

            // convert to decimal and change luminosity
            var rgb = "#", c, i;
            for (i = 0; i < 3; i++) {
                c = parseInt(hex.substr(i*2,2), 16);
                c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                rgb += ("00"+c).substr(c.length);
            }

            return rgb;
        }
        if(achivedToDos.length > 0) {
            return achivedToDos.map((todo, i) => {
                return <SingleArchivedToDo key={i} index={i} obj={todo.obj} pathArr = {todo.pathArr} ></SingleArchivedToDo>;
            })
        }
        else {
            var lighterColor = ColorLuminance(this.props.user.primaryColor, 0.9);
            const styles = {
                background: this.props.user.primaryColor,
                background: '-webkit-linear-gradient(left top,' +this.props.user.primaryColor + ','+lighterColor+')', /* For Safari 5.1 to 6.0 */
                background: '-o-linear-gradient(top left,' +this.props.user.primaryColor + ','+lighterColor+')', /* For Opera 11.1 to 12.0 */
                background: '-moz-linear-gradient(top left,' +this.props.user.primaryColor + ','+lighterColor+')', /* For Firefox 3.6 to 15 */
                background: 'linear-gradient(to top left,' +this.props.user.primaryColor + ','+lighterColor+')',/* Standard syntax */
            };
            return <div className="archivedBack" style={styles}><h1 className="noArchived">You do not have any archived ToDos</h1></div>
        }
    }

    displayArchiveToDos(node, pathArr) {
        var updatedPath;
        var everyToDoInLevel = [];
        if (node.nodes.length > 0) {
            if(pathArr === null)
                updatedPath = [node.name];
            else
                updatedPath = pathArr.concat([node.name]);
            node.nodes.forEach((node) => {
                var subNodeToDos = [];
                var currentNodeToDos = [];
                if(node.nodes) {
                    subNodeToDos = this.displayArchiveToDos(node, updatedPath)
                }
                if(node.todos.length > 0) {
                    updatedPath = updatedPath.concat([node.name]);
                    node.todos.forEach((todo) => {
                        if(todo.completed) {
                            currentNodeToDos.push({
                                pathArr : updatedPath,
                                obj : todo
                            });
                        }
                    });
                }
                for(var i =0; i < subNodeToDos.length; i++) {
                    currentNodeToDos.push(subNodeToDos[i])
                }
                for(var i =0; i < currentNodeToDos.length; i++) {
                    everyToDoInLevel.push(currentNodeToDos[i]);
                }
            });
        }
        return everyToDoInLevel;
    }
    render() {
        return (
            <div>
                {this.displayArchiveToDosOrNothing()}
            </div>
        )
    };
}
const mapStateToProps = (state) => {
    return {
        user : state.auth.user,
    }
};

export default connect(mapStateToProps)(Archived);