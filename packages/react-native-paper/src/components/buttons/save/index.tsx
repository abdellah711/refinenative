import React from "react";
import { SaveButtonProps } from "../types";
import { useTranslate } from "@refinedev/core";
import { Button, ButtonProps, FAB, FABProps } from "react-native-paper";

export const SaveButton: React.FC<SaveButtonProps> = ({
    hideText = false,
    children,
    asFAB = false,
    ...rest
}) => {
    const translate = useTranslate();

    const text = !hideText &&  (children ?? translate("buttons.save", "Save"));

    return asFAB ? (
        <FAB
            label={typeof text === 'string' ? text : undefined}
            icon="content-save-outline"
            mode="elevated"
            style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
            {...rest as FABProps}
        />
    ) : (
        <Button
            icon="content-save-outline"
            mode="contained"
            {...rest as ButtonProps}
        >{text}</Button>
    )
};