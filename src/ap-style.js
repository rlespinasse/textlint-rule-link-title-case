/**
 * Converts a string to AP Style title case
 * @param {string} title - The string to convert
 * @param {string[]} customStopWords - Additional words to treat as stop words
 * @param {Object} customSpecialTerms - Special terms with custom capitalization
 * @return {string} - The AP style title case string
 */
function apStyleTitleCase(title, customStopWords = [], customSpecialTerms = {}) {
  if (!title || typeof title !== 'string') return '';

  // Words that should remain lowercase (unless they're first or last)
  const defaultStopWords = [
    'a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in',
    'nor', 'of', 'on', 'or', 'so', 'the', 'to', 'up', 'yet'
  ];

  const stopWords = [...defaultStopWords, ...(Array.isArray(customStopWords) ? customStopWords : [])];

  // Split the title using the specified splitter characters
  const splitterRegex = /(\s+|[-‑—,:;/!?()"])/;
  const parts = title.split(splitterRegex);

  // Process each part
  const processedParts = [];
  let wordCount = 0;
  const words = parts.filter(part => part && !part.match(splitterRegex));
  let totalWords = words.length;

  // Track if we need to capitalize the next word (after : or — or ? or !)
  let capitalizeNext = false;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    // If it's a separator, keep it as is
    if (!part || part.match(splitterRegex)) {
      processedParts.push(part);

      // Set flag to capitalize next word after certain punctuation
      if (part === ':' || part === '/' || part === '-' || part === '?' || part === '!') {
        capitalizeNext = true;
      }

      continue;
    }

    // It's a word - apply title case rules
    if (wordCount === 0 || wordCount === totalWords - 1 || capitalizeNext) {
      // First or last word or after certain punctuation - always capitalize
      processedParts.push(capitalizeWord(part, customSpecialTerms));
      capitalizeNext = false;
    } else if (stopWords.includes(part.toLowerCase())) {
      // Stop word in the middle - lowercase
      processedParts.push(part.toLowerCase());
    } else if (part.toLowerCase() === 'to') {
      return 'To';
    } else {
      // Other words - capitalize
      processedParts.push(capitalizeWord(part, customSpecialTerms));
    }

    if (part.includes("'")) {
      capitalizeNext = true;
    }

    wordCount++;
  }

  // Join all parts back together (preserving original spacing and punctuation)
  return processedParts.join('');
}

/**
 * Capitalizes the first letter of a word, or uses special capitalization for known terms
 * @param {string} word - The word to capitalize
 * @param {Object} customSpecialTerms - Special terms with custom capitalization
 * @return {string} - The capitalized word
 */
function capitalizeWord(word, customSpecialTerms = {}) {
  if (!word) return '';

  // Special terms with custom capitalization that would be incorrectly handled by standard title case rules
  const defaultSpecialTerms = {
    // Tech products with internal capitalization
    'ipad': 'iPad',
    'iphone': 'iPhone',
    'ipod': 'iPod',
    'imac': 'iMac',
    'ios': 'iOS',
    'macos': 'macOS',
    'watchos': 'watchOS',
    'tvos': 'tvOS',
    'airpods': 'AirPods',
    'github': 'GitHub',
    'gitlab': 'GitLab',
    'bitbucket': 'BitBucket',
    'linkedin': 'LinkedIn',
    'youtube': 'YouTube',
    'wordpress': 'WordPress',
    'woocommerce': 'WooCommerce',
    'paypal': 'PayPal',
    'hashicorp': 'HashiCorp',
    'ibm': 'IBM',
    'aws': 'AWS',
    'whatsapp': 'WhatsApp',

    // Programming terms with specific capitalization
    'javascript': 'JavaScript',
    'typescript': 'TypeScript',
    'nodejs': 'Node.js',
    'reactjs': 'React.js',
    'vuejs': 'Vue.js',
    'angularjs': 'Angular.js',
    'jquery': 'jQuery',
    'nextjs': 'Next.js',
    'nuxtjs': 'Nuxt.js',
    'expressjs': 'Express.js',
    'nestjs': 'Nest.js',
    'graphql': 'GraphQL',
    'postgresql': 'PostgreSQL',
    'mongodb': 'MongoDB',
    'mysql': 'MySQL',
    'mariadb': 'MariaDB',
    'elasticsearch': 'Elasticsearch',
    'circleci': 'CircleCI',
    'travisci': 'TravisCI',
    'eslint': 'ESLint',
    'ocaml': 'OCaml',
    'hlint': 'HLint',

    // Acronyms and technical terms
    'api': 'API',
    'apis': 'APIs',
    'url': 'URL',
    'urls': 'URLs',
    'uri': 'URI',
    'ui': 'UI',
    'ux': 'UX',
    'cli': 'CLI',
    'ci': 'CI',
    'cd': 'CD',
    'cicd': 'CI/CD',
    'pr': 'PR',
    'saas': 'SaaS',
    'paas': 'PaaS',
    'iaas': 'IaaS',
    'html': 'HTML',
    'css': 'CSS',
    'scss': 'SCSS',
    'sass': 'Sass',
    'php': 'PHP',
    'json': 'JSON',
    'yaml': 'YAML',
    'xml': 'XML',
    'csv': 'CSV',
    'sql': 'SQL',
    'nosql': 'NoSQL',
    'http': 'HTTP',
    'https': 'HTTPS',
    'ftp': 'FTP',
    'sftp': 'SFTP',
    'ssh': 'SSH',
    'ssl': 'SSL',
    'tls': 'TLS',
    'jwt': 'JWT',
    'oauth': 'OAuth',
    'saml': 'SAML',
    'cors': 'CORS',
    'cdn': 'CDN',
    'dns': 'DNS',
    'ip': 'IP',
    'tcp': 'TCP',
    'udp': 'UDP',
    'vpn': 'VPN',
    'lan': 'LAN',
    'wan': 'WAN',
    'seo': 'SEO',
    'sem': 'SEM',
    'cta': 'CTA',
    'roi': 'ROI',
    'kpi': 'KPI',
    'crm': 'CRM',
    'cms': 'CMS',
    'erp': 'ERP',
    'hr': 'HR',
    'ai': 'AI',
    'ml': 'ML',
    'nlp': 'NLP',
    'ar': 'AR',
    'vr': 'VR',
    'iot': 'IoT',
    'sdk': 'SDK',
    'ide': 'IDE',
    'vscode': 'VS Code',
    'pdf': 'PDF',
    'jpeg': 'JPEG',
    'jpg': 'JPG',
    'png': 'PNG',
    'gif': 'GIF',
    'svg': 'SVG',
    'webp': 'WebP',
    'mp3': 'MP3',
    'mp4': 'MP4',
    'wav': 'WAV',
    'avi': 'AVI',

    // Geographic and organizational acronyms
    'usa': 'USA',
    'uk': 'UK',
    'eu': 'EU',
    'un': 'UN',
    'nato': 'NATO',
    'nasa': 'NASA',
    'fbi': 'FBI',
    'cia': 'CIA',
    'cdc': 'CDC',
    'who': 'WHO',

    // Academic acronyms
    'phd': 'PhD',
    'ba': 'BA',
    'bs': 'BS',
    'bsc': 'BSc',
    'ma': 'MA',
    'msc': 'MSc',
    'md': 'MD',
    'jd': 'JD',
    'mba': 'MBA',

    // Terms with specific capitalization patterns
    'ecommerce': 'eCommerce',
    'ebook': 'eBook',
    'esports': 'eSports',
    'wifi': 'WiFi',
    'nft': 'NFT',
    'defi': 'DeFi'
  };

  const specialTerms = { ...defaultSpecialTerms, ...customSpecialTerms };

  const lowerWord = word.toLowerCase();
  if (specialTerms[lowerWord]) {
    return specialTerms[lowerWord];
  }

  // Handle hyphenated words
  if (word.includes("-")) {
    const parts = word.split("-");
    return parts.map(part => capitalizeWord(part, customSpecialTerms)).join("-");
  }

  if (word.includes("'")) {
    const parts = word.split("'");
    return capitalizeWord(parts[0], customSpecialTerms) + "'" + parts[1].toLowerCase();
  }

  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

module.exports = apStyleTitleCase;
