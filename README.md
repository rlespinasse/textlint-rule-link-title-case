# textlint-rule-link-title-case

[textlint](https://textlint.github.io/ "textlint official site") rule to enforce AP Style title case for link text and titles in Markdown documents.

## Features

- Enforces AP Style title case for link display text, titles, and references
- Handles special terms, acronyms, and technical terminology with proper capitalization
- Supports customization of stop words and special terms
- Provides automatic fixing of improperly cased text

## Installation

Install with [npm](https://www.npmjs.com/):

```shell
npm install textlint-rule-link-title-case
```

## Usage

Via `.textlintrc` (recommended):

```json
{
  "rules": {
    "link-title-case": true
  }
}
```

With options:

```json
{
  "rules": {
    "link-title-case": {
      "stopWords": ["via", "etc"],
      "specialTerms": {
        "nextjs": "Next.js",
        "nestjs": "Nest.js"
      },
      "checkLinkReference": true,
      "checkLinkTitle": true,
      "checkLinkText": true
    }
  }
}
```

Via CLI:

```shell
textlint --rule link-title-case README.md
```

## Options

- `stopWords`: `string[]`
  - Default: `[]`
  - Additional words to treat as stop words (lowercase in titles unless first/last)
- `specialTerms`: `Object`
  - Default: `{}`
  - Special terms with custom capitalization (e.g., `{"nextjs": "Next.js"}`)
  - In addition of default special terms (see `src/ap-style.js` file)
- `checkLinkReference`: `Boolean`
  - Default: `true`
  - Whether to check link references (`[text][reference]`)
- `checkLinkTitle`: `Boolean`
  - Default: `true`
  - Whether to check link titles (`[text](url "title")` or `[reference]: url "title"`)
- `checkLinkText`: `Boolean`
  - Default: `true`
  - Whether to check link display text (`[text](url)`)

## Examples

### Incorrect

```markdown
[click here to learn about javascript](https://example.com)

[Read More About API design](https://example.com "api design principles")

[reference to github][github-link]

[github-link]: https://github.com "github homepage"
```

### Correct

```markdown
[Click Here to Learn About JavaScript](https://example.com)

[Read More About API Design](https://example.com "API Design Principles")

[Reference to GitHub][github-link]

[github-link]: https://github.com "GitHub Homepage"
```

## AP Style Title Case Rules

This rule follows AP Style title case conventions:

- Capitalize the first and last words
- Capitalize all words of four letters or more
- Capitalize nouns, pronouns, adjectives, verbs, adverbs, and subordinating conjunctions
- Lowercase articles (a, an, the), coordinating conjunctions (and, but, or, for, nor), and prepositions of three letters or fewer
- Capitalize a preposition of four or more letters
- Capitalize words following hyphens, colons, em dashes, or other punctuation
- Preserve the capitalization of proper nouns, brand names, and technical terms

## Fixable

`textlint-rule-link-title-case` supports the `--fix` option.

[![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)

See [https://github.com/textlint/textlint/#fixable](https://github.com/textlint/textlint/#fixable) for more details.

## Running tests

Install [just](https://just.systems/man/en/packages.html) and run validation tests:

```shell
$ just setup
Installing textlint globally...
✅ Project setup complete
$ just validate-all
Building project...
Running tests...
✅ Basic validation complete
Running e2e lint validation...
✅ E2E lint validation passed
Running e2e fix validation...
✅ E2E fix validation passed
✅ Full validation complete
```
