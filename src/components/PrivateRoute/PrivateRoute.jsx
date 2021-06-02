import React from 'react'
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ children, isActive, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isActive ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute