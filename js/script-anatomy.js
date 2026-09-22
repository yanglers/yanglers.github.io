/* Segment displayed greetings without changing their spelling or normalization. */
window.describeGreeting = (word, lang) => ({
  direction: ['ar','he'].includes(lang) ? 'rtl' : 'ltr',
  codePoints: Array.from(word).length,
  groups: typeof Intl.Segmenter === 'function'
    ? Array.from(new Intl.Segmenter(lang, {granularity:'grapheme'}).segment(word), entry => ({
      text: entry.segment,
      codes: Array.from(entry.segment, c => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4,'0'))
    })) : null
});
window.renderScriptAnatomy = note => {
  const info = window.describeGreeting(note.word,note.lang);
  // Preserve the disclosure state when switching greetings.
  document.getElementById('script-direction').textContent = info.direction === 'rtl' ? 'Right to left' : 'Left to right';
  document.getElementById('script-count').textContent = info.groups
    ? `${info.groups.length} grapheme clusters · ${info.codePoints} Unicode code points (including spaces)`
    : `${info.codePoints} Unicode code points. Grapheme segmentation is unavailable in this browser.`;
  const groups = document.getElementById('script-groups');
  groups.replaceChildren(); groups.dir = info.direction;
  const result = document.getElementById('script-codepoints');
  result.textContent = '';
  for (const [index, group] of (info.groups || []).entries()) {
    const button = document.createElement('button');
    button.type = 'button'; button.lang = note.lang;
    button.textContent = group.text === ' ' ? '␠' : group.text;
    button.setAttribute('aria-label', `${group.text === ' ' ? 'Space' : group.text}, group ${index + 1}`);
    button.setAttribute('aria-pressed','false');
    button.addEventListener('click', () => {
      groups.querySelectorAll('button').forEach(el => el.setAttribute('aria-pressed',String(el === button)));
      result.textContent = group.codes.join(' + ');
    });
    groups.append(button);
  }
  groups.querySelector('button')?.click();
};
