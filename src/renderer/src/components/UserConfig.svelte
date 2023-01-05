<script>
  import { userConfig } from "../stores";

  const storageRef = localStorage.getItem("userConfig");
  $userConfig = storageRef
    ? JSON.parse(storageRef)
    : {
        links: [
          {
            label: "MDN",
            url: "https://developer.mozilla.org/es/search?q=",
            param: "m",
          },
          {
            label: "StackOverflow",
            url: "https://stackoverflow.com/search?q=",
            param: "s",
          },
          {
            label: "Google",
            url: "https://www.google.es/search?q=",
            param: "g",
          },
        ],
        colors: [
          {
            label: "Background",
            value: "rgba(0,0,0,0.8)",
          },
          {
            label: "Border Color",
            value: "#000",
          },
          {
            label: "Input color",
            value: "#fafafa",
          },
          {
            label: "Output color",
            value: "turquoise",
          },
        ],
        font: [
          {
            label: "Font family",
            value: "Operator Mono Lig",
          },
          {
            label: "Font weight",
            value: "normal",
          },
        ],
      };

  $: localStorage.setItem("userConfig", JSON.stringify($userConfig));

  console.log($userConfig);
</script>

<main>
  <div class="scroll">
    <section>
      <h3>Links</h3>
      <ul>
        {#each $userConfig.links as { label, url, param }}
          <li>{label}: {param}</li>
        {/each}
      </ul>
    </section>

    <section>
      <h3>Colors</h3>
      {#each $userConfig.colors as { label, value }}
        <li>{label}: {value}</li>
      {/each}
    </section>

    <section>
      <h3>Font</h3>
      {#each $userConfig.font as { label, value }}
        <li>{label}: {value}</li>
      {/each}
    </section>
  </div>
</main>

<style>
  main {
    height: calc(220px - 1em);
    background-color: #111;
    color: #fafafa;
    border: 4px solid #111;
    border-radius: 0.5em;
    overflow: hidden;
    margin: 0.25em auto 0 auto;
  }

  section {
    margin: 1em;
  }
</style>
