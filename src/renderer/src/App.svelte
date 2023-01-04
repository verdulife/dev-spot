<script>
  import { evaluate } from 'mathjs'
  let input
  let output = ''

  function handleValue() {
    const result = evaluate(input) || ''

    if (typeof result === 'function') output = ''
    else output = result
  }

  function handleSubmit() {
    handleValue()
    input = output
    output = ''
  }
</script>

<div id="drag" />
<form on:submit|preventDefault={handleSubmit}>
  <input
    type="text"
    placeholder="Enjoy coding 🚀"
    bind:value={input}
    on:keyup={handleValue}
    autofocus
  />
  <output>{output}</output>
</form>

<style>
  #drag {
    -webkit-app-region: drag;
    width: 600px;
    height: 80px;
    background-color: rgba(0, 0, 0, 0.8);
    border: 4px solid #111;
    border-radius: 1em;
  }

  form {
    -webkit-app-region: no-drag;
    position: fixed;
    inset: 0.5em 1em;
    display: flex;
    padding: 0.25em 0.5em;
  }

  input {
    flex-grow: 1;
    background-color: transparent;
    color: #fafafa;
    font-size: 24px;
    border: none;
    outline: none;
  }

  output {
    width: 100px;
    color: #fafafa;
  }

  ::placeholder {
    color: #aaa;
  }
</style>
