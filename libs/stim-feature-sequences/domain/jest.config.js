module.exports = {
  name: 'stim-feature-sequences-domain',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/stim-feature-sequences/domain',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
