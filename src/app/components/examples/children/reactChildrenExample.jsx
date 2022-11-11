import React, { useEffect, useState } from "react";
import CardWrapper from "../../common/Card";
import SmallTitle from "../../common/typografy/smallTitle";
import Divider from "../../common/divider";
import TextField from "../../common/form/textField";
import PropTypes from "prop-types";

const FormComponent = ({ children }) => {
    const [data, setData] = useState({});
    useEffect(() => {
        console.log(data);
    }, [data]);
    const hendelCenge = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    return React.Children.map(children, (child) => {
        const config = {
            ...child.props,
            onChange: hendelCenge,
            value: data[child.props.name] || ""
        };
        return React.cloneElement(child, config);
    });
};
FormComponent.propTypes = {
    cheldren: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

const ReactChildrenExample = () => {
    return (
        <CardWrapper>
            <SmallTitle>Clone form and add props</SmallTitle>
            <Divider />
            <FormComponent>
                <TextField label="email" name="email" />
                <TextField label="Пароль" name="password" type="password" />
            </FormComponent>
        </CardWrapper>
    );
};

export default ReactChildrenExample;
