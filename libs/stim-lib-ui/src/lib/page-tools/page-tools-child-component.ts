export abstract class PageToolsChildComponent {
  public readonly title: string;
  public readonly confirmText: string;
  public readonly cancelText: string;

  public init(): void {}

  public deinit(): void {}

  public confirm(): void {}

  public cancel(): void {}
}
