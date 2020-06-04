module.exports = {
  name: 'stim-lib-fab',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/stim-lib-fab',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
