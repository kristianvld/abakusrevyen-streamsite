<script>
	import { onMount } from 'svelte';
	import { screenWidth, connectWebSocket } from '../components/storage';

	onMount(async () => {
		$screenWidth = window.screen.width;
		window.addEventListener('resize', (e) => {
			$screenWidth = window.screen.width;
		});
		connectWebSocket();
	});
</script>

<div class="content">
	<slot />

	<footer>
		<p>Laget med <span style="color: #e25555;">&#9829;</span> av Teknikk</p>
	</footer>
</div>

<style>
	.content {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: stretch;
	}
	footer {
		color: #999;
		font-size: 0.6em;
		text-align: center;
	}
</style>
