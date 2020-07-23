module.exports = {
  name: 'stim-feature-experiment-results-feature',
  preset: '../../../jest.config.js',
  coverageDirectory:
    '../../../coverage/libs/stim-feature-experiment-results/feature',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
