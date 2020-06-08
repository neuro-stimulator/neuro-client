module.exports = {
  name: 'stim-lib-list-utils',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/stim-lib-list-utils',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
