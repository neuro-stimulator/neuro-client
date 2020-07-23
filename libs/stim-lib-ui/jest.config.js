module.exports = {
  name: 'stim-lib-ui',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/stim-lib-ui',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
