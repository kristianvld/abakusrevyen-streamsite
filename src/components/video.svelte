<script>
	export let hidden;
	export let url;
</script>

<iframe
	class:hidden={hidden || !url}
	title="video stream"
	width="1920"
	height="1080"
	src={url}
	frameborder="0"
	allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
	allowfullscreen
/>

<style>
	iframe {
		width: 100%;
		height: 100%;

		flex: 3 3 0;
	}
</style>
