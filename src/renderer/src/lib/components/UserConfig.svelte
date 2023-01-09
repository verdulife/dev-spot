<script>
	import { userConfig } from '$lib/stores';
	import { defaultUserConfig } from '$lib/utils';

	const storageRef = localStorage.getItem('userConfig');
	$userConfig = storageRef ? JSON.parse(storageRef) : defaultUserConfig;

	$: USER_CONFIG = JSON.stringify($userConfig, null, 2);
	$: localStorage.setItem('userConfig', JSON.stringify($userConfig));
</script>

<main>
	<section class="scroll">
		<textarea class="col xfill" bind:value={USER_CONFIG} autofocus />
	</section>
</main>

<style lang="postcss">
	main {
		background-color: var(--c-neutral-900);
		color: var(--c-neutral);
		border: 4px solid var(--c-neutral-900);
		border-radius: 0.5em;
		overflow: hidden;
		margin: 0.25em auto 0 auto;
	}

	textarea {
		height: 300px;
		background-color: transparent;
		color: var(--c-neutral);
	}
</style>
