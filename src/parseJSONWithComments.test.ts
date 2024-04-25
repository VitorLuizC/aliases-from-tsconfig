import parseJSONWithComments from './parseJSONWithComments';

describe('parseJSONWithComments', () => {
  it('parses JSON with comments to JavaScript object', () => {
    expect(
      parseJSONWithComments(`
        {
          // Title
          "title": "JSON with Comments"
        }
      `),
    ).toEqual({ title: 'JSON with Comments' });
  });
});
