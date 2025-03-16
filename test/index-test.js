const TextLintTester = require("textlint-tester").default;
const rule = require("../src/index.js");

const tester = new TextLintTester();

// Make sure the rule is properly defined
if (!rule) {
  throw new Error("Rule module is undefined or null");
}

// Define test cases
tester.run("AP Style Title Case Rule on Link Definition Title", rule, {
  valid: [
    // Properly capitalized titles
    '[link]: http://example.com "The Quick Brown Fox"',
    '[link]: http://example.com "A Day in the Life"',
    '[link]: http://example.com "The Cat in the Hat"',
    '[link]: http://example.com "Self-Driving Cars Are Here"',
    // Titles with punctuation
    '[link]: http://example.com "Hello, World: A New Beginning"',
    '[link]: http://example.com "What\'s Up ? A Look at Modern Slang"',
    // Titles with prepositions and conjunctions
    '[link]: http://example.com "The Theory of Relativity"',
    '[link]: http://example.com "War and Peace in Our Time"',
    // Titles with special characters
    '[link]: http://example.com "The Cost-Benefit Analysis"',
    '[link]: http://example.com "The Year 2023—a New Era Begins"',
    // Titles with parentheses
    '[link]: http://example.com "JavaScript (and TypeScript) for Beginners"',
    // Single word title
    '[link]: http://example.com "Documentation"',
    // Title with numbers
    '[link]: http://example.com "The 7 Habits of Highly Effective People"',
    // Title with acronyms (should remain uppercase)
    '[link]: http://example.com "NASA and the Future of Space Travel"'
  ],
  invalid: [
    // All lowercase
    {
      text: '[link]: http://example.com "the quick brown fox"',
      output: '[link]: http://example.com "The Quick Brown Fox"',
      errors: [
        {
          message: 'Link definition title should follow AP style: "The Quick Brown Fox"'
        }
      ]
    },
    // All uppercase
    {
      text: '[link]: http://example.com "THE QUICK BROWN FOX"',
      output: '[link]: http://example.com "The Quick Brown Fox"',
      errors: [
        {
          message: 'Link definition title should follow AP style: "The Quick Brown Fox"'
        }
      ]
    },
    // Incorrect capitalization of articles and prepositions
    {
      text: '[link]: http://example.com "The Day In The Life Of A Developer"',
      output: '[link]: http://example.com "The Day in the Life of a Developer"',
      errors: [
        {
          message: 'Link definition title should follow AP style: "The Day in the Life of a Developer"'
        }
      ]
    },
    // Incorrect hyphenated words
    {
      text: '[link]: http://example.com "self-driving Cars are here"',
      output: '[link]: http://example.com "Self-Driving Cars Are Here"',
      errors: [
        {
          message: 'Link definition title should follow AP style: "Self-Driving Cars Are Here"'
        }
      ]
    },
    // Incorrect capitalization with punctuation
    {
      text: '[link]: http://example.com "hello, world: a new beginning"',
      output: '[link]: http://example.com "Hello, World: A New Beginning"',
      errors: [
        {
          message: 'Link definition title should follow AP style: "Hello, World: A New Beginning"'
        }
      ]
    },
    // Incorrect capitalization with parentheses
    {
      text: '[link]: http://example.com "javascript (and typescript) for beginners"',
      output: '[link]: http://example.com "JavaScript (and TypeScript) for Beginners"',
      errors: [
        {
          message: 'Link definition title should follow AP style: "JavaScript (and TypeScript) for Beginners"'
        }
      ]
    },
    // Incorrect capitalization of first and last words
    {
      text: '[link]: http://example.com "the Quick Brown fox"',
      output: '[link]: http://example.com "The Quick Brown Fox"',
      errors: [
        {
          message: 'Link definition title should follow AP style: "The Quick Brown Fox"'
        }
      ]
    },
    // Mixed case issues
    {
      text: '[link]: http://example.com "How TO Write GOOD Code"',
      output: '[link]: http://example.com "How to Write Good Code"',
      errors: [
        {
          message: 'Link definition title should follow AP style: "How to Write Good Code"'
        }
      ]
    },
    // Incorrect with special characters
    {
      text: '[link]: http://example.com "the cost-benefit ANALYSIS"',
      output: '[link]: http://example.com "The Cost-Benefit Analysis"',
      errors: [
        {
          message: 'Link definition title should follow AP style: "The Cost-Benefit Analysis"'
        }
      ]
    },
    // Incorrect with numbers
    {
      text: '[link]: http://example.com "the 7 habits OF highly effective people"',
      output: '[link]: http://example.com "The 7 Habits of Highly Effective People"',
      errors: [
        {
          message: 'Link definition title should follow AP style: "The 7 Habits of Highly Effective People"'
        }
      ]
    },
    // Incorrect with multiple spaces
    {
      text: '[link]: http://example.com "the   quick  brown   fox"',
      output: '[link]: http://example.com "The   Quick  Brown   Fox"',
      errors: [
        {
          message: 'Link definition title should follow AP style: "The   Quick  Brown   Fox"'
        }
      ]
    },
    // Incorrect with em dash
    {
      text: '[link]: http://example.com "the year 2023—a new era begins"',
      output: '[link]: http://example.com "The Year 2023—a New Era Begins"',
      errors: [
        {
          message: 'Link definition title should follow AP style: "The Year 2023—a New Era Begins"'
        }
      ]
    }
  ]
});

tester.run("AP Style Title Case Rule on Link Reference Text", rule, {
  valid: [
    // Properly capitalized titles
    `[The Quick Brown Fox][link]

[link]: https://example.com`,
    `[A Day in the Life][link]

[link]: https://example.com`,
    `[The Cat in the Hat][link]

[link]: https://example.com`,
    `[Self-Driving Cars Are Here][link]

[link]: https://example.com`,
    // Titles with punctuation
    `[Hello, World: A New Beginning][link]

[link]: https://example.com`,
    `[What's Up ? A Look at Modern Slang][link]

[link]: https://example.com`,
    // Titles with prepositions and conjunctions
    `[The Theory of Relativity][link]

[link]: https://example.com`,
    `[War and Peace in Our Time][link]

[link]: https://example.com`,
    // Titles with special characters
    `[The Cost-Benefit Analysis][link]

[link]: https://example.com`,
    `[The Year 2023—a New Era Begins][link]

[link]: https://example.com`,
    // Titles with parentheses
    `[JavaScript (and TypeScript) for Beginners][link]

[link]: https://example.com`,
    // Single word title
    `[Documentation][link]

[link]: https://example.com`,
    // Title with numbers
    `[The 7 Habits of Highly Effective People][link]

[link]: https://example.com`,
    // Title with acronyms (should remain uppercase)
    `[NASA and the Future of Space Travel][link]

[link]: https://example.com`,
    // Links containing images should be ignored
    `[![some image](image.png)][link]

[link]: https://example.com`
  ],
  invalid: [
    // All lowercase
    {
      text: `[the quick brown fox][link]

[link]: https://example.com`,
      output: `[The Quick Brown Fox][link]

[link]: https://example.com`,
      errors: [
        {
          message: 'Link reference text should follow AP style: "The Quick Brown Fox"'
        }
      ]
    },
    // All uppercase
    {
      text: `[THE QUICK BROWN FOX][link]

[link]: https://example.com`,
      output: `[The Quick Brown Fox][link]

[link]: https://example.com`,
      errors: [
        {
          message: 'Link reference text should follow AP style: "The Quick Brown Fox"'
        }
      ]
    },
    // Incorrect capitalization of articles and prepositions
    {
      text: `[The Day In The Life Of A Developer][link]

[link]: https://example.com`,
      output: `[The Day in the Life of a Developer][link]

[link]: https://example.com`,
      errors: [
        {
          message: 'Link reference text should follow AP style: "The Day in the Life of a Developer"'
        }
      ]
    },
    // Incorrect hyphenated words
    {
      text: `[self-driving Cars are here][link]

[link]: https://example.com`,
      output: `[Self-Driving Cars Are Here][link]

[link]: https://example.com`,
      errors: [
        {
          message: 'Link reference text should follow AP style: "Self-Driving Cars Are Here"'
        }
      ]
    },
    // Incorrect capitalization with punctuation
    {
      text: `[hello, world: a new beginning][link]

[link]: https://example.com`,
      output: `[Hello, World: A New Beginning][link]

[link]: https://example.com`,
      errors: [
        {
          message: 'Link reference text should follow AP style: "Hello, World: A New Beginning"'
        }
      ]
    },
    // Incorrect capitalization with parentheses
    {
      text: `[javascript (and typescript) for beginners][link]

[link]: https://example.com`,
      output: `[JavaScript (and TypeScript) for Beginners][link]

[link]: https://example.com`,
      errors: [
        {
          message: 'Link reference text should follow AP style: "JavaScript (and TypeScript) for Beginners"'
        }
      ]
    },
    // Incorrect capitalization of first and last words
    {
      text: `[the Quick Brown fox][link]

[link]: https://example.com`,
      output: `[The Quick Brown Fox][link]

[link]: https://example.com`,
      errors: [
        {
          message: 'Link reference text should follow AP style: "The Quick Brown Fox"'
        }
      ]
    },
    // Mixed case issues
    {
      text: `[How TO Write GOOD Code][link]

[link]: https://example.com`,
      output: `[How to Write Good Code][link]

[link]: https://example.com`,
      errors: [
        {
          message: 'Link reference text should follow AP style: "How to Write Good Code"'
        }
      ]
    },
    // Incorrect with special characters
    {
      text: `[the cost-benefit ANALYSIS][link]

[link]: https://example.com`,
      output: `[The Cost-Benefit Analysis][link]

[link]: https://example.com`,
      errors: [
        {
          message: 'Link reference text should follow AP style: "The Cost-Benefit Analysis"'
        }
      ]
    },
    // Incorrect with numbers
    {
      text: `[the 7 habits OF highly effective people][link]

[link]: https://example.com`,
      output: `[The 7 Habits of Highly Effective People][link]

[link]: https://example.com`,
      errors: [
        {
          message: 'Link reference text should follow AP style: "The 7 Habits of Highly Effective People"'
        }
      ]
    },
    // Incorrect with multiple spaces
    {
      text: `[the   quick  brown   fox][link]

[link]: https://example.com`,
      output: `[The   Quick  Brown   Fox][link]

[link]: https://example.com`,
      errors: [
        {
          message: 'Link reference text should follow AP style: "The   Quick  Brown   Fox"'
        }
      ]
    },
    // Incorrect with em dash
    {
      text: `[the year 2023—a new era begins][link]

[link]: https://example.com`,
      output: `[The Year 2023—a New Era Begins][link]

[link]: https://example.com`,
      errors: [
        {
          message: 'Link reference text should follow AP style: "The Year 2023—a New Era Begins"'
        }
      ]
    }
  ]
});

tester.run("AP Style Title Case Rule on Link Text", rule, {
  valid: [
    // Properly capitalized titles
    '[The Quick Brown Fox](http://example.com)',
    '[A Day in the Life](http://example.com)',
    '[The Cat in the Hat](http://example.com)',
    '[Self-Driving Cars Are Here](http://example.com)',
    // Titles with punctuation
    '[Hello, World: A New Beginning](http://example.com)',
    '[What\'s Up ? A Look at Modern Slang](http://example.com)',
    // Titles with prepositions and conjunctions
    '[The Theory of Relativity](http://example.com)',
    '[War and Peace in Our Time](http://example.com)',
    // Titles with special characters
    '[The Cost-Benefit Analysis](http://example.com)',
    '[The Year 2023—a New Era Begins](http://example.com)',
    // Titles with parentheses
    '[JavaScript (and TypeScript) for Beginners](http://example.com)',
    // Single word title
    '[Documentation](http://example.com)',
    // Title with numbers
    '[The 7 Habits of Highly Effective People](http://example.com)',
    // Title with acronyms (should remain uppercase)
    '[NASA and the Future of Space Travel](http://example.com)',
    // Links containing images should be ignored
    '[![some image](image.png)](http://example.com)',
    // Links with angle brackets should be ignored
    '<http://example.com>',
  ],
  invalid: [
    // All lowercase
    {
      text: '[the quick brown fox](http://example.com)',
      output: '[The Quick Brown Fox](http://example.com)',
      errors: [
        {
          message: 'Link text should follow AP style: "The Quick Brown Fox"'
        }
      ]
    },
    // All uppercase
    {
      text: '[THE QUICK BROWN FOX](http://example.com)',
      output: '[The Quick Brown Fox](http://example.com)',
      errors: [
        {
          message: 'Link text should follow AP style: "The Quick Brown Fox"'
        }
      ]
    },
    // Incorrect capitalization of articles and prepositions
    {
      text: '[The Day In The Life Of A Developer](http://example.com)',
      output: '[The Day in the Life of a Developer](http://example.com)',
      errors: [
        {
          message: 'Link text should follow AP style: "The Day in the Life of a Developer"'
        }
      ]
    },
    // Incorrect hyphenated words
    {
      text: '[self-driving Cars are here](http://example.com)',
      output: '[Self-Driving Cars Are Here](http://example.com)',
      errors: [
        {
          message: 'Link text should follow AP style: "Self-Driving Cars Are Here"'
        }
      ]
    },
    // Incorrect capitalization with punctuation
    {
      text: '[hello, world: a new beginning](http://example.com)',
      output: '[Hello, World: A New Beginning](http://example.com)',
      errors: [
        {
          message: 'Link text should follow AP style: "Hello, World: A New Beginning"'
        }
      ]
    },
    // Incorrect capitalization with parentheses
    {
      text: '[javascript (and typescript) for beginners](http://example.com)',
      output: '[JavaScript (and TypeScript) for Beginners](http://example.com)',
      errors: [
        {
          message: 'Link text should follow AP style: "JavaScript (and TypeScript) for Beginners"'
        }
      ]
    },
    // Incorrect capitalization of first and last words
    {
      text: '[the Quick Brown fox](http://example.com)',
      output: '[The Quick Brown Fox](http://example.com)',
      errors: [
        {
          message: 'Link text should follow AP style: "The Quick Brown Fox"'
        }
      ]
    },
    // Mixed case issues
    {
      text: '[How TO Write GOOD Code](http://example.com)',
      output: '[How to Write Good Code](http://example.com)',
      errors: [
        {
          message: 'Link text should follow AP style: "How to Write Good Code"'
        }
      ]
    },
    // Incorrect with special characters
    {
      text: '[the cost-benefit ANALYSIS](http://example.com)',
      output: '[The Cost-Benefit Analysis](http://example.com)',
      errors: [
        {
          message: 'Link text should follow AP style: "The Cost-Benefit Analysis"'
        }
      ]
    },
    // Incorrect with numbers
    {
      text: '[the 7 habits OF highly effective people](http://example.com)',
      output: '[The 7 Habits of Highly Effective People](http://example.com)',
      errors: [
        {
          message: 'Link text should follow AP style: "The 7 Habits of Highly Effective People"'
        }
      ]
    },
    // Incorrect with multiple spaces
    {
      text: '[the   quick  brown   fox](http://example.com)',
      output: '[The   Quick  Brown   Fox](http://example.com)',
      errors: [
        {
          message: 'Link text should follow AP style: "The   Quick  Brown   Fox"'
        }
      ]
    },
    // Incorrect with em dash
    {
      text: '[the year 2023—a new era begins](http://example.com)',
      output: '[The Year 2023—a New Era Begins](http://example.com)',
      errors: [
        {
          message: 'Link text should follow AP style: "The Year 2023—a New Era Begins"'
        }
      ]
    }
  ]
});

tester.run("AP Style Title Case Rule on Link Title", rule, {
  valid: [
    // Properly capitalized titles
    '[Link](http://example.com "The Quick Brown Fox")',
    '[Link](http://example.com "A Day in the Life")',
    '[Link](http://example.com "The Cat in the Hat")',
    '[Link](http://example.com "Self-Driving Cars Are Here")',
    // Titles with punctuation
    '[Link](http://example.com "Hello, World: A New Beginning")',
    '[Link](http://example.com "What\'s Up ? A Look at Modern Slang")',
    // Titles with prepositions and conjunctions
    '[Link](http://example.com "The Theory of Relativity")',
    '[Link](http://example.com "War and Peace in Our Time")',
    // Titles with special characters
    '[Link](http://example.com "The Cost-Benefit Analysis")',
    '[Link](http://example.com "The Year 2023—a New Era Begins")',
    // Titles with parentheses
    '[Link](http://example.com "JavaScript (and TypeScript) for Beginners")',
    // Single word title
    '[Link](http://example.com "Documentation")',
    // Title with numbers
    '[Link](http://example.com "The 7 Habits of Highly Effective People")',
    // Title with acronyms (should remain uppercase)
    '[Link](http://example.com "NASA and the Future of Space Travel")'
  ],
  invalid: [
    // All lowercase
    {
      text: '[Link](http://example.com "the quick brown fox")',
      output: '[Link](http://example.com "The Quick Brown Fox")',
      errors: [
        {
          message: 'Link title should follow AP style: "The Quick Brown Fox"'
        }
      ]
    },
    // All uppercase
    {
      text: '[Link](http://example.com "THE QUICK BROWN FOX")',
      output: '[Link](http://example.com "The Quick Brown Fox")',
      errors: [
        {
          message: 'Link title should follow AP style: "The Quick Brown Fox"'
        }
      ]
    },
    // Incorrect capitalization of articles and prepositions
    {
      text: '[Link](http://example.com "The Day In The Life Of A Developer")',
      output: '[Link](http://example.com "The Day in the Life of a Developer")',
      errors: [
        {
          message: 'Link title should follow AP style: "The Day in the Life of a Developer"'
        }
      ]
    },
    // Incorrect hyphenated words
    {
      text: '[Link](http://example.com "self-driving Cars are here")',
      output: '[Link](http://example.com "Self-Driving Cars Are Here")',
      errors: [
        {
          message: 'Link title should follow AP style: "Self-Driving Cars Are Here"'
        }
      ]
    },
    // Incorrect capitalization with punctuation
    {
      text: '[Link](http://example.com "hello, world: a new beginning")',
      output: '[Link](http://example.com "Hello, World: A New Beginning")',
      errors: [
        {
          message: 'Link title should follow AP style: "Hello, World: A New Beginning"'
        }
      ]
    },
    // Incorrect capitalization with parentheses
    {
      text: '[Link](http://example.com "javascript (and typescript) for beginners")',
      output: '[Link](http://example.com "JavaScript (and TypeScript) for Beginners")',
      errors: [
        {
          message: 'Link title should follow AP style: "JavaScript (and TypeScript) for Beginners"'
        }
      ]
    },
    // Incorrect capitalization of first and last words
    {
      text: '[Link](http://example.com "the Quick Brown fox")',
      output: '[Link](http://example.com "The Quick Brown Fox")',
      errors: [
        {
          message: 'Link title should follow AP style: "The Quick Brown Fox"'
        }
      ]
    },
    // Mixed case issues
    {
      text: '[Link](http://example.com "How TO Write GOOD Code")',
      output: '[Link](http://example.com "How to Write Good Code")',
      errors: [
        {
          message: 'Link title should follow AP style: "How to Write Good Code"'
        }
      ]
    },
    // Incorrect with special characters
    {
      text: '[Link](http://example.com "the cost-benefit ANALYSIS")',
      output: '[Link](http://example.com "The Cost-Benefit Analysis")',
      errors: [
        {
          message: 'Link title should follow AP style: "The Cost-Benefit Analysis"'
        }
      ]
    },
    // Incorrect with numbers
    {
      text: '[Link](http://example.com "the 7 habits OF highly effective people")',
      output: '[Link](http://example.com "The 7 Habits of Highly Effective People")',
      errors: [
        {
          message: 'Link title should follow AP style: "The 7 Habits of Highly Effective People"'
        }
      ]
    },
    // Incorrect with multiple spaces
    {
      text: '[Link](http://example.com "the   quick  brown   fox")',
      output: '[Link](http://example.com "The   Quick  Brown   Fox")',
      errors: [
        {
          message: 'Link title should follow AP style: "The   Quick  Brown   Fox"'
        }
      ]
    },
    // Incorrect with em dash
    {
      text: '[Link](http://example.com "the year 2023—a new era begins")',
      output: '[Link](http://example.com "The Year 2023—a New Era Begins")',
      errors: [
        {
          message: 'Link title should follow AP style: "The Year 2023—a New Era Begins"'
        }
      ]
    }
  ]
});

tester.run("AP Style Title Case Rule on Both Link Text and Title", rule, {
  valid: [
    // Both link text and title are properly capitalized
    '[The Quick Brown Fox](http://example.com "The Quick Brown Fox")',
    '[A Day in the Life](http://example.com "Journey Through Time")',
    '[Self-Driving Cars Are Here](http://example.com "The Future of Transportation")',

    // Different correctly formatted titles in text and title
    '[NASA and the Future](http://example.com "Space Exploration in the 21st Century")',
    '[The Theory of Relativity](http://example.com "Einstein\'s Greatest Work")',

    // Special characters in both
    '[The Cost-Benefit Analysis](http://example.com "Making Smart Business Decisions")',
    '[What\'s New in Tech?](http://example.com "Latest Innovations for 2023")',

    // Numbers and acronyms
    '[The 7 Habits of Highly Effective People](http://example.com "IBM\'s Guide to Leadership")',
    '[Covid-19 Research Updates](http://example.com "WHO Guidelines for 2023")',

    // Single word titles
    '[Documentation](http://example.com "Reference")',

    // Punctuation in both
    '[Hello, World: A New Beginning](http://example.com "Programming 101: First Steps")'
  ],
  invalid: [
    // Both link text and title have issues
    {
      text: '[the quick brown fox](http://example.com "the quick brown fox")',
      output: '[The Quick Brown Fox](http://example.com "The Quick Brown Fox")',
      errors: [
        { message: 'Link text should follow AP style: "The Quick Brown Fox", and Link title should follow AP style: "The Quick Brown Fox"' }
      ]
    },
    // Link text correct, title incorrect
    {
      text: '[The Quick Brown Fox](http://example.com "the quick brown fox")',
      output: '[The Quick Brown Fox](http://example.com "The Quick Brown Fox")',
      errors: [
        { message: 'Link title should follow AP style: "The Quick Brown Fox"' }
      ]
    },
    // Link text incorrect, title correct
    {
      text: '[the quick brown fox](http://example.com "The Quick Brown Fox")',
      output: '[The Quick Brown Fox](http://example.com "The Quick Brown Fox")',
      errors: [
        { message: 'Link text should follow AP style: "The Quick Brown Fox"' }
      ]
    },
    // Different issues in text and title
    {
      text: '[THE THEORY OF RELATIVITY](http://example.com "einstein\'s greatest work")',
      output: '[The Theory of Relativity](http://example.com "Einstein\'s Greatest Work")',
      errors: [
        { message: 'Link text should follow AP style: "The Theory of Relativity", and Link title should follow AP style: "Einstein\'s Greatest Work"' }
      ]
    },
    // Prepositions capitalized incorrectly in both
    {
      text: '[A Day In The Life](http://example.com "Journey Through The Time")',
      output: '[A Day in the Life](http://example.com "Journey Through the Time")',
      errors: [
        { message: 'Link text should follow AP style: "A Day in the Life", and Link title should follow AP style: "Journey Through the Time"' }
      ]
    },
    // Special characters and mixed case
    {
      text: '[the cost-benefit ANALYSIS](http://example.com "making SMART business-decisions")',
      output: '[The Cost-Benefit Analysis](http://example.com "Making Smart Business-Decisions")',
      errors: [
        { message: 'Link text should follow AP style: "The Cost-Benefit Analysis", and Link title should follow AP style: "Making Smart Business-Decisions"' }
      ]
    },
    // Numbers and acronyms with issues
    {
      text: '[the 7 habits of highly effective people](http://example.com "ibm\'s guide TO leadership")',
      output: '[The 7 Habits of Highly Effective People](http://example.com "IBM\'s Guide to Leadership")',
      errors: [
        { message: 'Link text should follow AP style: "The 7 Habits of Highly Effective People", and Link title should follow AP style: "IBM\'s Guide to Leadership"' }
      ]
    },
    // Punctuation and capitalization issues
    {
      text: '[hello, world: a new beginning](http://example.com "programming 101: first steps")',
      output: '[Hello, World: A New Beginning](http://example.com "Programming 101: First Steps")',
      errors: [
        { message: 'Link text should follow AP style: "Hello, World: A New Beginning", and Link title should follow AP style: "Programming 101: First Steps"' }
      ]
    },
    // Em dash issues in both
    {
      text: '[the year 2023—a new era](http://example.com "technology—the future is now")',
      output: '[The Year 2023—a New Era](http://example.com "Technology—the Future Is Now")',
      errors: [
        { message: 'Link text should follow AP style: "The Year 2023—a New Era", and Link title should follow AP style: "Technology—the Future Is Now"' }
      ]
    },
    // Parentheses issues in both
    {
      text: '[javascript (and typescript) basics](http://example.com "coding (with examples) for beginners")',
      output: '[JavaScript (and TypeScript) Basics](http://example.com "Coding (With Examples) for Beginners")',
      errors: [
        { message: 'Link text should follow AP style: "JavaScript (and TypeScript) Basics", and Link title should follow AP style: "Coding (With Examples) for Beginners"' }
      ]
    },
    // Multiple spaces in both
    {
      text: '[the   quick  brown   fox](http://example.com "jumps  over   lazy  dog")',
      output: '[The   Quick  Brown   Fox](http://example.com "Jumps  Over   Lazy  Dog")',
      errors: [
        { message: 'Link text should follow AP style: "The   Quick  Brown   Fox", and Link title should follow AP style: "Jumps  Over   Lazy  Dog"' }
      ]
    },
    // Single word issues
    {
      text: '[documentation](http://example.com "reference")',
      output: '[Documentation](http://example.com "Reference")',
      errors: [
        { message: 'Link text should follow AP style: "Documentation", and Link title should follow AP style: "Reference"' }
      ]
    },
    // Complex mixed case with various issues
    {
      text: '[How TO Write GOOD Code](http://example.com "best PRACTICES For software ENGINEERS")',
      output: '[How to Write Good Code](http://example.com "Best Practices for Software Engineers")',
      errors: [
        { message: 'Link text should follow AP style: "How to Write Good Code", and Link title should follow AP style: "Best Practices for Software Engineers"' }
      ]
    }
  ]
});
