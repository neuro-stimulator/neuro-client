module.exports = {
  name: 'stim-lib-modal',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/stim-lib-modal',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
