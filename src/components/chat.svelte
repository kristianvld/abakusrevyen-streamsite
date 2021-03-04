<script>
	import { onMount } from 'svelte';

	export let hidden;
	export let solo;
	let host = 'abakusrevyen.no';
	onMount(() => {
		host = window.location.hostname;
	});
</script>

<iframe
	class:hidden
	class:solo
	title="chat"
	width="720"
	height="1080"
	src="https://www.youtube.com/live_chat?v=4cmYfid2SbY&embed_domain={host}"
	frameborder="0"
/>

<style>
	iframe {
		width: 100%;
		height: 100%;
		max-width: 50em;
		min-width: 20em;

		flex: 1 1 0;
	}

	.solo {
		max-width: unset;
		min-zoom: unset;
	}
</style>
