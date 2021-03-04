<script>
	import IoIosArrowForward from 'svelte-icons/io/IoIosArrowForward.svelte';
	import IoIosArrowBack from 'svelte-icons/io/IoIosArrowBack.svelte';
	export let IconOn = IoIosArrowForward;
	export let IconOff = IoIosArrowBack;
	export let value = true;
	export let toggle = () => {
		value = !value;
	};
</script>

<div on:click={toggle}>
	{#if value}
		<IconOn />
	{:else}
		<IconOff />
	{/if}
</div>

<style>
	div {
		cursor: pointer;
		height: 1em;
		width: 1em;
		padding: 0.0625em 0.125em 0.1875em;
		border-radius: 50%;
		transition: background 0.5s;
	}
	div:hover {
		background: #00000040;
	}
</style>
