module.exports = {
  name: 'stim-feature-file-browser-feature',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/stim-feature-file-browser/feature',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
