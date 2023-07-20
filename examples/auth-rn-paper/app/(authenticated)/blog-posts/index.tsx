import React from 'react'
import { FlatList, View } from 'react-native'
import { DeleteButton, EditButton, List, ShowButton } from '@refinenative/react-native-paper'
import { useList, useMany } from '@refinedev/core'
import { ActivityIndicator, Surface, Text } from 'react-native-paper';

const truncate = (str: string, n: number) => {
  return (str.length > n) ? str.substring(0, n - 1) + '...' : str;
}

const Index = () => {
  const { data, isLoading } = useList({ resource: 'blog_posts' })
  const { data: catergories } = useMany({ resource: 'categories', ids: data?.data.map((item) => item.category.id) ?? [] })

  return (
    <List
      canCreate
      resource='blog_posts'
    >
      {isLoading ? (<ActivityIndicator />) : (
        <FlatList
          data={data?.data}
          renderItem={({ item }) => (
            <Surface style={{ padding: 12, borderRadius: 9, gap: 5 }}>
              <Text variant='titleLarge'>{item.title}</Text>
              <Text variant='bodyMedium'><Text variant='labelLarge'>categorie: </Text>{catergories?.data.find(({ id }) => id === item.category?.id)?.title}</Text>
              <Text variant='bodyMedium'><Text variant='labelLarge'>body: </Text>{truncate(item.content, 200)}</Text>
              <Text variant='labelMedium'><Text variant='labelLarge'>created At: </Text>{item.createdAt}</Text>
              <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                <ShowButton recordItemId={item.id} hideText />
                <EditButton recordItemId={item.id} hideText />
                <DeleteButton recordItemId={item.id} hideText />
              </View>
            </Surface>)
          }
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      )}
    </List>
  )
}

export default Index