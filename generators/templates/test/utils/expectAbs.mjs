export const expectAbstraction = (res, resStatus, expectedObject) => {
  expect(res.status).toEqual(resStatus);
  expect(res.body).toEqual(
      expect.objectContaining(
        expectedObject
      )
  );
}