<script lang="ts">
	const version = APP_VERSION;
</script>

<div class="version-info">
	<span>v{version}</span>
</div>

<style>
	.version-info {
		display: flex;
		flex-direction: row;
		position: fixed;
		justify-content: flex-end;
		bottom: 0;
		width: 100%;
	}

	.version-info span {
		background-color: var(--color-bg-1);
	}
</style>
