export function stringToColor(str: string) {
  let hash = 0;
  str.split('').forEach(char => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash)
  })
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff
    colour += value.toString(16).padStart(2, '0')
  }
  return colour
}


export function setHexLuminance(hex: string, lum: number = 0) {
	hex = String(hex).replace(/[^0-9a-f]/gi, '');

  if (hex.length < 6) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
	}

	let rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
    const targetIndex = i*2;
		c = parseInt(hex.substring(targetIndex, targetIndex + 2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substring(c.length);
	}

	return rgb;
}

export function getContrastColor(hexColor: string) {
  hexColor = hexColor.replace('#', '');

  const red = parseInt(hexColor.substring(0, 2), 16) / 255;
  const green = parseInt(hexColor.substring(2, 4), 16) / 255;
  const blue = parseInt(hexColor.substring(4, 6), 16) / 255;
  const luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

  return luminance > 0.480 ? 'black' : 'white';
}