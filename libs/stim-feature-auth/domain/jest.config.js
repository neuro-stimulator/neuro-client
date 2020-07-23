module.exports = {
  name: 'stim-feature-auth-domain',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/stim-feature-auth/domain',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
