/**
 * WebToolsHub - Global Common Script
 * Provides theme toggle, search modal (Ctrl+K), toast notifications, and tool registry.
 */

// Immediate Theme Application (Prevents Flash of Light/Dark Theme)
(function() {
  try {
    const saved = localStorage.getItem("wth_theme") || 
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", saved);
  } catch(e) {}
})();

// Tools Registry for global search and dynamic listings
const ALL_TOOLS = [
  {
    id: "image-compressor",
    title: "Image Compressor",
    desc: "Compress JPEG, PNG, and WebP images with customizable quality while preserving visual clarity.",
    category: "images",
    categoryLabel: "Images",
    url: "image-compressor.html",
    icon: "🖼️",
    badge: "Popular"
  },
  {
    id: "qr-code-generator",
    title: "QR Code Generator",
    desc: "Create customizable QR codes for links, text, Wi-Fi passwords, and contact info with PNG/SVG export.",
    category: "web",
    categoryLabel: "Web & Sharing",
    url: "qr-code-generator.html",
    icon: "📱",
    badge: "Free"
  },
  {
    id: "word-counter",
    title: "Word Counter & Analyzer",
    desc: "Count words, characters, sentences, paragraphs, reading time, speaking time, and keyword frequency.",
    category: "text",
    categoryLabel: "Text Tools",
    url: "word-counter.html",
    icon: "📝",
    badge: "Fast"
  },
  {
    id: "case-converter",
    title: "Case Converter",
    desc: "Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case, and more.",
    category: "text",
    categoryLabel: "Text Tools",
    url: "case-converter.html",
    icon: "🔤",
    badge: "Instant"
  },
  {
    id: "password-generator",
    title: "Password Generator",
    desc: "Generate strong, secure, cryptographically random passwords with custom lengths, symbols, and entropy score.",
    category: "security",
    categoryLabel: "Security",
    url: "password-generator.html",
    icon: "🔐",
    badge: "Secure"
  },
  {
    id: "json-formatter",
    title: "JSON Formatter & Validator",
    desc: "Beautify, validate, format, and minify JSON data with instant syntax error highlighting and tree preview.",
    category: "beautifier",
    categoryLabel: "Beautifiers",
    url: "json-formatter.html",
    icon: "✨",
    badge: "Beautifier"
  },
  {
    id: "url-encoder-decoder",
    title: "URL Encoder & Decoder",
    desc: "Safely encode and decode Uniform Resource Identifiers (URIs) and query parameters with single-click copy.",
    category: "web",
    categoryLabel: "Developer",
    url: "url-encoder-decoder.html",
    icon: "🔗",
    badge: "Utility"
  },
  {
    id: "percentage-calculator",
    title: "Percentage Calculator",
    desc: "Calculate percentages, percentage increases, decreases, fractions, and percentage differences instantly.",
    category: "math",
    categoryLabel: "Calculators",
    url: "percentage-calculator.html",
    icon: "➗",
    badge: "Math"
  },
  {
    id: "unit-converter",
    title: "Unit Converter",
    desc: "Convert units across length, weight/mass, digital storage, temperature, and speed with exact conversions.",
    category: "math",
    categoryLabel: "Calculators",
    url: "unit-converter.html",
    icon: "⚖️",
    badge: "Multi-Unit"
  },
  {
    id: "pdf-utilities",
    title: "PDF Utilities (Image to PDF)",
    desc: "Convert photos and images into a single clean PDF document completely inside your browser.",
    category: "pdf",
    categoryLabel: "PDF Tools",
    url: "pdf-utilities.html",
    icon: "📄",
    badge: "Privacy First"
  },
  {
    id: "color-picker",
    title: "Color Picker & Palette Converter",
    desc: "Pick colors, convert HEX, RGB, HSL, check WCAG contrast ratio, and generate harmonious palettes.",
    category: "design",
    categoryLabel: "Design & Dev",
    url: "color-picker.html",
    icon: "🎨",
    badge: "Design"
  },
  {
    id: "hash-generator",
    title: "Hash Generator & Checksum",
    desc: "Generate SHA-256, SHA-512, SHA-1, and MD5 hashes for text and local files securely.",
    category: "security",
    categoryLabel: "Security",
    url: "hash-generator.html",
    icon: "🛡️",
    badge: "Crypto"
  },
  {
    id: "lorem-ipsum-generator",
    title: "Lorem Ipsum Generator",
    desc: "Generate placeholder filler text by paragraphs, sentences, or words with custom HTML tags.",
    category: "text",
    categoryLabel: "Text Tools",
    url: "lorem-ipsum-generator.html",
    icon: "📜",
    badge: "Writing"
  },
  {
    id: "markdown-previewer",
    title: "Markdown Live Editor",
    desc: "Real-time Markdown editor with live preview, HTML export, table styling, and syntax highlighting.",
    category: "text",
    categoryLabel: "Text Tools",
    url: "markdown-previewer.html",
    icon: "📑",
    badge: "Live Edit"
  },
  {
    id: "text-diff",
    title: "Text & Code Diff Checker",
    desc: "Compare two text snippets or code blocks side-by-side with additions and deletions highlighted.",
    category: "text",
    categoryLabel: "Developer",
    url: "text-diff.html",
    icon: "⚖️",
    badge: "Compare"
  },
  {
    id: "slug-generator",
    title: "URL Slug Generator",
    desc: "Convert text titles into clean, lowercase, URL-safe slugs with customizable delimiters.",
    category: "text",
    categoryLabel: "SEO & Web",
    url: "slug-generator.html",
    icon: "🔗",
    badge: "SEO"
  },
  {
    id: "base64-encoder-decoder",
    title: "Base64 Encoder & Decoder",
    desc: "Encode and decode text, UTF-8 unicode strings, and binary data files into Base64 format.",
    category: "developer",
    categoryLabel: "Developer",
    url: "base64-encoder-decoder.html",
    icon: "🔣",
    badge: "Utility"
  },
  {
    id: "html-entity-encoder",
    title: "HTML Entity Encoder",
    desc: "Escape special characters like <, >, &, and quotes into safe HTML entities and unescape back.",
    category: "developer",
    categoryLabel: "Developer",
    url: "html-entity-encoder.html",
    icon: "🏷️",
    badge: "Web Dev"
  },
  {
    id: "css-minifier",
    title: "CSS Minifier & Beautifier",
    desc: "Compress CSS stylesheets by stripping whitespace and comments, or beautify minified styles.",
    category: "developer",
    categoryLabel: "Developer",
    url: "css-minifier.html",
    icon: "🎨",
    badge: "Speed"
  },
  {
    id: "js-minifier",
    title: "JavaScript Minifier",
    desc: "Minify JavaScript code by removing comments, blank lines, and unnecessary spaces.",
    category: "developer",
    categoryLabel: "Developer",
    url: "js-minifier.html",
    icon: "⚡",
    badge: "Speed"
  },
  {
    id: "ip-lookup",
    title: "IP Address & Network Lookup",
    desc: "Check your public IP address, ISP provider, geolocation, and validate IPv4/IPv6 formats.",
    category: "web",
    categoryLabel: "Network & Security",
    url: "ip-lookup.html",
    icon: "🌐",
    badge: "Network"
  },
  {
    id: "user-agent-parser",
    title: "User Agent Parser & Tester",
    desc: "Parse and inspect User-Agent header strings to identify browser engine, OS, and device type.",
    category: "web",
    categoryLabel: "Web & Sharing",
    url: "user-agent-parser.html",
    icon: "🖥️",
    badge: "Browser"
  },
  {
    id: "meta-tag-generator",
    title: "Meta Tag & OG Generator",
    desc: "Generate HTML meta tags, Open Graph (OG), and Twitter Cards with real-time Google search snippet previews.",
    category: "web",
    categoryLabel: "SEO & Web",
    url: "meta-tag-generator.html",
    icon: "🏷️",
    badge: "SEO"
  },
  {
    id: "http-status-codes",
    title: "HTTP Status Codes Directory",
    desc: "Search and reference standard HTTP response codes (1xx, 2xx, 3xx, 4xx, 5xx) with RFC definitions.",
    category: "web",
    categoryLabel: "Developer",
    url: "http-status-codes.html",
    icon: "🚦",
    badge: "Reference"
  },
  {
    id: "uuid-generator",
    title: "UUID / GUID Generator (v4)",
    desc: "Generate cryptographically secure RFC 4122 v4 UUIDs individually or in bulk with format options.",
    category: "security",
    categoryLabel: "Developer",
    url: "uuid-generator.html",
    icon: "🆔",
    badge: "Secure"
  },
  {
    id: "timestamp-converter",
    title: "Unix Timestamp Converter",
    desc: "Convert Unix Epoch seconds and milliseconds to human-readable dates and back with live counter.",
    category: "math",
    categoryLabel: "Developer",
    url: "timestamp-converter.html",
    icon: "⏱️",
    badge: "Date/Time"
  },
  {
    id: "number-base-converter",
    title: "Number Base Converter",
    desc: "Convert numbers simultaneously between Binary (2), Octal (8), Decimal (10), and Hexadecimal (16).",
    category: "math",
    categoryLabel: "Calculators",
    url: "number-base-converter.html",
    icon: "🔢",
    badge: "Math"
  },
  {
    id: "credit-card-validator",
    title: "Credit Card Validator",
    desc: "Validate card numbers client-side with the MOD-10 Luhn algorithm and identify card networks.",
    category: "security",
    categoryLabel: "Security",
    url: "credit-card-validator.html",
    icon: "💳",
    badge: "Luhn Check"
  },
  {
    id: "svg-to-png",
    title: "SVG to PNG Converter",
    desc: "Render vector SVG markup and files into high-resolution transparent PNG images.",
    category: "images",
    categoryLabel: "Images",
    url: "svg-to-png.html",
    icon: "🖼️",
    badge: "Graphics"
  },
  {
    id: "favicon-generator",
    title: "Favicon Generator & Icon Maker",
    desc: "Design website favicons from emojis, text, or shapes and export multi-resolution icons with HTML tags.",
    category: "images",
    categoryLabel: "Images",
    url: "favicon-generator.html",
    icon: "⭐",
    badge: "Brand"
  },
  {
    id: "aspect-ratio-calculator",
    title: "Aspect Ratio Calculator",
    desc: "Calculate proportional width and height for video, photography, and responsive UI layouts.",
    category: "math",
    categoryLabel: "Calculators",
    url: "aspect-ratio-calculator.html",
    icon: "📐",
    badge: "Design/Math"
  },
  // --- Category 1: Text & Content Tools ---
  {
    id: "character-counter",
    title: "Character Counter",
    desc: "Count characters with and without spaces, words, sentences, and byte size in real time.",
    category: "text",
    categoryLabel: "Text Tools",
    url: "character-counter.html",
    icon: "🔢",
    badge: "Text"
  },
  {
    id: "remove-duplicate-lines",
    title: "Remove Duplicate Lines",
    desc: "Strip duplicate lines, preserve or sort order, trim whitespace, and remove empty rows.",
    category: "text",
    categoryLabel: "Text Tools",
    url: "remove-duplicate-lines.html",
    icon: "🧹",
    badge: "Utility"
  },
  {
    id: "markdown-table-generator",
    title: "Markdown Table Generator",
    desc: "Build, style, align, and export clean Markdown tables with instant HTML/CSV copy.",
    category: "text",
    categoryLabel: "Text Tools",
    url: "markdown-table-generator.html",
    icon: "📊",
    badge: "Writer"
  },
  {
    id: "ascii-art-generator",
    title: "ASCII Art & Banner Generator",
    desc: "Convert plain text into stylized retro FIGlet ASCII banners and terminal art.",
    category: "text",
    categoryLabel: "Text Tools",
    url: "ascii-art-generator.html",
    icon: "👾",
    badge: "Fun"
  },
  {
    id: "rot13-cipher",
    title: "ROT13 & Caesar Cipher",
    desc: "Encrypt and decrypt text with the classic ROT13 cipher or customizable letter shifts.",
    category: "text",
    categoryLabel: "Text Tools",
    url: "rot13-cipher.html",
    icon: "🔄",
    badge: "Crypto"
  },
  {
    id: "line-counter-sorter",
    title: "Line Counter & Sorter",
    desc: "Sort text lines alphabetically (A-Z, Z-A), natural sort, number lines, and invert list.",
    category: "text",
    categoryLabel: "Text Tools",
    url: "line-counter-sorter.html",
    icon: "🔤",
    badge: "Text"
  },
  {
    id: "random-word-generator",
    title: "Random Word Generator",
    desc: "Generate random English words, nouns, verbs, and adjectives for games and brainstorming.",
    category: "text",
    categoryLabel: "Text Tools",
    url: "random-word-generator.html",
    icon: "🎲",
    badge: "Creative"
  },
  {
    id: "binary-to-text",
    title: "Binary to Text & Text to Binary",
    desc: "Encode ASCII text into 8-bit binary strings and decode binary code back to readable text.",
    category: "text",
    categoryLabel: "Text Tools",
    url: "binary-to-text.html",
    icon: "0️⃣1️⃣",
    badge: "Converter"
  },
  // --- Category 2: Security & Cryptography Tools ---
  {
    id: "password-strength-checker",
    title: "Password Strength Checker",
    desc: "Evaluate password security, entropy bits, crack time estimation, and common flaw detection.",
    category: "security",
    categoryLabel: "Security",
    url: "password-strength-checker.html",
    icon: "🛡️",
    badge: "Security"
  },
  {
    id: "jwt-decoder",
    title: "JWT Decoder & Token Inspector",
    desc: "Decode JSON Web Tokens (JWT) client-side into JSON header, payload claims, and expiration date.",
    category: "security",
    categoryLabel: "Security",
    url: "jwt-decoder.html",
    icon: "🔑",
    badge: "Dev/Sec"
  },
  {
    id: "hmac-generator",
    title: "HMAC Generator",
    desc: "Generate keyed-hash message authentication codes (HMAC) using SHA-256, SHA-512, and SHA-1.",
    category: "security",
    categoryLabel: "Security",
    url: "hmac-generator.html",
    icon: "🔒",
    badge: "Auth"
  },
  {
    id: "bcrypt-generator",
    title: "Bcrypt Hash Generator & Verifier",
    desc: "Hash passwords with salted Bcrypt algorithms and verify hashes against plaintext passwords.",
    category: "security",
    categoryLabel: "Security",
    url: "bcrypt-generator.html",
    icon: "🛡️",
    badge: "Crypto"
  },
  {
    id: "csr-generator",
    title: "CSR & RSA Keypair Generator",
    desc: "Create Certificate Signing Requests (CSR) and 2048-bit RSA private keys locally in-browser.",
    category: "security",
    categoryLabel: "Security",
    url: "csr-generator.html",
    icon: "📜",
    badge: "SSL"
  },
  {
    id: "test-data-generator",
    title: "Dummy Test Data Generator",
    desc: "Generate realistic fake user profiles, names, email addresses, and addresses in JSON/CSV.",
    category: "security",
    categoryLabel: "Security & Dev",
    url: "test-data-generator.html",
    icon: "👤",
    badge: "Mock"
  },
  {
    id: "url-cleaner",
    title: "URL Cleaner & Tracking Stripper",
    desc: "Remove UTM parameters, fbclid, gclid, and referral tracker tokens from URLs.",
    category: "web",
    categoryLabel: "Security & Web",
    url: "url-cleaner.html",
    icon: "🧼",
    badge: "Privacy"
  },
  {
    id: "mnemonic-generator",
    title: "BIP-39 Mnemonic Seed Generator",
    desc: "Generate secure 12, 18, and 24-word crypto seed recovery mnemonics locally with CSPRNG entropy.",
    category: "security",
    categoryLabel: "Security",
    url: "mnemonic-generator.html",
    icon: "🌱",
    badge: "Crypto"
  },
  // --- Category 3: Web, SEO & Network Tools ---
  {
    id: "robots-txt-generator",
    title: "Robots.txt Generator",
    desc: "Create standardized robots.txt directives for Googlebot, Bingbot, and search web crawlers.",
    category: "web",
    categoryLabel: "SEO & Web",
    url: "robots-txt-generator.html",
    icon: "🤖",
    badge: "SEO"
  },
  {
    id: "sitemap-generator",
    title: "XML Sitemap Generator",
    desc: "Build clean Google-compliant XML sitemaps with change frequency and priority tags.",
    category: "web",
    categoryLabel: "SEO & Web",
    url: "sitemap-generator.html",
    icon: "🗺️",
    badge: "SEO"
  },
  {
    id: "dns-lookup",
    title: "DNS Records Lookup",
    desc: "Query live DNS records including A, AAAA, MX, TXT, CNAME, and NS via Google/Cloudflare DoH.",
    category: "web",
    categoryLabel: "SEO & Web",
    url: "dns-lookup.html",
    icon: "🔍",
    badge: "Network"
  },
  {
    id: "http-status-checker",
    title: "HTTP Status Code Inspector",
    desc: "Test server response codes, HTTP redirects, and SSL status for any public web endpoint.",
    category: "web",
    categoryLabel: "SEO & Web",
    url: "http-status-checker.html",
    icon: "🌐",
    badge: "DevOps"
  },
  {
    id: "url-shortener",
    title: "Quick Link Shortener & Redirection",
    desc: "Generate compact hash links, QR codes, and quick redirect bundles client-side.",
    category: "web",
    categoryLabel: "SEO & Web",
    url: "url-shortener.html",
    icon: "✂️",
    badge: "Web"
  },
  {
    id: "og-card-previewer",
    title: "Social Media Meta & OG Previewer",
    desc: "Live preview Open Graph tags and visual card mockups for Twitter, Facebook, and LinkedIn.",
    category: "web",
    categoryLabel: "SEO & Web",
    url: "og-card-previewer.html",
    icon: "👁️",
    badge: "Social"
  },
  {
    id: "ping-tester",
    title: "Ping & Network Latency Tester",
    desc: "Benchmark HTTP connection latency, network jitter, and round-trip times to global CDN servers.",
    category: "web",
    categoryLabel: "SEO & Web",
    url: "ping-tester.html",
    icon: "📶",
    badge: "Network"
  },
  {
    id: "subnet-calculator",
    title: "IP Subnet Calculator (CIDR)",
    desc: "Calculate network address, broadcast address, netmask, usable host range, and wildcard masks.",
    category: "web",
    categoryLabel: "SEO & Web",
    url: "subnet-calculator.html",
    icon: "🖧",
    badge: "Network"
  },
  // --- Category 4: Developer & Coding Utilities ---
  {
    id: "html-formatter",
    title: "HTML Formatter & Beautifier",
    desc: "Indent, clean, format, and structure unorganized HTML documents with configurable spaces.",
    category: "beautifier",
    categoryLabel: "Beautifiers",
    url: "html-formatter.html",
    icon: "🌐",
    badge: "Beautifier"
  },
  {
    id: "xml-formatter",
    title: "XML Formatter & Beautifier",
    desc: "Indent and prettify raw XML feeds, SOAP payloads, and configuration files with syntax trees.",
    category: "beautifier",
    categoryLabel: "Beautifiers",
    url: "xml-formatter.html",
    icon: "📑",
    badge: "Beautifier"
  },
  {
    id: "api-tester",
    title: "REST API Tester & Client",
    desc: "Send GET, POST, PUT, DELETE HTTP requests with custom headers, JSON body, and response preview.",
    category: "developer",
    categoryLabel: "Developer",
    url: "api-tester.html",
    icon: "🚀",
    badge: "API"
  },
  {
    id: "regex-tester",
    title: "Regex Tester & Debugger",
    desc: "Test Regular Expressions with live match highlighting, regex flags, and sample match groups.",
    category: "developer",
    categoryLabel: "Developer",
    url: "regex-tester.html",
    icon: "🔍",
    badge: "Dev"
  },
  {
    id: "cron-generator",
    title: "Cron Expression Generator",
    desc: "Build, parse, and schedule standard 5-part crontab expressions with human-readable descriptions.",
    category: "developer",
    categoryLabel: "Developer",
    url: "cron-generator.html",
    icon: "⏰",
    badge: "DevOps"
  },
  {
    id: "chmod-calculator",
    title: "Chmod Permissions Calculator",
    desc: "Calculate Linux file permissions in octal (e.g. 755, 644) and symbolic (rwxr-xr-x) notations.",
    category: "developer",
    categoryLabel: "Developer",
    url: "chmod-calculator.html",
    icon: "🐧",
    badge: "Linux"
  },
  {
    id: "curl-converter",
    title: "cURL to Code Converter",
    desc: "Convert cURL terminal commands into executable JavaScript Fetch, Python Requests, Node.js, and PHP.",
    category: "developer",
    categoryLabel: "Developer",
    url: "curl-converter.html",
    icon: "🔄",
    badge: "Dev"
  },
  {
    id: "json-csv-converter",
    title: "JSON to CSV & CSV to JSON",
    desc: "Convert datasets between JSON array objects and tabular CSV spreadsheets with instant download.",
    category: "developer",
    categoryLabel: "Developer",
    url: "json-csv-converter.html",
    icon: "📊",
    badge: "Data"
  },
  {
    id: "yaml-json-converter",
    title: "YAML to JSON & JSON to YAML",
    desc: "Convert configuration files seamlessly between YAML and JSON format with full syntax validation.",
    category: "developer",
    categoryLabel: "Developer",
    url: "yaml-json-converter.html",
    icon: "⚙️",
    badge: "DevOps"
  },
  // --- Category 5: File, Image & Media Tools ---
  {
    id: "image-resizer",
    title: "Image Resizer",
    desc: "Resize photos by pixel dimensions or percentages with aspect ratio lock and PNG/JPEG export.",
    category: "images",
    categoryLabel: "Images",
    url: "image-resizer.html",
    icon: "📐",
    badge: "Images"
  },
  {
    id: "image-converter",
    title: "Image Format Converter",
    desc: "Convert images seamlessly between PNG, JPEG, WebP, and BMP format locally in your browser.",
    category: "images",
    categoryLabel: "Images",
    url: "image-converter.html",
    icon: "🔄",
    badge: "Images"
  },
  {
    id: "image-color-extractor",
    title: "Image Color Extractor & Palette",
    desc: "Extract dominant color palettes and HEX/RGB codes from any uploaded photograph.",
    category: "design",
    categoryLabel: "Images",
    url: "image-color-extractor.html",
    icon: "🎨",
    badge: "Palette"
  },
  {
    id: "exif-viewer",
    title: "EXIF Data Viewer & Stripper",
    desc: "Inspect camera settings, GPS geolocation tags, lens specs, and strip EXIF for privacy.",
    category: "images",
    categoryLabel: "Images",
    url: "exif-viewer.html",
    icon: "📷",
    badge: "Privacy"
  },
  {
    id: "pdf-merger",
    title: "PDF Merger",
    desc: "Combine multiple PDF documents into a single consolidated PDF file completely client-side.",
    category: "pdf",
    categoryLabel: "PDF Tools",
    url: "pdf-merger.html",
    icon: "📑",
    badge: "PDF"
  },
  {
    id: "pdf-splitter",
    title: "PDF Splitter",
    desc: "Extract page ranges, split PDF documents, and save selected pages as separate PDF files.",
    category: "pdf",
    categoryLabel: "PDF Tools",
    url: "pdf-splitter.html",
    icon: "✂️",
    badge: "PDF"
  },
  {
    id: "pdf-to-image",
    title: "PDF to Image Converter",
    desc: "Render PDF document pages into high-resolution PNG and JPEG image files locally in-browser.",
    category: "pdf",
    categoryLabel: "PDF Tools",
    url: "pdf-to-image.html",
    icon: "🖼️",
    badge: "PDF"
  },
  {
    id: "base64-image-converter",
    title: "Base64 Image Encoder & Decoder",
    desc: "Convert images to Base64 data URIs for inline CSS/HTML and decode Base64 strings to images.",
    category: "images",
    categoryLabel: "Images",
    url: "base64-image-converter.html",
    icon: "🔣",
    badge: "Dev"
  },
  // --- Category 6: Math, Financial & Conversion ---
  {
    id: "currency-converter",
    title: "Currency Converter",
    desc: "Calculate live foreign exchange rates between USD, EUR, GBP, JPY, CAD, and 30+ world currencies.",
    category: "math",
    categoryLabel: "Calculators",
    url: "currency-converter.html",
    icon: "💱",
    badge: "Finance"
  },
  {
    id: "age-calculator",
    title: "Age Calculator & Chronometer",
    desc: "Calculate exact chronological age in years, months, days, hours, and find upcoming birthdays.",
    category: "utility",
    categoryLabel: "Calculators",
    url: "age-calculator.html",
    icon: "🎂",
    badge: "Date"
  },
  {
    id: "timezone-converter",
    title: "Time Zone Converter",
    desc: "Compare international meeting times across UTC, EST, PST, GMT, CET, JST, and global zones.",
    category: "info",
    categoryLabel: "Calculators",
    url: "timezone-converter.html",
    icon: "🌍",
    badge: "Time"
  },
  {
    id: "loan-calculator",
    title: "Loan & Mortgage Calculator",
    desc: "Calculate monthly loan EMI payments, total interest payable, and generate full amortization tables.",
    category: "math",
    categoryLabel: "Calculators",
    url: "loan-calculator.html",
    icon: "🏦",
    badge: "Finance"
  },
  {
    id: "compound-interest-calculator",
    title: "Compound Interest Calculator",
    desc: "Calculate investment growth, compound annual interest gains, and future investment portfolios.",
    category: "math",
    categoryLabel: "Calculators",
    url: "compound-interest-calculator.html",
    icon: "📈",
    badge: "Finance"
  },
  {
    id: "discount-calculator",
    title: "Discount & Sales Tax Calculator",
    desc: "Calculate final purchase price, savings amounts, and sales tax percentages instantly.",
    category: "math",
    categoryLabel: "Calculators",
    url: "discount-calculator.html",
    icon: "🏷️",
    badge: "Shopping"
  },
  {
    id: "programmer-calculator",
    title: "Programmer Calculator",
    desc: "Perform bitwise AND, OR, XOR, NOT, shift operations, and 64-bit integer calculations in HEX/BIN/OCT.",
    category: "math",
    categoryLabel: "Calculators",
    url: "programmer-calculator.html",
    icon: "💻",
    badge: "Dev"
  },
  {
    id: "bmi-calculator",
    title: "BMI & Body Mass Calculator",
    desc: "Calculate Body Mass Index (BMI) using metric or imperial units with WHO health category breakdown.",
    category: "math",
    categoryLabel: "Calculators",
    url: "bmi-calculator.html",
    icon: "⚖️",
    badge: "Health"
  },
  // --- Category 7: Design & CSS Generators ---
  {
    id: "css-box-shadow-generator",
    title: "CSS Box Shadow Generator",
    desc: "Visual designer for single and multi-layer CSS box shadows with live interactive preview.",
    category: "design",
    categoryLabel: "Design Tools",
    url: "css-box-shadow-generator.html",
    icon: "📦",
    badge: "CSS"
  },
  {
    id: "css-gradient-generator",
    title: "CSS Gradient Generator",
    desc: "Design linear and radial CSS background gradients with customizable color stops and CSS export.",
    category: "design",
    categoryLabel: "Design Tools",
    url: "css-gradient-generator.html",
    icon: "🌈",
    badge: "CSS"
  },
  {
    id: "glassmorphism-generator",
    title: "Glassmorphism CSS Generator",
    desc: "Create frosted glass UI cards with CSS backdrop-filter blur, border highlights, and opacity.",
    category: "design",
    categoryLabel: "Design Tools",
    url: "glassmorphism-generator.html",
    icon: "🪟",
    badge: "UI"
  },
  {
    id: "border-radius-generator",
    title: "Border Radius Generator",
    desc: "Design 8-point fancy border-radius organic shapes and blobs with ready-to-copy CSS.",
    category: "design",
    categoryLabel: "Design Tools",
    url: "border-radius-generator.html",
    icon: "⭕",
    badge: "CSS"
  },
  {
    id: "clip-path-generator",
    title: "CSS Clip-Path Generator",
    desc: "Mask HTML elements and images into geometric polygons, triangles, stars, hexagons, and banners.",
    category: "design",
    categoryLabel: "Design Tools",
    url: "clip-path-generator.html",
    icon: "✂️",
    badge: "CSS"
  },
  {
    id: "contrast-checker",
    title: "WCAG Color Contrast Checker",
    desc: "Test foreground and background color combinations for WCAG 2.1 AA and AAA accessibility.",
    category: "design",
    categoryLabel: "Design Tools",
    url: "contrast-checker.html",
    icon: "♿",
    badge: "A11y"
  },
  {
    id: "css-grid-generator",
    title: "CSS Grid Layout Generator",
    desc: "Design custom CSS Grid layouts interactively with dynamic columns, rows, and gaps.",
    category: "design",
    categoryLabel: "Design Tools",
    url: "css-grid-generator.html",
    icon: "📐",
    badge: "CSS"
  },
  {
    id: "svg-wave-generator",
    title: "SVG Wave & Divider Generator",
    desc: "Generate organic, customizable SVG wave transitions and section dividers for modern web pages.",
    category: "design",
    categoryLabel: "Design Tools",
    url: "svg-wave-generator.html",
    icon: "🌊",
    badge: "Vector"
  },
  // --- Category 8: Information, Lookup & Reference ---
  {
    id: "weather-checker",
    title: "Live Weather Checker & Forecast",
    desc: "Check real-time temperatures, atmospheric conditions, and 7-day forecasts for worldwide cities.",
    category: "info",
    categoryLabel: "Information",
    url: "weather-checker.html",
    icon: "🌤️",
    badge: "Live"
  },
  {
    id: "country-info",
    title: "Country Information Explorer",
    desc: "Lookup official country flags, capitals, population statistics, currencies, and dialing codes.",
    category: "info",
    categoryLabel: "Information",
    url: "country-info.html",
    icon: "🌐",
    badge: "Atlas"
  },
  {
    id: "dictionary",
    title: "English Dictionary & Pronunciation",
    desc: "Search comprehensive word definitions, phonetics, audio pronunciations, and synonyms.",
    category: "info",
    categoryLabel: "Information",
    url: "dictionary.html",
    icon: "📖",
    badge: "Lexicon"
  },
  {
    id: "random-facts",
    title: "Random Facts & Trivia Generator",
    desc: "Learn astonishing, verified facts across science, technology, nature, history, and the universe.",
    category: "info",
    categoryLabel: "Information",
    url: "random-facts.html",
    icon: "💡",
    badge: "Trivia"
  },
  {
    id: "mac-lookup",
    title: "MAC Address & OUI Lookup",
    desc: "Find hardware manufacturers, identify network card vendors, and parse MAC frame architectures.",
    category: "web",
    categoryLabel: "Network & Web",
    url: "mac-lookup.html",
    icon: "🏷️",
    badge: "Network"
  },
  {
    id: "port-lookup",
    title: "TCP/UDP Port Lookup",
    desc: "Search network ports, transport protocols (TCP/UDP), and standard internet service assignments.",
    category: "web",
    categoryLabel: "Network & Web",
    url: "port-lookup.html",
    icon: "📡",
    badge: "Network"
  },
  {
    id: "mime-types",
    title: "MIME Types Directory",
    desc: "Lookup standard HTTP Content-Type headers, IANA media formats, and matching file extensions.",
    category: "developer",
    categoryLabel: "Developer",
    url: "mime-types.html",
    icon: "📑",
    badge: "Dev"
  },
  // --- Category 9: Daily Productivity & Utilities ---
  {
    id: "barcode-generator",
    title: "Online Barcode Generator",
    desc: "Create retail, inventory, and logistics barcodes (Code 128, EAN-13, UPC) with SVG/PNG exports.",
    category: "utility",
    categoryLabel: "Utility Tools",
    url: "barcode-generator.html",
    icon: "🏷️",
    badge: "Barcode"
  },
  {
    id: "stopwatch-timer",
    title: "Online Stopwatch & Lap Recorder",
    desc: "Accurate millisecond stopwatch with lap splits, fastest/slowest lap comparison, and export.",
    category: "utility",
    categoryLabel: "Utility Tools",
    url: "stopwatch-timer.html",
    icon: "⏱️",
    badge: "Timer"
  },
  {
    id: "pomodoro-timer",
    title: "Pomodoro Focus Timer",
    desc: "Boost productivity with structured 25-minute work intervals and mindful recharge breaks.",
    category: "utility",
    categoryLabel: "Utility Tools",
    url: "pomodoro-timer.html",
    icon: "🍅",
    badge: "Focus"
  },
  {
    id: "random-picker",
    title: "Random Picker & Decision Maker",
    desc: "Draw fair random winners from lists, make quick decisions, or choose raffle entries.",
    category: "utility",
    categoryLabel: "Utility Tools",
    url: "random-picker.html",
    icon: "🎲",
    badge: "Picker"
  },
  {
    id: "scratchpad",
    title: "Online Scratchpad & Quick Notes",
    desc: "Distraction-free auto-saving notepad. Draft thoughts and snippets securely in your browser.",
    category: "utility",
    categoryLabel: "Utility Tools",
    url: "scratchpad.html",
    icon: "📝",
    badge: "Notes"
  },
  {
    id: "typing-test",
    title: "Live Typing Speed Test",
    desc: "Benchmark your Words Per Minute (WPM), keystroke precision, and typing accuracy in real time.",
    category: "utility",
    categoryLabel: "Utility Tools",
    url: "typing-test.html",
    icon: "⌨️",
    badge: "WPM"
  },
  {
    id: "morse-code-translator",
    title: "Morse Code Translator & Audio",
    desc: "Translate text to Morse code and decode back with synthesized telegraph audio playback.",
    category: "utility",
    categoryLabel: "Utility Tools",
    url: "morse-code-translator.html",
    icon: "📻",
    badge: "Audio"
  },
  // --- Category 10: Code Beautifiers & Formatters ---
  {
    id: "javascript-beautifier",
    title: "JavaScript Beautifier",
    desc: "Clean up, un-minify, and pretty-print JavaScript code with custom indentation and brace styles.",
    category: "beautifier",
    categoryLabel: "Beautifiers",
    url: "javascript-beautifier.html",
    icon: "🟨",
    badge: "Popular"
  },
  {
    id: "css-beautifier",
    title: "CSS Beautifier & Formatter",
    desc: "Un-minify stylesheets, format selectors, standardize indentations, and sort properties alphabetically.",
    category: "beautifier",
    categoryLabel: "Beautifiers",
    url: "css-beautifier.html",
    icon: "🎨",
    badge: "CSS"
  },
  {
    id: "sql-formatter",
    title: "SQL Formatter & Query Beautifier",
    desc: "Format, beautify, and indent raw database queries for MySQL, PostgreSQL, SQLite, and SQL Server.",
    category: "beautifier",
    categoryLabel: "Beautifiers",
    url: "sql-formatter.html",
    icon: "🗄️",
    badge: "SQL"
  },
  {
    id: "python-beautifier",
    title: "Python Beautifier & Indenter",
    desc: "Standardize Python indentation, clean operator spacing, and align functions conforming to PEP 8.",
    category: "beautifier",
    categoryLabel: "Beautifiers",
    url: "python-beautifier.html",
    icon: "🐍",
    badge: "Python"
  },
  {
    id: "markdown-formatter",
    title: "Markdown Formatter & Table Beautifier",
    desc: "Align markdown tables into clean text spreadsheets and standardize headings, lists, and quote blocks.",
    category: "beautifier",
    categoryLabel: "Beautifiers",
    url: "markdown-formatter.html",
    icon: "📝",
    badge: "Docs"
  },
  {
    id: "yaml-formatter",
    title: "YAML Formatter & Beautifier",
    desc: "Format, validate, and clean Kubernetes, Docker Compose, or GitHub Actions YAML files with custom indentation.",
    category: "beautifier",
    categoryLabel: "Beautifiers",
    url: "yaml-formatter.html",
    icon: "⚙️",
    badge: "YAML"
  },
  {
    id: "graphql-formatter",
    title: "GraphQL Formatter & Beautifier",
    desc: "Clean up, indent, and format nested GraphQL queries, mutations, fragments, and schema types.",
    category: "beautifier",
    categoryLabel: "Beautifiers",
    url: "graphql-formatter.html",
    icon: "🕸️",
    badge: "GraphQL"
  }
];

// --------------------------------------------------------------------------
// Theme Management (Light / Dark Mode)
// --------------------------------------------------------------------------
let lastThemeToggleTime = 0;

function initTheme() {
  let savedTheme = "light";
  try {
    savedTheme = localStorage.getItem("wth_theme") || 
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  } catch (e) {
    savedTheme = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }
  document.documentElement.setAttribute("data-theme", savedTheme);
  if (document.body) {
    document.body.setAttribute("data-theme", savedTheme);
  }
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const now = Date.now();
  if (now - lastThemeToggleTime < 200) {
    return; // Prevent duplicate execution from event bubbling or double listeners
  }
  lastThemeToggleTime = now;

  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  if (document.body) {
    document.body.setAttribute("data-theme", newTheme);
  }
  try {
    localStorage.setItem("wth_theme", newTheme);
  } catch (e) {}
  updateThemeIcon(newTheme);
  if (window.showToast) {
    window.showToast(newTheme === "dark" ? "🌙 Switched to Dark Mode" : "☀️ Switched to Light Mode", "info");
  }
}

function updateThemeIcon(theme) {
  const sunIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  
  const buttons = document.querySelectorAll("#theme-toggle-btn, #theme-toggle, .theme-toggle-btn, .icon-btn[aria-label*='theme'], [data-action='theme']");
  buttons.forEach(btn => {
    btn.innerHTML = theme === "dark" ? sunIcon : moonIcon;
    btn.setAttribute("title", theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode");
    btn.setAttribute("aria-label", theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode");
  });
}

window.initTheme = initTheme;
window.toggleTheme = toggleTheme;
window.updateThemeIcon = updateThemeIcon;

// --------------------------------------------------------------------------
// Toast Notification System
// --------------------------------------------------------------------------
function showToast(message, type = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  const icon = type === "success" ? "✓" : (type === "warning" ? "⚠️" : "ℹ️");
  toast.innerHTML = `<span style="font-weight:bold; font-size:1.1rem;">${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(12px) scale(0.95)";
    toast.style.transition = "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)";
    setTimeout(() => toast.remove(), 250);
  }, 2400);
}

// Global copy helper
function copyToClipboard(text, message = "Copied to clipboard!") {
  if (!text) {
    showToast("Nothing to copy!", "warning");
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    showToast(message, "success");
  }).catch(() => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showToast(message, "success");
  });
}

// --------------------------------------------------------------------------
// Quick Search Modal (Command Palette / Ctrl+K)
// --------------------------------------------------------------------------
function ensureSearchModalExists() {
  let modal = document.getElementById("search-modal-overlay");
  if (!modal || !modal.querySelector("#modal-search-input") || !modal.querySelector("#modal-search-results")) {
    if (modal) modal.remove();
    const modalDiv = document.createElement("div");
    modalDiv.id = "search-modal-overlay";
    modalDiv.className = "modal-overlay";
    modalDiv.innerHTML = `
      <div class="search-modal" role="dialog" aria-modal="true" aria-label="Quick Tool Search">
        <div class="search-modal-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" id="modal-search-input" class="search-modal-input" placeholder="Type a tool name, category, or keyword (e.g. PDF, JSON, Password)..." autocomplete="off" spellcheck="false">
          <span class="kbd-shortcut modal-close-btn" style="cursor: pointer;" title="Close search (ESC)">ESC</span>
        </div>
        <ul id="modal-search-results" class="search-results-list"></ul>
        <div class="search-modal-footer">
          <span>Navigate with <span class="kbd-shortcut">↑</span> <span class="kbd-shortcut">↓</span> and <span class="kbd-shortcut">↵ Enter</span></span>
          <span>Press <span class="kbd-shortcut">ESC</span> to close</span>
        </div>
      </div>
    `;
    document.body.appendChild(modalDiv);
  }
  return document.getElementById("search-modal-overlay");
}

let modalSelectedIndex = 0;

function openSearchModal() {
  const modal = ensureSearchModalExists();
  const input = document.getElementById("modal-search-input");
  if (!modal || !input) return;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  input.value = "";
  modalSelectedIndex = 0;
  renderModalResults("");
  setTimeout(() => {
    input.focus();
    input.select();
  }, 40);
}

function closeSearchModal() {
  const modal = document.getElementById("search-modal-overlay");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

window.openSearchModal = openSearchModal;
window.closeSearchModal = closeSearchModal;
window.openCommandPalette = openSearchModal;
window.closeCommandPalette = closeSearchModal;

function renderModalResults(query) {
  const resultsList = document.getElementById("modal-search-results");
  if (!resultsList) return;

  resultsList.innerHTML = "";
  let filtered = [];

  if (!query) {
    filtered = ALL_TOOLS.slice(0, 10);
  } else {
    const q = query.toLowerCase();
    filtered = ALL_TOOLS.filter(t => 
      t.title.toLowerCase().includes(q) || 
      t.desc.toLowerCase().includes(q) || 
      t.category.toLowerCase().includes(q) ||
      (t.categoryLabel && t.categoryLabel.toLowerCase().includes(q)) ||
      (t.badge && t.badge.toLowerCase().includes(q))
    );
  }

  if (filtered.length === 0) {
    resultsList.innerHTML = `<li style="padding: 2.5rem 1rem; text-align: center; color: var(--text-muted); font-size: 0.95rem;">No tools found matching "<strong>${escapeSearchHtml(query)}</strong>"</li>`;
    return;
  }

  if (!query) {
    const hint = document.createElement("li");
    hint.style.cssText = "padding: 0.4rem 0.85rem; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;";
    hint.textContent = "🔥 Trending & Popular Tools";
    resultsList.appendChild(hint);
  }

  filtered.forEach((tool, index) => {
    const li = document.createElement("li");
    li.className = `search-result-item ${index === modalSelectedIndex ? 'selected' : ''}`;
    li.innerHTML = `
      <a href="${tool.url}">
        <span style="font-size:1.4rem; flex-shrink:0; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; background: var(--bg-subtle); border-radius: var(--radius-sm);">${tool.icon}</span>
        <div style="flex:1; min-width:0;">
          <div style="font-weight:700; font-size:0.95rem; color:var(--text-primary); margin-bottom: 2px;">${tool.title}</div>
          <div style="font-size:0.8rem; color:var(--text-secondary); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${tool.desc}</div>
        </div>
        <span class="tool-badge">${tool.categoryLabel || "Tool"}</span>
      </a>
    `;
    resultsList.appendChild(li);
  });
}

function updateModalSelectedItems() {
  const resultsList = document.getElementById("modal-search-results");
  if (!resultsList) return;
  const items = resultsList.querySelectorAll(".search-result-item");
  items.forEach((item, idx) => {
    item.classList.toggle("selected", idx === modalSelectedIndex);
    if (idx === modalSelectedIndex) {
      item.scrollIntoView({ block: "nearest" });
    }
  });
}

function escapeSearchHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[s]);
}

function setupSearchModal() {
  ensureSearchModalExists();

  // Handle modal input searching
  document.addEventListener("input", (e) => {
    if (e.target && e.target.id === "modal-search-input") {
      modalSelectedIndex = 0;
      renderModalResults(e.target.value.trim());
    }
  });

  // Handle keyboard shortcuts globally
  document.addEventListener("keydown", (e) => {
    const modal = document.getElementById("search-modal-overlay");
    const isModalOpen = modal && modal.classList.contains("active");

    // Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (isModalOpen) {
        closeSearchModal();
      } else {
        openSearchModal();
      }
      return;
    }

    // Slash '/' opens search when not typing in form inputs
    if (e.key === "/" && !isModalOpen && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
      e.preventDefault();
      openSearchModal();
      return;
    }

    // Escape closes modal
    if (e.key === "Escape" && isModalOpen) {
      e.preventDefault();
      closeSearchModal();
      return;
    }

    // Arrow navigation inside modal
    if (isModalOpen) {
      const resultsList = document.getElementById("modal-search-results");
      const items = resultsList ? resultsList.querySelectorAll(".search-result-item") : [];
      if (items.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          modalSelectedIndex = (modalSelectedIndex + 1) % items.length;
          updateModalSelectedItems();
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          modalSelectedIndex = (modalSelectedIndex - 1 + items.length) % items.length;
          updateModalSelectedItems();
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (items[modalSelectedIndex]) {
            const link = items[modalSelectedIndex].querySelector("a");
            if (link) window.location.href = link.getAttribute("href");
          }
        }
      }
    }
  });
}

// --------------------------------------------------------------------------
// Global Event Delegation (Guarantees all header search & theme buttons work)
// --------------------------------------------------------------------------
document.addEventListener("click", (e) => {
  // Search Triggers
  const searchTrigger = e.target.closest(".search-trigger-btn, .open-search-modal, #nav-search-btn, #header-search-btn, [data-action='search'], .search-box-btn");
  if (searchTrigger) {
    e.preventDefault();
    openSearchModal();
    return;
  }

  // Close button inside modal
  const closeBtn = e.target.closest(".modal-close-btn");
  if (closeBtn) {
    e.preventDefault();
    closeSearchModal();
    return;
  }

  // Backdrop click on modal overlay
  const modalOverlay = document.getElementById("search-modal-overlay");
  if (e.target === modalOverlay) {
    closeSearchModal();
    return;
  }

  // Theme Toggles
  const themeTrigger = e.target.closest("#theme-toggle-btn, #theme-toggle, .theme-toggle-btn, .icon-btn[aria-label*='theme'], [data-action='theme']");
  if (themeTrigger) {
    e.preventDefault();
    toggleTheme();
    return;
  }
});

// --------------------------------------------------------------------------
// Floating Back to Top Button Setup
// --------------------------------------------------------------------------
function setupBackToTop() {
  let btn = document.querySelector(".btn-back-to-top");
  if (!btn) {
    btn = document.createElement("button");
    btn.className = "btn-back-to-top";
    btn.setAttribute("aria-label", "Scroll back to top");
    btn.setAttribute("title", "Back to top");
    btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
    document.body.appendChild(btn);
  }

  window.addEventListener("scroll", () => {
    if (window.scrollY > 350) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// --------------------------------------------------------------------------
// Global Navbar & Breadcrumbs Setup (Return Path to Home on Every Page)
// --------------------------------------------------------------------------
function setupGlobalNavbar() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const isHome = currentPath === "index.html" || currentPath === "" || currentPath.endsWith("/");

  // Check if page has nav-placeholder or no header
  const placeholder = document.querySelector(".nav-placeholder");
  let header = document.querySelector(".site-header, .header");

  if (placeholder && !header) {
    header = document.createElement("header");
    header.className = "site-header";
    placeholder.parentNode.replaceChild(header, placeholder);
  } else if (!header && document.body) {
    header = document.createElement("header");
    header.className = "site-header";
    document.body.insertBefore(header, document.body.firstChild);
  }

  if (!header) return;

  // Render unified modern header
  header.innerHTML = `
    <div class="container" style="display: flex; align-items: center; justify-content: space-between; height: 100%;">
      <a href="index.html" class="logo-wrapper">
        <div class="logo-icon">
          <img src="images/logo.svg" alt="WebToolsHub Logo" width="38" height="38">
        </div>
        <div class="logo-text">WebTools<span>Hub</span></div>
      </a>

      <nav class="site-nav" aria-label="Main Navigation">
        ${isHome ? `
          <a href="index.html" class="nav-link active">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span>Home</span>
          </a>
          <a href="#category-filter-container" class="nav-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            <span>All Tools</span>
          </a>
        ` : `
          <a href="index.html" class="nav-link nav-link-return-home" title="Return to Home Page">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            <span>Return to Home</span>
          </a>
          <a href="index.html#category-filter-container" class="nav-link" title="Explore all categories">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            <span>All Tools</span>
          </a>
        `}
      </nav>

      <div class="nav-actions">
        <button type="button" class="search-trigger-btn open-search-modal" aria-label="Search tools">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <span>Search tools...</span>
          <span class="shortcut-badge">Ctrl K</span>
        </button>

        <button type="button" id="theme-toggle-btn" class="icon-btn theme-toggle-btn" aria-label="Toggle theme" title="Toggle theme">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </button>
      </div>
    </div>
  `;

  // Sync theme icon on the newly inserted button
  const savedTheme = document.documentElement.getAttribute("data-theme") || "light";
  updateThemeIcon(savedTheme);
}

// --------------------------------------------------------------------------
// Breadcrumbs & Return Path Setup for All Tool Pages
// --------------------------------------------------------------------------
function setupBreadcrumbsAndReturnButton() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  if (currentPath === "index.html" || currentPath === "" || currentPath.endsWith("/")) return;

  const currentTool = ALL_TOOLS.find(t => t.url === currentPath || currentPath.endsWith(t.url));
  const toolTitle = currentTool ? currentTool.title : (document.querySelector(".tool-page-title")?.textContent || document.title.split("|")[0].split("—")[0].trim());
  const categoryId = currentTool ? currentTool.category : "beautifier";
  const categoryLabel = currentTool ? currentTool.categoryLabel : "Tools";
  const toolIcon = currentTool ? currentTool.icon : "🛠️";

  // Target header container
  const headerContainer = document.querySelector(".tool-page-header .container, .tool-page-header");
  let existingBreadcrumb = document.querySelector(".breadcrumb");

  const breadcrumbWrapper = document.createElement("div");
  breadcrumbWrapper.className = "breadcrumb-nav-wrapper";
  breadcrumbWrapper.innerHTML = `
    <nav class="breadcrumb" aria-label="Return path navigation">
      <a href="index.html" class="breadcrumb-item breadcrumb-home" title="Return to Home Page">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        <span>Home</span>
      </a>
      <span class="breadcrumb-separator">/</span>
      <a href="index.html#category-filter-container" class="breadcrumb-item breadcrumb-category" title="Explore ${categoryLabel} tools">
        <span>${categoryLabel}</span>
      </a>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item breadcrumb-current">
        <span>${toolIcon}</span>
        <span>${toolTitle}</span>
      </span>
    </nav>

    <a href="index.html" class="btn-return-home-pill" title="Return to Home Page">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      <span>Return to Home</span>
    </a>
  `;

  if (existingBreadcrumb) {
    existingBreadcrumb.parentNode.replaceChild(breadcrumbWrapper, existingBreadcrumb);
  } else if (headerContainer) {
    headerContainer.insertBefore(breadcrumbWrapper, headerContainer.firstChild);
  }

  // Add floating return to home button for quick return when scrolling
  setupFloatingReturnButton();
}

function setupFloatingReturnButton() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  if (currentPath === "index.html" || currentPath === "" || currentPath.endsWith("/")) return;

  let btn = document.getElementById("floating-return-home");
  if (!btn) {
    btn = document.createElement("a");
    btn.id = "floating-return-home";
    btn.href = "index.html";
    btn.className = "btn-floating-return";
    btn.setAttribute("title", "Return to Home Page");
    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
      <span>Return to Home</span>
    `;
    document.body.appendChild(btn);
  }
}

function setupGlobalFooter() {
  let footer = document.querySelector(".site-footer, footer.footer, footer");
  if (!footer) {
    footer = document.createElement("footer");
    document.body.appendChild(footer);
  }
  footer.className = "site-footer";

  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <!-- Brand & Vision -->
        <div class="footer-col footer-brand">
          <a href="index.html" class="logo-wrapper">
            <div class="logo-icon">
              <img src="images/logo.svg" alt="WebToolsHub Logo" width="38" height="38">
            </div>
            <div class="logo-text">WebTools<span>Hub</span></div>
          </a>
          <p>
            Free, lightning-fast, and 100% privacy-friendly browser utilities for developers, designers, and creators. All calculations run client-side.
          </p>
          <div class="footer-badges">
            <span class="system-status-badge">
              <span class="system-status-dot"></span>
              <span>100+ Free Tools Active</span>
            </span>
            <span class="system-status-badge">
              <span>🔒 Zero Server Uploads</span>
            </span>
          </div>
        </div>

        <!-- Col 1: Popular Tools -->
        <div class="footer-col">
          <h4>🚀 Popular Tools</h4>
          <ul class="footer-links">
            <li><a href="json-formatter.html">JSON Formatter</a></li>
            <li><a href="qr-code-generator.html">QR Code Generator</a></li>
            <li><a href="image-compressor.html">Image Compressor</a></li>
            <li><a href="password-generator.html">Password Generator</a></li>
            <li><a href="word-counter.html">Word Counter</a></li>
            <li><a href="base64-encoder-decoder.html">Base64 Encoder / Decoder</a></li>
            <li><a href="case-converter.html">Case Converter</a></li>
          </ul>
        </div>

        <!-- Col 2: Beautifiers & Dev Tools -->
        <div class="footer-col">
          <h4>✨ Formatters & Code</h4>
          <ul class="footer-links">
            <li><a href="sql-formatter.html">SQL Formatter</a></li>
            <li><a href="javascript-beautifier.html">JavaScript Beautifier</a></li>
            <li><a href="css-beautifier.html">CSS Beautifier</a></li>
            <li><a href="python-beautifier.html">Python Beautifier</a></li>
            <li><a href="html-formatter.html">HTML Formatter</a></li>
            <li><a href="markdown-previewer.html">Markdown Live Editor</a></li>
            <li><a href="text-diff.html">Text Diff Checker</a></li>
          </ul>
        </div>

        <!-- Col 3: Security & Network -->
        <div class="footer-col">
          <h4>🔐 Security & Web</h4>
          <ul class="footer-links">
            <li><a href="password-strength-checker.html">Password Strength</a></li>
            <li><a href="hash-generator.html">Hash Generator (SHA-256)</a></li>
            <li><a href="uuid-generator.html">UUID Generator</a></li>
            <li><a href="url-encoder-decoder.html">URL Encoder / Decoder</a></li>
            <li><a href="http-status-codes.html">HTTP Status Codes</a></li>
            <li><a href="ip-lookup.html">IP Lookup & Geo</a></li>
            <li><a href="jwt-decoder.html">JWT Token Decoder</a></li>
          </ul>
        </div>

        <!-- Col 4: Converters & Math -->
        <div class="footer-col">
          <h4>➗ Math & Converters</h4>
          <ul class="footer-links">
            <li><a href="percentage-calculator.html">Percentage Calculator</a></li>
            <li><a href="unit-converter.html">Unit Converter</a></li>
            <li><a href="aspect-ratio-calculator.html">Aspect Ratio Calculator</a></li>
            <li><a href="number-base-converter.html">Number Base Converter</a></li>
            <li><a href="color-picker.html">Color Picker & Palette</a></li>
            <li><a href="pdf-utilities.html">PDF Utilities</a></li>
            <li><a href="timestamp-converter.html">Timestamp Converter</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div>&copy; 2026 WebToolsHub. All rights reserved. 100% Client-Side Privacy Guaranteed.</div>
        <div class="footer-bottom-links">
          <a href="index.html">Home</a>
          <a href="index.html#category-filter-container">All Tools</a>
          <a href="index.html#category-filter-container">Categories</a>
          <a href="https://arzhost.com/tools/" target="_blank" rel="noopener noreferrer">Explore more</a>
          <button type="button" class="btn-scroll-top-footer" onclick="window.scrollTo({top:0, behavior:'smooth'})">
            <span>↑ Back to Top</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Clean up ads
function cleanupAds() {
  document.querySelectorAll(".ad-slot, .ad-slot-leaderboard, .ad-slot-sidebar, .sponsor-banner").forEach(el => {
    el.remove();
  });
}

// Accordion FAQ toggles
function setupFaqAccordions() {
  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      item.classList.toggle("open");
    });
  });
}

// Dynamic Related Tools Logic
function setupRelatedTools() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  if (currentPath === "index.html" || !currentPath.endsWith(".html")) return;

  const currentTool = ALL_TOOLS.find(t => t.url === currentPath || currentPath.endsWith(t.url));
  if (!currentTool) return;

  const sameCategoryTools = ALL_TOOLS.filter(t => t.category === currentTool.category && t.url !== currentTool.url);
  const related = sameCategoryTools.slice(0, 4);
  if (!related.length) return;

  const sidebarLinksList = document.querySelector(".sidebar-links");
  if (sidebarLinksList && sidebarLinksList.children.length === 0) {
    sidebarLinksList.innerHTML = related.map(t => `
      <li>
        <a href="${t.url}">
          <span>${t.icon} ${t.title}</span>
          <span class="badge-mini">${t.badge || "Tool"}</span>
        </a>
      </li>
    `).join("");
  }
}

// Record tool visit for recent tools feature
function recordToolVisit(toolId) {
  if (!toolId) return;
  try {
    const visits = JSON.parse(localStorage.getItem("wth_recent_tools") || "[]");
    const updated = [toolId, ...visits.filter(id => id !== toolId)].slice(0, 10);
    localStorage.setItem("wth_recent_tools", JSON.stringify(updated));
  } catch (e) {
    // Silently ignore storage quota errors
  }
}

// Expose utilities on window object
window.recordToolVisit = recordToolVisit;
window.showToast = showToast;
window.copyToClipboard = copyToClipboard;

function initGlobalFeatures() {
  initTheme();
  cleanupAds();
  setupGlobalNavbar();
  setupBreadcrumbsAndReturnButton();
  setupGlobalFooter();
  setupSearchModal();
  setupFaqAccordions();
  setupRelatedTools();
  setupBackToTop();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGlobalFeatures);
} else {
  initGlobalFeatures();
}






