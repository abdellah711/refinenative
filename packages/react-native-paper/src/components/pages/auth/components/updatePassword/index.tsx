import React from "react";
import {
    useTranslate,
    useUpdatePassword,
    UpdatePasswordFormTypes,
    UpdatePasswordPageProps,
    BaseRecord,
    HttpError,
    useActiveAuthProvider,
} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import { styles } from "../styles";
import { FormPropsType } from "../..";
import { View, ViewProps } from "react-native";
import {
    Surface,
    Text,
    Button,
    useTheme,
    TextInput,
} from "react-native-paper";
import { Controller } from "react-hook-form";

type UpdatePasswordProps = UpdatePasswordPageProps<
    ViewProps,
    ViewProps,
    FormPropsType<UpdatePasswordFormTypes>
>;

export const UpdatePasswordPage: React.FC<UpdatePasswordProps> = ({
    wrapperProps,
    contentProps,
    renderContent,
    formProps,
    title,
}) => {
    const { onSubmit, ...useFormProps } = formProps || {};
    const translate = useTranslate();
    const authProvider = useActiveAuthProvider();
    const { mutate } = useUpdatePassword<UpdatePasswordFormTypes>({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });
    const {
        control,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<BaseRecord, HttpError, UpdatePasswordFormTypes>({
        ...useFormProps,
    });

    const theme = useTheme();

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
                {translate("pages.updatePassword.title", "Set New Password")}
            </Text>

            <Controller
                name="password"
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <TextInput
                        label={translate(
                            "pages.updatePassword.fields.password",
                            "New Password",
                        )}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        error={error !== undefined}
                        secureTextEntry
                    />
                )}
            />
            {errors.password && <Text style={{ color: theme.colors.error }}>{errors.password.message}</Text>}

            <Controller
                name="confirmPassword"
                control={control}
                rules={{
                    required: true,
                    validate: (val: any) => {
                        if (watch("password") != val) {
                            return translate(
                                "pages.updatePassword.errors.confirmPasswordNotMatch",
                                "Passwords do not match",
                            );
                        }
                        return;
                    },
                }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                    <TextInput
                        label={translate(
                            "pages.updatePassword.fields.confirmPassword",
                            "Confirm New Password",
                        )}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        error={error !== undefined}
                        secureTextEntry
                    />
                )}
            />
            {errors.confirmPassword && <Text style={{ color: theme.colors.error }}>{errors.confirmPassword.message}</Text>}

            <Button
                mode="contained"
                style={{
                    alignSelf: 'stretch',
                    marginTop: 10,
                }}
                onPress={handleSubmit((data) => {
                    if (onSubmit) {
                        return onSubmit(data);
                    }
                    return mutate(data);
                })}>
                {translate("pages.updatePassword.buttons.submit", "Update")}
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