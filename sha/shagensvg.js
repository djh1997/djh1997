const CHAR_COUNT = 11;
    const textInput = document.getElementById('textInput');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const preview = document.getElementById('preview');
    let lastSvg = '';
    let lastWord = '';

    async function hashHex(value) {
      const bytes = new TextEncoder().encode(value);
      const digest = await crypto.subtle.digest('SHA-256', bytes);
      return Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    }

    function getWord(source) {
      return source.slice(0, CHAR_COUNT);
    }

    function buildSvg(word, sha) {
      const fragments = [];
      fragments.push('<?xml version="1.0" encoding="utf-8"?>');
      fragments.push('<svg height="19" width="162" xmlns="http://www.w3.org/2000/svg">');
      fragments.push('<text x="0" y="15" font-family="monospace">');

      for (let i = 0; i < CHAR_COUNT; i += 1) {
        const char = word[i] || '';
        const fill = i !== CHAR_COUNT - 1
          ? `#${sha.slice(i * 6, i * 6 + 6)}`
          : `#${sha.slice(i * 6, i * 6 + 4)}00`;
        fragments.push(`<tspan fill="${fill}">${char}</tspan>`);
      }

      fragments.push('</text>');
      fragments.push('</svg>');
      return fragments.join('');
    }

    function renderPreview(svgText) {
      preview.innerHTML = svgText;
    }

    function updatePage(svgText, word) {
      lastSvg = svgText;
      lastWord = word;
      renderPreview(svgText);
      downloadBtn.disabled = !word;
    }

    async function generate() {
      const sourceText = textInput.value.trim();
      if (!sourceText) {
        alert('Please enter text first.');
        return;
      }

      const word = getWord(sourceText);
      if (!word) {
        alert('The source text must contain at least one character.');
        return;
      }

      const sha = await hashHex(word);
      const svg = buildSvg(word, sha);
      updatePage(svg, word);
    }

    function downloadSvg() {
      if (!lastSvg || !lastWord) {
        return;
      }
      const blob = new Blob([lastSvg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${lastWord}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    generateBtn.addEventListener('click', generate);
    downloadBtn.addEventListener('click', downloadSvg);