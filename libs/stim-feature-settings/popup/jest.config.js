module.exports = {
  preset: '../../../jest.preset.js',
  coverageDirectory: '../../../coverage/libs/stim-feature-settings/popup',

  displayName: 'stim-feature-settings-popup',
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
