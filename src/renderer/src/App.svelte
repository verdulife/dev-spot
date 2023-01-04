<script>
  import Interpreter from "js-interpreter";
  import { log, transform } from "@babel/standalone";
  import hljs from "highlight.js/lib/core";
  import javascript from "highlight.js/lib/languages/javascript";

  hljs.registerLanguage("javascript", javascript);

  let interpreter = new Interpreter("");
  const TEMP = [""];
  let TEMP_INDEX = TEMP.length;
  let input;
  let output = "";
  let success = false;
  let error = false;

  function handleValue() {
    try {
      const { code } = transform(input, { presets: ["env"] });
      interpreter.appendCode(code);
      interpreter.run();

      const { value } = interpreter;

      if (value === "use strict") output = "";
      else output = value;

      /* hljs.highlightElement(document.querySelector("output")); */
    } catch {
      output = "";
    }
  }

  function handleSubmit() {
    handleValue();
    TEMP.push(input);
    TEMP_INDEX = TEMP.length;

    const inputQuery = input.split(":");

    if (inputQuery[1] === "clear") interpreter = new Interpreter("");
    else if (inputQuery[0] === "m")
      window.open(`https://developer.mozilla.org/es/search?q=${inputQuery[1]}`);
    else if (inputQuery[0] === "s")
      window.open(`https://stackoverflow.com/search?q=${inputQuery[1]}`);
    else if (inputQuery[0] === "g")
      window.open(`https://www.google.es/search?q=${inputQuery[1]}`);

    input = output;
    output = "";
  }

  function handleKey(e) {
    const { key } = e;
    if (key === "ArrowUp") {
      TEMP_INDEX = TEMP_INDEX-- <= 0 ? 0 : TEMP_INDEX--;
      input = TEMP[TEMP_INDEX];
    }

    if (key === "ArrowDown") {
      TEMP_INDEX = TEMP_INDEX++ >= TEMP.length ? TEMP.length : TEMP_INDEX++;
      input = TEMP[TEMP_INDEX];
    }
  }
</script>

<div id="drag" />
<form on:submit|preventDefault={handleSubmit} spellcheck="false">
  <input
    type="text"
    placeholder="🚀"
    bind:value={input}
    on:keyup={handleValue}
    on:keydown={handleKey}
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
    flex-direction: column;
    padding: 0.25em 0.5em;
    transition: 200ms;
  }

  input {
    flex-grow: 1;
    background-color: transparent;
    color: #fafafa;
    font-family: "Operator Mono Lig";
    font-size: 24px;
    border: none;
    outline: none;
  }

  output {
    color: turquoise;
    font-family: "Operator Mono Lig";
  }

  ::placeholder {
    color: #aaa;
  }
</style>
