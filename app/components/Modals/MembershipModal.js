/**
 * Created by Daniel on 3/22/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import ModalWrapper from './ModalWrapper';
import StripeCheckout from 'react-stripe-checkout';
import { takePayment } from '../../actions/auth';

export class MembershipModal extends React.Component {

    constructor(props) {
        super(props);
        this.onToken = this.onToken.bind(this);
    }

    onToken(token) {
        console.log('Paying with Stripe');
        console.log(this.props.user.email);
                console.log(token);
        this.props.dispatch(takePayment(token, this.props.user.email, this.props.token));
    }

    render() {
        return (
            <ModalWrapper {...this.props}
                          title="Upgrade Account"
                          width={400}
                          showOk={false}
            >
                    <div className="form-group">
                        <label htmlFor="node">Please Subscribe</label>
                        <p>You've reached the maximum limit of nodes allowed for a free account. Please consider upgradeing</p>
                        <p>Joining supports the developer in making a better product for you. And helps to cover server costs.</p>
                        <p>Upgrading to  a premium account costs &euro;10</p>
                        <h3>This is not a subsciption service and you will only have to pay once.</h3>
                        <p>Your current account can hold 10 nodes, but by upgradeing your account you may have up to 50 nodes and unlimited ToDos.</p>
                        <StripeCheckout
                            name="Bubblesortme Premium"
                            description="Upgrade Account" 
                          ComponentClass="div"
                          panelLabel="Please Support:" 
                          amount={1000} 
                          currency="EUR"
                          stripeKey="pk_test_wIpqpD4fOaxQVoW4lrGRmy7s"
                          token={this.onToken} />
                    </div>
            </ModalWrapper>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        user : state.auth.user,
        token: state.auth.token,
    };
};

export default connect(mapStateToProps)(MembershipModal);
