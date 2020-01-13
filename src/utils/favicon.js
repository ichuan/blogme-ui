const previousCache = { text: null };

export default {
  setText(char) {
    if (previousCache.text === char) {
      return;
    }
    previousCache.text = char;
    const size = 256,
      textPercent = 0.75,
      elCanvas = document.createElement('canvas'),
      ctx = elCanvas.getContext('2d');

    elCanvas.width = size;
    elCanvas.height = size;

    ctx.fillStyle = '#209CEE';
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = '#fff';
    ctx.font = `bold ${Math.floor(
      size * textPercent
    )}px/${size}px monospace, sans-serif`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(char, size / 2, size / 2, size);

    const elLink = document.querySelector('head link[rel="icon"]');

    if (window.URL) {
      elCanvas.toBlob(blob => {
        elLink.href = URL.createObjectURL(blob);
      });
    } else {
      elLink.href = elCanvas.toDataURL('image/png');
    }
  },

  setWithDomainDefault(char) {
    const first = char ? char[0] : window.location.hostname[0].toUpperCase();
    return this.setText(first);
  },
};
