# Remark Steps

Remark plugin to rebuild step style into DOM

## Install

```bash
npm install -D remark-steps
```

## Import

### Docusaurus

#### Import plugin

> docusaurus.config.js

```js
import steps from 'remark-steps';
...
remarkPlugins: [steps],

```

#### Import style

> support css and scss, you can choose one of them

```scss
// css
@import "remark-steps";

// scss
@import "remark-steps";
```

#### Define Step's style global variable

> support css and scss, you can choose one of them

```css
:root {
  --step-line-color: var(--ifm-color-secondary-lighter);
  --step-number-color: var(--ifm-color-secondary-darkest);
  --step-number-background: var(--ifm-color-secondary-lighter);
}
```

## Usage

> markdown file

````md
:::steps

### Install

Install the package from npm.

```bash
npm install -D remark-steps
```

### Import plugin

Import the plugin in your `docusaurus.config.js`.

```js
import steps from 'remark-steps';
...
remarkPlugins: [steps],
```

### Import style

Import the style in your `custom.scss` or `custom.css`.

```css
@use "remark-steps";
```

```css
@import "remark-step";
```

:::
````

> Preview

![preview](./assets/remark-step-preview.png)
