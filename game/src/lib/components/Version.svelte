<script lang="ts">
	const version = APP_VERSION;
</script>

<div class="version-info">
	<span>v{version}</span>
</div>

<style>
	.version-info {
		position: fixed;
		pointer-events: none;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		bottom: 0;
		right: 2px;
		width: 100%;
	}

	.version-info span {
		background-color: var(--color-bg-1);
	}
</style>
