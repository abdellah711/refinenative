import { RouterBindings, GoConfig, ResourceContext, matchResourceFromRoute, ParseResponse } from '@refinedev/core'
import { Link, usePathname, useRouter, useSearchParams, useNavigation } from 'expo-router'
import React, { ComponentProps, forwardRef, useCallback, useContext, useMemo } from 'react'
import { stringify } from 'qs'
import { convertToNumberIfPossible } from './convert-to-number-if-possible';


export const stringifyConfig = {
    addQueryPrefix: true,
    skipNulls: true,
    arrayFormat: "indices" as const,
    encode: false,
    encodeValuesOnly: true,
};

export const routerBindings: RouterBindings = {
    go: () => {
        const { push, replace } = useRouter()
        const pathname = usePathname()
        const searchParams = useSearchParams()

        const fn = useCallback(({
            to,
            type,
            options: { keepQuery } = {},
            query,
        }: GoConfig) => {

            const urlQuery = {
                ...(keepQuery ? searchParams : {}),
                ...query
            }

            if (urlQuery.to) {
                urlQuery.to = encodeURIComponent(`${urlQuery.to}`);
            }

            const urlTo = to ?? pathname

            const hasUrlQuery = Object.keys(urlQuery).length > 0;

            const fullPath = `${urlTo}${hasUrlQuery ? stringify(urlQuery, stringifyConfig) : ''}`

            if (type === 'path') {
                return fullPath
            }

            if (type === 'replace') {
                return push(urlTo)
            }

            push(urlTo)

        }, [push, replace, pathname, searchParams])
        return fn
    },
    back: () => {
        const { goBack } = useNavigation()
        return goBack
    },
    parse: () => {
        const pathname = usePathname();
        const searchParamsObj = useSearchParams();
        const { resources } = useContext(ResourceContext);

        const { resource, action, matchedRoute } = useMemo(() => {
            return matchResourceFromRoute(pathname, resources);
        }, [pathname, resources]);

        const fn = useCallback(() => {
            const response: ParseResponse = {
                pathname,
                action,
                resource,
                params: {
                    ...searchParamsObj,
                    current: convertToNumberIfPossible(
                        searchParamsObj.current as string,
                    ) as number | undefined,
                    pageSize: convertToNumberIfPossible(
                        searchParamsObj.pageSize as string,
                    ) as number | undefined,
                    to: searchParamsObj.to
                        ? decodeURIComponent(searchParamsObj.to as string)
                        : undefined,
                },
                id: searchParamsObj?.id as string
            }

            return response
        }, [resource, searchParamsObj, action, pathname])

        return fn
    },
    Link: forwardRef<
        any,
        ComponentProps<NonNullable<RouterBindings["Link"]>>
    >(function RefineLink({ to, ...props }, ref) {
        return <Link href={to} {...props} ref={ref} />;
    }),

}