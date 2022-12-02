import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { validator } from "../../../utils/validator";
const FormComponent = ({
    children,
    validatorConfig,
    onSubmit,
    defaultData
}) => {
    const [data, setData] = useState(defaultData || {});

    const [errors, setErrors] = useState({});

    const handleChange = useCallback((target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    }, []);
    const validate = useCallback(
        (data) => {
            const errors = validator(data, validatorConfig);
            setErrors(errors);
            return Object.keys(errors).length === 0;
        },
        [validatorConfig, setErrors]
    );

    const handleSudmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        // console.log(data);
    };
    useEffect(() => {
        if (Object.keys(data).length > 0) {
            validate(data);
        }
    }, [data]);
    const hendleKeyDown = useCallback((event) => {
        // console.log(event);
        if (event.keyCode === 13) {
            event.preventDefault();
            const form = event.target.form;
            // console.log(event.target.form);
            const indexField = Array.prototype.indexOf.call(form, event.target);
            // console.log(indexField);
            form.elements[indexField + 1].focus();
        }
    }, []);

    const isValid = Object.keys(errors).length === 0;

    const clonedElements = React.Children.map(children, (child) => {
        const childType = typeof child.type;
        let config = {};

        if (childType === "object") {
            if (!child.props.name) {
                throw new Error(
                    "Name property is required for field components",
                    child
                );
            }
            config = {
                ...child.prosp,
                onChange: handleChange,
                value: data[child.props.name] || "",
                error: errors[child.props.name],
                onKeyDown: hendleKeyDown
            };
        }
        if (childType === "string") {
            if (child.type === "button") {
                if (
                    child.props.type === "submit" ||
                    child.props.type === undefined
                ) {
                    config = { ...child.props, disabled: !isValid };
                }
            }
        }
        // console.log(child);
        return React.cloneElement(child, config);
    });
    return <form onSubmit={handleSudmit}>{clonedElements}</form>;
};
FormComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    onSubmit: PropTypes.func,
    validatorConfig: PropTypes.object,
    defaultData: PropTypes.object
};

export default FormComponent;
