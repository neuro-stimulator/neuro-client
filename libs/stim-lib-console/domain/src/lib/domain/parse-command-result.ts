/**
 * Rozhraní reprezentující výsledek naparsovaného dotazu
 */
export interface ParseCommandResult {
  valid: boolean;
  commandName: string;
  consumer: 'client' | 'server';
  invalidReason?: string;
  parameters?: any;
}
