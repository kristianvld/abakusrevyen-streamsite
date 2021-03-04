<script>
	export let hidden;
	export let solo;
</script>

<iframe
	class:hidden
	class:solo
	title="chat"
	width="720"
	height="1080"
	src="https://www.youtube.com/live_chat?v=rxNzJ0hvmaY&embed_domain=192.168.1.101"
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
		max-width: 100%;
	}
</style>
