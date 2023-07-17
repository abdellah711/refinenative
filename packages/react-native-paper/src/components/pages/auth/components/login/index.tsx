import { View, ViewProps } from 'react-native'
import React from "react";
import {
    LoginPageProps,
    LoginFormTypes,
    useLogin,
    useTranslate,
    BaseRecord,
    HttpError,
    useActiveAuthProvider,
    useGo,
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

type LoginProps = LoginPageProps<
    ViewProps,
    ViewProps,
    FormPropsType<LoginFormTypes>
>;

export const LoginPage: React.FC<LoginProps> = ({
    providers,
    registerLink,
    forgotPasswordLink,
    rememberMe,
    contentProps,
    wrapperProps,
    renderContent,
    formProps,
    title,
}) => {
    const { onSubmit, ...useFormProps } = formProps || {};

    const authProvider = useActiveAuthProvider();
    const { mutate: login } = useLogin<LoginFormTypes>({
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
                                    login({
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
                {translate("pages.login.title", "Sign in to your account")}
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
                            "pages.login.errors.validEmail",
                            "Invalid email address",
                        ),
                    },
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <TextInput
                        label={translate("pages.login.fields.email", "Email")}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        error={error !== undefined}
                        keyboardType="email-address"
                    />
                )}
            />
            {errors.email && <Text style={{color: theme.colors.error}}>{errors.email.message}</Text>}

            <Controller
                name="password"
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <TextInput
                        label={translate("pages.login.fields.password", "Password")}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        error={error !== undefined}
                        secureTextEntry
                    />
                )}
            />
            {errors.password && <Text style={{color: theme.colors.error}}>{errors.password.message}</Text>}

            {rememberMe ?? (
                <Controller
                    name="remember"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Checkbox.Item
                            status={value ? 'checked' : 'unchecked'}
                            position="leading"
                            labelStyle={{ textAlign: 'left' }}
                            style={{ paddingHorizontal: 0 }}
                            onPress={() => onChange(!value)}
                            label={translate(
                                "pages.login.buttons.rememberMe",
                                "Remember me"
                            )}
                        />
                    )}
                />
            )}

            <Button
                mode="contained"
                style={{ alignSelf: 'stretch' }}
                onPress={handleSubmit((data) => {
                    if (onSubmit) {
                        return onSubmit(data);
                    }
                    return login(data);
                })}>
                {translate("pages.login.signin", "Sign in")}
            </Button>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 6,
                flexWrap: 'wrap',
                gap: 10,
            }}>
                {forgotPasswordLink ?? (
                    <TouchableRipple
                        onPress={() => go({ to: '/forgot-password' })}
                    >
                        <Text
                            style={{ color: theme.colors.primary }}
                        >
                            {translate(
                                "pages.login.buttons.forgotPassword",
                                "Forgot password?",
                            )}
                        </Text>
                    </TouchableRipple>
                )}
                {registerLink ?? (
                    <Text>
                        {translate(
                            "pages.login.buttons.noAccount",
                            "Don’t have an account?",
                        )}
                        <TouchableRipple
                            onPress={() => go({ to: '/register' })}
                            style={{
                                marginStart: 3,
                            }}
                        >
                            <Text
                                style={{
                                    color: theme.colors.primary,
                                }}
                            >
                                {translate(
                                    "pages.login.register",
                                    "Sign up",
                                )}
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