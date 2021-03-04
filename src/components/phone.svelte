<div class="case">
	<div class="header" />
	<div class="screen">
		<slot />
	</div>
	<div class="footer" />
</div>

<style>
	.case {
		border-radius: 15em;
		display: flex;
		flex-direction: column;
		max-width: 10em;
	}
	.header {
		min-height: 5em;
		height: 5em;
		background-color: gray;
	}
	.footer {
		min-height: 5em;
		height: 5em;
		background-color: gray;
	}
</style>
