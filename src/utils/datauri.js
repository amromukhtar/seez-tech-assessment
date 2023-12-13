import DatauriParser from 'datauri/parser';

const parser = new DatauriParser();

const dataUri = (file) => parser.format('webp', file.buffer);

export default dataUri;
