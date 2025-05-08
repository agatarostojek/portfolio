const starIcon = new URL("./assets/star-icon.svg", import.meta.url).href;
const demoIcon = new URL("./assets/demo-icon.svg", import.meta.url).href;
const githubIcon = new URL("./assets/github-accent.svg", import.meta.url).href;

const username = "agatarostojek";
const direction = "desc";
const projectsContainer = document.querySelector(".projects--js");

fetch(`https://api.github.com/users/${username}/repos?direction=${direction}`)
  .then((response) => response.json())
  .then((response) => {
    for (let repository of response) {
      const {
        name,
        description,
        html_url,
        stargazers_count,
        topics,
        homepage,
      } = repository;

      let tags = ``;

      for (let tag of topics) {
        tags += `<li class="px-2 py-1 bg-gray-400/20 rounded-sm font-bold">${tag}</li>`;
      }

      const element = `<article class="overflow-clip bg-gradient-to-br from-white/10 to-white/5 rounded-projectsBorder inset-shadow-innerLight ring ring-background flex flex-col h-full">
  <div class="h-11 p-4 flex gap-1.5 border-b border-background bg-gradient-to-br from-white/10 to-white/[4%] inset-shadow-innerLight">
    <span class="h-3 w-3 block bg-background opacity-60 rounded-full"></span>
    <span class="h-3 w-3 block bg-background opacity-60 rounded-full"></span>
    <span class="h-3 w-3 block bg-background opacity-60 rounded-full"></span>
  </div>

  <div class="p-5 md:p-10 flex flex-col flex-grow">
    <div class="mb-3 flex gap-4 items-stretch">
      <h3 class="text-2xl font-bold leading-7 flex-1 flex-wrap">${name}</h3>
      <header class="px-2 py-1 mb-4 flex items-center gap-0.5 bg-gray-400/20 rounded-sm text-lightGray font-medium leading-none flex-shrink-0 h-6">
        <img class="w-4 h-4 " src="${starIcon}" alt="" />${stargazers_count}
      </header>
    </div>
    <p class="mb-4 text-xl text-lightGray font-medium flex-grow">
      ${description}
    </p>
    <div>
      <ul class="mb-10 flex gap-2 flex-wrap">
        ${tags}
      
      </ul>
      <div class="flex flex-col flex-wrap md:flex-row items-start gap-4">
        <a class="px-5 py-4 flex items-center gap-2 bg-background rounded-projectsButtonsBorder border-[1px] border-darkGray text-accent font-bold md:text-xl hover:bg-backgroundLight transition ease-in" href="${homepage}"
        target="_blank"
        rel="noreferrer nofollow">
          <img src="${demoIcon}" alt="" />View demo
        </a>
        <a class="px-5 py-4 flex items-center gap-2 bg-background rounded-projectsButtonsBorder border-[1px] border-darkGray text-accent font-bold md:text-xl hover:bg-backgroundLight transition ease-in" href="${html_url}" target="_blank"
        rel="noreferrer nofollow">
          <img src="${githubIcon}" alt="" />Source code
        </a>
      </div>
    </div>
  </div>
</article>`;

      if (homepage) projectsContainer.insertAdjacentHTML("afterbegin", element);
    }
  })
  .catch((e) => {
    console.log(e);
  });
