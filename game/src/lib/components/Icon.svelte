<script lang="ts">
	interface IProps {
		path: string;
	}

	const { path }: IProps = $props();
</script>

<svg height="24" viewBox="0 -960 960 960" width="24">
	<use xlink:href={path} />
</svg>

<style>
	svg {
		pointer-events: none;
		fill: var(--color-text);
	}
</style>
