module.exports = {
  name: 'stim-lib-store',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/stim-lib-store',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
