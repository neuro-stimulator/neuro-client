module.exports = {
  name: 'stim-feature-settings-feature-service-state',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/stim-feature-settings/feature/service-state',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
