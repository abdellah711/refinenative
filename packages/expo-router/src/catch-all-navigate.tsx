import React, { useCallback, useEffect } from "react";
import { useRouter, usePathname, useSearchParams, useLocalSearchParams, useFocusEffect } from "expo-router";
import { stringify } from "qs";
import { stringifyConfig } from "./bindings";

/**
 * A component that will navigate to the given path with `to` query parameter included with the current location.
 */
export const CatchAllNavigate: React.FC<{ to: string }> = ({ to }) => {
    const { push, } = useRouter();
    const pathname = usePathname();

    const { params } = useSearchParams?.() ?? useLocalSearchParams?.();

    const queryValue = `${pathname}${stringify(params, stringifyConfig)}`;

    const query =
        queryValue.length > 1 ? `?to=${encodeURIComponent(queryValue)}` : "";

    useFocusEffect(useCallback(() => {
        push(`${to}${query}`);
    }, [query]));

    return <></>;
};