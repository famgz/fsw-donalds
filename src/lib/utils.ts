import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fromCentsToReal(priceInCents: number) {
  return priceInCents / 100;
}

export function formatPrice(priceInCents: number) {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(fromCentsToReal(priceInCents));
}

export async function delay(intervalInMs: number = 500) {
  return new Promise((resolve) => setTimeout(resolve, intervalInMs));
}
