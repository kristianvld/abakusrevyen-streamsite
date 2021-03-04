<script>
	import Chat from '../components/chat.svelte';
	import Phone from '../components/phone.svelte';
	import Toggle from '../components/toggle.svelte';
	import Video from '../components/video.svelte';
	import { screenWidth, video_url, question } from '../components/storage';
	import Question from '../components/question.svelte';
	import Program from '../components/program.svelte';
	import Drikkelek from '../components/drikkelek.svelte';

	let chat = true;
	const soloChatWidth = 800;
</script>

<svelte:head>
	<title>Marionett | Abakusrevyen 2021</title>
</svelte:head>

<div class="row">
	<h1>Marionett | Abakusrevyen 2021</h1>
	<div class="right">
		<Toggle bind:value={chat} />
	</div>
</div>
<div class="row main">
	<Video hidden={chat && $screenWidth <= soloChatWidth} url={$video_url} />
	{#if $question}
		<Question question={$question} solo={$screenWidth <= soloChatWidth} />
	{:else}
		<Chat hidden={!chat} solo={$screenWidth <= soloChatWidth} />
	{/if}
</div>

<Program />
<Drikkelek />

<style>
	h1 {
		text-align: center;
		padding: 0;
		margin: 0.5em;
	}
	.main {
		padding: 0.5em;
		height: 100%;
	}
	.main :global(iframe) {
		min-height: calc(95vh - 5em);
	}
	.row {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: stretch;
	}
	.right {
		position: absolute;
		right: 0.75em;
		top: 0.75em;
		font-size: 2em;
	}

	@media (max-width: 600px) {
		h1,
		.right {
			font-size: 1.5em;
		}
	}
</style>
