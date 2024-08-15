export class CreateWebCarsDto {
  readonly carName: string;
  readonly kmLimit?: number;
  readonly dailyPrice?: number;
  readonly gear?: string;
  readonly fuelType?: string;
  readonly seat?: number;
  readonly isOnWeb?: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
