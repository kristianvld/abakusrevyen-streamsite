<script>
	import { ws, sendAnswer, question } from './storage';

	export let solo;

	export let value;

	const submit = () => {
		if (!value) {
			return;
		}
		sendAnswer($ws, value);
	};
</script>

<div class:solo class="holder">
	<h3>{$question.title}</h3>
	{#each $question.options as option}
		<label>
			<input type="radio" bind:group={value} value={option} />
			{option}
		</label>
	{/each}
	<button on:click={submit} disabled={!value}>Send</button>
</div>

<style>
	.holder {
		max-width: 50em;
		min-width: 20em;

		flex: 1 1 0;
		justify-self: stretch;

		background-color: #00000040;

		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 0.5em;

		position: relative;

		font-size: 1.5em;
	}

	label {
		display: block;
		width: calc(100% - 1em);
		padding: 0.5em;
		line-height: 1.5;

		cursor: pointer;
	}

	input {
		vertical-align: text-top;
		appearance: none;

		border: 2px solid #999;
		transition: 0.2s border-width linear;
		margin-top: 0.125em;
		margin-right: 1em;
		border-radius: 50%;

		width: 1.5em;
		height: 1.5em;
	}
	input:hover {
		border-color: #fff;
	}
	input:checked {
		border: 6px solid #fff;
	}

	.solo {
		max-width: unset;
		min-zoom: unset;
	}
	h3 {
		text-align: center;
		margin: 0.5em;

		position: absolute;
		top: 0;
		left: 0;
		width: calc(100% - 1em);
	}

	button {
		border: none;
		color: white;
		background: #00000040;
		border-radius: 0.25em;
		cursor: pointer;
		font-size: 1em;
		padding: 0.25em;
	}

	button:active {
		background: #00000080;
	}

	button:disabled {
		background: #00000040;
		color: #aaa;
		cursor: default;
	}
</style>
