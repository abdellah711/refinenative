import React from "react";
import {
    // AutoSaveIndicatorProps, //todo use AutoSaveIndicatorProps from @refinedev/core
    useTranslate
} from "@refinedev/core";
import { Chip } from "react-native-paper";

export const AutoSaveIndicator: React.FC<any> = ({
    status,
}) => {
    const translate = useTranslate();
    let message = null;
    let icon = 'dots-horizontal'

    switch (status) {
        case "success":
            message = translate("autoSave.success", "saved");
            icon = 'check-circle-outline';
            break;
        case "error":
            message = translate("autoSave.error", "auto save failure");
            icon = 'exclamation';
            break;
        case "loading":
            message = translate("autoSave.loading", "saving...");
            icon = 'refresh';
            break;
        default:
            // for idle
            message = translate("autoSave.idle", "waiting for changes");
            break;
    }
    return (
        <Chip
            mode="outlined"
            icon={icon}
        >
            {message}
        </Chip>
    );
};