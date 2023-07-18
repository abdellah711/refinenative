import React from "react";
import {
    useTranslate,
    useForgotPassword,
    ForgotPasswordFormTypes,
    ForgotPasswordPageProps,
    BaseRecord,
    HttpError,
    useGo,
} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import { styles } from "../styles";
import { FormPropsType } from "../..";
import { View, ViewProps } from "react-native";
import {
    Surface,
    TouchableRipple,
    Text,
    useTheme,
    Button,
    TextInput,
} from "react-native-paper";
import { Controller } from "react-hook-form";

type ForgotPasswordProps = ForgotPasswordPageProps<
    ViewProps,
    ViewProps,
    FormPropsType<ForgotPasswordFormTypes>
>;

export const ForgotPasswordPage: React.FC<ForgotPasswordProps> = ({
    loginLink,
    wrapperProps,
    contentProps,
    renderContent,
    formProps,
    title,
}) => {
    const { onSubmit, ...useFormProps } = formProps || {};
    const { mutate } = useForgotPassword<ForgotPasswordFormTypes>();
    const translate = useTranslate();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<BaseRecord, HttpError, ForgotPasswordFormTypes>({
        ...useFormProps,
    });

    const theme = useTheme();
    const go = useGo();

    const PageTitle =
        title === false ? null : (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "32px",
                    fontSize: "20px",
                }}
            >
                {title}
                {/* todo: add default title */}
            </div>
        );

    const content = (
        <Surface
            style={styles.card}
            {...contentProps}
        >
            <Text
                variant='headlineSmall'
                style={{
                    textAlign: 'center',
                    color: theme.colors.primary,
                    marginBottom: 10,
                }}
            >
                {translate(
                    "pages.forgotPassword.title",
                    "Forgot your password?",
                )}
            </Text>

            <Controller
                name="email"
                control={control}
                rules={{
                    required: true,
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: translate(
                            "pages.register.errors.validEmail",
                            "Invalid email address",
                        ),
                    },
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <TextInput
                        label={translate("pages.register.fields.email", "Email")}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        error={error !== undefined}
                        keyboardType="email-address"
                    />
                )}
            />
            {errors.email && <Text style={{ color: theme.colors.error }}>{errors.email.message}</Text>}


            {loginLink ?? (
                <Text>
                    {translate(
                        "pages.login.buttons.haveAccount",
                        "Have an account?",
                    )}
                    <TouchableRipple
                        onPress={() => go({ to: '/login' })}
                        style={{
                            marginStart: 3,
                        }}
                    >
                        <Text
                            style={{
                                color: theme.colors.primary,
                            }}
                        >
                            {translate("pages.login.signin", "Sign in")}
                        </Text>
                    </TouchableRipple>
                </Text>
            )}

            <Button
                mode="contained"
                style={{ alignSelf: 'stretch' }}
                onPress={handleSubmit((data) => {
                    if (onSubmit) {
                        return onSubmit(data);
                    }
                    return mutate(data);
                })}>
                {translate(
                    "pages.forgotPassword.buttons.submit",
                    "Send reset instructions",
                )}
            </Button>
        </Surface>
    );

    return (
        <View
            style={styles.layout}
            {...wrapperProps}>
            {renderContent ? (
                renderContent(content, PageTitle)
            ) : (
                <>
                    {PageTitle}
                    {content}
                </>
            )}
        </View>
    );
};