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
	onKeyPress: () => void;
}