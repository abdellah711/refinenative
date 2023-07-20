import React from "react";
import {
    IResourceComponentsProps,
    useSelect,
} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from 'react-hook-form'
import { View } from "react-native";
import { Picker } from '@react-native-picker/picker'
import { TextInput, Button, Text, useTheme } from 'react-native-paper'
import { Create } from "@refinenative/react-native-paper";

export const BlogPostCreate: React.FC<IResourceComponentsProps> = () => {
    const theme = useTheme()
    const {
        refineCore: { onFinish, formLoading },
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { options: categoryOptions } = useSelect({
        resource: "categories",
    });

    return (
        <Create
            saveButtonProps={{ onPress: handleSubmit(onFinish) }}
            isLoading={formLoading}
        >
            <View>
                <Controller
                    control={control}
                    name="title"
                    rules={{
                        required: "This field is required"
                    }}
                    render={({ field: { onChange, onBlur, value, name } }) => (
                        <TextInput
                            mode="outlined"
                            label={name}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.title && <Text style={{ color: 'red' }}>{errors.title.message as string}</Text>}
            </View>
            <View>
                <Controller
                    control={control}
                    name="content"
                    rules={{
                        required: "This field is required"
                    }}
                    render={({ field: { onChange, onBlur, value, name } }) => (
                        <TextInput
                            mode="outlined"
                            label={name}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            multiline
                            numberOfLines={5}
                        />
                    )}
                />
                {errors.content && <Text style={{ color: 'red' }}>{errors.content.message as string}</Text>}

            </View>
            <View>
                <Controller
                    control={control}
                    name="category.id"
                    rules={{
                        required: "This field is required"
                    }}
                    render={({ field: { onChange, onBlur, value, name } }) => (
                        <View
                            style={{
                                alignSelf: 'stretch',
                                borderWidth: 1,
                                borderColor: theme.colors.secondary,
                                borderRadius: theme.roundness,
                                marginTop: 10,
                            }}>
                            <Picker
                                onBlur={onBlur}
                                placeholder={name}
                                onValueChange={onChange}
                                selectedValue={value}
                            >
                                {categoryOptions?.map((option) => (
                                    <Picker.Item label={option.label} value={option.value} key={option.value} />
                                ))}
                            </Picker>
                        </View>
                    )}
                />
                {(errors as any)?.category?.id && <Text style={{ color: 'red' }}>{(errors as any)?.category?.id?.message}</Text>}

            </View>
            <View>
                <Controller
                    control={control}
                    name="status"
                    rules={{
                        required: "This field is required"
                    }}
                    render={({ field: { onChange, onBlur, value, name } }) => (
                        <TextInput
                            mode="outlined"
                            label={name}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.status && <Text style={{ color: 'red' }}>{errors.status.message as string}</Text>}
            </View>
            <View>
                <Controller
                    control={control}
                    name="createdAt"
                    rules={{
                        required: "This field is required"
                    }}
                    render={({ field: { onChange, onBlur, value, name } }) => (
                        <TextInput
                            mode="outlined"
                            label={name}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />
                {errors.createdAt && <Text style={{ color: 'red' }}>{errors.createdAt.message as string}</Text>}
            </View>
        </Create>
    );
};

export default BlogPostCreate;