<script>
	import IoIosArrowForward from 'svelte-icons/io/IoIosArrowForward.svelte';
	import IoIosArrowBack from 'svelte-icons/io/IoIosArrowBack.svelte';
	export let IconOn = IoIosArrowForward;
	export let IconOff = IoIosArrowBack;
	export let value = true;
	export let toggle = () => {
		value = !value;
	};
	let toggleWrap = () => {
		if (!disabled) {
			toggle();
		}
	};
	export let disabled;
</script>

<div on:click={toggleWrap} class:disabled>
	{#if value}
		<svelte:component this={IconOn} />
	{:else}
		<svelte:component this={IconOff} />
	{/if}
</div>

<style>
	div {
		cursor: pointer;
		height: 1em;
		width: 1em;
		min-width: 1em;
		padding: 0.0625em 0.125em 0.1875em;
		border-radius: 50%;
		transition: background 0.5s;
	}
	div:hover {
		background: #00000040;
	}
	div.disabled {
		cursor: default;
		color: #aaa;
		background: none;
	}
</style>
