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