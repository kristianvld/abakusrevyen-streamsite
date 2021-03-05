<script>
	import Question from './question.svelte';
	import { sendAnswers, questions } from './storage';
	import Toggle from './toggle.svelte';

	export let solo;

	let max;
	let values = [];
	questions.subscribe((val) => {
		max = (val?.questions?.length || 1) - 1;
		values = [];
	});

	const submit = () => {
		if (!canSend(values)) {
			return;
		}
		sendAnswers(values, $questions.date);
	};

	const canSend = (list) => {
		for (let i = 0; i < $questions.questions.length; i++) {
			if (values[i]) {
				continue;
			}
			return false;
		}
		return true;
	};

	let qIndex = 0;
	let update = (value) => {
		values[qIndex] = value;
		values = values;
	};
</script>

<div class="holder">
	<Question {solo} question={$questions.questions[qIndex]} value={values[qIndex]} {update} />
	<div class="nav">
		<Toggle value={false} toggle={() => (qIndex = Math.max(qIndex - 1, 0))} disabled={qIndex <= 0} />
		<button on:click={submit} disabled={!canSend(values)}>
			{#if qIndex != max}
				{qIndex + 1} / {max + 1}
			{:else}
				Send!
			{/if}
		</button>
		<Toggle toggle={() => (qIndex = Math.min(qIndex + 1, max))} disabled={qIndex >= max} />
	</div>
</div>

<style>
	.holder {
		display: flex;
		flex-direction: column;
	}
	.nav {
		font-size: 2em;
		display: flex;
		gap: 0.25em;
		flex-direction: row;
		background-color: #00000040;
		padding: 0.5em 0.25em;
	}
	.nav button {
		flex: 1 1 100%;
	}
	button {
		border: none;
		color: white;
		background: #00000040;
		border-radius: 0.25em;
		cursor: pointer;
		font-size: 0.75em;
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
