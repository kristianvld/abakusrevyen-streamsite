<script>
	import Toggle from './toggle.svelte';

	import IoIosArrowUp from 'svelte-icons/io/IoIosArrowUp.svelte';
	import IoIosArrowDown from 'svelte-icons/io/IoIosArrowDown.svelte';

	export let show = false;
	export let title;
</script>

<div class="card">
	<h1 class:line={show}>{title}</h1>
	<div class="right">
		<Toggle bind:value={show} IconOn={IoIosArrowDown} IconOff={IoIosArrowUp} />
	</div>
	{#if show}
		<slot />
	{/if}
</div>

<style>
	.card {
		background-color: #00000060;
		margin: 0.5em;
	}
	h1 {
		text-align: center;
		padding: 0;
		margin: 0.5em;
	}
	.line:after {
		content: '';
		display: block;
		margin-top: 0.25em;
		width: 100%;
		height: 2px;
		background-color: #ffffff40;
	}

	.right {
		position: absolute;
		right: 0.5em;
		top: 0.5em;
		font-size: 2em;
	}

	@media (max-width: 600px) {
		h1,
		.right {
			font-size: 1.5em;
		}
	}

	.card {
		position: relative;
	}
</style>
