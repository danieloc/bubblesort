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
                            <h2 className="headerMainTxt">Get planning done.</h2>
                        </div>
                        <div className="macbookImg"></div>
                        </div>
                </div>
                <div className="row nopadding" id="row2">
                    <div className="col-md-12 nopadding">
                        <h3 className="rowSubheading">A goal without a plan is just a wish.</h3>
                        <p className="rowText">Brainstorming could help you accomplish anything. Set goals and get things done.</p>
                        <div className="goalVideoContainer">
                            <div className="goalVideoImg"></div>
                        </div>
                    </div>
                </div>
                <div className="row nopadding">
                    <div className="col-md-12 nopadding signUpImgBG">
                        <h3 className="rowSubheading signUpSubTxt" id="row5">Sign up now</h3>
                        <p className="rowText rowTxtSignUp" id="row5" >Sign up to be one of the first to use Bubblesortme.</p>
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
