import React from "react";
import CardWrapper from "../../common/Card";
import TextField from "../../common/form/textField";

import SmallTitle from "../../common/typografy/smallTitle";
const CloneElementExample = () => {
    const field = <TextField label="email" name="email" />;
    const handleChenge = (target) => {
        console.log("chenge: ", target);
    };
    return (
        <CardWrapper>
            <SmallTitle>Пример</SmallTitle>
            {field}
            {React.cloneElement(field, {
                onChange: handleChenge,
                label: "Clone email"
            })}
        </CardWrapper>
    );
};

export default CloneElementExample;
