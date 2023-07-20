import { View } from 'react-native'
import React from 'react'
import { Show } from '@refinenative/react-native-paper'
import { useOne } from '@refinedev/core'
import { Text } from 'react-native-paper'

const ShowPage = () => {

    const { data, isLoading } = useOne({ id: 1, resource: 'blog_posts' })
    const { data: catergory } = useOne({ id: data?.data?.category?.id, resource: 'categories' })


    return (
        <Show isLoading={isLoading}>
            <Text variant='labelLarge' style={{marginTop: 12, marginBottom: 3}}>Title</Text>
            <Text variant='titleMedium'>{data?.data?.title}</Text>
            <Text variant='labelLarge' style={{marginTop: 12, marginBottom: 3}}>categorie: </Text>
            <Text variant='titleMedium'>{catergory?.data?.title}</Text>
            <Text variant='labelLarge' style={{marginTop: 12, marginBottom: 3}}>body: </Text>
            <Text variant='titleMedium'>{data?.data?.content}</Text>
            <Text variant='labelLarge' style={{marginTop: 12, marginBottom: 3}}>created At: </Text>
            <Text variant='titleMedium'>{data?.data?.createdAt}</Text>
        </Show>
    )
}

export default ShowPage