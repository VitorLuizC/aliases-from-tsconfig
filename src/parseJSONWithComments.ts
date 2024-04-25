/** Parses a JSON with comments to JavaScript value. */
function parseJSONWithComments<T>(jsonWithComments: string): T {
  return JSON.parse(jsonWithComments.replace(/\/\/[^\n]*\n/g, '\n'));
}

export default parseJSONWithComments;
