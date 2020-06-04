module.exports = {
  name: 'stimulator',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/stimulator',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
