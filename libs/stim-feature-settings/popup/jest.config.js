module.exports = {
  name: 'stim-feature-settings-api',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/stim-feature-settings/popup',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
