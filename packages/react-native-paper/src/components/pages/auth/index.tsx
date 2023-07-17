import React from "react";
import { AuthPageProps } from "@refinedev/core";

import {
    LoginPage,
    // RegisterPage,
    // ForgotPasswordPage,
    // UpdatePasswordPage,
} from "./components";

import { UseFormProps } from "@refinedev/react-hook-form";
import { ViewProps } from "react-native";

export interface FormPropsType<TFormType> extends UseFormProps {
    onSubmit?: (values: TFormType) => void;
}

export type AuthProps = AuthPageProps<ViewProps, ViewProps, ViewProps> & {
    renderContent?: (
        content: React.ReactNode,
        title: React.ReactNode,
    ) => React.ReactNode;
    title?: React.ReactNode;
};

export const AuthPage: React.FC<any> = (props) => {
    const { type } = props;
    const renderView = () => {
        switch (type) {
            case "register":
                // return <RegisterPage {...props} />;
            case "forgotPassword":
                // return <ForgotPasswordPage {...props} />;
            case "updatePassword":
                // return <UpdatePasswordPage {...props} />;
            default:
                return <LoginPage {...props} />;
        }
    };

    return <>{renderView()}</>;
};