import { View, ViewProps } from 'react-native'
import React from "react";
import {
    LoginFormTypes,
    useTranslate,
    BaseRecord,
    HttpError,
    useActiveAuthProvider,
    useGo,
    useRegister,
    RegisterPageProps,
    RegisterFormTypes,
} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller, FormProvider } from "react-hook-form";

import { FormPropsType } from "../..";

import {
    Button,
    Divider,
    Surface,
    Text,
    TextInput,
    Checkbox,
    useTheme,
    TouchableRipple,
} from 'react-native-paper';
import { styles } from '../styles';

type RegisterProps = RegisterPageProps<
    ViewProps,
    ViewProps,
    FormPropsType<RegisterFormTypes>
>;

export const RegisterPage: React.FC<RegisterProps> = ({
    providers,
    loginLink,
    wrapperProps,
    contentProps,
    renderContent,
    formProps,
    title,
}) => {
    const { onSubmit, ...useFormProps } = formProps || {};

    const authProvider = useActiveAuthProvider();
    const { mutate: register } = useRegister({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });


    const translate = useTranslate();
    const theme = useTheme()
    const go = useGo();

    const methods = useForm<BaseRecord, HttpError, LoginFormTypes>({
        ...useFormProps,
    });
    const {
        handleSubmit,
        formState: { errors },
        control,
    } = methods;

    const renderProviders = () => {
        if (providers && providers.length > 0) {
            return (
                <>
                    <View>
                        {providers.map((provider) => (
                            <Button
                                key={provider.name}
                                mode="outlined"
                                style={{ alignSelf: 'stretch' }}
                                icon={() => provider?.icon}
                                onPress={() =>
                                    register({
                                        providerName: provider.name,
                                    })
                                }
                            >
                                {provider.label ?? (
                                    <label>{provider.label}</label>
                                )}
                            </Button>
                        ))}
                    </View>
                    <Divider style={{ marginVertical: 5 }} />
                </>
            );
        }
        return null;
    };

    const PageTitle =
        title === false ? null : (
            <View
                style={{
                    display: "flex",
                    justifyContent: "center",

                }}
            >
                {title}
                {/* todo: add default title component */}
            </View>
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
                {translate("pages.register.title", "Sign up for your account")}
            </Text>
            {renderProviders()}
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

            <Controller
                name="password"
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <TextInput
                        label={translate("pages.register.fields.password", "Password")}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        error={error !== undefined}
                        secureTextEntry
                    />
                )}
            />
            {errors.password && <Text style={{ color: theme.colors.error }}>{errors.password.message}</Text>}

            <Button
                mode="contained"
                style={{ alignSelf: 'stretch' }}
                onPress={handleSubmit((data) => {
                    if (onSubmit) {
                        return onSubmit(data);
                    }
                    return register(data);
                })}>
                {translate("pages.register.buttons.submit", "Sign up")}
            </Button>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                margin: 6,
            }}>
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
            </View>
        </Surface>
    );

    return (
        <FormProvider {...methods}>
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
        </FormProvider>
    );
};