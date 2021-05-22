module.exports = {
  preset: '../../../../jest.preset.js',
  coverageDirectory: '../../../../coverage/libs/stim-feature-settings/feature/param-config',

  displayName: 'stim-feature-settings-feature-param-config',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
