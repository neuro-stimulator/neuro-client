module.exports = {
  name: 'stim-feature-experiments-domain',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/stim-feature-experiments/domain',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
