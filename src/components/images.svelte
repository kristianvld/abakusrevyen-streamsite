<script>
	export let imgs;
	export let title;
	import ToggleCard from './toggleCard.svelte';
</script>

<ToggleCard {title}>
	<div>
		{#each imgs as img}
			<img src={img.src} alt={img.alt} />
		{/each}
	</div>
</ToggleCard>

<style>
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	img {
		margin: 2.5em 5em;
		border: solid white 2px;
	}
</style>
