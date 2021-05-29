export const getNameShortcut = (name: string) => name.split(/\s/).reduce((acc, word) => (acc += word.slice(0, 1)), '');
