module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/libs/stim-feature-about',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
  displayName: 'stim-feature-about',
};
