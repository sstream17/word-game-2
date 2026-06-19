<script lang="ts">
	import type { IChartData } from '$lib/types';

	interface IProps {
		data: IChartData;
		width: number;
		height: number;
	}

	const { data, width, height }: IProps = $props();

	const barWidth = $derived(width * 0.05);
	const maxValue = $derived(Math.max(...data.data));
	const maxHeight = $derived(height - height * 0.3);
</script>

<div class="chart-container">
	<svg {width} {height}>
		{#each data.labels as label, index}
			{@const x = (width / data.labels.length) * index + width / (2 * data.labels.length)}
			{@const barValue = data.data[index]}
			{@const barHeight = maxValue === 0 ? 0 : (barValue / maxValue) * maxHeight}
			<g>
				<text fill="var(--color-text)" {x} y={height} text-anchor="middle">
					{label}
				</text>
				<rect
					fill="var(--color-exact)"
					x={x - barWidth / 2}
					y={height - barHeight - height * 0.1}
					rx={barWidth / 2}
					height={barHeight}
					width={barWidth}
				/>
				{#if barValue !== 0}
					<text
						fill="var(--color-text)"
						{x}
						y={height - barHeight - height * 0.14}
						text-anchor="middle"
					>
						{barValue}
					</text>
				{/if}
			</g>
		{/each}
	</svg>
</div>

<style>
	.chart-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
