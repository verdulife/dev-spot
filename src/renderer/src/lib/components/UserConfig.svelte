<script>
	import { userConfig } from '$lib/stores';
	import { defaultUserConfig } from '$lib/utils';

	const storageRef = localStorage.getItem('userConfig');
	$userConfig = storageRef ? JSON.parse(storageRef) : defaultUserConfig;

	$: localStorage.setItem('userConfig', JSON.stringify($userConfig));
</script>

<main>
	<div class="scroll">
		<section class="xfill">
			<ul class="col xfill">
				{#each $userConfig.links as { label, url, param }}
					<li class="xfill">
						<article class="row acenter xfill">
							<p class="clamp xfill">Links > {label} > {param} > {url}</p>
						</article>
					</li>
				{/each}
			</ul>
		</section>

		<section>
			<ul>
				{#each $userConfig.colors as { label, value }}
					<li>
						<article>
							<p class="clamp xfill">Links > {label} > {value}</p>
						</article>
					</li>
				{/each}
			</ul>
		</section>

		<section>
			<ul>
				{#each $userConfig.font as { label, value }}
					<li>
						<article>
							<p class="clamp xfill">Links > {label} > {value}</p>
						</article>
					</li>
				{/each}
			</ul>
		</section>
	</div>
</main>

<style lang="postcss">
	main {
		height: calc(220px - 1em);
		background-color: var(--c-neutral-900);
		color: var(--c-neutral);
		border: 4px solid var(--c-neutral-900);
		border-radius: 0.5em;
		overflow: hidden;
		margin: 0.25em auto 0 auto;
	}

	article {
		padding: 1em;
		border-bottom: 1px solid #000;
		transition: 100ms;

		&:hover {
			background-color: var(--c-neutral-800);
		}
	}
</style>
