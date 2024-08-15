export class UpdateWebCarsDto {
  readonly carName: string;
  readonly kmLimit?: number;
  readonly dailyPrice?: number;
  readonly gear?: string;
  readonly fuelType?: string;
  readonly seat?: number;
  readonly isOnWeb?: boolean;
  readonly updatedAt: Date;
}
