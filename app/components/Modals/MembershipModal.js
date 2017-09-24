/**
 * Created by Daniel on 3/22/2017.
 */
import React from 'react';
import { connect } from 'react-redux';
import ModalWrapper from './ModalWrapper';

export class MembershipModal extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ModalWrapper {...this.props}
                          title="Upgrade Account"
                          width={400}
                          showOk={false}
            >
                    <div className="form-group">
                        <label htmlFor="node">Please Join</label>
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
