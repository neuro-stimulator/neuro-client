module.exports = {
  name: 'stim-feature-settings-feature-param-config-experiments',
  preset: '../../../../../jest.config.js',
  coverageDirectory:
    '../../../../../coverage/libs/stim-feature-settings/feature/param-config/experiments',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
