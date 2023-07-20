> this project is still in development, and not ready for production use yet.

<br/>
<br/>
<br/>

<div align="center" style="margin: 30px;">
<a href="https://refine.dev/">
  <img src="./logo.png"   style="width:350px;" align="center" />
</a>
<br />
<br />


<br />

<strong>Build web and native crud apps 3x faster by leveraging the power of React Native and [Refine](https://refine.dev/).</strong><br>An open-source React native framework developed to make cross-platform development easier.
<br />
<br />
</div>


## How to use
Start by creating a new expo project using the expo-cli, and add expo-router to your project, you can follow the [official documentation](https://expo.github.io/router/docs/) for more details.

After that, install the following packages:

```sh
yarn add @refinenative/expo-router @refinenative/react-native-paper @refinedev/simple-rest @refinedev/core
```

Then, inside your _layout.tsx_ file, add the following code:

```tsx
import { Refine } from '@refinedev/core'
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { DrawerLayout } from '@refinenative/expo-router'
import { DrawerContent, ReactNavigationThemeProvider, Header } from '@refinenative/react-native-paper';

export default function layout() {
    return (
        <Refine
            routerProvider={routerProvider}
            options={{
                reactQuery: {
                    devtoolConfig: Platform.OS === "web" ? undefined : false,
                },
                disableTelemetry: true
            }}
            dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
            resources={[
                {
                    name: "blog_posts",
                    list: "/blog-posts",
                    show: "/blog-posts/show/:id",
                    create: "/blog-posts/create",
                    edit: "/blog-posts/edit/:id",
                    meta: {
                        canDelete: true,
                        icon: 'calendar'
                    }
                },
            ]}
        >
            <ReactNavigationThemeProvider>
                <DrawerLayout
                    DrawerContent={() => <DrawerContent />}
                    Header={Header}
                />
            </ReactNavigationThemeProvider>
        </Refine>
    )
}
```

Now you can start using the features of Refine just like you would do in a web project.

## TODO
<input type="checkbox"> Write unit tests
<br/>
<input type="checkbox"> Automate the build & release process
<br/>
<input type="checkbox"> Add more examples
<br/>
<input type="checkbox"> Write documentation
<br/>
<input type="checkbox"> Add more features to @refinenative/react-native-paper
<br/>
<input type="checkbox"> Support react-navigation and other navigation libraries
<br/>
<input type="checkbox"> Build an inferencer for react-native-paper
<input type="checkbox"> Support other UI libraries like react-native-elements

## Contribution
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.








## License

Licensed under the MIT License
