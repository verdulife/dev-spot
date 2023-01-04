<script>
  import Interpreter from "js-interpreter";
  import { transform } from "@babel/standalone";

  const interpreter = new Interpreter(`"use strict";`);
  let input;
  let output = "";
  let TEMP = [""];
  let TEMP_INDEX = TEMP.length;

  function handleValue() {
    try {
      const babel = transform(input, { presets: ["env"] }).code;

      interpreter.appendCode(babel) || "";
      interpreter.run();
      output = interpreter.value || "";

      console.log(interpreter);
    } catch {
      output = "";
    }
  }

  function handleSubmit() {
    handleValue();
    TEMP.push(input);
    TEMP_INDEX = TEMP.length;

    const inputQuery = input.split(":");

    if (inputQuery[0] === "m")
      window.open(`https://developer.mozilla.org/es/search?q=${inputQuery[1]}`);
    else if (inputQuery[0] === "s")
      window.open(`https://stackoverflow.com/search?q=${inputQuery[1]}`);
    else if (inputQuery[0] === "g")
      window.open(`https://www.google.es/search?q=${inputQuery[1]}`, "_blank");
    else {
      input = output;
      output = "";
    }
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
<form on:submit|preventDefault={handleSubmit}>
  <input
    type="text"
    placeholder="Enjoy coding 🚀"
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
