# Heatmap Explorer

An aplication that creates an heatmap based on an jsonfile and a image

[Link to App Hosted](https://lucasgobbs.github.io/heatmap-challenge/)

## About

Application Running
![Application Running](/images/gitprints/application.png)

### Flow

Initial Screen
![Initial Screen of APP](/images/gitprints/started_app.png)

Choose Json and Image File
![Choosing json and image files](/images/gitprints/choose_json_image.png)

Select filter options and Download
![Selecting the filter options](/images/gitprints/generate_image.gif)

Generated Output
![Generated Output](/images/gitprints/heatmap-overlay.png)

### Tech Stack

- SvelteJs
- TailwindJs
- Vite
- Heatmap.js
- Typescript

## Instalation and Execution

> You need Node and NPM to run the project

First clone the project and install the dependencies

```shell
git clone ...
npm install
```

After that you can run with:

```shell
npm run dev
```

Then open the project in: http://localhost:5173/heatmap/

## Code

All the code is divided in the following architecture

- /src/lib
  - /components - The Componenets that are used in the projects (and their stores)
    - /components/ui - Components pushed from external repositories (shadcn)
  - /intefaces - Interfaces and types
  - /pages - The pages of the app
  - /utils - TS code that is used in the components but are'nt in the frontend context

The parsing of the json file is inside the **ExtractDataFromElastic.ts** in which implements the interface **IDataPointExtractor.ts**

> [/src/lib/utils/ExtractDataFromElastic.ts](https://github.com/LucasGobbs/heatmap-challenge/blob/master/src/lib/utils/ExtractDataFromElastic.ts)
>
> [/src/lib/interfaces/IDataPointExtractor.ts](https://github.com/LucasGobbs/heatmap-challenge/blob/master/src/lib/interfaces/IDataPointExtractor.ts)
