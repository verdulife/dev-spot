<script>
  let value, output

  function handleValue() {
    output = eval(value)
  }
</script>

<div id="drag" />
<input type="text" placeholder="Enjoy coding 🚀" bind:value on:change={handleValue} autofocus />
<!-- <main>
  <output>{output}</output>
</main> -->

<style>
  #drag {
    -webkit-app-region: drag;
    width: 600px;
    height: 80px;
    background-color: rgba(0, 0, 0, 0.8);
    border: 4px solid #111;
    border-radius: 1em;
  }

  input {
    -webkit-app-region: no-drag;
    position: fixed;
    inset: 0.5em 1em;
    font-size: 24px;
    background-color: transparent;
    border: none;
    color: #fafafa;
    outline: none;
    padding: 0.25em;
  }

  ::placeholder {
    color: #aaa;
  }
</style>
