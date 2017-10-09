/**
 * Created by Daniel on 13/08/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import { IndexLink, Link } from 'react-router';

export class LandingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row nopadding" id="row1">
                <div className="col-md-12 nopadding firstRowContent">
                    <Link className = 'gradientBtn logInHeader' to="/signup" id="">Sign Up</Link>
                    <div className="verticalCenterHeader">
                        <div className="headerContentCenter">
                            <h2 className="headerMainTxt">A simplistic mind map tool.</h2>
                        </div>
                        <div className="macbookImg"></div>
                        </div>
                </div>
                <div className="row nopadding" id="row2">
                    <div className="col-md-12 nopadding">
                        <h3 className="rowSubheading">Fast and Responsive Visualisations.</h3>

                    
                        <div className="col-md-12 goalVideoContainer">
                            <div className="goalVideoImg"></div>
                        </div>
                        <div className="col-md-12 nopadding">
                        <div className="col-md-6 nopadding">

                        <h2 className = "rowText posLeftText">Why Mindmap?</h2>
                        <p className = "rowText posLeftText">
                            A Persons brain processes visual information far quicker than it does text which makes Mind Maps a great tool. As a result of organising information visually it’s simple to understand tricky concepts and engage more with the ideas that you’ve been thinking about. You can visually represent the links between concepts, you can plan your ideas more easily - share them or explore concepts in greater depth.
                        </p>
                        </div>
                        <div className="col-md-6 nopadding">
                        <h2 className = "rowText posRightText">Why Bubblesortme?</h2>
                        <p className = "rowText posRightText">
                            Bubblesortme is simple tool and its power stems directly from its simplicity. Using this tool you may quickly and easily structure out their ideas in to separate and branching trees. Mind mapping helps you to plan and to feel like you’ve conceptualise every aspect needed. Because you can visually see it – the order, the hierarchy and the overlap. It’s all there on one page, in this visual network and it’s beautiful. They can clarify just about anything.
                        </p>
                        </div>
                        </div>

                    </div>
                </div>
                <div className="row nopadding">
                    <div className="col-md-12 nopadding signUpImgBG">
                        <h3 className="rowSubheading signUpSubTxt" id="row5">Sign up now</h3>
                        <p className="rowText rowTxtSignUp" id="row5" >Bubblesortme is still in its Beta stage. Sign up to be one of the first to use Bubblesortme.</p>
                        <Link to='/signup' className="bottomSignInButton" id="row5" >SIGN UP</Link>
                    </div>
                </div>
        </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(LandingPage);
