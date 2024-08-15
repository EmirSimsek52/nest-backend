export class CreateReservationsDto {
  readonly departureDate: string;
  readonly returnDate: string;
  readonly phoneNumber: string;
  readonly email: string;
  readonly name: string;
  readonly surname: string;
  readonly departureLocation: string;
  readonly returnLocation: string;
  readonly companyName: string;
  readonly createdAt: Date;
  readonly carName: string;
}
