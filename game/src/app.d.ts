// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

declare const APP_VERSION: string;

/**
 * Interface for mobile interactions
 */
declare const MobileGame: {
	/**
	 * A function to call when a key on the keyboard is pressed.
	 */
	onKeyPress: () => void;
	/**
	 * A function to call when the dark theme is set.
	 */
	onDarkThemeSet: () => void;
	/**
	 * A function to call when the light theme is set.
	 */
	onLightThemeSet: () => void;
	/**
	 * A function to call when the system theme is set.
	 */
	onSystemThemeSet: () => void;
}