import {AuthEffects} from './auth.effects';
import { CategoryEffects } from './category.effects';
import { ProductEffects } from './product.effects';
import { CartEffects } from './cart.effects';
import { OrderEffects } from './order.effects';
export const effects: any[] = [AuthEffects, CategoryEffects, ProductEffects, CartEffects, OrderEffects];

export * from './auth.effects';
export * from './category.effects';
export * from './product.effects';
export * from './cart.effects';
export * from './order.effects';
