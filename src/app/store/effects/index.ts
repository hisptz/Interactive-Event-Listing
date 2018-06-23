import { UserEffects } from './user.effects';
import { AnalyticsEffects } from './analytics.effects';

export const rootEffects: any = [UserEffects, AnalyticsEffects];

export * from './user.effects';
export * from './analytics.effects';
