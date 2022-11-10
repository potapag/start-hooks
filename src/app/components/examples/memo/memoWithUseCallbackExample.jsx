import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

const LogOunButton = ({ onLogOut }) => {
    useEffect(() => {
        console.log("render button");
    });
    return (
        <button className="btn btn-primary" onClick={onLogOut}>
            LogOut
        </button>
    );
};
LogOunButton.propTypes = {
    onLogOut: PropTypes.func
};
function areEqual(prevState, nextState) {
    if (prevState.onLogOut !== nextState.onLogOut) {
        return false;
    }
    return true;
}

// const MemoizedLogOutButton = React.memo(LogOunButton);
// const MemoizedLogOutButton = React.memo(
//     LogOunButton,
//     (prevProps, nextProps) => {
//         if (prevProps === nextProps) return true;
//         return false;
//     }
// );
const MemoizedLogOutButton = React.memo(LogOunButton, areEqual);

const MemoWithUseCallbackExample = (props) => {
    const [state, setState] = useState(false);
    // const handleLogOut = () => {
    //     localStorage.removeItem("auth");
    // };
    const handleLogOut = useCallback(() => {
        localStorage.removeItem("auth");
    }, [props]);

    return (
        <>
            <button
                className="btn btn-primary"
                onClick={() => setState(!state)}
            >
                initiate rerender
            </button>
            {/* <LogOunButton onLogOut={handleLogOut} /> */}
            <MemoizedLogOutButton onLogOut={handleLogOut} />
        </>
    );
};

export default MemoWithUseCallbackExample;
