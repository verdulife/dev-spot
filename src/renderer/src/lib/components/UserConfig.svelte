<script>
	import { userConfig } from '$lib/stores';
	import { defaultUserConfig } from '$lib/utils';

	const storageRef = localStorage.getItem('userConfig');
	$userConfig = storageRef ? JSON.parse(storageRef) : defaultUserConfig;

	let USER_CONFIG = JSON.stringify($userConfig, null, 2);

	$: localStorage.setItem('userConfig', USER_CONFIG);
</script>

<main class="scroll">
	<pre class="col fill" bind:innerHTML={USER_CONFIG} spellcheck="false" contenteditable autofocus />
</main>

<style lang="postcss">
	main {
		height: 400px;
		background-color: var(--c-neutral-900);
		color: var(--c-neutral);
		border: 4px solid var(--c-neutral-900);
		border-radius: 0.5em;
		margin: 0.25em auto 0 auto;
	}

	pre {
		background-color: transparent;
		font-size: 14px;
		padding: 1em;
	}
</style>
