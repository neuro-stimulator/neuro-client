module.exports = {
  name: 'stim-lib-connection',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/stim-lib-connection',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
