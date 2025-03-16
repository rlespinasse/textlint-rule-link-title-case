// Import the AP Style utility function
const apStyleTitleCase = require('./ap-style');

/**
 * TextLint rule to enforce AP Style title case for link titles and text
 * @param {import("@textlint/types").TextlintRuleContext} context - The TextLint rule context
 * @param {Object} options - Rule options
 * @param {string[]} [options.stopWords] - Additional words to treat as stop words
 * @param {Object} [options.specialTerms] - Special terms with custom capitalization
 * @param {boolean} [options.checkLinkTitle=true] - Whether to check link title
 * @param {boolean} [options.checkLinkText=true] - Whether to check link display text
 * @returns {import("@textlint/types").TextlintRuleModule} - The rule object
 */
function reporter(context, options = {}) {
  const { Syntax, RuleError, fixer, getSource } = context;
  const customStopWords = Array.isArray(options.stopWords) ? options.stopWords : [];
  const customSpecialTerms = typeof options.specialTerms === 'object' ? options.specialTerms : {};

  // Default to checking link text, and title unless explicitly disabled
  const checkLinkTitle = options.checkLinkTitle !== false;
  const checkLinkText = options.checkLinkText !== false;

  return {
    // Handle standard links [display text](url "title")
    [Syntax.Link](node) {
      try {
        let needsTextFix = false;
        let needsTitleFix = false;
        let correctedDisplayText = '';
        let correctedTitle = '';
        let originalDisplayText = '';
        let originalTitle = '';
        let textMessage = '';
        let titleMessage = '';
        let completeFixedText = '';
        let textIndex = -1;
        let titleIndex = -1;

        // Check link display text if enabled
        if (checkLinkText) {
          // Extract the display text from the node's children
          let displayText = '';

          // Ignore simple URL link (<link>)
          if (/^<(https?:\/\/[^\s>]+)>$/.test(getSource(node))) {
            return;
          }

          if (node.children && node.children.length > 0) {
            // Skip image link
            if (node.children[0].type === Syntax.Image) {
              return;
            }

            // Combine all text from child nodes
            displayText = node.children.map(child => {
              if (child.type === Syntax.Str) {
                return child.value;
              }
              return getSource(child);
            }).join('');

            // Apply AP Style to the display text
            correctedDisplayText = apStyleTitleCase(displayText, customStopWords, customSpecialTerms);

            // If the display text doesn't match AP style, flag for fixing
            if (displayText !== correctedDisplayText) {
              needsTextFix = true;
              // Find the display text in the raw markdown
              const linkPattern = /\[([^\]]+)\]/;
              const match = node.raw.match(linkPattern);
              if (match && match[1]) {
                originalDisplayText = match[1];
                textMessage = `Link text should follow AP style: "${correctedDisplayText}"`;
                textIndex = node.raw.indexOf(originalDisplayText);
              }
            }
          }
        }

        // Check link title if enabled and title exists
        if (checkLinkTitle && node.title) {
          originalTitle = node.title;
          correctedTitle = apStyleTitleCase(originalTitle, customStopWords, customSpecialTerms);

          // If the title doesn't match AP style, flag for fixing
          if (originalTitle !== correctedTitle) {
            needsTitleFix = true;
            titleMessage = `Link title should follow AP style: "${correctedTitle}"`;
            // Find the title in the raw markdown
            titleIndex = node.raw.indexOf(`"${originalTitle}"`);
            if (titleIndex !== -1) {
              // Add 1 to account for the opening quote
              titleIndex += 1;
            }
          }
        }

        // Create a complete fixed version of the text
        if (needsTextFix || needsTitleFix) {
          completeFixedText = node.raw;

          if (needsTextFix) {
            completeFixedText = completeFixedText.replace(
              `[${originalDisplayText}]`,
              `[${correctedDisplayText}]`
            );

            if (!needsTitleFix) {
              context.report(node, new RuleError(textMessage, {
                index: textIndex,
                fix: fixer.replaceText(node, completeFixedText)
              }));
            }
          }

          if (needsTitleFix) {
            completeFixedText = completeFixedText.replace(
              `"${originalTitle}"`,
              `"${correctedTitle}"`
            );

            if (needsTextFix) {
              context.report(node, new RuleError(textMessage + ', and ' + titleMessage, {
                index: textIndex,
                fix: fixer.replaceText(node, completeFixedText)
              }));
            } else {
              context.report(node, new RuleError(titleMessage, {
                index: titleIndex,
                fix: fixer.replaceText(node, completeFixedText)
              }));
            }
          }
        }
      } catch (error) {
        console.error("Error processing link:", error);
      }
    },

    // Handle link references [text][reference]
    [Syntax.LinkReference](node) {
      if (checkLinkText) {
        try {
          if (node.children && node.children.length > 0) {
            // Skip image link
            if (node.children[0].type === Syntax.Image) {
              return;
            }

            // Extract the display text from the node's children
            let displayText = '';

            // Combine all text from child nodes
            displayText = node.children.map(child => {
              if (child.type === Syntax.Str) {
                return child.value;
              }
              return getSource(child);
            }).join('');

            // Apply AP Style to the display text
            const correctedDisplayText = apStyleTitleCase(displayText, customStopWords, customSpecialTerms);

            // If the display text doesn't match AP style, report an error
            if (displayText !== correctedDisplayText) {
              const message = `Link reference text should follow AP style: "${correctedDisplayText}"`;

              // Find the display text in the raw markdown
              const linkPattern = /\[([^\]]+)\]/;
              const match = node.raw.match(linkPattern);

              if (match && match[1]) {
                const originalDisplayText = match[1];
                const startIndex = node.raw.indexOf(originalDisplayText);

                const ruleError = new RuleError(message, {
                  index: startIndex,
                  fix: fixer.replaceText(
                    node,
                    node.raw.replace(
                      `[${originalDisplayText}]`,
                      `[${correctedDisplayText}]`
                    )
                  )
                });

                context.report(node, ruleError);
              } else {
                // Fallback if regex match fails
                context.report(node, new RuleError(message));
              }
            }
          }
        } catch (error) {
          console.error("Error processing link reference:", error);
        }
      }
    },

    // Handle link reference definitions [id]: url "title"
    [Syntax.Definition](node) {
      // Check title if it exists and checking is enabled
      if (checkLinkTitle && node.title) {
        const originalTitle = node.title;
        const correctedTitle = apStyleTitleCase(originalTitle, customStopWords, customSpecialTerms);

        // If the title doesn't match AP style, report an error
        if (originalTitle !== correctedTitle) {
          const message = `Link definition title should follow AP style: "${correctedTitle}"`;

          // Find the title in the raw markdown
          const titleIndex = node.raw.indexOf(`"${originalTitle}"`);
          if (titleIndex !== -1) {
            // Add 1 to account for the opening quote
            const actualTitleIndex = titleIndex + 1;

            const ruleError = new RuleError(message, {
              index: actualTitleIndex,
              fix: fixer.replaceText(
                node,
                node.raw.replace(`"${originalTitle}"`, `"${correctedTitle}"`)
              )
            });

            context.report(node, ruleError);
          } else {
            // Fallback if we can't find the exact position
            context.report(node, new RuleError(message));
          }
        }
      }
    }
  };
}

// Export the rule with both linter and fixer functionality
module.exports = {
  linter: reporter,
  fixer: reporter
};
