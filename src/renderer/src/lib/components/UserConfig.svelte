<script>
	import { userConfig } from '$lib/stores';
	import { defaultUserConfig } from '$lib/utils';
	import EnterIcon from '../icons/EnterIcon.svelte';

	let showLinks = false;

	const storageRef = localStorage.getItem('userConfig');
	$userConfig = storageRef ? JSON.parse(storageRef) : defaultUserConfig;

	$: localStorage.setItem('userConfig', JSON.stringify($userConfig));

	function handleEnter(e) {
		const { key, target } = e;

		if (key === 'Enter') {
			console.dir($userConfig[0]);
			if (target.tabIndex === 1) showLinks = true;
			else showLinks = false;
		}
	}
</script>

<main>
	<div class="scroll" tabindex="1">
		<section class="xfill">
			<ul class="col xfill">
				{#if showLinks}
					{#each $userConfig[0].links as { label }, i}
						<li class="xfill" tabindex={i + 1} autofocus={i === 0} on:keydown={handleEnter}>
							<article class="row acenter xfill">
								<p class="grow clamp">{label}</p>
								<EnterIcon width="15px" height="15px" fill="#444" />
							</article>
						</li>
					{/each}
				{:else}
					{#each $userConfig as { label }, i}
						<li class="xfill" tabindex={i + 1} autofocus={i === 0} on:keydown={handleEnter}>
							<article class="row acenter xfill">
								<p class="grow clamp">{label}</p>
								<EnterIcon width="15px" height="15px" fill="#444" />
							</article>
						</li>
					{/each}
				{/if}
			</ul>
		</section>
	</div>
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

	li {
		cursor: pointer;
		border-bottom: 1px solid #000;
		transition: 100ms;

		&:last-of-type {
			border-bottom: none;
		}

		&:focus {
			background-color: var(--c-neutral-800);
		}

		&:hover {
			background-color: var(--c-neutral-700);
		}

		& article {
			padding: 1em;

			& p {
				text-transform: capitalize;
			}
		}
	}
</style>
