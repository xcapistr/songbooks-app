const transpositions = {
  C: ['C', 'C#', 'D', 'Es', 'E', 'F', 'F#', 'G', 'As', 'A', 'B', 'H'],
  F: ['F', 'F#', 'G', 'As', 'A', 'B', 'H', 'C', 'C#', 'D', 'Es', 'E'],
  G: ['G', 'As', 'A', 'B', 'H', 'C', 'C#', 'D', 'Es', 'E', 'F', 'F#'],
  Ami: ['Ami', 'Bmi', 'Hmi', 'Cmi', 'C#mi', 'Dmi', 'Esmi', 'Emi', 'Fmi', 'F#mi', 'Gmi', 'Asmi'],
  Emi: ['Emi', 'Fmi', 'F#mi', 'Gmi', 'Abmi', 'Ami', 'Bmi', 'Hmi', 'Cmi', 'C#mi', 'Dmi', 'Esmi'],
  Es: ['Es', 'E', 'F', 'F#', 'G', 'As', 'A', 'B', 'H', 'C', 'C#', 'D'],
  B: ['B', 'H', 'C', 'C#', 'D', 'Es', 'E', 'F', 'F#', 'G', 'As', 'A'],
  Dmi: ['Dmi', 'Esmi', 'Emi', 'Fmi', 'F#mi', 'Gmi', 'Abmi', 'Ami', 'Bmi', 'Hmi', 'Cmi', 'C#mi'],
  'D#': ['D#', 'Esmi', 'Emi', 'Fmi', 'F#mi', 'Gmi', 'Abmi', 'Ami', 'Bmi', 'Hmi', 'Cmi', 'C#mi'], 
  Cmi: ['Cmi', 'Esmi', 'Emi', 'Fmi', 'F#mi', 'Gmi', 'Abmi', 'Ami', 'Bmi', 'Hmi', 'Cmi', 'C#mi'],
  Gmi: ['Gmi', 'Esmi', 'Emi', 'Fmi', 'F#mi', 'Gmi', 'Abmi', 'Ami', 'Bmi', 'Hmi', 'Cmi', 'C#mi'],
  'D#maj7': ['D#maj7', 'Esmi', 'Emi', 'Fmi', 'F#mi', 'Gmi', 'Abmi', 'Ami', 'Bmi', 'Hmi', 'Cmi', 'C#mi'],
  D7: ['D7', 'Esmi', 'Emi', 'Fmi', 'F#mi', 'Gmi', 'Abmi', 'Ami', 'Bmi', 'Hmi', 'Cmi', 'C#mi'],
  'G#': ['G#', 'Esmi', 'Emi', 'Fmi', 'F#mi', 'Gmi', 'Abmi', 'Ami', 'Bmi', 'Hmi', 'Cmi', 'C#mi']
}

export default (chord, trans) => {
  const shift = trans < 0 ? 12 + trans : trans
  return transpositions[chord][shift]
}
