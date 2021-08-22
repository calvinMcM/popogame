import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { PGame } from './components/PGame';

Promise.resolve()
    .then(
        () => {
            ReactDOM.render(
                <PGame />,
                document.getElementById('reactive')
            )
        }
    ).catch(
        (error) => {
            console.error(error)
        }
    )

