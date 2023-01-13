<script>
	import Interpreter from 'js-interpreter';
	import { transform } from '@babel/standalone';
	import { userConfig } from '$lib/stores';
	import { onMount } from 'svelte';

	import JsIcon from '$lib/icons/JsIcon.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import UserConfig from '$lib/components/UserConfig.svelte';

	let interpreter = new Interpreter('');
	const TEMP = [''];
	let TEMP_INDEX = TEMP.length;
	let input, inputEl;
	let output = '';
	let error = false;
	let showConfig = false;
	$: isJS = true;

	function handleValue() {
		try {
			const { code } = transform(input, { presets: ['env'] });
			interpreter.appendCode(code);

			interpreter.run();

			const { value } = interpreter;

			if (value === 'use strict') output = '';
			else output = value;

			error = false;
		} catch {
			output = '';
			error = true;
		}

		const inputQuery = input.split(':');
		isJS = inputQuery.length > 1 ? false : true;

		if (!isJS) error = false;
	}

	function handleSubmit() {
		handleValue();
		TEMP.push(input);
		TEMP_INDEX = TEMP.length;

		const inputQuery = input.split(':');

		if (inputQuery[1] === 'clear') interpreter = new Interpreter('');
		else if (inputQuery[0] === 'm')
			window.open(`https://developer.mozilla.org/es/search?q=${inputQuery[1]}`);
		else if (inputQuery[0] === 's')
			window.open(`https://stackoverflow.com/search?q=${inputQuery[1]}`);
		else if (inputQuery[0] === 'g') window.open(`https://www.google.es/search?q=${inputQuery[1]}`);

		input = output;
		output = '';
	}

	function handleKey(e) {
		const { key } = e;
		if (key === 'ArrowUp') {
			TEMP_INDEX = TEMP_INDEX-- <= 0 ? 0 : TEMP_INDEX--;
			input = TEMP[TEMP_INDEX];
		}

		if (key === 'ArrowDown') {
			TEMP_INDEX = TEMP_INDEX++ >= TEMP.length ? TEMP.length : TEMP_INDEX++;
			input = TEMP[TEMP_INDEX];
		}
	}

	function handleConfig(e) {
		const { key, ctrlKey } = e;
		if (ctrlKey && key === ',') showConfig = !showConfig;
	}

	$: if (inputEl && !showConfig) inputEl.focus();

	onMount(() => {
		document.querySelector('#app').style.cssText = `
			--f-text: "${$userConfig.fontFamily}";
		`;
	});
</script>

<svelte:window on:keydown={handleConfig} />

<div id="drag" class:error />
<form class="col jcenter" on:submit|preventDefault={handleSubmit} spellcheck="false">
	<article class="row acenter xfill nowrap">
		{#if isJS}
			<JsIcon width="20px" height="20" fill="#999" />
		{:else}
			<SearchIcon width="20px" height="20" fill="#999" />
		{/if}
		<input
			class="grow"
			type="text"
			bind:this={inputEl}
			bind:value={input}
			on:keyup={handleValue}
			on:keydown={handleKey}
		/>
	</article>
	<output class="xfill clamp">> {output}</output>
</form>

{#if showConfig}
	<UserConfig />
{/if}

<style lang="postcss">
	#drag {
		-webkit-app-region: drag;
		width: 600px;
		height: 80px;
		background-color: rgba(0, 0, 0, 0.8);
		border: 4px solid var(--c-neutral-900);
		border-radius: 0.5em;
	}

	.error {
		border-color: var(--c-error) !important;
	}

	form {
		-webkit-app-region: no-drag;
		position: fixed;
		inset: 0.5em 1em auto 1em;
		height: calc(80px - 1em);
		padding: 0.25em 0.5em;
		transition: 200ms;
		z-index: 1;

		& article {
			gap: 1em;

			& input {
				background-color: transparent;
				color: var(--c-neutral);
				font-size: 22px;
				border: none;
				outline: none;
			}
		}

		& output {
			color: var(--c-accent);
		}
	}
</style>
