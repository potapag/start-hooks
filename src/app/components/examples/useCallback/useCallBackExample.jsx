import React, { useEffect, useState, useRef, useCallback } from "react";
import CardWrapper from "../../common/Card";
import SmallTitle from "../../common/typografy/smallTitle";

const UseCallBackExample = () => {
    const [data, setData] = useState({});
    const withOutCollback = useRef(0);
    const withCollback = useRef(0);

    function hendelChange({ target }) {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    }

    // WithOut Callback
    const validateWithOutCallback = (data) => {
        console.log(data);
    };
    useEffect(() => {
        withOutCollback.current++;
    }, [validateWithOutCallback]);

    // With Callback
    const validateWithCallback = useCallback((data) => {
        console.log(data);
    }, []);
    useEffect(() => {
        withCollback.current++;
    }, [validateWithCallback]);

    useEffect(() => {
        validateWithOutCallback(data);
        validateWithCallback(data);
    }, [data]);

    return (
        <CardWrapper>
            <SmallTitle>Example</SmallTitle>
            <p>Render withOutCollback: {withOutCollback.current}</p>
            <p>Render withCollback: {withCollback.current}</p>

            <label htmlFor="email" className="form-label">
                Email
            </label>
            <input
                type="email"
                className="form-control mb-2"
                id="email"
                name="email"
                value={data.email || ""}
                onChange={hendelChange}
            />
        </CardWrapper>
    );
};

export default UseCallBackExample;
