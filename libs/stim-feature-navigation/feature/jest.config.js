module.exports = {
  name: 'stim-feature-navigation-feature',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/stim-feature-navigation/feature',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
