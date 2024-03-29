import type { Theme } from "$lib/types";

export function createThemeState(initial: Theme) {
    let theme = $state(initial);
    return {
        get theme() {
            return theme;
        },
        set theme(value) {
            theme = value;
        },
    };
}