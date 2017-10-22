/**
 * Created by Daniel on 12/03/2017.
 */

import React from 'react';
import ModalWrapper from './ModalWrapper';

export class LimitReached extends React.Component {
    render() {
        return(
            <ModalWrapper title="Node Limit Reached"
                          width={400}
                          showOk={false}
            >
                <p>
                    We're very sorry, but it seems like you have reached the limit that we allow for nodes.
                    Please consider deleting some of your nodes.
                    FYI: Unlimited "ToDos" can be added to each node using the nodes page.
                </p>
            </ModalWrapper>
        );
    }
}

export default LimitReached;